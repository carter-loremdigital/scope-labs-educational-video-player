"use client";
import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { containsProfanity } from "@/utils/profanityFilter";

type CommentFormProps = {
  videoId: string;
  refetch: () => Promise<void>;
};

const CommentForm = ({ videoId, refetch }: CommentFormProps) => {
  const { userId } = useAuth(); // Retrieve user_id from context
  const { setNotification } = useNotification(); // Use global notifications

  // Comment and error state variables
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({ comment: false, profanity: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check comment for content and profanity
    const commentError = comment.trim() === "";
    const profanityError = containsProfanity(comment);
    setErrors({ comment: commentError, profanity: profanityError });

    // Immediately exit if there are comment validation errors
    if (commentError || profanityError) {
      setNotification({
        message: "Please fix the errors in your comment.",
        severity: "error",
      });
      return;
    }

    try {
      // Post comment to API endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            video_id: videoId,
            content: comment,
            user_id: userId,
          }),
        }
      );

      // Catch errors from API
      if (!response.ok) {
        throw new Error("Failed to post comment.");
      }

      // Set success notification
      setNotification({
        message: "Comment posted successfully!",
        severity: "success",
      });

      // Trigger refresh of updated comments in the background
      refetch();
    } catch (error) {
      // Log error message
      console.error("Error posting comment:", error);

      // Show error notification
      setNotification({
        message:
          "An error occurred while posting your comment. Please try again.",
        severity: "error",
      });
    } finally {
      // Clear comment input
      setComment("");
    }
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit} my={2}>
      <TextField
        label="Write a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        error={errors.comment || errors.profanity}
        helperText={
          errors.comment
            ? "Your comment cannot be empty"
            : errors.profanity
            ? "Please avoid using inappropriate words"
            : ""
        }
        multiline
        rows={3}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          maxWidth: { xs: "initial", sm: "max-content" },
          alignSelf: { xs: "initial", sm: "end" },
        }}
      >
        Post
      </Button>
    </Stack>
  );
};

export default CommentForm;
