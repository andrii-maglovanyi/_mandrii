import { GetPublicLocationsQuery } from "@/types";
import { classNames } from "@/utils";
import { InfoLine } from "./InfoLine";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Button,
  Column,
  H3,
  ImageCarousel,
  Phrase,
  Row,
  Tooltip,
} from "@/components";
import { useEffect, useRef, useState } from "react";
import { sendToMixpanel } from "@/lib";
import { useNotifications } from "@/hooks";

interface PlaceSlideCardProps {
  location: GetPublicLocationsQuery["ukrainian_locations"][number];
  onClick: () => void;
}

// (function () {
//   const logEvent = (event: any) => {
//     console.log(`Event: ${event.type}`, event);
//   };

//   const eventTypes = [
//     // "click",
//     // "dblclick",
//     // "mousedown",
//     // "mouseup",
//     // "mousemove",
//     // "mouseenter",
//     // "mouseleave",
//     // "mouseover",
//     // "mouseout",
//     // "wheel",
//     // "keydown",
//     // "keyup",
//     // "keypress",
//     // "focus",
//     // "blur",
//     // "touchstart",
//     // "touchmove",
//     // "touchend",
//     // "pointerdown",
//     // "pointermove",
//     // "pointerup",
//     // "pointerenter",
//     // "pointerleave",
//     // "pointerover",
//     // "pointerout",
//     // "dragstart",
//     // "drag",
//     // "dragend",
//     // "drop",
//     // "submit",
//     // "change",
//     // "input",
//     // "contextmenu",
//   ];

//   eventTypes.forEach((eventType) => {
//     document.addEventListener(eventType, logEvent, { passive: true });
//   });

//   console.log("✅ Logging all user interaction events...");
// })();

function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let lastFunc: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(lastFunc as NodeJS.Timeout);
    lastFunc = setTimeout(() => {
      func.apply(this, args);
    }, limit);
  } as T;
}

export const MobileLocationCard = ({
  location,
  onClick,
}: PlaceSlideCardProps) => {
  const { id, images, name, address, phone_numbers, emails, website, slug } =
    location;
  const { dict, lang } = useLanguage();
  const { showSuccess } = useNotifications();
  const placeCardRef = useRef<HTMLDivElement | null>(null);

  const [expanded, setExpanded] = useState(false);

  const startYRef = useRef(0);
  const endYRef = useRef(0);

  const [position, setPosition] = useState(-200);
  const scrollFactor = 1; // Adjust for smoother/faster scrolling

  const clickDetected = useRef(false);

  const touchStartTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchEndTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxCarouselExpand = window.screen.height > 700 ? 400 : 300;

  useEffect(() => {
    // const handleUserScrollAttempt = () => {
    //   console.log("SCR");
    //   if (!expanded && placeCardRef.current) {
    //     const rect = placeCardRef.current.getBoundingClientRect();
    //     if (rect.top < window.innerHeight && rect.bottom > 0) {
    //       setExpanded(true);
    //     }
    //   }
    // };

    const timeoutMs = expanded ? 20 : 500;

    const handleUserScrollAttempt = throttle((event: any) => {
      if (!placeCardRef.current) return;

      if (!expanded) {
        setExpanded(true);
        setPosition((prev) => prev + maxCarouselExpand);
      }

      console.log("CALLED");

      // if (!expanded) {
      //   setExpanded(true);
      //   return;
      // }

      // event.preventDefault();
      const delta = event.deltaY * scrollFactor; // Get scroll direction

      console.log("event.deltaY", event.deltaY);
      const viewportHeight = window.innerHeight;
      const containerHeight = placeCardRef.current.offsetHeight;

      // console.log("delta", delta);
      console.log("viewportHeight", viewportHeight);
      console.log("containerHeight", containerHeight);

      // Define limits
      const maxPosition = -200; // Moves to the top (aligned with viewport top)
      const minPosition = viewportHeight - containerHeight;

      // Calculate new position within boundaries
      setPosition((prev) => {
        const newPos = prev - delta;

        if (newPos >= maxPosition) {
          return maxPosition;
        }

        console.log("np", newPos, newPos + containerHeight);
        if (newPos + containerHeight <= 0) {
          console.log("THIS", -containerHeight);
          return -containerHeight;
        }

        return newPos;
      });
    }, 50);

    // window.addEventListener("scroll", handleUserScrollAttempt, {
    //   passive: true,
    // });

    window.addEventListener("wheel", handleUserScrollAttempt, {
      passive: true,
    });
    // window.addEventListener("touchstart", handleUserScrollAttempt, {
    //   passive: true,
    // });
    // window.addEventListener("pointermove", handleUserScrollAttempt, {
    //   passive: true,
    // });

    return () => {
      window.removeEventListener("wheel", handleUserScrollAttempt);
      window.removeEventListener("touchstart", handleUserScrollAttempt);
      window.removeEventListener("pointermove", handleUserScrollAttempt);
    };
  }, [expanded]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    clickDetected.current = false;
    touchStartTimeout.current = setTimeout(() => {
      if (clickDetected.current) return;
      startYRef.current = e.touches[0].clientY;
    }, 50);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    clickDetected.current = false;
    touchEndTimeout.current = setTimeout(() => {
      if (clickDetected.current) return;

      const deltaY = startYRef.current - endYRef.current;

      if (deltaY > 50) {
        setExpanded(true);
      } else if (deltaY < -50) {
        setExpanded(false);
      }
    }, 50);
  };

  const handleClick = () => {
    clickDetected.current = true;

    touchStartTimeout.current && clearTimeout(touchStartTimeout.current);
    touchEndTimeout.current && clearTimeout(touchEndTimeout.current);

    setExpanded(!expanded);

    setTimeout(() => {
      clickDetected.current = false;
    }, 100);
  };
  // transition-all duration-500 ease-in-out
  return (
    <Column
      onClick={onClick}
      key={id.toString()}
      ref={placeCardRef}
      style={{
        marginTop: `${expanded ? position - maxCarouselExpand : position}px`,
      }}
      className={classNames(
        // expanded ? "transition-[margin-top] duration-500 ease-in-out" : "",
        "transition-all duration-200 ease-in text-md lg:text-base overflow-x-hidden rounded-t-2xl bg-primary-0 dark:bg-slate-800 w-[calc(100%+4px)] h-min flex-shrink-0 border-t-2 border-l-2 border-r-2 border-primary-1000 fixed top-full"
      )}
    >
      <Row
        className="justify-center py-3 cursor-pointer"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="w-[20%] rounded-lg border-2 border-green-400"></div>
      </Row>
      <Row
        className="relative rounded-lg overflow-hidden mx-2 transition-all duration-500 ease-in-out"
        style={{ height: `${expanded ? maxCarouselExpand : 130}px` }}
      >
        <ImageCarousel
          images={images?.map(
            (image) =>
              `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
          )}
        />
      </Row>
      <Row className="px-4 justify-between items-center">
        <H3>{name}</H3>
        <Tooltip placement="left" text={dict["Share place"]}>
          <Button
            icon="share-solid"
            onClick={() => {
              const url = `${window.location.origin}/map/${slug}`;
              sendToMixpanel("shared_place", { slug });

              navigator.clipboard.writeText(url);
              showSuccess(url, { header: dict["Copied"] });
            }}
          />
        </Tooltip>
      </Row>
      {
        <Column
          className={classNames(
            "transition-all duration-100 ease-in-out overflow-hidden mb-2"
            // expanded ? "max-h-full" : "max-h-0"
          )}
        >
          <Phrase
            className={classNames("px-4 my-2", expanded ? "" : "")}
            dangerouslySetInnerHTML={{
              __html: String(location[`description_${lang}`]).replaceAll(
                "\n",
                "<br />"
              ),
            }}
          />
          <InfoLine
            icon="globe-line"
            text={website}
            tooltipText={dict["Copy website"]}
            isLink
          />
          <InfoLine
            icon="email-line"
            text={emails?.join(", ")}
            tooltipText={dict["Copy email"]}
          />
          <InfoLine
            icon="call-line"
            text={phone_numbers?.join(", ")}
            tooltipText={dict["Copy phone number"]}
          />
          <InfoLine
            icon="pin-line"
            text={address}
            tooltipText={dict["Copy address"]}
          />
        </Column>
      }
    </Column>
  );
};
