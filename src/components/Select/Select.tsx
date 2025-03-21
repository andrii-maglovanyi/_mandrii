"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import type { BaseComponentProps, NameValueObject } from "@/types";
import { isNotEmpty, toNameValueObject } from "@/utils";
import { getDropdownVerticalPosition } from "@/utils";

import { Autocomplete, Option } from "../Autocomplete/Autocomplete";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import { OnBlurDetector } from "../OnBlurDetector/OnBlurDetector";

export interface SelectProps<T> extends BaseComponentProps {
  defaultValue?: Option<T>;
  disabled?: boolean;
  emptyOption?: boolean;
  emptyOptionLabel?: string;
  emptyOptionValue?: T;
  items: Array<Option<T> | null | undefined>;
  label?: string;
  name?: string;
  onChange?: (value: NameValueObject<T>) => void;
  required?: boolean;
  width?: string | number;
}

export const itemStyles = ` p-3 flex items-center cursor-pointer whitespace-nowrap select-none relative mx-1 hover:bg-primary-50 focus:outline-hidden focus:bg-primary-50 
    dark:hover:bg-primary-900 dark:focus:bg-primary-900 rounded-md `;

export const Select = <T extends string | number>({
  className,
  "data-testid": testId = "select",
  defaultValue,
  disabled,
  emptyOption,
  emptyOptionLabel = "All items",
  emptyOptionValue = "" as T,
  items,
  label,
  name,
  onChange,
  required,
  width,
}: SelectProps<T>) => {
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const toggleSelect = () => {
    setIsOpen(!isOpen);
    setTouched(true);
  };
  const groupRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown } = useKeyboardNavigation(groupRef.current);

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
      return toNameValueObject(defaultValue).value;
    }

    return options[0]?.value;
  }, [defaultValue, options]);

  const [selectedOption, setSelectedOption] = useState(getPreselectedValue());

  useEffect(() => {
    if (defaultValue) {
      setSelectedOption(toNameValueObject(defaultValue).value);
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

  useEffect(() => {
    if (touched && required && defaultValue === emptyOptionValue) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [emptyOptionValue, required, defaultValue, touched]);

  const borderStyles = hasError
    ? "border-alert-500 bg-alert-50 dark:border-alert-400 dark:bg-alert-900"
    : "border-primary-950 dark:border-primary-0";

  const buttonStyles = `justify-start w-full truncate relative overflow-x-hidden
   pl-4 pr-10 h-10 mt-0.5 bg-primary-0 dark:bg-primary-950/50 dark:text-primary-0 
   text-left ${borderStyles} border hover:bg-primary-0 dark:hover:bg-primary-1000 rounded-md 
   focus:outline-hidden active:bg-primary-0 dark:active:bg-primary-1000
  ${
    disabled &&
    "disabled:border-primary-300 disabled:bg-primary-100 dark:disabled:bg-primary-900 disabled:border-primary-300 dark:disabled:border-primary-600"
  }
  ${
    isOpen
      ? "focus:ring-1 focus:ring-primary-950 dark:focus:ring-white focus:border-primary-950 dark:focus:border-primary-0"
      : ""
  }`;
  const chevronIconStyles = `absolute top-1/2 right-3 transform -translate-y-1/2 transition duration-200 ${
    isOpen ? "rotate-180" : ""
  }`;

  return (
    <OnBlurDetector onBlur={() => setIsOpen(false)}>
      <div
        className="relative mx-px inline-block w-auto"
        data-testid={testId}
        ref={containerRef}
        style={{ width: width ?? "auto" }}
      >
        {label ? (
          <label
            className={`
              dark:text-primary-0
              inline-block text-nowrap
            `}
            data-testid={`${testId}-label`}
          >
            {label} {required && <span className="sr-only">*</span>}
          </label>
        ) : null}
        <Button
          className={[buttonStyles, className].join(" ")}
          data-testid={`${testId}-button`}
          disabled={disabled}
          name={name}
          onClick={toggleSelect}
          onKeyDown={(e) => handleKeyDown(e, toggleSelect)}
          type="button"
        >
          <span className="mr-1 grow truncate">
            {options?.find(({ value }) => value === selectedOption)?.name ??
              "-"}
          </span>
          <Icon
            className={chevronIconStyles}
            size="small"
            type="chevron-down-line"
          />
        </Button>

        <Autocomplete
          onSelect={onChange}
          items={options}
          isOpen={isOpen}
          onOpen={setIsOpen}
        />
      </div>
    </OnBlurDetector>
  );
};
