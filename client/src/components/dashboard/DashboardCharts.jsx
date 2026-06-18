import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DashboardCharts = ({
  departmentData = [],
  onboardingData = [],
}) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Department Chart */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-xl font-bold mb-6">
          Employees by Department
        </h3>

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={departmentData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="department"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#3B82F6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Onboarding Chart */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h3 className="text-xl font-bold mb-6">
          Monthly Onboarding Trend
        </h3>

        <div className="h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={onboardingData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#10B981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default DashboardCharts;