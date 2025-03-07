import { Container, Stack, Divider } from "@mui/material";
import VideoPlayer from "@/components/VideoPlayer";
import ProtectedRoute from "@/components/ProtectedRoute";
import CommentContainer from "@/components/CommentContainer";
import VideoDetails from "@/components/VideoDetails";
import { Video } from "@/components/VideoDashboard";
import BackLink from "@/components/BackLink";

const VideoPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Get video ID from URL params
  const id = (await params).id;

  // Fetch video data from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/single?video_id=${id}`
  );
  const data = await res.json();
  const video: Video = data.video;

  return (
    <ProtectedRoute>
      <Container
        maxWidth="md"
        sx={{
          p: 4,
        }}
      >
        <BackLink text="Back to Videos" href="/" />

        {/* Video player */}
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
      </Container>
    </ProtectedRoute>
  );
};

export default VideoPage;
