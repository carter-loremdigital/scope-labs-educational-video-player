import { Container, Typography, Stack, Divider } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import VideoPlayer from "@/components/VideoPlayer";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommentContainer from "@/components/CommentContainer";

export type Video = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
};

const Video = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Get video ID from URL params
  const id = (await params).id;

  // Fetch video data from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/single?video_id=${id}`
  );
  const data = await res.json();
  const video: Video = data.video;

  return (
    <Container
      maxWidth="md"
      sx={{
        p: 4,
      }}
    >
      <ProtectedRoute>
        <VideoPlayer video={video} />

        <Stack
          sx={{
            mt: 2,
          }}
          spacing={1}
        >
          <Typography variant="h4" component="h1">
            {video.title}
          </Typography>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <PersonOutline />
            <Typography variant="body1">{video.user_id}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {video.description}
          </Typography>
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Display comments */}
        <CommentContainer videoId={id} />
      </ProtectedRoute>
    </Container>
  );
};

export default Video;
