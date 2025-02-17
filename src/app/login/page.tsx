"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ firstName: false, lastName: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const firstNameError = firstName.trim() === "";
    const lastNameError = lastName.trim() === "";
    setErrors({ firstName: firstNameError, lastName: lastNameError });

    // Exit function if firstName or lastName not provided
    if (firstNameError || lastNameError) {
      return;
    }

    // TODO: Handle login logic here (e.g., update global state, redirect, etc.)
    const username = `${firstName}_${lastName}`.toLowerCase();
    console.log("Logging in as:", username);
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
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" align="center">
        Log In
      </Typography>
      <Typography variant="subtitle1">
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
      <Button variant="contained" type="submit">
        Log In
      </Button>
    </Box>
  );
}
