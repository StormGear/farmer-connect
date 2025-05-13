import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../auth/context/UserProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = ['farmer', 'buyer'] }: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>; // Consider using a proper loading component
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;