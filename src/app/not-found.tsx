import { Container, Typography, Button, Stack } from "@mui/material";

const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h3" component="h1">
          Whoops!
        </Typography>
        <Typography>{`The page you're looking for doesn't exist...`}</Typography>
        <Button href="/">Back to Home</Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
