import { NotificationsContext } from "@/context/NotificationsContext";
import { CONNOTATIONS } from "@/types";
import { useCallback, useContext } from "react";

interface Options {
  header?: string;
}

const defaultHeaders = {
  [CONNOTATIONS.announcement]: "Announcement!",
  [CONNOTATIONS.success]: "Success!",
  [CONNOTATIONS.alert]: "Error!",
  [CONNOTATIONS.primary]: "",
  [CONNOTATIONS.info]: "",
  [CONNOTATIONS.cta]: "Announcement!",
  [CONNOTATIONS.warning]: "Warning!",
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error("Notifications context is missing");
  }

  const { notifications, newNotification, removeNotification } = context;

  const showNotification = useCallback(
    (type: CONNOTATIONS, message: string, header?: string) => {
      newNotification({
        header: header ?? defaultHeaders[type],
        message,
        type,
      });
    },
    [newNotification]
  );

  const dismissNotification = useCallback(
    (id: string) => removeNotification(id),
    [removeNotification]
  );

  const showSuccess = useCallback(
    (message: string, options?: Options) =>
      showNotification(CONNOTATIONS.success, message, options?.header),
    [showNotification]
  );

  const showError = useCallback(
    (message: string, options?: Options) =>
      showNotification(CONNOTATIONS.alert, message, options?.header),
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, options?: Options) =>
      showNotification(CONNOTATIONS.warning, message, options?.header),
    [showNotification]
  );

  return {
    dismissNotification,
    showError,
    showSuccess,
    showWarning,
    notifications,
  };
};
