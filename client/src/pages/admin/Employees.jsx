import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Search,
  Plus,
} from "lucide-react";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import EmployeeTable from "../../components/employees/EmployeeTable";

import {
  getEmployees,
} from "../../api/employeeApi";

export default function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [deptFilter, setDeptFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const perPage = 6;

  useEffect(() => {

    const fetchEmployees =
      async () => {

        try {

          const data =
            await getEmployees();

          setEmployees(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchEmployees();

  }, []);

  const departments =
    useMemo(() => {

      const unique =
        employees
          .map(
            (emp) =>
              emp
                ?.professionalDetails
                ?.department
          )
          .filter(Boolean);

      return [
        ...new Set(unique),
      ];

    }, [employees]);

  const filteredEmployees =
    employees.filter((emp) => {

      const fullName =
        emp
          ?.personalDetails
          ?.fullName || "";

      const email =
        emp
          ?.contactDetails
          ?.email || "";

      const code =
        emp
          ?.employeeCode || "";

      const department =
        emp
          ?.professionalDetails
          ?.department || "";

      const matchesSearch =
        `${fullName} ${email} ${code}`
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesDept =
        deptFilter === "all"
          ? true
          : department ===
            deptFilter;

      return (
        matchesSearch &&
        matchesDept
      );
    });

  const totalPages =
    Math.ceil(
      filteredEmployees.length /
      perPage
    );

  const pagedEmployees =
    filteredEmployees.slice(
      (page - 1) * perPage,
      page * perPage
    );

  if (loading) {
    return (
      <div className="p-6">
        Loading Employees...
      </div>
    );
  }

  return (

    <div className="space-y-6">

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
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          justify-between
          gap-4
        "
      >

        <div>

          <h1
            className="
              text-4xl
              font-bold
              text-slate-900
            "
          >
            Employees
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            {filteredEmployees.length}
            {" "}
            employees found
          </p>

        </div>

        <Link
          to="/employee/onboarding"
        >
          <Button
            className="
              bg-blue-600
              hover:bg-blue-700
              gap-2
            "
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </Button>
        </Link>

      </motion.div>

      {/* SEARCH + FILTER */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.1,
        }}
        className="
          flex
          flex-col
          lg:flex-row
          gap-4
          items-center
        "
      >

        <div
          className="
            relative
            w-full
          "
        >

          <Search
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              w-4
              h-4
              text-gray-400
            "
          />

          <Input
            placeholder="Search employee, email, code..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              pl-10
              h-11
              bg-white
            "
          />

        </div>

        <select
          value={deptFilter}
          onChange={(e) =>
            setDeptFilter(
              e.target.value
            )
          }
          className="
            h-11
            px-4
            rounded-xl
            border
            bg-white
            min-w-[220px]
            shadow-sm
          "
        >

          <option value="all">
            All Departments
          </option>

          {departments.map(
            (dept) => (
              <option
                key={dept}
                value={dept}
              >
                {dept}
              </option>
            )
          )}

        </select>

      </motion.div>

      {/* TABLE */}

      <EmployeeTable
        employees={
          pagedEmployees
        }
      />

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            Page {page} of {totalPages}
          </p>

          <div
            className="
              flex
              gap-2
            "
          >

            <Button
              variant="outline"
              size="sm"
              disabled={
                page <= 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
            >
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={
                page >=
                totalPages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
            >
              Next
            </Button>

          </div>

        </div>

      )}

    </div>

  );
}