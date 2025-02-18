"use client";
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentSection from "./CommentSection";
import { Box, Typography } from "@mui/material";

// Reusable comment type
export type CommentType = {
  id: string;
  content: string;
  user_id: string;
  video_id: string;
  created_at: string;
};

const CommentContainer = ({ videoId }: { videoId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch comments from the API - pass to CommentForm for refetching
  const fetchComments = async (showLoading: boolean = false) => {
    // Show loading state on initial fetch
    if (showLoading) {
      setLoading(true);
    }
    try {
      // Make API request for comments
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos/comments?video_id=${videoId}`
      );

      // Catch API errors
      if (!res.ok) throw new Error("Failed to fetch comments");

      // Extract comments from API response & update state
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      // Log error message
      console.error("Error fetching comments:", error);
    } finally {
      // Reset loading state
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Initial fetch on mount (with loading state)
  useEffect(() => {
    fetchComments(true);
  }, [videoId]);

  // Pass to CommentForm for subsequent refreshes
  const refetchComments = async () => {
    // Hide loading state when refetching comments in the background
    fetchComments(false);
  };

  return (
    <Box>
      <Typography variant="h5" component="h2">
        Comments ({comments.length})
      </Typography>
      <CommentForm videoId={videoId} refetch={refetchComments} />
      <CommentSection comments={comments} loading={loading} />
    </Box>
  );
};

export default CommentContainer;
