import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import TopNav from "../components/admin/TopNav";

const AdminLayout = () => {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed
            ? "ml-[72px]"
            : "ml-[260px]"
        }`}
      >

        <TopNav
          onMenuToggle={() =>
            setCollapsed(!collapsed)
          }
        />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;