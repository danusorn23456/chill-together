import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubeType } from "youtube-player/dist/types";
import { difTimeInSecond, toHoursAndMinutes } from "~/feature/common";
import { roomState } from "~/feature/room";
import { endPlaylist, musicState } from "../..";

export interface MusicPlayerProps {}

function MusicPlayer({}: MusicPlayerProps) {
  const room = useRecoilValue(roomState);
  const music = useRecoilValue(musicState);

  const intervelRef = useRef<NodeJS.Timeout>();

  const playerRef = useRef<YouTubeType>();
  const playTimeRef = useRef(0);
  const durationNodeRef = useRef<HTMLParagraphElement>(null);

  async function handleEndMusic() {
    if (playerRef.current && music) {
      await endPlaylist();
    }
  }

  function initialYoutubeIFrame() {
    playerRef.current = YouTubePlayer("youtube-player");
  }

  async function handlePlay() {
    if (!playerRef.current || !music) return;
    // get timer in second unit by calc played_at wuth current time
    playTimeRef.current = difTimeInSecond(music.played_at);

    // load by id with time in second unit
    await playerRef.current.loadVideoById(
      music.playlist_id,
      playTimeRef.current
    );

    // in case we play this song again we need to call seek function to tell youtube clear previous duration
    if (playTimeRef.current === 0) {
      playerRef.current.seekTo(0, true);
    }

    await playerRef.current.playVideo();
  }

  async function trackingVideoTime() {
    if (durationNodeRef.current && playerRef.current) {
      const duration = await playerRef.current.getCurrentTime();
      const timeString = toHoursAndMinutes(duration, true);
      durationNodeRef.current.innerText = timeString;
    }
  }

  useEffect(
    function performInitialYoutube() {
      if (!music?.playlist_id) return;

      initialYoutubeIFrame();
      handlePlay();
      intervelRef.current = setInterval(trackingVideoTime, 1000);

      return () => {
        clearInterval(intervelRef.current);
      };
    },
    [room]
  );

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center top-0 left-0 overflow-visible">
        <div
          id="youtube-player"
          className="w-full h-full pointer-events-none"
        />
        <div className="bg-gray-950 w-fit text-center z-10">
          <p ref={durationNodeRef} className="text-white"></p>
          <button className="text-white px-2" onClick={handleEndMusic}>
            stop
          </button>
          <button className="text-white px-2" onClick={handlePlay}>
            play
          </button>
        </div>
      </div>
    </>
  );
}

export { MusicPlayer };
