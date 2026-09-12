import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const bypassAuth = import.meta.env.DEV && import.meta.env.VITE_BYPASS_AUTH === 'true';

  if (bypassAuth) {
    return <Outlet />;
  }

  if (loading) {
    return <div className="grid min-h-screen place-items-center text-slate-500">Loading…</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}
