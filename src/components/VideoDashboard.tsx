"use client";
import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Clear, Search } from "@mui/icons-material";
import VideoCard from "@/components/VideoCard";
// import { testData } from "@/data/videos";

export type Video = {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
};

// Union type for sort options
type SortOption =
  | "alpha-asc"
  | "alpha-desc"
  | "date-newest"
  | "date-oldest"
  | "comments-high"
  | "comments-low";

export default function VideoDashboard({ videos }: { videos: Video[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("date-newest");

  // Filter videos based on search query (case-insensitive, searches title and description)
  const filteredVideos = useMemo(() => {
    let filtered = videos;
    if (searchQuery.trim()) {
      filtered = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort videos based on the selected option
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "alpha-asc":
          return a.title.localeCompare(b.title);
        case "alpha-desc":
          return b.title.localeCompare(a.title);
        case "date-newest":
          // Newest first: descending order
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "date-oldest":
          // Oldest first: ascending order
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "comments-high":
          // Highest number of comments first.
          return b.num_comments - a.num_comments;
        case "comments-low":
          // Lowest number of comments first.
          return a.num_comments - b.num_comments;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, sortOption, videos]);

  return (
    <Container maxWidth="lg" sx={{ p: 4 }}>
      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-between"
        alignItems="end"
      >
        <Stack
          direction={{ xs: "row", sm: "column", md: "row" }}
          alignItems="baseline"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "initial" }}
          spacing={{ md: 2 }}
          mb={{ xs: 1, sm: "initial" }}
          mr={{ sm: 2 }}
        >
          <Typography variant="h4" component="h1" mb={0} gutterBottom noWrap>
            Your Videos
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >{`${filteredVideos.length} results`}</Typography>
        </Stack>
        <Stack
          direction={{ sm: "row" }}
          width={{ xs: "100%", sm: "initial" }}
          spacing={2}
        >
          <TextField
            variant="outlined"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchQuery("")}>
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 4, width: { xs: "100%", sm: "initial" } }}
          />

          <FormControl>
            <InputLabel id="sort-label">Sort by</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOption}
              label="Sort by"
              onChange={(e) => setSortOption(e.target.value as SortOption)}
            >
              <MenuItem value="date-newest">
                Date Posted (Newest First)
              </MenuItem>
              <MenuItem value="date-oldest">
                Date Posted (Oldest First)
              </MenuItem>
              <MenuItem value="alpha-asc">Alphabetical (A-Z)</MenuItem>
              <MenuItem value="alpha-desc">Alphabetical (Z-A)</MenuItem>
              <MenuItem value="comments-high">Comments (High to Low)</MenuItem>
              <MenuItem value="comments-low">Comments (Low to High)</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "stretch",
        }}
      >
        {!filteredVideos.length && !searchQuery && (
          <Typography variant="body1" color="text.secondary">
            {`You don't have any videos yet. Upload to get started!`}
          </Typography>
        )}
        {filteredVideos.map((video: Video) => (
          <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
