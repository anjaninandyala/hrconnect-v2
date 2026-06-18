import {
  LayoutDashboard,
  User,
  FileText,
  ClipboardList,
  Settings,
  CalendarDays,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const EmployeeSidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    toast.success(
      "Logged Out Successfully"
    );

    navigate("/auth/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/employee/dashboard",
    },
    {
      title: "Onboarding",
      icon: ClipboardList,
      path: "/employee/onboarding",
    },
    {
      title: "My Profile",
      icon: User,
      path: "/employee/profile",
    },
    {
      title: "Documents",
      icon: FileText,
      path: "/employee/documents",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/employee/settings",
    },
    {
      title: "Leave",
      icon: CalendarDays,
      path: "/employee/leave",
    },
  ];

  return (
    <aside
      className="
        w-64
        bg-white
        border-r
        border-slate-200
        min-h-screen
        p-4
        flex
        flex-col
      "
    >

      <div>

        <h1
          className="
            text-2xl
            font-bold
            mb-8
            text-blue-600
          "
        >
          HRConnect
        </h1>

        <nav className="space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow"
                      : "hover:bg-slate-100 text-slate-700"
                  }
                  `
                }
              >
                <Icon size={18} />
                {item.title}
              </NavLink>

            );
          })}

        </nav>

      </div>

      

    </aside>
  );
};

export default EmployeeSidebar;