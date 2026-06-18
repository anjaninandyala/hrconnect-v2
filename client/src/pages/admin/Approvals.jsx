
import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Check,
  X,
  Mail,
  Phone,
  Building2,
  Briefcase,
  FileText,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

import { Button } from "../../components/ui/button";

import {
  getPendingEmployees,
  approveEmployee,
  rejectEmployee,
} from "../../api/adminApi";

const Approvals = () => {

  const navigate =
    useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const [selectedEmployee,
    setSelectedEmployee] =
    useState(null);
  const [searchTerm, setSearchTerm] =
    useState("");

  const [departmentFilter,
    setDepartmentFilter] =
    useState("");
  const fetchEmployees =
    async () => {

      try {

        const data =
          await getPendingEmployees();

        setEmployees(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchEmployees();

  }, []);
  const updateDepartment = (
    id,
    department
  ) => {

    setEmployees((prev) =>
      prev.map((emp) =>
        emp._id === id
          ? {
            ...emp,
            assignedDepartment:
              department,
          }
          : emp
      )
    );

    setSelectedEmployee((prev) => ({
      ...prev,
      assignedDepartment:
        department,
    }));

  };
  const handleApprove =
    async (
      id,
      department
    ) => {

      try {

        await approveEmployee(
          id,
          department
        );
        setSelectedEmployee(null);
        setEmployees((prev) =>
          prev.filter(
            (emp) =>
              emp._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleReject =
    async (id) => {

      try {

        await rejectEmployee(id);

        setEmployees((prev) =>
          prev.filter(
            (emp) =>
              emp._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  if (loading) {

    return (
      <div className="p-6">
        Loading approvals...
      </div>
    );
  }
  const filteredEmployees =
    employees.filter((emp) => {

      const matchesSearch =
        emp.personalDetails?.fullName
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesDepartment =
        departmentFilter === ""
          ? true
          : emp.professionalDetails
            ?.department ===
          departmentFilter;

      return (
        matchesSearch &&
        matchesDepartment
      );

    });
  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Employee Approvals
        </h1>

        <p className="text-gray-500 mt-2">
          Review and approve employee onboarding requests.
        </p>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <p className="text-gray-500">
            Pending Requests
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {employees.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <p className="text-gray-500">
            Documents Uploaded
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {
              employees.reduce(
                (total, emp) =>
                  total +
                  (emp.documents?.length || 0),
                0
              )
            }
          </h2>

        </div>

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <p className="text-gray-500">
            Departments
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {
              new Set(
                employees.map(
                  (emp) =>
                    emp.professionalDetails?.department
                )
              ).size
            }
          </h2>

        </div>

      </div>
      <div
        className="
    bg-white
    border
    rounded-3xl
    p-5
    flex
    flex-col
    md:flex-row
    gap-4
  "
      >

        <input
          type="text"
          placeholder="Search employee..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          className="
      flex-1
      border
      rounded-xl
      px-4
      py-3
    "
        />

        <select
          value={departmentFilter}
          onChange={(e) =>
            setDepartmentFilter(
              e.target.value
            )
          }
          className="
      border
      rounded-xl
      px-4
      py-3
      min-w-[200px]
    "
        >

          <option value="">
            All Departments
          </option>

          <option value="HR">
            HR
          </option>

          <option value="Engineering">
            Engineering
          </option>

          <option value="Finance">
            Finance
          </option>

          <option value="Operations">
            Operations
          </option>

          <option value="Sales">
            Sales
          </option>

        </select>

      </div>
      {/* EMPTY STATE */}

      {employees.length === 0 && (

        <Card className="rounded-3xl border shadow-sm">

          <CardContent className="p-12">

            <p className="text-center text-gray-500 text-lg">
              No pending approvals 🎉
            </p>

          </CardContent>

        </Card>

      )}

      {/* APPROVAL CARDS */}

      <div className="grid md:grid-cols-2 gap-6">
        {
          filteredEmployees.length === 0 && (

            <div
              className="
        bg-white
        border
        rounded-3xl
        p-10
        text-center
      "
            >

              <p className="text-gray-500">
                No employees found
              </p>

            </div>

          )
        }

        {filteredEmployees.map((emp) => (

          <Card
            key={emp._id}
            className="
    rounded-3xl
    border
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-300
    h-full
  "
          >

            <CardHeader>

              <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">

                  <div
                    className="
      w-12
      h-12
      rounded-full
      bg-blue-100
      flex
      items-center
      justify-center
      text-blue-600
      font-bold
      text-lg
    "
                  >
                    {
                      emp.personalDetails?.fullName
                        ?.charAt(0)
                        ?.toUpperCase()
                    }
                  </div>

                  <div>

                    <CardTitle className="text-xl">

                      {
                        emp.personalDetails?.fullName
                      }

                    </CardTitle>

                    <p className="text-sm text-gray-500">

                      Employee Code:
                      {" "}
                      {
                        emp.employeeCode ||
                        "Pending Assignment"
                      }

                    </p>

                  </div>

                </div>

                <span
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-orange-100
                    text-orange-700
                    text-sm
                    font-medium
                  "
                >
                  Pending Review
                </span>

              </div>

            </CardHeader>

            <CardContent className="pt-2">

              <div className="grid md:grid-cols-2 gap-4">

                <div className="flex items-center gap-2">

                  <Mail size={16} />

                  <span>
                    {
                      emp.contactDetails?.email
                    }
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Phone size={16} />

                  <span>
                    {
                      emp.contactDetails?.mobileNumber
                    }
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Building2 size={16} />

                  <span>
                    {
                      emp.professionalDetails?.department
                    }
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <Briefcase size={16} />

                  <span>
                    {
                      emp.professionalDetails?.designation
                    }
                  </span>

                </div>

              </div>

              <div className="mt-4">

                <p className="font-medium">

                  Experience:
                  {" "}
                  {
                    emp.professionalDetails?.experienceYears || 0
                  }
                  {" "}Years{" "}
                  {
                    emp.professionalDetails?.experienceMonths || 0
                  }
                  {" "}Months

                </p>

              </div>


              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3 mt-6">

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/admin/employees/${emp._id}`
                    )
                  }
                >
                  View Profile
                </Button>

                <Button
                  onClick={() =>
                    setSelectedEmployee(emp)
                  }
                >
                  Review Application
                </Button>

              </div>



            </CardContent>

          </Card>

        ))}

      </div>
      {
        selectedEmployee && (

          <div
            className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
      "
          >

            <div
              className="
          bg-white
          rounded-3xl
          p-8
          w-full
          max-w-3xl
          max-h-[90vh]
          overflow-y-auto
        "
            >

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">
                  Employee Review
                </h2>

                <button
                  onClick={() =>
                    setSelectedEmployee(null)
                  }
                >
                  ✕
                </button>

              </div>

              <div className="mt-6 space-y-6">

                <div>

                  <p className="font-medium">
                    Name
                  </p>

                  <p>
                    {
                      selectedEmployee
                        .personalDetails
                        ?.fullName
                    }
                  </p>

                </div>

                <div>

                  <p className="font-medium">
                    Requested Department
                  </p>

                  <p>
                    {
                      selectedEmployee
                        .professionalDetails
                        ?.department
                    }
                  </p>

                </div>

                <div>

                  <label className="block mb-2">
                    Final Department
                  </label>

                  <select
                    value={
                      selectedEmployee.assignedDepartment ||
                      selectedEmployee.professionalDetails
                        ?.department
                    }
                    onChange={(e) =>
                      updateDepartment(
                        selectedEmployee._id,
                        e.target.value
                      )
                    }
                    className="
                w-full
                border
                rounded-xl
                p-3
              "
                  >
                    <option>
                      HR
                    </option>

                    <option>
                      Engineering
                    </option>

                    <option>
                      Finance
                    </option>

                    <option>
                      Operations
                    </option>

                    <option>
                      Sales
                    </option>

                  </select>

                </div>

                <div>

                  <h4 className="font-semibold mb-3">
                    Documents
                  </h4>

                  <div className="flex flex-wrap gap-2">

                    {
                      selectedEmployee.documents?.map(
                        (doc, index) => (

                          <a
                            key={index}
                            href={`https://hrconnect-v2.onrender.com${doc.filePath}`}
                            target="_blank"
                            rel="noreferrer"
                            className="
                        bg-blue-50
                        text-blue-700
                        px-4
                        py-2
                        rounded-xl
                      "
                          >
                            {doc.documentType}
                          </a>

                        )
                      )
                    }

                  </div>

                </div>

                <div className="flex gap-3">

                  <Button
                    className="
                bg-green-600
              "
                    onClick={() =>
                      handleApprove(
                        selectedEmployee._id,
                        selectedEmployee.assignedDepartment ||
                        selectedEmployee.professionalDetails?.department
                      )
                    }
                  >
                    Approve
                  </Button>

                  <Button
                    className="
                bg-red-600
              "
                    onClick={() =>
                      handleReject(
                        selectedEmployee._id
                      )
                    }
                  >
                    Reject
                  </Button>

                </div>

              </div>

            </div>

          </div>

        )
      }
    </div >

  );
};

export default Approvals;
