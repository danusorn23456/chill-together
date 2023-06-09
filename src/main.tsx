import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./feature/auth";
import { router } from "./routes";
import { RecoilRoot } from "recoil";
import "./styles/css/index.css";
import { Suspense } from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <AuthProvider>
      <Suspense fallback={<div></div>}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </AuthProvider>
  </RecoilRoot>
);
