"use client";
import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import Hero from "@/components/Hero";

const Home = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();

  // Conditionally render Hero or Video Dasboard based on auth state
  return <>{userId ? children : <Hero />}</>;
};

export default Home;
