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
import { useRouter } from "next/navigation";
import { revalidateHome } from "../actions";
import BackLink from "@/components/BackLink";

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ firstName: false, lastName: false });
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    // Validate required fields
    const firstNameError = firstName.trim() === "";
    const lastNameError = lastName.trim() === "";
    setErrors({ firstName: firstNameError, lastName: lastNameError });

    // Exit function if firstName or lastName not provided
    if (firstNameError || lastNameError) {
      return;
    }

    // Store user data in auth context
    await setUser(firstName, lastName);
    await revalidateHome(); // Refresh home page before redirecting to show video dashboard
    router.push("/"); // Redirect to home page
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      <BackLink text="Back to Home" href="/" />
      <Paper component={Stack} p={4} spacing={2}>
        <Typography variant="h4" component="h1" align="center">
          Log In
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Log in with your first and last name to start creating and watching
          videos!
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          error={errors.firstName}
          helperText={errors.firstName ? "First name is required" : ""}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          error={errors.lastName}
          helperText={errors.lastName ? "Last name is required" : ""}
        />
        <Button
          variant="contained"
          type="submit"
          loading={loading}
          disabled={loading}
        >
          Log In
        </Button>
      </Paper>
    </Box>
  );
}
