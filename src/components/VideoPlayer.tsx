"use client";
import ReactPlayer from "react-player";

import styles from "@/app/videos/[id]/styles.module.css";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  user_id: string;
  num_comments: number;
  created_at: string;
}

interface VideoPageProps {
  video: Video;
}

const VideoPlayer = ({ video }: VideoPageProps) => {
  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        className={styles.reactPlayer}
        url={video.video_url}
        width="100%"
        height="100%"
        controls
      />
    </div>
  );
};

export default VideoPlayer;
