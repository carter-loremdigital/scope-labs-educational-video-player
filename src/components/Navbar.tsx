"use client";
import {
  AppBar,
  Toolbar,
  Link as MUILink,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Add, Login, Logout } from "@mui/icons-material";

const Navbar = () => {
  const { logout, firstName } = useAuth();
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <MUILink component={Link} href="/" underline="none" color="inherit">
          <Typography variant="h6">EduStream</Typography>
        </MUILink>

        {firstName ? (
          // Authenticated user
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Hi, {firstName}</Typography>
            <Button href="/upload" color="inherit" startIcon={<Add />}>
              Upload
            </Button>
            <Button color="inherit" startIcon={<Logout />} onClick={logout}>
              Log Out
            </Button>
          </Box>
        ) : (
          // Unauthenticated user
          <Button href="/login" color="inherit" startIcon={<Login />}>
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
