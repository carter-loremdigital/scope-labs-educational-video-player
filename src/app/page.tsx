import Home from "@/components/Home";
import VideoDashboard from "@/components/VideoDashboard";

export default function HomePage() {
  return (
    <Home>
      {/* Pass video dashboard (server component) to Home (client component) for conditional rendering */}
      <VideoDashboard />
    </Home>
  );
}
