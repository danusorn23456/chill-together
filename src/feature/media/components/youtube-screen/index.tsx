import { useRecoilState, useRecoilValue } from "recoil";
import { MusicsList } from "./music-lists";
import { MusicPlayer } from "./music-player";
import { musicState } from "../..";
import { roomState } from "~/feature/room";
import { userState } from "~/feature/auth";
import { layoutState } from "~/layouts";
import { useEffect } from "react";

export interface YoutubeScreenProps {}

/**iframe screen to play music using many global to handle `musicState` `roomState` `userState`*/
function YoutubeScreen({ ...rest }: YoutubeScreenProps) {
  const music = useRecoilValue(musicState);
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);
  const [, setLayout] = useRecoilState(layoutState);

  const isOwner = user?.id === room?.owner.id;

  useEffect(() => {
    // set layout title on the top leaft screen
    const title =
      (music?.playlist_title && `🎶 ${music?.playlist_title}`) ||
      "...waiting for some music";
    setLayout((prev) => ({ ...prev, title }));
  }, [music]);

  return (
    <div className="absolute-center w-full h-full flex justify-center items-center">
      <div
        {...rest}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-2 aspect-video relative z-20 bg-gray-900 flex items-center rounded-md"
      >
        {!music?.playlist_id ? (
          isOwner ? (
            <MusicsList />
          ) : (
            <h2 className="text-white text-center text-xs mx-auto sm:text-sm">
              WAITING FOR ROOM OWNER PLAY SOME MUSIC . . .
            </h2>
          )
        ) : (
          <MusicPlayer isOwner={isOwner} />
        )}
      </div>
    </div>
  );
}

export { YoutubeScreen };
