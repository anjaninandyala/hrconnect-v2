
import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Building2,
  FileText,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  getDashboardStats,
} from "../../api/adminApi";

const Analytics = () => {

  const [data, setData] =
    useState(null);

  useEffect(() => {

    const fetchAnalytics =
      async () => {

        try {

          const result =
            await getDashboardStats();

          setData(result);

        } catch (error) {

          console.log(error);

        }
      };

    fetchAnalytics();

  }, []);

  if (!data) {
    return (
      <div className="p-6">
        Loading Analytics...
      </div>
    );
  }

  const statusData = [
    {
      name: "Approved",
      value: data.approved,
    },
    {
      name: "Pending",
      value: data.pending,
    },
    {
      name: "Rejected",
      value: data.rejected,
    },
  ];

  const COLORS = [
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
  ];

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Employee onboarding insights and workforce metrics.
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Total Employees
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {data.totalEmployees}
              </h2>

            </div>

            <div
              className="
    h-14
    w-14
    rounded-2xl
    bg-blue-100
    flex
    items-center
    justify-center
  "
            >
              <Users
                size={28}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Departments
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {data.departments}
              </h2>

            </div>

            <div
              className="
    h-14
    w-14
    rounded-2xl
    bg-green-100
    flex
    items-center
    justify-center
  "
            >
              <Building2
                size={28}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500">
                Documents
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {data.documentsUploaded}
              </h2>

            </div>

            <div
              className="
    h-14
    w-14
    rounded-2xl
    bg-purple-100
    flex
    items-center
    justify-center
  "
            >
              <FileText
                size={28}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* CHARTS ROW 1 */}

      <div className="grid xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <h3 className="text-xl font-bold mb-6">
            Employee Status Distribution
          </h3>

          <div className="h-[350px]">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  innerRadius={60}
                  label
                >

                  {statusData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <h3 className="text-xl font-bold mb-6">
            Department Distribution
          </h3>

          <div className="h-[350px]">

            <ResponsiveContainer>

              <BarChart
                data={
                  data.departmentChart
                }
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
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* CHARTS ROW 2 */}

      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <h3 className="text-xl font-bold mb-6">
          Monthly Onboarding Trend
        </h3>

        <div className="h-[400px]">

          <ResponsiveContainer>

            <BarChart
              data={
                data.onboardingChart
              }
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#8B5CF6"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );
};

export default Analytics;

