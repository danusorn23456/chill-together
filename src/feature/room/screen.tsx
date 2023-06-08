import { useRecoilValue } from "recoil";
import bg1 from "~/assets/bg-1.jpg";
import { onlineUserState } from "./state";
export interface ScreenProps {}

function Screen({}: ScreenProps) {
  const onlineUsers = useRecoilValue(onlineUserState);

  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full block"
        src={bg1}
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
        <a href="https://www.freepik.com/free-vector/geometric-shapes-neon-lights-background_6929474.htm#query=night%20disco%20room&position=38&from_view=search&track=country_rows_v1">
          Image by pikisuperstar
        </a>{" "}
        on Freepik
      </span>
    </div>
  );
}

export { Screen };
