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
  // Update localStorage immediately in setUser
  const setUser = (firstName: string, lastName: string) => {
    setFirstName(firstName);
    setLastName(lastName);
    const computedUserId = `${firstName.trim().toLowerCase()}_${lastName
      .trim()
      .toLowerCase()}`;
    setUserId(computedUserId);
    localStorage.setItem(
      "authData",
      JSON.stringify({ firstName, lastName, userId: computedUserId })
    );
    setNotification({
      message: `Logged in as ${computedUserId}`,
      severity: "success",
    });
  };

  // logout function clears global auth state
  // Clear state and localStorage immediately in logout
  const logout = () => {
    setFirstName("");
    setLastName("");
    setUserId("");
    localStorage.removeItem("authData");
    setNotification({
      message: "Logged out successfully.",
      severity: "success",
    });
    router.push("/"); // Redirect user to home page after logout
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
