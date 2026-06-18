import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Building2,
  FileText,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  CalendarDays,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },

  {
    label: "Employees",
    icon: Users,
    path: "/admin/employees",
  },

  {
    label: "Approvals",
    icon: Briefcase,
    path: "/admin/approvals",
  },

  {
    label: "Departments",
    icon: Building2,
    path: "/admin/departments",
  },

  {
    label: "Documents",
    icon: FileText,
    path: "/admin/documents",
  },

  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    label: "Leave Approvals",
    icon: CalendarDays,
    path: "/admin/leave-approvals",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
  
];

export default function Sidebar({
  collapsed,
  setCollapsed,
}) {
  const location =
    useLocation();

  return (
    <motion.aside
      animate={{
        width: collapsed
          ? 72
          : 260,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        fixed
        left-0
        top-0
        h-screen
        bg-slate-900
        text-white
        z-40
        flex
        flex-col
        border-r
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          h-16
          px-4
          border-b
          border-slate-700
        "
      >
        <AnimatePresence>

          {!collapsed && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  w-8
                  h-8
                  rounded-lg
                  bg-blue-600
                  flex
                  items-center
                  justify-center
                "
              >
                <Users
                  className="
                    w-4
                    h-4
                  "
                />
              </div>

              <span
                className="
                  font-bold
                  text-lg
                "
              >
                HRConnect
              </span>

            </motion.div>
          )}

        </AnimatePresence>

        {collapsed && (

          <div
            className="
              w-8
              h-8
              rounded-lg
              bg-blue-600
              flex
              items-center
              justify-center
              mx-auto
            "
          >
            <Users
              className="
                w-4
                h-4
              "
            />
          </div>

        )}
      </div>

      <nav
        className="
          flex-1
          py-4
          px-2
          space-y-1
        "
      >

        {navItems.map(
          (item) => {

            const isActive =
              location.pathname ===
              item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex
                  items-center
                  gap-3
                  px-3
                  py-3
                  rounded-lg
                  transition

                  ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                  }
                `}
              >

                <item.icon
                  className="
                    w-5
                    h-5
                  "
                />

                <AnimatePresence>

                  {!collapsed && (

                    <motion.span
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                    >
                      {item.label}
                    </motion.span>

                  )}

                </AnimatePresence>

              </Link>
            );
          }
        )}

      </nav>

      <button
        onClick={() =>
          setCollapsed(
            !collapsed
          )
        }
        className="
          h-12
          border-t
          border-slate-700
          flex
          items-center
          justify-center
        "
      >

        {collapsed ? (
          <ChevronRight />
        ) : (
          <ChevronLeft />
        )}

      </button>

    </motion.aside>
  );
}