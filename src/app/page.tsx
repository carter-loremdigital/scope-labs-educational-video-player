import { cookies } from "next/headers";
import VideoDashboard from "@/components/VideoDashboard";
import Hero from "@/components/Hero";

export default async function HomePage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("authToken");
  let userId: string | null = null;

  let videos;
  if (authCookie) {
    // Since we're storing a plain string userId, we can use the value directly
    userId = authCookie.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/videos?user_id=${userId}`
    );
    const data = await res.json();
    videos = data.videos; // Get videos array from response data & pass as props
  }

  return <>{userId ? <VideoDashboard videos={videos} /> : <Hero />}</>;
}
