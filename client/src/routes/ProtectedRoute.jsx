import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRole,
}) => {

  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace
      />
    );
  }

  if (
    allowedRole &&
    user.role !== allowedRole
  ) {

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    return (
      <Navigate
        to="/employee/dashboard"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;