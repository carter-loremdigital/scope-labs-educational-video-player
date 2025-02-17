"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Component for protecting pages from unauthenticated users
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { userId, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !userId) {
      router.push("/login");
    }
  }, [isInitialized, userId, router]);

  if (!isInitialized || !userId) {
    // While loading or if not authenticated, return null or a loading indicator
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
