import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface routeParamsValidatorProps {
  params: string;
  validator: (params?: string) => any;
  children: ReactNode;
}

function RouteParamsValidator({
  params,
  children,
  validator = (params?: string) => !!params,
}: routeParamsValidatorProps) {
  const _params = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    if (!validator(_params[params])) {
      navigation(-1);
    }
  }, [params, params]);

  return <>{children}</>;
}

export { RouteParamsValidator };
