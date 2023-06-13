import { useRecoilValue } from "recoil";
import { MusicsList } from "./music-lists";
import { MusicPlayer } from "./music-player";
import { musicState } from "../..";

export interface YoutubeScreenProps {}

function YoutubeScreen({ ...rest }: YoutubeScreenProps) {
  const music = useRecoilValue(musicState);

  return (
    <div
      {...rest}
      className="w-full sm:max-w-lg aspect-video rounded overflow-hidden m-2 mb-10 relative z-20"
    >
      {/* <input className="input" onChange={handleChange} /> */}
      {!music?.playlist_id ? <MusicsList /> : <MusicPlayer />}
    </div>
  );
}

export { YoutubeScreen };
