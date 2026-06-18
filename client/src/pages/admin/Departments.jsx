import React, {
  useEffect,
  useState,
} from "react";

import {
  Building2,
  Users,
} from "lucide-react";

import { getEmployees } from "../../api/employeeApi";

const Departments = () => {

  const [departments, setDepartments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const employees =
          await getEmployees();

        const grouped = {};

        employees.forEach((emp) => {

          const dept =
            emp?.professionalDetails
              ?.department || "Unknown";

          if (!grouped[dept]) {

            grouped[dept] = {
              name: dept,
              totalEmployees: 0,
              approved: 0,
              pending: 0,
            };

          }

          grouped[dept]
            .totalEmployees++;

          if (
            emp.status ===
            "approved"
          ) {
            grouped[dept]
              .approved++;
          }

          if (
            emp.status ===
            "pending"
          ) {
            grouped[dept]
              .pending++;
          }

        });

        setDepartments(
          Object.values(grouped)
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();

  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading Departments...
      </div>
    );
  }

  const totalDepartments =
    departments.length;

  const totalEmployees =
    departments.reduce(
      (sum, dept) =>
        sum +
        dept.totalEmployees,
      0
    );

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Departments
        </h1>

        <p className="text-gray-500 mt-2">
          Department overview and workforce distribution.
        </p>

      </div>

      {/* TOP CARDS */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Departments
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {totalDepartments}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Building2
                size={28}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Employees
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {totalEmployees}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">

              <Users
                size={28}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Department Directory
          </h2>

        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-slate-50 border-b">

              <th className="text-left p-4">
                Department
              </th>

              <th className="text-left p-4">
                Employees
              </th>

              <th className="text-left p-4">
                Approved
              </th>

              <th className="text-left p-4">
                Pending
              </th>

            </tr>

          </thead>

          <tbody>

            {departments.map(
              (dept) => (

                <tr
                  key={dept.name}
                  className="border-b hover:bg-slate-50"
                >

                  <td className="p-4 font-medium">
                    {dept.name}
                  </td>

                  <td className="p-4">
                    {dept.totalEmployees}
                  </td>

                  <td className="p-4 text-green-600 font-medium">
                    {dept.approved}
                  </td>

                  <td className="p-4 text-orange-600 font-medium">
                    {dept.pending}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );
};

export default Departments;