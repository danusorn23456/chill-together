import { useRecoilValue } from "recoil";
import { MusicsList } from "./music-lists";
import { MusicPlayer } from "./music-player";
import { musicState } from "../..";
import { roomState } from "~/feature/room";
import { userState } from "~/feature/auth";
import { MusicWait } from "./music-wait";

export interface YoutubeScreenProps {}

function YoutubeScreen({ ...rest }: YoutubeScreenProps) {
  const music = useRecoilValue(musicState);
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);

  const isOwner = user?.id === room?.owner.id;

  return (
    <div className="absolute-center">
      <div
        {...rest}
        className="w-full h-64 sm:max-w-lg aspect-video rounded relative z-20"
      >
        {/* <input className="input" onChange={handleChange} /> */}
        {!music?.playlist_id ? (
          isOwner ? (
            <MusicsList />
          ) : (
            <MusicWait />
          )
        ) : (
          <MusicPlayer isOwner={isOwner} />
        )}
      </div>
    </div>
  );
}

export { YoutubeScreen };
