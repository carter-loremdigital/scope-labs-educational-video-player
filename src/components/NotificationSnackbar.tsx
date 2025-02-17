"use client";
import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useNotification } from "@/context/NotificationContext";

export default function NotificationSnackbar() {
  const { notification, clearNotification } = useNotification();
  const open = Boolean(notification);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, clearNotification]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={clearNotification}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {notification ? (
        <Alert
          onClose={clearNotification}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
