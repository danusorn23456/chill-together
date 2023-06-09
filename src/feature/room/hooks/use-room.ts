import { useEffect } from "react";
import { UUID, supabase } from "~/service/supabase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { OnlineUsers, Channel } from "../type";
import { onlineUserState, roomState } from "../store";
import { getRoomById } from "../services";
import { userRecordState } from "~/feature/auth/store";

function useRoom() {
  const { roomId: id } = useParams();
  const onlineUsers = useRecoilValue(onlineUserState);
  const user = useRecoilValue(userRecordState);
  const room = useRecoilValue(roomState);
  const setRoom = useSetRecoilState(roomState);
  const setOnlineUsers = useSetRecoilState(onlineUserState);
  const navigate = useNavigate();

  useEffect(
    function isValidRoom() {
      async function callAPIgetRoomById(id: UUID) {
        const room = await getRoomById(id);
        if (room) {
          setRoom(room);
        }
      }

      if (!id) {
        navigate(RoutePath.LOBBY);
      } else if (!!id) {
        callAPIgetRoomById(id);
      }
    },
    [id, user]
  );

  useEffect(
    function onlineUsersSubscribe() {
      if (!user || !room) {
        return;
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
            is_owner: room?.created_by === user.id,
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
        onlineUserChannel.untrack();
      };
    },
    [id, user, room]
  );

  return { onlineUsers };
}

export { useRoom };
