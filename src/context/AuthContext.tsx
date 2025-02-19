"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationContext";

// TS type for Auth Context
interface AuthContextType {
  firstName: string;
  lastName: string;
  userId: string;
  // Need to use isInitialized to prevent redirecting authenticated users before context has loaded
  isInitialized: boolean;
  setUser: (firstName: string, lastName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setNotification } = useNotification();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();

  // Store auth data in localStorage (not suitable for production but works for our app)
  // localStorage allows us to maintain login state across hot reloads and full refreshes
  // On mount, retrieve auth state from local storage if available
  useEffect(() => {
    const storedAuth = localStorage.getItem("authData");
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        setFirstName(parsed.firstName || "");
        setLastName(parsed.lastName || "");
        setUserId(parsed.userId || "");
      } catch (error) {
        console.error("Failed to parse authData from localStorage", error);
      }
    }
    setIsInitialized(true); // Update isInitialized to trigger redirection (or not) after loading auth state
  }, []);

  // When auth state changes, update local storage
  useEffect(() => {
    if (firstName && lastName && userId) {
      localStorage.setItem(
        "authData",
        JSON.stringify({ firstName, lastName, userId })
      );
    } else {
      localStorage.removeItem("authData"); // Clear local storage if user data is empty (i.e. logged out)
    }
  }, [firstName, lastName, userId]);

  // setUser function to set global auth state
  // Set cookie and update localStorage immediately in setUser
  const setUser = async (firstName: string, lastName: string) => {
    const computedUserId = `${firstName.trim().toLowerCase()}_${lastName
      .trim()
      .toLowerCase()}`;

    try {
      // Set authentication cookie
      // We need this to access the user's ID in server components
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: computedUserId }),
      });

      // Catch API errors
      if (!res.ok) {
        throw new Error("Login failed");
      }

      // If setting cookie succeeds, set client auth state (logged in)
      setFirstName(firstName);
      setLastName(lastName);
      setUserId(computedUserId);
      localStorage.setItem(
        "authData",
        JSON.stringify({ firstName, lastName, userId: computedUserId })
      );

      // Display login success notification
      setNotification({
        message: `Logged in as ${computedUserId}`,
        severity: "success",
      });
    } catch (error) {
      // Log error & display login error message
      console.error("Login API error:", error);
      setNotification({ message: "Login API error", severity: "error" });
    }
  };

  // logout function clears global auth state
  // Clear cookies, state, and localStorage immediately in logout
  const logout = async () => {
    try {
      // Remove authentication cookie
      const res = await fetch("/api/logout", {
        method: "POST",
      });

      // Catch API errors
      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // If removing cookie succeeds, set client auth state (logged out)
      setFirstName("");
      setLastName("");
      setUserId("");
      localStorage.removeItem("authData");

      setNotification({
        message: "Logged out successfully.",
        severity: "success",
      });
      router.push("/"); // Redirect user to home page after logout
    } catch (error) {
      console.error("Logout API error:", error);
      setNotification({ message: "Logout API error", severity: "error" });
    }
  };

  return (
    <AuthContext.Provider
      value={{ firstName, lastName, userId, isInitialized, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access context in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
