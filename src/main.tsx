import ReactDOM from "react-dom/client";
import "./styles/css/index.css";
import SupabaseContextProvider from "./context/supabase.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "~/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SupabaseContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </SupabaseContextProvider>
);
