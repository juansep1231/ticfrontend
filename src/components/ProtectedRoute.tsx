import { Navigate } from 'react-router';

import { useAuth } from '../contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  authorizedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/home',
  authorizedRoles,
}) => {
  const { user } = useAuth();
  if (!user) {
    //no logged user
    return <Navigate to="/inicio-sesion" />;
  } else if (!authorizedRoles) {
    //no specified roles, allowed to anything
    return <>{children}</>;
  } else if (user.role && !authorizedRoles.includes(user.role)) {
    //allowed only authorized roles
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
