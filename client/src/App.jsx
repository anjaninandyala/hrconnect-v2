import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import EmployeeDashboard from "./pages/employee/Dashboard";
import OnboardingWizard from "./pages/employee/onboarding/OnboardingWizard";
import Profile from "./pages/employee/Profile";

import EmployeeLayout from "./layouts/EmployeeLayout";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Approvals from "./pages/admin/Approvals";
import Employees from "./pages/admin/Employees";
import Departments from "./pages/admin/Departments";
import Documents from "./pages/admin/Documents";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import EmployeeDetails from "./pages/admin/EmployeeDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

import EmployeeSettings from "./pages/employee/Settings";
import EmployeeDocuments from "./pages/employee/Documents";

import Leave from "./pages/employee/Leave";

import LeaveApprovals from "./pages/admin/LeaveApprovals";

import PendingApproval from "./pages/employee/PendingApproval";
import Rejected from "./pages/employee/Rejected";

function App() {
  return (
    <Routes>

      {/* Default Route */}

      <Route
        path="/"
        element={<Navigate to="/auth/login" />}
      />

      {/* Auth */}

      <Route
        path="/auth/login"
        element={<Login />}
      />

      <Route
        path="/auth/register"
        element={<Register />}
      />

      {/* Employee Routes */}

      <Route
        element={
          <ProtectedRoute allowedRole="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />

        <Route
          path="/employee/onboarding"
          element={<OnboardingWizard />}
        />

        <Route
          path="/employee/profile"
          element={<Profile />}
        />
        <Route
          path="/employee/settings"
          element={<EmployeeSettings />}
        />

        <Route
          path="/employee/documents"
          element={<EmployeeDocuments />}
        />

        <Route
          path="/employee/leave"
          element={<Leave />}
        />
        <Route
          path="/employee/pending"
          element={<PendingApproval />}
        />

        <Route
          path="/employee/rejected"
          element={<Rejected />}
        />

      </Route>

      {/* Admin Routes */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="approvals"
          element={<Approvals />}
        />

        <Route
          path="employees"
          element={<Employees />}
        />

        <Route
          path="employees/:id"
          element={<EmployeeDetails />}
        />

        <Route
          path="departments"
          element={<Departments />}
        />

        <Route
          path="documents"
          element={<Documents />}
        />

        <Route
          path="analytics"
          element={<Analytics />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />
        <Route
          path="leave-approvals"
          element={<LeaveApprovals />}
        />

      </Route>

    </Routes>
  );
}

export default App;