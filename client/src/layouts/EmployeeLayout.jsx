import EmployeeSidebar from "../components/employee/EmployeeSidebar";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
} from "lucide-react";

const EmployeeLayout = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/auth/login");
  };

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <EmployeeSidebar />

      {/* Right Side */}

      <div className="flex-1 flex flex-col">

        {/* Top Header */}

        <div
          className="
            bg-white
            border-b
            px-8
            py-4
            flex
            justify-end
            items-center
            sticky
            top-0
            z-50
          "
        >

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              bg-red-50
              text-red-600
              px-5
              py-2.5
              rounded-xl
              hover:bg-red-100
              transition
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

        {/* Page Content */}

        <main
          className="
            flex-1
            p-6
            overflow-y-auto
          "
        >
          <Outlet />
        </main>

      </div>

    </div>

  );
};

export default EmployeeLayout;