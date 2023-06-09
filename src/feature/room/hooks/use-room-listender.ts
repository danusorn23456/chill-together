import { useEffect } from "react";
import { UserRecord, supabase } from "~/service/supabase";
import { OnlineUsers, Channel } from "../type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersInRoomState } from "../store/users-in-room";
import { roomIdState, roomState } from "../store";
import { userRecordState } from "~/feature/auth";
import { useRoomId } from ".";

function useRoomListener() {
  const room_id = useRoomId();
  const user = useRecoilValue(userRecordState);
  const room = useRecoilValue(roomState);
  const setUsersInRoom = useSetRecoilState(usersInRoomState);
  const setRoomId = useSetRecoilState(roomIdState);

  useEffect(
    function onlineUsersSubscribe() {
      if (!user || !room) return;
      const onlineUserChannel = supabase.channel(
        Channel.ONLINE_USERS + room_id,
        {
          config: {
            presence: {
              key: user!.id,
            },
          },
        }
      );

      onlineUserChannel.on("presence", { event: "sync" }, () => {
        let updateOnlineUsers = Object.values(
          onlineUserChannel.presenceState()
        ).map((i) => i[0]) as OnlineUsers;

        console.log(
          `%c online users ${updateOnlineUsers.length}`,
          "background:royalblue;color:white;padding:4px;"
        );

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

        setUsersInRoom(updateOnlineUsers);
      });

      onlineUserChannel.on(
        "presence",
        { event: "join" },
        ({ newPresences }) => {
          const user = newPresences[0] as unknown as UserRecord;
          console.log(
            `%c ${user.username} in the room`,
            "background:royalblue;color:white;padding:4px;"
          );
        }
      );

      onlineUserChannel.on(
        "presence",
        { event: "leave" },
        ({ leftPresences }) => {
          const user = leftPresences[0] as unknown as UserRecord;
          console.log(
            `%c ${user.username} left the room`,
            "background:royalblue;color:white;padding:4px;"
          );
        }
      );

      onlineUserChannel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await onlineUserChannel.track({
            is_owner: room?.created_by === user.id,
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            online_at: new Date().toISOString(),
          });
          console.log(
            `%c success to subscribe room`,
            "background:green;color:white;padding:4px;"
          );
        }
      });

      return () => {
        onlineUserChannel.unsubscribe();
        onlineUserChannel.untrack();
      };
    },
    [room, user]
  );

  useEffect(() => {
    if (room_id) {
      setRoomId(room_id);
    }
  }, [room_id]);

  return null;
}

export { useRoomListener };
