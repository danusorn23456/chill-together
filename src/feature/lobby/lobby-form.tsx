import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { RoutePath } from "~/routes/type";

export interface LobbyFormProps {}

function LobbyForm({}: LobbyFormProps) {
  const navigate = useNavigate();
  async function handleJoinRoom() {}

  async function handleCreateRoom() {
    const roomId = uuid();
    navigate(RoutePath.ROOM + `/` + roomId);
  }

  return (
    <div className="absolute-center">
      <div className="card max-w-xl w-full">
        <form onSubmit={handleJoinRoom} className="flex flex-col space-y-2">
          <input className="input" />
          <button type="submit" className="button">
            Join
          </button>
          <button
            onClick={handleCreateRoom}
            type="button"
            className="outlined-button"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export { LobbyForm };
