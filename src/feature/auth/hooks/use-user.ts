import { useRecoilValue } from "recoil";
import { userState } from "..";
import { UserRecord } from "~/service/supabase";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

function useUser(): UserRecord {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  if (!user) {
    navigate(RoutePath.SIGNIN);
  }

  return user as UserRecord;
}

export { useUser };
