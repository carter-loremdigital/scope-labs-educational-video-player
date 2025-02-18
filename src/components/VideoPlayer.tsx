"use client";
import ReactPlayer from "react-player";
import { Video } from "@/app/videos/[id]/page";
import styles from "@/app/videos/[id]/styles.module.css";

const VideoPlayer = ({ video }: { video: Video }) => {
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
