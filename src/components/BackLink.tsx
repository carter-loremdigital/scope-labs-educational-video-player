import { Stack, Link as MUILink } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Link from "next/link";

const BackLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <Stack direction="row" mb={2} alignItems="center">
      <ChevronLeft />
      <MUILink component={Link} href={href}>
        {text}
      </MUILink>
    </Stack>
  );
};

export default BackLink;
