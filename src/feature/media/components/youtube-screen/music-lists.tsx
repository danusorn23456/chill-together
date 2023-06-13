import { useEffect, useState } from "react";
import { GetPlaylistResponseSuccess, getPlaylist, listenToMusic } from "../..";

export interface MusicListsProps {}

function MusicsList({}: MusicListsProps) {
  const perPage = 8;
  const [page] = useState(1);
  const [musics, setMusics] = useState<GetPlaylistResponseSuccess>([]);

  async function selectMusic(music: { id: string }) {
    if (!music) throw new Error("music id not found");
    const { error } = await listenToMusic({
      playlist_id: music.id,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  useEffect(function gettingMusics() {
    async function callGetMusics() {
      const { data } = await getPlaylist({ page, per_page: perPage });
      if (data) {
        setMusics(data);
      }
    }
    callGetMusics();
  }, []);

  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      {musics?.map((music) => (
        <div
          onClick={() => selectMusic(music)}
          key={music.id}
          className="group duration-100 flex flex-col space-y-1 cursor-pointer hover:scale-105"
        >
          <div className="w-full rounded overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${music.id}/hqdefault.jpg`}
              alt={music.title}
            />
          </div>
          <h2 className="text-xs text-gray-500 text-left h-4 overflow-hidden">
            {music.title}
          </h2>
        </div>
      ))}
    </div>
  );
}

export { MusicsList };
