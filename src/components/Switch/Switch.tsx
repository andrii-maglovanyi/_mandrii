"use client";

import React, { useEffect, useState } from "react";

import { BaseComponentProps } from "@/types";

import { Sizes } from "../types";

export interface SwitchProps extends BaseComponentProps {
  checked?: boolean;
  label?: string;
  name?: string;
  onChange?: (value: boolean) => void;
  size?: Exclude<Sizes, "expanded" | "super-condensed">;
}

const sizeStyles = {
  condensed: "w-9 h-5",
  normal: "w-14 h-8",
};

const bulletSizeStyles = {
  condensed: "w-3 h-3 peer-checked:translate-x-4",
  normal: "w-6 h-6 peer-checked:translate-x-6",
};

export const Switch = ({
  checked = false,
  "data-testid": testId = "switch",
  label,
  name = "switch",
  onChange,
  size = "normal",
}: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setIsChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <div className="flex items-center">
      <label
        className={`
          group relative flex cursor-pointer flex-nowrap
          ${sizeStyles[size]}
        `}
        data-testid={`${testId}-label`}
        htmlFor={`checkbox-${name}`}
      >
        <input
          checked={isChecked}
          className="peer sr-only"
          data-testid={testId}
          id={`checkbox-${name}`}
          name={name ?? "switch"}
          onChange={handleChange}
          type="checkbox"
        />
        <span
          className={`
            border-primary-500 bg-primary-0 block h-full w-full rounded-full
            border transition-all
            dark:border-primary-400 dark:bg-primary-1000
            dark:group-hover:border-primary-200
            dark:peer-checked:border-primary-0 dark:peer-checked:bg-primary-0
            dark:group-hover:peer-checked:border-primary-100
            dark:group-hover:peer-checked:bg-primary-100
            group-hover:border-primary-700
            group-hover:peer-checked:border-primary-700
            group-hover:peer-checked:bg-primary-700
            peer-checked:border-primary-800 peer-checked:bg-primary-800
          `}
        ></span>
        <span
          className={`
            bg-primary-500 absolute top-1 left-1 rounded-full
            transition-transform
            dark:bg-primary-400 dark:group-hover:bg-primary-200
            dark:peer-checked:bg-primary-800
            group-hover:bg-primary-700
            peer-checked:bg-primary-100
            ${bulletSizeStyles[size]}
          `}
        ></span>
      </label>
      {label && (
        <span
          className={`
            text-primary-700 ml-3 text-sm text-nowrap
            dark:text-primary-0
          `}
        >
          {label}
        </span>
      )}
    </div>
  );
};
