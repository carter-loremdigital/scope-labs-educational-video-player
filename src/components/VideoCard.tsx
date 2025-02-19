// src/components/VideoCard.tsx
import {
  AccountCircleOutlined,
  ChatBubbleOutline,
  Circle,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link as MUILink,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { timeAgo } from "@/utils/timestamps";
import { Video } from "./VideoDashboard";

const VideoCard = ({ video }: { video: Video }) => {
  // const thumbnail = video.video_url.includes("www.youtube.com") ? `http://i3.ytimg.com/vi/erLk59H86ww/hqdefault.jpg` : "";

  // Supports YouTube, Vimeo, and DailyMotion thumbnails w/ fallback thumbnail image
  let thumbnailUrl;

  // Get YouTube thumbnail
  if (video.video_url.includes("https://www.youtube.com")) {
    const videoId = video.video_url.split("=")[1];
    thumbnailUrl = `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    // Get Vimeo Thumbnail (provided by https://vumbnail.com/)
  } else if (video.video_url.includes("https://vimeo.com")) {
    const videoId = video.video_url.split("/").pop();
    thumbnailUrl = `https://vumbnail.com/${videoId}.jpg`;

    // Get DailyMotion thumbnail
  } else if (video.video_url.includes("https://www.dailymotion.com")) {
    const videoId = video.video_url.split("/").pop();
    thumbnailUrl = `https://www.dailymotion.com/thumbnail/video/${videoId}`;
  } else {
    // Default to EduStream thumbnail image
    thumbnailUrl = "/thumbnail.svg";
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
              WebkitLineClamp: 2, // Limit to 2 lines
              WebkitBoxOrient: "vertical",
            }}
          >
            {video.title}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            color="text.secondary"
            mb={1}
          >
            <Stack direction="row" alignItems="center" gap={0.5}>
              <AccountCircleOutlined fontSize="small" />
              <Typography variant="body2">{video.user_id}</Typography>
            </Stack>

            <Circle sx={{ width: "4px", height: "4px" }} />

            <Typography variant="body2">{timeAgo(video.created_at)}</Typography>

            <Circle sx={{ width: "4px", height: "4px" }} />

            <Stack direction="row" alignItems="center" gap={0.5}>
              <ChatBubbleOutline fontSize="small" />
              <Typography variant="body2">{video.num_comments}</Typography>
            </Stack>
          </Stack>
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
