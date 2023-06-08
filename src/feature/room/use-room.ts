import { useEffect, useState } from "react";
import { RoomRecordWithOwner, UUID, supabase } from "~/service/supabase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { onlineUserState } from "./state";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { userRecordState } from "../auth/state";
import { OnlineUsers, Channel } from "./type";
import { APIgetRoomById } from "./api";

function useRoom() {
  const { roomId: id } = useParams();
  const [room, setRoom] = useState<RoomRecordWithOwner>();

  const user = useRecoilValue(userRecordState);
  const onlineUser = useRecoilValue(onlineUserState);
  const setOnlineUsers = useSetRecoilState(onlineUserState);
  const navigate = useNavigate();

  function sendMessage(text: string) {}

  async function callAPIgetRoomById(id: UUID) {
    const room = await APIgetRoomById(id);
    if (room) {
      setRoom(room);
    }
  }

  useEffect(
    function isValidRoom() {
      if (!id) {
        console.log("room Id", id);
        navigate(RoutePath.LOBBY);
      } else if (!!id) {
        callAPIgetRoomById(id);
      }
    },
    [id]
  );

  useEffect(
    function onlineUsersSubscribe() {
      if (!user) {
        return console.warn("user on load");
      }
      const onlineUserChannel = supabase.channel(Channel.ONLINE_USERS + id, {
        config: {
          presence: {
            key: user.id,
          },
        },
      });

      onlineUserChannel.on("presence", { event: "sync" }, () => {
        console.log("Online users: ", onlineUserChannel.presenceState());
        let updateOnlineUsers = Object.values(
          onlineUserChannel.presenceState()
        ).map((i) => i[0]) as OnlineUsers;

        updateOnlineUsers = updateOnlineUsers.sort((a, b) => {
          if (a.is_owner && !b.is_owner) {
            return -1; // a should come before b
          } else if (!a.is_owner && b.is_owner) {
            return 1; // a should come after b
          }

          const dateA = new Date(a.online_at);
          const dateB = new Date(b.online_at);

          return dateA.getTime() - dateB.getTime();
        });
        setOnlineUsers(updateOnlineUsers);
      });

      onlineUserChannel.on(
        "presence",
        { event: "join" },
        ({ newPresences }) => {
          console.log("New users have joined: ", newPresences);
        }
      );

      onlineUserChannel.on(
        "presence",
        { event: "leave" },
        ({ leftPresences }) => {
          console.log("Users have left: ", leftPresences);
        }
      );

      onlineUserChannel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const status = await onlineUserChannel.track({
            is_owner: room?.owner_id === user.id,
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            online_at: new Date().toISOString(),
          });
          console.log("track status is %s", status);
        }
      });

      return () => {
        onlineUserChannel.unsubscribe();
      };
    },
    [id, user]
  );

  return { room, sendMessage };
}

export { useRoom };
