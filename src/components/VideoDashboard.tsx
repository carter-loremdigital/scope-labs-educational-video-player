"use client";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import VideoCard from "@/components/VideoCard";
import { testData } from "@/data/videos";

export type Video = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
};

export default function VideoDashboard({ videos }: { videos: Video[] }) {
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
        {!videos.length && (
          <Typography variant="body1" color="text.secondary">
            You don't have any videos yet. Upload to get started!
          </Typography>
        )}
        {videos.map((video: any) => (
          <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
