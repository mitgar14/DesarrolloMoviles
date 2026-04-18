import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<any>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
