// src/components/VideoCard.tsx
import {
  AccessTimeOutlined,
  CommentOutlined,
  PersonOutline,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Link as MUILink,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { timeAgo } from "@/utils/timestamps";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
}

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  // const thumbnail = video.video_url.includes("www.youtube.com") ? `http://i3.ytimg.com/vi/erLk59H86ww/hqdefault.jpg` : "";

  var thumbnailUrl = "";
  if (video.video_url.includes("https://www.youtube.com")) {
    const videoId = video.video_url.split("=")[1];
    thumbnailUrl = `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  return (
    <MUILink
      component={Link}
      href={`/videos/${video.id}`}
      sx={{
        textDecoration: "inherit",
      }}
      passHref
    >
      <Card
        sx={{
          height: "100%",
        }}
      >
        {thumbnailUrl && (
          <CardMedia
            component="img"
            height="200"
            image={thumbnailUrl}
            alt={video.title}
          />
        )}
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            // gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2, // Limit to 6 lines
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 1,
            }}
            color="text.secondary"
          >
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PersonOutline />
              <Typography variant="body2">{video.user_id}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={0.5}>
              <CommentOutlined />
              <Typography variant="body2">{video.num_comments}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" gap={0.5}>
              <AccessTimeOutlined />
              <Typography variant="body2">
                {timeAgo(video.created_at)}
              </Typography>
            </Stack>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3, // Limit to 3 lines
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.description}
          </Typography>
        </CardContent>
      </Card>
    </MUILink>
  );
};

export default VideoCard;
