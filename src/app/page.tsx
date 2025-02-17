"use client";

import Hero from "@/components/Hero";
import VideoDashboard from "@/components/VideoDashboard";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { userId } = useAuth();

  return <>{userId ? <VideoDashboard /> : <Hero />}</>;
}
