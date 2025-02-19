"use client";
import { useState } from "react";
import { Typography, Stack, Button, TextField } from "@mui/material";
import { Close, Edit, PersonOutline, Save } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { useNotification } from "@/context/NotificationContext";
import { containsProfanity } from "@/utils/profanityFilter";
import { timeAgo } from "@/utils/timestamps";
import { useRouter, usePathname } from "next/navigation";
import { revalidateHome } from "@/app/actions";

type VideoDetailsProps = {
  userId: string;
  videoId: string;
  title: string;
  description: string;
  createdAt: string;
};

const VideoDetails = ({
  userId,
  videoId,
  title,
  description,
  createdAt,
}: VideoDetailsProps) => {
  const { userId: authId } = useAuth();
  const { setNotification } = useNotification(); // Use notification hook to set notifications globally

  const [edit, setEdit] = useState(false); // Edit state
  const [loading, setLoading] = useState(false);

  // State variables for storing user edits
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  // Error state
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    // videoUrl: false,
    profanityTitle: false,
    profanityDescription: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  // TODO: PUT edits to endpoint
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const titleError = editTitle.trim() === "";
    const descriptionError = editDescription.trim() === "";
    // const videoUrlError = !validateUrl(editURL);
    const profanityErrorTitle = containsProfanity(editTitle);
    const profanityErrorDescription = containsProfanity(editDescription);

    // Set form errors
    setErrors({
      title: titleError,
      description: descriptionError,
      // videoUrl: videoUrlError,
      profanityTitle: profanityErrorTitle,
      profanityDescription: profanityErrorDescription,
    });

    // Exit the function if there are any input errors
    if (
      titleError ||
      descriptionError ||
      // videoUrlError ||
      profanityErrorTitle ||
      profanityErrorDescription
    ) {
      // Display error notification
      setNotification({
        message: "Please fix the errors in the edit form.",
        severity: "error",
      });
      return;
    }

    try {
      setLoading(true);
      // Make API PUT request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            video_id: videoId,
            title: editTitle,
            description: editDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Edit failed.");
      }

      setEdit(false);

      // Display success notification
      setNotification({
        message: "Edits saved successfully!",
        severity: "success",
      });

      // "Refresh" video data without window refresh
      router.replace(pathname);
      // Revalidate home page to avoid showing stale data
      revalidateHome();
    } catch (error) {
      // Log error & display notification
      console.error("Error saving edits:", error);
      setNotification({
        message: "Error editing video. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setEditTitle(title);
    setEditDescription(description);
  };

  return (
    <Stack>
      {edit ? (
        <Stack component="form" spacing={2}>
          <Typography variant="h4" component="h1">
            Edit Video
          </Typography>
          <TextField
            label="Video Title"
            variant="outlined"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
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
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
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
          <Stack
            direction="row"
            spacing={2}
            sx={{ maxWidth: { xs: "100%", sm: "50%" } }}
          >
            <Button
              type="submit"
              onClick={handleSubmit}
              variant="contained"
              sx={{ width: "50%" }}
              startIcon={<Save />}
              color="success"
              loading={loading}
              disabled={loading}
            >
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="contained"
              sx={{ width: "50%" }}
              startIcon={<Close />}
              color="error"
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={1}>
          <Typography variant="h4" component="h1">
            {title}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" alignItems="center" gap={0.5}>
              <PersonOutline />
              <Typography variant="body1">{userId}</Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {timeAgo(createdAt)}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
      )}
      {userId === authId && !edit && (
        <Button
          variant="contained"
          onClick={() => setEdit(true)}
          startIcon={<Edit />}
          sx={{
            width: { xs: "50%", sm: "25%" },
            marginTop: 2,
          }}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
};

export default VideoDetails;
