import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { SignIn, Lobby, Room } from "pages";
import { RouteGuard } from "./routes-guard";
import { RoutePath } from "./type";
import { LobbyLayout, PublicLayout, RoomLayout } from "~/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard role="nonUser" redirect={RoutePath.LOBBY}>
        <PublicLayout>
          <SignIn />
        </PublicLayout>
      </RouteGuard>
    ),
  },
  {
    path: "/lobby",
    element: (
      <RouteGuard role="user" redirect={RoutePath.SIGNIN}>
        <LobbyLayout>
          <Lobby />
        </LobbyLayout>
      </RouteGuard>
    ),
  },
  {
    path: "/room",
    element: (
      <RouteGuard role="user">
        <RoomLayout>
          <Outlet />
        </RoomLayout>
      </RouteGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={RoutePath.LOBBY} />,
      },
      {
        path: ":roomId",
        element: <Room />,
      },
    ],
  },
]);

export { router };
