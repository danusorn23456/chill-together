import { useEffect } from "react";
import { supabase } from "~/service/supabase";
import { OnlineUsers, RoomChannel } from "./type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { validate as uuidValidate } from "uuid";
import { onlineUserState } from "./state";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { userProfilesState } from "../auth/state";

function useRoom() {
  const { roomId: id } = useParams();
  const user = useRecoilValue(userProfilesState);
  const onlineUsers = useRecoilValue(onlineUserState);
  const setOnlineUsers = useSetRecoilState(onlineUserState);
  const navigate = useNavigate();

  useEffect(
    function isValidRoom() {
      if (!id || !uuidValidate(id)) {
        navigate(RoutePath.LOBBY);
      }
    },
    [id]
  );

  // subscribe to realtime
  useEffect(
    function roomListener() {
      if (!user) {
        return console.warn("user on load");
      }
      const channel = supabase.channel(RoomChannel.PREFIX + id, {
        config: {
          presence: {
            key: user.id,
          },
        },
      });

      channel.on("presence", { event: "sync" }, () => {
        console.log("Online users: ", channel.presenceState());
        const updateOnlineUsers = Object.values(
          channel.presenceState()
        )[0] as OnlineUsers;
        if (updateOnlineUsers) {
          console.log("update room ", updateOnlineUsers);
          setOnlineUsers(updateOnlineUsers);
        }
      });

      channel.on("presence", { event: "join" }, ({ newPresences }) => {
        console.log("New users have joined: ", newPresences);
      });

      channel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        console.log("Users have left: ", leftPresences);
      });

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await channel.track({
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            online_at: new Date().toISOString(),
          });
          console.log("track status is %s", status);
        }
      });

      return () => {
        channel.unsubscribe();
      };
    },
    [id, user]
  );

  return { onlineUsers };
}

export { useRoom };
