import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface BlurDetectorProps {
  children: ReactNode;
  ignore?: boolean;
  onBlur: () => void;
}
interface OnBlurDetectorProps extends BlurDetectorProps {
  isStacked?: boolean;
}

let detectorsStack: Array<number> = [];

const PlainBlurDetector = ({ children, ignore, onBlur }: BlurDetectorProps) => {
  const wrapper = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "Escape" && !ignore) {
        onBlur();
      }
    },
    [ignore, onBlur],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        !ignore &&
        wrapper.current &&
        event.target instanceof Element &&
        !wrapper.current.contains(event.target)
      ) {
        onBlur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside, {
      capture: true,
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleKeyDown, ignore, onBlur]);

  return (
    <div
      className="relative contents"
      onClick={(e) => e.stopPropagation()}
      ref={wrapper}
    >
      {children}
    </div>
  );
};

const StackedBlurDetector = ({
  children,
  ignore,
  onBlur,
}: BlurDetectorProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const [detectorId] = useState(
    (detectorsStack[detectorsStack.length - 1] || 0) + 1,
  );

  useEffect(() => {
    if (detectorsStack.find((id) => id === detectorId)) return;
    detectorsStack.push(detectorId);

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const shouldBeBlurred =
        detectorsStack[detectorsStack.length - 1] === detectorId && !ignore;

      if (
        shouldBeBlurred &&
        wrapper.current &&
        event.target instanceof Element &&
        !wrapper.current.contains(event.target)
      ) {
        detectorsStack = detectorsStack.filter((id) => id !== detectorId);
        onBlur();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      detectorsStack = detectorsStack.filter((id) => id !== detectorId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [detectorId, ignore, onBlur]);

  return (
    <div className="relative contents" ref={wrapper}>
      {children}
    </div>
  );
};

export const OnBlurDetector = ({ isStacked, ...props }: OnBlurDetectorProps) =>
  isStacked ? (
    <StackedBlurDetector {...props} />
  ) : (
    <PlainBlurDetector {...props} />
  );
