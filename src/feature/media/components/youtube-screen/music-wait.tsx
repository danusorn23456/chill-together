export interface MusicWaitProps {}

function MusicWait({}: MusicWaitProps) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center top-0 left-0 overflow-visible bg-gray-950 relative">
      <h2 className="text-white">WAITING FOR ROOM OWNER DO SOME MUSIC</h2>
    </div>
  );
}

export { MusicWait };
