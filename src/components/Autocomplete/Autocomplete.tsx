import {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import type { BaseComponentProps, NameValueObject } from "@/types";
import { isNotEmpty, toNameValueObject } from "@/utils";
import { getDropdownVerticalPosition } from "@/utils";

export type Option<T> = NameValueObject<T> | T;

export interface AutocompleteProps<T> extends BaseComponentProps {
  defaultValue?: Option<T>;
  disabled?: boolean;
  emptyOption?: boolean;
  emptyOptionLabel?: string;
  emptyOptionValue?: T;
  isOpen: boolean;
  items: Array<Option<T> | null | undefined>;
  label?: string;
  name?: string;
  onOpen: (isOpen: boolean) => void;
  onSelect?: (value: NameValueObject<T>) => void;
  required?: boolean;
  width?: string | number;
}

export const itemStyles = `
    flex items-center cursor-pointer whitespace-nowrap select-none relative
    p-3 mx-1 mb-1 last:mb-0 hover:bg-primary-50 focus:outline-hidden focus:bg-primary-50 
    dark:hover:bg-primary-900 dark:focus:bg-primary-900 rounded-md `;

export const AutocompleteComponent = <T extends string>(
  {
    "data-testid": testId = "select",
    defaultValue,
    emptyOption,
    emptyOptionLabel = "All items",
    emptyOptionValue = " " as T,
    isOpen = false,
    items,
    onOpen,
    onSelect,
  }: AutocompleteProps<T>,
  ref: Ref<HTMLUListElement>
) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { focusedIndex, handleKeyDown } = useKeyboardNavigation(
    groupRef.current
  );

  const normalizedItems = items.filter(isNotEmpty).map(toNameValueObject);
  const options = useMemo(
    () =>
      emptyOption
        ? [
            {
              name: emptyOptionLabel,
              value: emptyOptionValue,
            },
            ...normalizedItems,
          ]
        : normalizedItems,
    [emptyOption, emptyOptionLabel, emptyOptionValue, normalizedItems]
  );

  const getPreselectedValue = useCallback(() => {
    if (defaultValue) {
      return toNameValueObject(defaultValue);
    }

    return options[0];
  }, [defaultValue, options]);

  const [selectedOption, setSelectedOption] = useState(getPreselectedValue());

  const onSelectedHandler = (option: NameValueObject<T>) => {
    setSelectedOption(option);

    if (onSelect) {
      onSelect(option);
      onOpen(false);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(toNameValueObject(defaultValue));
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const container = containerRef.current;
    const dropdown = groupRef.current;
    if (!container || !dropdown) {
      return;
    }

    const setPosition = () => {
      const verticalExpandTo = getDropdownVerticalPosition(dropdown, {
        position: "bottom",
      });

      const dropdownHeight = dropdown.clientHeight;
      const containerRect = container.getBoundingClientRect();

      const top =
        verticalExpandTo === "top" ? -dropdownHeight : containerRect.height;

      const positionStyles = {
        marginTop: verticalExpandTo === "top" ? 0 : "4px",
        top: `${top}px`,
        transformOrigin: `${verticalExpandTo === "top" ? "bottom" : "top"}`,
      };

      dropdown.setAttribute("data-positioned", "true");
      Object.assign(dropdown.style, positionStyles);
    };

    const resizeObserver = new ResizeObserver(() => {
      setPosition();
    });

    resizeObserver.observe(dropdown);

    return () => {
      if (dropdown) {
        resizeObserver.unobserve(dropdown);
      }
    };
  }, [isOpen]);

  const getOptionStyles = (value: T) =>
    selectedOption.value === value
      ? "bg-primary-100 dark:bg-primary-700 hover:bg-primary-200 dark:hover:bg-primary-700 focus:bg-primary-100 dark:focus:bg-primary-700"
      : "";

  const renderOptionItems = () => (
    <ul className="max-h-96 overflow-y-scroll" role="listbox" ref={ref}>
      {options.map(({ name, value }, index) => {
        const handler = () => onSelectedHandler({ name, value });

        return (
          <li
            aria-selected={selectedOption.value === value}
            className={[itemStyles, getOptionStyles(value)].join(" ")}
            data-testid={`${testId}-${value === " " ? "all" : value}`}
            key={value}
            onClick={handler}
            onKeyDown={(e) => handleKeyDown(e, handler)}
            ref={(el) => {
              if (focusedIndex === index) {
                el?.focus();
              }
            }}
            role="option"
            tabIndex={0}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`
        bg-primary-0 absolute z-10 mt-0.5 rounded-md py-1 shadow-lg
        drop-shadow-xl
        dark:bg-primary-800 dark:text-primary-0
      `}
      data-testid={`${testId}-group`}
      ref={groupRef}
      style={{ display: isOpen ? "block" : "none" }}
    >
      {options.length ? renderOptionItems() : null}
    </div>
  );
};

export const Autocomplete = forwardRef(AutocompleteComponent) as <
  T extends string | number
>(
  props: AutocompleteProps<T> & { ref?: Ref<HTMLUListElement> }
) => ReturnType<typeof AutocompleteComponent>;
