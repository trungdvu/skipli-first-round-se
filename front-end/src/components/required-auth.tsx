import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/auth-context';

export function RequiredAuth({ children }: { children: JSX.Element }) {
  const { phoneNumber } = useAuth();
  const location = useLocation();

  if (!phoneNumber) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
