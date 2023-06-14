import { VideoRatioBox } from "~/feature/common";

export type PlaylistItem = {
  id: string;
  title: string;
};

export type PlaylistItems = PlaylistItem[];

export interface MusicListsProps {
  playlists?: PlaylistItems | null;
  onSelect?: (playlist: PlaylistItem) => any;
}

function Playlist({ playlists, onSelect }: MusicListsProps) {
  return (
    <VideoRatioBox>
      <div className="grid grid-cols-4 p-4 gap-4 bg-gray-900">
        {playlists?.map((playlist) => (
          <div
            onClick={() => onSelect?.(playlist)}
            key={playlist.id}
            className="group duration-100 flex flex-col space-y-1 cursor-pointer hover:scale-105"
          >
            <div className="w-full rounded overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${playlist.id}/hqdefault.jpg`}
                alt={playlist.title}
              />
            </div>
            <h2 className="text-xs text-gray-500 text-left h-4 overflow-hidden">
              {playlist.title}
            </h2>
          </div>
        ))}
      </div>
    </VideoRatioBox>
  );
}

export { Playlist };
