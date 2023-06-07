import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { SignIn, Lobby, Room } from "pages";
import { RouteGuard } from "./routes-guard";
import { RoutePath } from "./type";
import { UserLayout } from "~/layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard role="nonUser" redirect={RoutePath.LOBBY}>
        <SignIn />
      </RouteGuard>
    ),
  },
  {
    path: "/lobby",
    element: (
      <RouteGuard role="user" redirect={RoutePath.SIGNIN}>
        <UserLayout>
          <Lobby />
        </UserLayout>
      </RouteGuard>
    ),
  },
  {
    path: "/room",
    element: (
      <RouteGuard>
        <UserLayout>
          <Outlet />
        </UserLayout>
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
