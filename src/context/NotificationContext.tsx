"use client";
import { createContext, useState, useContext, ReactNode } from "react";

// TS types for notifications managed by React Context
export type NotificationSeverity = "success" | "error" | "warning" | "info";

interface Notification {
  message: string;
  severity: NotificationSeverity;
}

interface NotificationContextType {
  notification: Notification | null;
  setNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// Notification provider to wrap entire app
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotificationState] = useState<Notification | null>(
    null
  );

  // setNotification sets the notification in global state
  const setNotification = (notification: Notification) => {
    setNotificationState(notification);
  };

  // clearNotification resets notification state
  const clearNotification = () => {
    setNotificationState(null);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom notification hook for using notifications throughout the app
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
