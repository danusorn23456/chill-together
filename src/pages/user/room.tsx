import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userProfilesState } from "~/feature/auth/state";
import { OnlineUserTab, Screen, useRoom } from "~/feature/room";
import { Profile } from "~/service/supabase";

export interface RoomProps {}

function Room({}: RoomProps) {
  const user = useRecoilValue(userProfilesState) as Profile;
  const room = useRoom();

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
