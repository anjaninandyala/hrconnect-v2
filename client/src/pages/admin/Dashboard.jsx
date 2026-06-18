import React, {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Users,
  ClipboardCheck,
  Building2,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import PendingApprovals from "../../components/dashboard/PendingApprovals";
import RecentActivity from "../../components/dashboard/RecentActivity";

import {
  getDashboardStats,
} from "../../api/adminApi";

const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const data =
            await getDashboardStats();

          setStats(data);

        } catch (error) {

          console.log(
            "Dashboard Error:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchStats();

  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading Dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data
      </div>
    );
  }

  const dashboardStats = [

    {
      title:
        "Total Employees",

      value:
        stats.totalEmployees || 0,

      icon:
        Users,
    },

    {
      title:
        "Pending Approvals",

      value:
        stats.pending || 0,

      icon:
        ClipboardCheck,
    },

    {
      title:
        "Departments",

      value:
        stats.departments || 0,

      icon:
        Building2,
    },

    {
      title:
        "Documents",

      value:
        stats.documentsUploaded || 0,

      icon:
        FileText,
    },


  ];

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <h1
          className="
            text-5xl
            font-bold
            text-slate-900
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-2
            text-lg
          "
        >
          Welcome back! Here's your HR overview.
        </p>

      </motion.div>

      {/* STAT CARDS */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {dashboardStats.map(
          (stat, index) => (

            <StatCard
              key={index}
              {...stat}
            />

          )
        )}

      </div>

      {/* CHARTS */}

      <DashboardCharts
        departmentData={
          stats.departmentChart || []
        }
        onboardingData={
          stats.onboardingChart || []
        }
      />

      {/* BOTTOM SECTION */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        <PendingApprovals />

        <RecentActivity
          activities={
            stats.recentActivity || []
          }
        />
      </div>

    </div>

  );
};

export default Dashboard;