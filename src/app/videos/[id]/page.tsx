import {
  Container,
  Typography,
  Stack,
  Box,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import VideoPlayer from "@/components/VideoPlayer";
import ProtectedRoute from "@/components/ProtectedRoute";

const Video = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/videos/single?video_id=${id}`
  );
  const { video } = await res.json();

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
        <Stack spacing={2}>
          <Typography variant="h5" component="h2">
            Comments
          </Typography>
          <TextField label="Write a comment" multiline rows={3} />
          <Button
            variant="contained"
            sx={{
              maxWidth: { xs: "initial", sm: "max-content" },
              alignSelf: { xs: "initial", sm: "end" },
            }}
          >
            Post
          </Button>
        </Stack>
      </ProtectedRoute>
    </Container>
  );
};

export default Video;
