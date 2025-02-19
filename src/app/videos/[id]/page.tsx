import { Container, Typography, Stack, Divider } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import VideoPlayer from "@/components/VideoPlayer";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommentContainer from "@/components/CommentContainer";
import VideoDetails from "@/components/VideoDetails";

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
          {/* Display video details with edit functionality */}
          <VideoDetails
            userId={video.user_id}
            title={video.title}
            description={video.description}
            videoId={video.id}
            createdAt={video.created_at}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        {/* Display comments */}
        <CommentContainer videoId={id} />
      </ProtectedRoute>
    </Container>
  );
};

export default Video;
