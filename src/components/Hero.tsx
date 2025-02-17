import { Box, Typography, Button } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        p: 4,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to EduStream
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Your all-in-one platform for educational videos and discussions.
      </Typography>
      <Button href="/login" variant="contained" color="primary" sx={{ mt: 2 }}>
        Log In
      </Button>
    </Box>
  );
};

export default Hero;
