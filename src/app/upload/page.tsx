"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { containsProfanity } from "@/utils/profanityFilter";

export default function UploadPage() {
  const { userId } = useAuth(); // Retrieve user_id from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    videoUrl: false,
    profanity: false,
  });

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const titleError = title.trim() === "";
    const descriptionError = description.trim() === "";
    const videoUrlError = !validateUrl(videoUrl);
    const profanityError =
      containsProfanity(title) || containsProfanity(description);

    setErrors({
      title: titleError,
      description: descriptionError,
      videoUrl: videoUrlError,
      profanity: profanityError,
    });

    // Exit the function if there are any input errors
    if (titleError || descriptionError || videoUrlError || profanityError) {
      return;
    }

    // Placeholder for backend request (to be implemented later)
    console.log("Uploading video:", { userId, title, description, videoUrl });
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
        error={errors.title || errors.profanity}
        helperText={
          errors.title
            ? "Title is required"
            : errors.profanity
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
        error={errors.description || errors.profanity}
        helperText={
          errors.description
            ? "Description is required"
            : errors.profanity
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
