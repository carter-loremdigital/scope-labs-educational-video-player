import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import VideoCard from "@/components/VideoCard";
import { testData } from "@/data/videos";

// type Props = {};

export default async function VideoDashboard() {
  // Replace the following with your actual API call.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos?user_id=carter_wein`
  );
  const { videos } = await res.json(); // Assuming this returns an array of video objects
  // const { videos } = testData;

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Videos
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "stretch",
        }}
      >
        {videos.map((video: any) => (
          <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
