import { createBrowserRouter } from "react-router-dom";
import { ChatRoom, SignIn } from "pages";
import { RouteGuard } from "./routes-guard";
import { MainLayout } from "layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard role="nonUser" redirect="/chat-room">
        <SignIn />
      </RouteGuard>
    ),
  },
  {
    path: "/chat-room",
    element: (
      <RouteGuard role="user" redirect="/">
        <MainLayout>
          <ChatRoom />
        </MainLayout>
      </RouteGuard>
    ),
  },
]);

export { router };
