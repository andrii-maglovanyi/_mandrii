"use client";

import type { BaseComponentProps } from "@/types";
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useState,
} from "react";

import { Icon } from "../Icon/Icon";

export interface TextareaProps extends BaseComponentProps {
  disabled?: boolean;
  label?: string;
  name: string;
  onInput?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  showValidationMessage?: boolean;
  value?: string;
}

const getTextareaStyle = (hasError: boolean, disabled: boolean) => {
  if (hasError) {
    return "border-alert-500 bg-alert-50 dark:border-alert-400 dark:bg-alert-900";
  } else if (disabled) {
    return "border-primary-300";
  } else {
    return "border-primary-950 dark:border-primary-300 placeholder-gray-300";
  }
};

export const Textarea = ({
  "data-testid": testId = "textarea",
  disabled = false,
  label,
  name,
  onInput,
  onKeyDown,
  placeholder,
  required = false,
  rows = 3,
  showValidationMessage = false,
  value = "",
}: TextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    setTouched(true);
    const value = event.target.value;

    if (required && !value) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onInput && onInput(event);
    const value = event.target.value;
    setInputValue(value);
    setHasError(false);

    if (touched && required && value === "") {
      setHasError(true);
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const focusStyle = isFocused
    ? "focus:ring-1 focus:ring-primary-950 focus:border-primary-950 dark:focus:ring-primary-50 dark:focus:border-primary-50"
    : "";
  const disabledStyle = disabled
    ? "bg-primary-100 text-primary-300 cursor-not-allowed"
    : "";

  const textareaClasses = `w-full min-w-20 px-4 py-2 dark:bg-primary-950 dark:text-primary-0 border rounded-lg focus:outline-none
  ${getTextareaStyle(hasError, disabled)}
  ${focusStyle}
  ${disabledStyle}
`;

  return (
    <div className="mx-px">
      {label ? (
        <label className="dark:text-primary-0" data-testid={`label-${testId}`}>
          {label}
        </label>
      ) : null}
      <div className="relative mt-0.5">
        <textarea
          className={textareaClasses}
          data-testid={testId}
          disabled={disabled}
          name={name}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={rows}
          value={inputValue}
        />
      </div>

      {showValidationMessage && (
        <p
          className={`
            mt-1 flex h-5 items-center

            dark:text-primary-0
          `}
        >
          {hasError && (
            <>
              <Icon
                className="mr-1 fill-alert-500"
                size="small"
                type="info-line"
              />
              {label} is required
            </>
          )}
        </p>
      )}
    </div>
  );
};
