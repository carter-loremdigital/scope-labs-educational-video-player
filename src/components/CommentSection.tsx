"use client"; // Make this a client component for added responsiveness (no need to refetch HTML from server)
import { CommentType } from "./CommentContainer";
import { Divider, Skeleton, Stack, Typography } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import { timeAgo } from "@/utils/timestamps";

// Skeleton for loading a comment
const CommentSkeleton = () => {
  return (
    <Stack>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" />
      </Stack>
    </Stack>
  );
};

// Display loaded comment and its content
const Comment = ({
  userId,
  content,
  createdAt,
}: {
  userId: string;
  content: string;
  createdAt: string;
}) => {
  return (
    <Stack>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack direction="row" alignItems="center" gap={0.5}>
            <PersonOutline />
            <Typography>{userId}</Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {timeAgo(createdAt)}
          </Typography>
        </Stack>
        <Typography>{content}</Typography>
      </Stack>
    </Stack>
  );
};

const CommentSection = ({
  comments,
  loading,
}: {
  comments: CommentType[];
  loading: boolean;
}) => {
  // Render comment skeletons
  if (loading) {
    return (
      <Stack>
        {[...Array(5)].map((_, index) => (
          <CommentSkeleton key={index} />
        ))}
      </Stack>
    );
  }

  return (
    <>
      {comments.map((comment: CommentType) => (
        <Comment
          key={comment.id}
          userId={comment.user_id}
          content={comment.content}
          createdAt={comment.created_at}
        />
      ))}
      <Divider sx={{ my: 2 }} />
    </>
  );
};

export default CommentSection;
