import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RoleGuard = ({ children, allowedRoles }) => {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Display access denied or redirect
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-dark">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-poppins)] mb-2">Access Denied</h1>
        <p className="text-muted">You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
