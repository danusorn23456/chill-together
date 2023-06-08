import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userRecordState } from "~/feature/auth/state";
import { OnlineUserTab, Screen, useRoom } from "~/feature/room";

export interface RoomProps {}

function Room({}: RoomProps) {
  const user = useRecoilValue(userRecordState);
  const { room } = useRoom();

  return (
    <div className="flex flex-1">
      <div className="flex-1 relative">
        <OnlineUserTab />
        <Screen />
      </div>
      <div className="w-60 lg:w-96"></div>
    </div>
  );
}

export { Room };
