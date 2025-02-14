"use client";

import { Notification } from "../../components/Notification/Notification";
import { useNotifications } from "@/hooks/useNotifications";

export const NotificationsTicker = () => {
  const { dismissNotification, notifications } = useNotifications();

  return notifications.map(({ header, id, message, type }, index) => (
    <Notification
      connotation={type}
      data-testid={`Notification-${type}`}
      dismissible
      header={header}
      index={index}
      key={id}
      message={message}
      onClose={() => dismissNotification(id)}
      open={Boolean(id)}
    />
  ));
};
