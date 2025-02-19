import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { Roboto } from "next/font/google";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/styles/theme";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import NotificationSnackbar from "@/components/NotificationSnackbar";
import "@fontsource/poppins";
import "@fontsource/outfit";

export const metadata: Metadata = {
  title: "EduStream",
  description: "An educational video sharing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <NotificationProvider>
              <AuthProvider>
                <Navbar />
                {children}
                <NotificationSnackbar />
              </AuthProvider>
            </NotificationProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
