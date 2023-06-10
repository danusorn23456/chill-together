import { useEffect } from "react";
import { UserRecord, supabase } from "~/service/supabase";
import { Channel } from "../type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersInRoomState } from "../store/users-in-room";
import { roomIdState, roomState, UsersInRoom } from "../store";
import { userState } from "~/feature/auth";
import { useRoomId } from ".";
import { randomBetween } from "~/feature/common/utils";

function useRoomListener() {
  const room_id = useRoomId();
  const user = useRecoilValue(userState);
  const room = useRecoilValue(roomState);
  const setUsersInRoom = useSetRecoilState(usersInRoomState);
  const setRoomId = useSetRecoilState(roomIdState);

  useEffect(
    function onlineUsersSubscribe() {
      if (!user || !room) return;

      const usersChannel = supabase.channel(Channel.ONLINE_USERS + room_id, {
        config: {
          presence: {
            key: user!.id,
          },
        },
      });

      usersChannel.on("presence", { event: "sync" }, () => {
        let usersInRoom = Object.values(usersChannel.presenceState()).map(
          (i) => i[0]
        ) as unknown as UsersInRoom;

        console.log(
          `%c online users ${usersInRoom.length}`,
          "background:royalblue;color:white;padding:4px;"
        );

        usersInRoom = usersInRoom.sort((a, b) => {
          if (a.is_owner && !b.is_owner) {
            return -1; // a should come before b
          } else if (!a.is_owner && b.is_owner) {
            return 1; // a should come after b
          }

          const dateA = new Date(a.online_at);
          const dateB = new Date(b.online_at);

          return dateA.getTime() - dateB.getTime();
        });

        setUsersInRoom(usersInRoom);
      });

      usersChannel.on("presence", { event: "join" }, ({ newPresences }) => {
        const user = newPresences[0] as unknown as UserRecord;
        console.log(
          `%c ${user.username} in the room`,
          "background:royalblue;color:white;padding:4px;"
        );
      });

      usersChannel.on("presence", { event: "leave" }, ({ leftPresences }) => {
        const user = leftPresences[0] as unknown as UserRecord;
        console.log(
          `%c ${user.username} left the room`,
          "background:royalblue;color:white;padding:4px;"
        );
      });

      usersChannel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const generateXPosition = randomBetween(5, -5);
          const generateYPosition = randomBetween(1, -3);

          await usersChannel.track({
            is_owner: room?.created_by === user.id,
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            online_at: new Date().toISOString(),
            coordinates: [generateXPosition, generateYPosition, 0],
          });

          usersChannel.send({
            type: "boardcast",
            event: "a",
            payload: "awd",
          });

          console.log(
            `%c success to subscribe room`,
            "background:green;color:white;padding:4px;"
          );
        }
      });

      return () => {
        usersChannel.unsubscribe();
        usersChannel.untrack();
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
