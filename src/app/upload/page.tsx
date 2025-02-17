"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { containsProfanity } from "@/utils/profanityFilter";
import { useRouter } from "next/navigation";

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
      setNotification({
        message: "Please fix the errors in the upload form.",
        severity: "error",
      });
      return;
    }

    try {
      // Make a POST request to upload the video
      const response = await fetch("/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          title,
          description,
          video_url: videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      setNotification({
        message: "Video uploaded successfully!",
        severity: "success",
      });

      router.push("/");
    } catch (error) {
      console.error("Error uploading video:", error);
      setNotification({
        message: "Error uploading video. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "500px",
        margin: "0 auto",
        p: 3,
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" align="center">
        Upload a Video
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
      <Button variant="contained" type="submit">
        Upload Video
      </Button>
    </Box>
  );
}
