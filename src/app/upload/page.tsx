"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { containsProfanity } from "@/utils/profanityFilter";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import BackLink from "@/components/BackLink";

export default function UploadPage() {
  const { userId } = useAuth(); // Retrieve user_id from context
  const { setNotification } = useNotification(); // Use notification hook to set notifications globally
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    videoUrl: false,
    // Separate title and description profanity errors for more granular form validation feedback
    profanityTitle: false,
    profanityDescription: false,
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    // Validate inputs
    const titleError = title.trim() === "";
    const descriptionError = description.trim() === "";
    const videoUrlError = !validateUrl(videoUrl);
    const profanityErrorTitle = containsProfanity(title);
    const profanityErrorDescription = containsProfanity(description);

    setErrors({
      title: titleError,
      description: descriptionError,
      videoUrl: videoUrlError,
      profanityTitle: profanityErrorTitle,
      profanityDescription: profanityErrorDescription,
    });

    // Exit the function if there are any input errors
    if (
      titleError ||
      descriptionError ||
      videoUrlError ||
      profanityErrorTitle ||
      profanityErrorDescription
    ) {
      setLoading(false);
      setNotification({
        message: "Please fix the errors in the upload form.",
        severity: "error",
      });
      return;
    }

    try {
      // Make a POST request to upload the video
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            title,
            description,
            video_url: videoUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      setNotification({
        message: "Video uploaded successfully!",
        severity: "success",
      });

      router.push("/");
    } catch (error) {
      setLoading(false);
      console.error("Error uploading video:", error);
      setNotification({
        message: "Error uploading video. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <ProtectedRoute>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          minHeight: "80vh",
          px: 2,
        }}
      >
        <BackLink text="Back to Videos" href="/" />
        <Paper component={Stack} px={{ xs: 2, sm: 4 }} py={4} spacing={2}>
          <Typography variant="h4" component="h1" align="center">
            Upload a Video
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Add a meaningful title, description, and valid video URL to upload a
            video.
          </Typography>
          <TextField
            label="Video Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={errors.title || errors.profanityTitle}
            helperText={
              errors.title
                ? "Title is required"
                : errors.profanityTitle
                ? "Please avoid using inappropriate words"
                : ""
            }
          />
          <TextField
            label="Video Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            error={errors.description || errors.profanityDescription}
            helperText={
              errors.description
                ? "Description is required"
                : errors.profanityDescription
                ? "Please avoid using inappropriate words"
                : ""
            }
            multiline
            rows={3}
          />
          <TextField
            label="Video URL"
            variant="outlined"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
            error={errors.videoUrl}
            helperText={errors.videoUrl ? "Please enter a valid URL" : ""}
          />
          <Button
            variant="contained"
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Upload Video
          </Button>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
