import {
  AppBar,
  Toolbar,
  Link as MUILink,
  Button,
  Typography,
} from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <MUILink component={Link} href="/" underline="none" color="inherit">
          <Typography variant="h6">EduStream</Typography>
        </MUILink>
        <Button href="/login" color="inherit">
          Log In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
