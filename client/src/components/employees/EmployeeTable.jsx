import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Badge } from "../ui/badge";

import {
  Avatar,
  AvatarFallback,
} from "../ui/avatar";

const statusStyles = {
  approved:
    "bg-emerald-100 text-emerald-700 border-emerald-200",

  pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  rejected:
    "bg-red-100 text-red-700 border-red-200",
};

export default function EmployeeTable({
  employees,
}) {

  const navigate =
    useNavigate();

  return (

    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        overflow-hidden
      "
    >

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Employee
            </TableHead>

            <TableHead>
              Code
            </TableHead>

            <TableHead>
              Department
            </TableHead>

            <TableHead>
              Designation
            </TableHead>

            <TableHead>
              Experience
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead>
              Action
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {employees.map(
            (emp, index) => (

              <motion.tr
                key={emp._id}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay:
                    index * 0.05,
                }}
                className="
                  cursor-pointer
                  hover:bg-slate-50
                "
                onClick={() =>
                  navigate(
                    `/admin/employees/${emp._id}`
                  )
                }
              >

                <TableCell>

                  <div className="flex items-center gap-3">

                    <Avatar>

                      <AvatarFallback
                        className="
                          bg-blue-100
                          text-blue-700
                          font-semibold
                        "
                      >

                        {(emp
                          ?.personalDetails
                          ?.fullName || "NA")
                          .split(" ")
                          .map(
                            (n) =>
                              n[0]
                          )
                          .join("")
                          .slice(0, 2)}

                      </AvatarFallback>

                    </Avatar>

                    <div>

                      <p className="font-semibold">

                        {
                          emp
                            ?.personalDetails
                            ?.fullName
                        }

                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-500
                        "
                      >

                        {
                          emp
                            ?.contactDetails
                            ?.email
                        }

                      </p>

                    </div>

                  </div>

                </TableCell>

                <TableCell>

                  <span className="font-medium">
                    {
                      emp.employeeCode ||
                      "-"
                    }
                  </span>

                </TableCell>

                <TableCell>

                  {
                    emp
                      ?.professionalDetails
                      ?.department || "-"
                  }

                </TableCell>

                <TableCell>

                  {
                    emp
                      ?.professionalDetails
                      ?.designation || "-"
                  }

                </TableCell>

                <TableCell>

                  {
                    emp
                      ?.professionalDetails
                      ?.experienceYears || 0
                  }y{" "}

                  {
                    emp
                      ?.professionalDetails
                      ?.experienceMonths || 0
                  }m

                </TableCell>

                <TableCell>

                  <Badge
                    variant="outline"
                    className={
                      statusStyles[
                        emp.status
                      ]
                    }
                  >
                    {emp.status}
                  </Badge>

                </TableCell>

                <TableCell>

                  <button
                    onClick={(e) => {

                      e.stopPropagation();

                      navigate(
                        `/admin/employees/${emp._id}`
                      );

                    }}
                    className="
                      px-3
                      py-1.5
                      rounded-lg
                      bg-blue-600
                      text-white
                      text-sm
                      hover:bg-blue-700
                      transition
                    "
                  >
                    View
                  </button>

                </TableCell>

              </motion.tr>

            )
          )}

        </TableBody>

      </Table>

    </div>

  );
}