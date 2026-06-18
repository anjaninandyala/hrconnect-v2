import React, {
  useEffect,
  useState,
} from "react";

import {
  getPendingEmployees,
} from "../../api/adminApi";
import { Link } from "react-router-dom";
const PendingApprovals = () => {

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    const fetchEmployees =
      async () => {

        try {

          const data =
            await getPendingEmployees();

          setEmployees(data);

        } catch (error) {

          console.log(error);

        }
      };

    fetchEmployees();

  }, []);

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Pending Approvals
        </h2>

        <Link
          to="/admin/approvals"
          className="
    text-blue-600
    font-medium
    hover:text-blue-700
  "
        >
          View All
        </Link>

      </div>

      <div className="space-y-4">

        {employees.length === 0 ? (

          <p className="text-gray-500">
            No pending approvals
          </p>

        ) : (

          employees
            .slice(0, 5)
            .map((emp) => (

              <div
                key={emp._id}
                className="
                  border
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    h-12
                    w-12
                    rounded-full
                    bg-blue-100
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-blue-600
                  "
                >
                  {
                    emp.personalDetails?.fullName
                      ?.substring(0, 2)
                      .toUpperCase()
                  }
                </div>

                <div className="flex-1">

                  <p className="font-semibold">
                    {
                      emp.personalDetails
                        ?.fullName
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    {
                      emp.professionalDetails
                        ?.department
                    }
                  </p>

                </div>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    bg-orange-100
                    text-orange-700
                  "
                >
                  Pending
                </span>

              </div>

            ))

        )}

      </div>

    </div>

  );
};

export default PendingApprovals;