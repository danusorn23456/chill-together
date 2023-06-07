import { LobbyForm } from "~/feature/lobby";

export interface LobbyProps {}

function Lobby({ ...rest }: LobbyProps) {
  return (
    <div>
      <LobbyForm />
    </div>
  );
}

export { Lobby };
