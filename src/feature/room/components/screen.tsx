import bg from "~/assets/bg.jpg";
import { useRecoilValue } from "recoil";
import { onlineUserState } from "../store";

export interface ScreenProps {}

function Screen({}: ScreenProps) {
  const onlineUsers = useRecoilValue(onlineUserState);

  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full block"
        src={bg}
        style={{
          objectFit: "cover",
        }}
        alt=""
      />
      <div className="absolute bottom-0 left-0 w-full h-1/2 p-8">
        {onlineUsers.map((user) => (
          <div
            key={user.id}
            className="w-fit rounded-full flex flex-col justify-center items-center space-y-2"
          >
            <img className="w-20 h-20" src={user.avatar_url} />
            <div className="text-white text-xs border rounded px-2">
              {user.username}
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">
        Image by{" "}
        <a href="https://www.freepik.com/free-vector/abstract-neon-lights-background_9840044.htm#page=5&query=perspective%20galaxy&position=0&from_view=search&track=ais">
          Freepik
        </a>
      </span>
    </div>
  );
}

export { Screen };
