"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import type { CONNOTATIONS } from "@/types";
import { nanoid } from "nanoid";

interface NotificationPayload {
  header?: string;
  message: string;
  type: CONNOTATIONS;
}

export interface Notification extends NotificationPayload {
  id: string;
}

interface NotificationsState {
  notifications: Notification[];
}

interface NotificationsContextType extends NotificationsState {
  newNotification: (payload: NotificationPayload) => void;
  removeNotification: (id: string) => void;
  reset: () => void;
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsReducer = (
  state: NotificationsState,
  action: { type: string; payload?: any }
): NotificationsState => {
  switch (action.type) {
    case "NEW_NOTIFICATION": {
      const newNotification: Notification = {
        header: action.payload.header ?? "",
        id: `${action.payload.type}-${nanoid()}`,
        message: action.payload.message,
        type: action.payload.type,
      };

      const exists = state.notifications.some(
        (notification) =>
          notification.message === newNotification.message &&
          notification.type === newNotification.type &&
          notification.header === newNotification.header
      );

      return exists
        ? state
        : { notifications: [...state.notifications, newNotification] };
    }

    case "REMOVE_NOTIFICATION":
      return {
        notifications: state.notifications.filter(
          ({ id }) => id !== action.payload
        ),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

export const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(notificationsReducer, initialState);

  const newNotification = (payload: NotificationPayload) =>
    dispatch({ type: "NEW_NOTIFICATION", payload });

  const removeNotification = (id: string) =>
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });

  const reset = () => dispatch({ type: "RESET" });

  return (
    <NotificationsContext.Provider
      value={{ ...state, newNotification, removeNotification, reset }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
