import { Navigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { useUser } from '../auth/context/UserProvider';
=======
import { useUser } from '@/context/UserProvider';
>>>>>>> refs/remotes/origin/main

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