import { useEffect, useRef } from "react";
import YouTubePlayer from "youtube-player";
import { YouTubePlayer as YouTubeType } from "youtube-player/dist/types";
import {
  VideoRatioBox,
  difTimeInSecond,
  toHoursAndMinutes,
} from "~/feature/common";
import { PlayCircleIcon, StopCircleIcon } from "@heroicons/react/20/solid";

export interface YoutubeProps {
  title: string;
  id: string;
  played_at?: string;
  onEnd?: () => any;
  onPlay?: () => any;
  onPause?: () => any;
  onTimer?: (time: string) => any;
  onLoad?: (title: string, id: string) => any;
  fullAccess?: boolean;
}

function Youtube({
  title,
  id,
  played_at,
  fullAccess,
  onLoad,
  onPlay,
  onEnd,
  onTimer,
}: YoutubeProps) {
  const youtubeId = "hello-youtube";

  const intervelRef = useRef<NodeJS.Timeout>();

  const playerRef = useRef<YouTubeType>();
  const playTimeRef = useRef(0);
  const durationNodeRef = useRef<HTMLParagraphElement>(null);

  async function handleEndMusic() {
    //**callback */
    onEnd?.();
  }

  /**attach youtub iframe base on html element.id = youtube-player */
  function initialYoutubeIFrame(id: string) {
    playerRef.current = YouTubePlayer(id);
  }

  async function handlePlay(id?: string, played_at?: string) {
    if (!playerRef.current || !id || !played_at) return;
    /** get timer in second unit by calc played_at wuth current time*/
    playTimeRef.current = difTimeInSecond(played_at);

    /**  load by id with time in second unit*/
    await playerRef.current.loadVideoById(id, playTimeRef.current);

    /** in case we play this song again we need to call seek function to tell youtube clear previous duration */
    if (playTimeRef.current === 0) {
      playerRef.current.seekTo(0, true);
    }

    await playerRef.current.playVideo();

    /**callback */
    onPlay?.();
  }
  /** this function use for tracking time and paint in to html element
  if you want to see the result in page remove class sr-only in
  element that have durationNodeRef */
  async function trackingVideoTime() {
    if (durationNodeRef.current && playerRef.current) {
      const duration = await playerRef.current.getCurrentTime();
      const timeString = toHoursAndMinutes(duration, true);
      durationNodeRef.current.innerText = timeString;
      onTimer?.(timeString);
    }
  }

  useEffect(
    function performInitialYoutube() {
      if (!id || !played_at || !title) return;
      initialYoutubeIFrame(youtubeId);
      onLoad?.(title, id);
      handlePlay(id, played_at);
      intervelRef.current = setInterval(trackingVideoTime, 1000);

      return () => {
        clearInterval(intervelRef.current);
      };
    },
    [id]
  );

  return (
    <VideoRatioBox>
      <div className="h-full w-full flex flex-col justify-center items-center">
        <div
          id={youtubeId}
          className="w-full h-full pointer-events-none rounded-md overflow-hidden"
        />
        <div className="text-center z-10 absolute top-full w-full p-2">
          {/* remove sr-only if you want to debug timer */}
          <p ref={durationNodeRef} className="text-white sr-only"></p>
          <div className="flex space-x-1 justify-center">
            {fullAccess ? (
              <div className="relative">
                <StopCircleIcon className="w-8 h-8 text-white" />
                <button
                  className="text-white px-2 absolute top-0 left-0 w-full h-full z-10"
                  onClick={handleEndMusic}
                ></button>
              </div>
            ) : (
              <></>
            )}
            <div className="relative">
              <PlayCircleIcon className="w-8 h-8 text-white"></PlayCircleIcon>
              <button
                className="text-white px-2 absolute top-0 left-0 w-full h-full z-10"
                onClick={() => handlePlay(id, played_at)}
              />
            </div>
          </div>
        </div>
      </div>
    </VideoRatioBox>
  );
}

export { Youtube };
