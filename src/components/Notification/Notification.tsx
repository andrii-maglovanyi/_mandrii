"use client";

import {
  type BaseComponentProps,
  CONNOTATIONS,
  type Connotations,
} from "@/types";
import { memo, useEffect } from "react";

import { Button } from "../Button/Button";
import { Icon, type IconType } from "../Icon/Icon";

interface SnackbarElementProps extends BaseComponentProps {
  index?: number;
}

export interface SnackbarProps extends SnackbarElementProps {
  connotation?: Connotations;
  dismissible?: boolean;
  header?: string;
  icon?: IconType;
  message: string;
  onClose: () => void;
  open?: boolean;
}

const calculateDisplayTime = (message: string) => {
  const words = message.split(" ").length;
  const timePerWord = 1000; // milliseconds

  return Math.min(Math.max(words * timePerWord, 5000), 15000);
};

export const Notification = memo(function Snackbar({
  connotation = "primary",
  "data-testid": testId = "snackbar",
  dismissible = false,
  header,
  icon,
  index = 0,
  message,
  onClose,
  open = false,
}: SnackbarProps) {
  const SNACKBAR_HEIGHT = header ? 75 : 50; // px
  useEffect(() => {
    setTimeout(onClose, calculateDisplayTime(message));
  }, [message, onClose]);

  const onClick = (event: React.SyntheticEvent<Element, Event>) => {
    event.stopPropagation();
    onClose();
  };

  const iconStyles = `mr-4 ${
    connotation === CONNOTATIONS.primary
      ? "fill-primary-0 dark:fill-primary-1000"
      : ""
  }`;

  const snackbarIcon = icon && (
    <Icon
      className={iconStyles}
      connotation={connotation}
      data-testid={`icon-${icon}`}
      type={icon}
    />
  );

  return (
    open && (
      <div
        className={`
          fixed bottom-4 left-0 right-0 z-50 mx-auto flex max-w-[90%] transform
          items-center justify-between rounded-lg bg-primary-1000 p-4
          text-primary-0 drop-shadow-base transition-transform

          dark:bg-primary-50 dark:text-primary-1000
        `}
        data-testid={testId}
        style={{
          height: `${SNACKBAR_HEIGHT}px`,
          transform: `translateY(${-index / 2 - index * SNACKBAR_HEIGHT}px)`,
        }}
      >
        {snackbarIcon}
        <div>
          {header ? (
            <div className="mb-1 font-semibold text-lg">{header}</div>
          ) : null}
          <div className="truncate">{message}</div>
        </div>
        {dismissible && (
          <div className="ml-4 border-l border-primary-200 pl-2">
            <Button
              className={`
                fill-primary-50

                active:bg-primary-800

                dark:fill-primary-1000 dark:hover:bg-transparent
                dark:active:bg-primary-100

                hover:bg-transparent
              `}
              data-testid="snackbar-button"
              icon="close-line"
              onClick={onClick}
              size="condensed"
            />
          </div>
        )}
      </div>
    )
  );
});
