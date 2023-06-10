import { useRecoilValue } from "recoil";
import { userState } from "..";
import { User } from "~/feature/common";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

function useUser(): User {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  if (!user) {
    navigate(RoutePath.SIGNIN);
  }

  return user as User;
}

export { useUser };
