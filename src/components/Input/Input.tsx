"use client";

import type { BaseComponentProps, NameValueObject } from "@/types";
import { isEmail } from "@/utils";
import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "../Button/Button";
import { Icon, type IconType } from "../Icon/Icon";
import { Autocomplete, Option } from "../Autocomplete/Autocomplete";
import { OnBlurDetector } from "../OnBlurDetector/OnBlurDetector";

export interface InputProps<T> extends BaseComponentProps {
  disabled?: boolean;
  icon?: IconType;
  label?: string;
  name: string;
  onClear?: () => Promise<void> | void;
  onFocus?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: NameValueObject<T>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  items?: Array<Option<T> | null | undefined>;
  showValidationMessage?: boolean;
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  value?: string;
  withClearButton?: boolean;
}

const getInputStyle = (hasError: boolean, disabled: boolean) => {
  if (hasError) {
    return "border-alert-500 bg-alert-50 dark:border-alert-400 dark:bg-alert-900";
  } else if (disabled) {
    return "border-primary-300";
  } else {
    return "border-primary-950 dark:border-primary-300 placeholder-gray-300";
  }
};

export const Input = <T extends string>({
  "data-testid": testId = "input",
  disabled = false,
  icon,
  label,
  name,
  onClear,
  onFocus,
  onChange,
  onSelect,
  items,
  onKeyDown,
  placeholder,
  required = false,
  showValidationMessage = false,
  type = "text",
  value = "",
  withClearButton = false,
}: InputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isOpen, setIsOpen] = useState(Boolean(items?.length));

  const autocompleteRef = useRef<any | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setTouched(true);
    const value = event.target.value;

    if (required && !value) {
      setHasError(true);
    } else if (type === "email" && value && !isEmail(value)) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event);
    const value = event.target.value;
    setInputValue(value);
    setHasError(false);

    if (items?.length) {
      setIsOpen(true);
    }

    const isTextInputError = required && value === "";
    const isEmailInputError = type === "email" && value && !isEmail(value);

    if (touched && (isTextInputError || isEmailInputError)) {
      setHasError(true);
    }
  };

  const handleClear = () => {
    setHasError(false);
    setTouched(false);
    setIsOpen(false);
    onClear ? onClear() : setInputValue("");
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    setIsOpen(Boolean(items?.length));
  }, [items]);

  const paddingLeft = icon ? "pl-10" : "pl-4";
  const paddingRight = withClearButton ? "pr-10" : "pr-4";
  const focusStyle = isFocused
    ? "focus:ring-1 focus:ring-primary-950 focus:border-primary-950 dark:focus:ring-primary-50 dark:focus:border-primary-50"
    : "";
  const disabledStyle = disabled
    ? "bg-primary-100 text-primary-300 cursor-not-allowed"
    : "";

  const inputClasses = `w-full min-w-20 ${paddingLeft} ${paddingRight} dark:bg-primary-950 dark:text-primary-0 h-10 border rounded-lg focus:outline-none
  ${getInputStyle(hasError, disabled)}
  ${focusStyle}
  ${disabledStyle}
`;

  const handleSelect = (option: NameValueObject<T>) => {
    setInputValue(option.name);
    onSelect && onSelect(option);
  };

  const iconStyles = "absolute top-1/2 left-3 transform -translate-y-1/2";
  const buttonStyles =
    "absolute top-1/2 right-1 transform -translate-y-1/2 mr-2";

  const inputIcon = icon && (
    <Icon
      className={iconStyles}
      connotation="primary"
      customSize={20}
      data-testid={`icon-${icon}`}
      type={icon}
    />
  );

  return (
    <OnBlurDetector onBlur={() => {}}>
      <div className="mx-px">
        {label ? (
          <label
            className="dark:text-primary-0"
            data-testid={`label-${testId}`}
          >
            {label}
          </label>
        ) : null}
        <div className="relative mt-0.5">
          {inputIcon}
          <input
            className={inputClasses}
            data-testid={testId}
            disabled={disabled}
            name={name}
            autoComplete={items ? "off" : "on"}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            type={type}
            value={inputValue}
          />
          {withClearButton && (
            <Button
              aria-label="Clear input"
              className={buttonStyles}
              data-testid="clear-search-input"
              icon="close-line"
              onClick={handleClear}
              size="condensed"
            />
          )}
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

        {items?.length && onSelect ? (
          <Autocomplete
            ref={autocompleteRef}
            isOpen={isOpen}
            onOpen={setIsOpen}
            onSelect={handleSelect}
            items={items}
          />
        ) : null}
      </div>
    </OnBlurDetector>
  );
};
