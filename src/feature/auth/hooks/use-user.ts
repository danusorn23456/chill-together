import { useRecoilValue } from "recoil";
import { GetUserByIdResponseSuccess, userState } from "..";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

function useUser(): GetUserByIdResponseSuccess {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  if (!user) {
    navigate(RoutePath.SIGNIN);
  }

  return user;
}

export { useUser };
