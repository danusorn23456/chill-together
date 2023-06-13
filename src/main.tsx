import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "~/feature/auth";
import { router } from "~/routes";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import "~/feature/common/styles/css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <Suspense fallback={<div></div>}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </Suspense>
  </RecoilRoot>
);
