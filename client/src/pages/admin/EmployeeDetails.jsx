import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getEmployeeById,
} from "../../api/employeeApi";

import {
  Avatar,
  AvatarFallback,
} from "../../components/ui/avatar";

import { Badge } from "../../components/ui/badge";

const EmployeeDetails = () => {

  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchEmployee =
      async () => {

        try {

          const data =
            await getEmployeeById(id);

          setEmployee(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchEmployee();

  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        Loading Employee...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        Employee not found
      </div>
    );
  }

  const statusStyles = {
    approved:
      "bg-green-100 text-green-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    rejected:
      "bg-red-100 text-red-700",
  };

  return (

    <div className="space-y-6">

      {/* PROFILE HEADER */}

      <div className="bg-white rounded-3xl shadow-sm p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-5">

            <Avatar className="h-20 w-20">

              <AvatarFallback
                className="
                  bg-blue-100
                  text-blue-700
                  text-2xl
                  font-bold
                "
              >
                {(employee.personalDetails?.fullName || "NA")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>

            </Avatar>

            <div>

              <h1 className="text-3xl font-bold">
                {employee.personalDetails?.fullName}
              </h1>

              <p className="text-gray-500 mt-1">
                Employee Code:
                {" "}
                {employee.employeeCode || "Not Assigned"}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                <Badge
                  className={
                    statusStyles[
                    employee.status
                    ]
                  }
                >
                  {employee.status}
                </Badge>

                <Badge variant="outline">
                  {
                    employee
                      ?.professionalDetails
                      ?.department
                  }
                </Badge>

                <Badge variant="outline">
                  {
                    employee
                      ?.professionalDetails
                      ?.designation
                  }
                </Badge>

              </div>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Experience
            </p>

            <h2 className="text-2xl font-bold">
              {
                employee
                  ?.professionalDetails
                  ?.experienceYears || 0
              }y{" "}
              {
                employee
                  ?.professionalDetails
                  ?.experienceMonths || 0
              }m
            </h2>

          </div>

        </div>

      </div>

      {/* PERSONAL + CONTACT */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl shadow-sm p-6">

          <h2 className="text-xl font-bold mb-5">
            Personal Information
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Name:</strong>{" "}
              {employee.personalDetails?.fullName}
            </p>

            <p>
              <strong>Parent Name:</strong>{" "}
              {employee.personalDetails?.parentName}
            </p>

            <p>
              <strong>Gender:</strong>{" "}
              {employee.personalDetails?.gender}
            </p>

            <p>
              <strong>DOB:</strong>{" "}
              {
                employee.personalDetails?.dateOfBirth
                  ? new Date(
                    employee.personalDetails.dateOfBirth
                  ).toLocaleDateString()
                  : "-"
              }
            </p>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-sm p-6">

          <h2 className="text-xl font-bold mb-5">
            Contact Information
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Email:</strong>{" "}
              {employee.contactDetails?.email}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {employee.contactDetails?.mobileNumber}
            </p>

            <p>
              <strong>Emergency Contact:</strong>{" "}
              {
                employee
                  ?.emergencyDetails
                  ?.contactNumber
              }
            </p>

          </div>

        </div>

      </div>

      {/* PROFESSIONAL */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Professional Information
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          <div>
            <p className="text-gray-500 text-sm">
              Department
            </p>

            <p className="font-semibold mt-1">
              {
                employee
                  ?.professionalDetails
                  ?.department
              }
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Designation
            </p>

            <p className="font-semibold mt-1">
              {
                employee
                  ?.professionalDetails
                  ?.designation
              }
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Company
            </p>

            <p className="font-semibold mt-1">
              {
                employee
                  ?.professionalDetails
                  ?.companyName
              }
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Experience
            </p>

            <p className="font-semibold mt-1">
              {
                employee
                  ?.professionalDetails
                  ?.experienceYears
              } Years{" "}
              {
                employee
                  ?.professionalDetails
                  ?.experienceMonths
              } Months
            </p>
          </div>

        </div>

      </div>

      {/* FAMILY */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Family Information
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <p>
            <strong>Father:</strong>{" "}
            {employee.familyDetails?.fatherName}
          </p>

          <p>
            <strong>Mother:</strong>{" "}
            {employee.familyDetails?.motherName}
          </p>

          <p>
            <strong>Marital Status:</strong>{" "}
            {
              employee.familyDetails
                ?.maritalStatus
            }
          </p>

          <p>
            <strong>Spouse:</strong>{" "}
            {
              employee.familyDetails
                ?.spouseName || "-"
            }
          </p>

        </div>

      </div>

      {/* DOCUMENTS */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Documents
        </h2>

        <div className="flex flex-wrap gap-3">

          {employee.documents?.length > 0 ? (

            employee.documents.map(
              (doc, index) => (

                <a

                  key={index}
                  href={`https://hrconnect-v2.onrender.com${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-blue-100
                  text-blue-700
                  hover:bg-blue-200
                  transition
                  "
                >
                  {doc.documentType}
                </a>

              )
            )

          ) : (

            <p className="text-gray-500">
              No documents uploaded
            </p>

          )}

        </div>

      </div>

      {/* TIMELINE */}

      <div className="bg-white rounded-3xl shadow-sm p-6">

        <h2 className="text-xl font-bold mb-5">
          Timeline
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div>

            <p className="text-gray-500 text-sm">
              Created On
            </p>

            <p className="font-semibold">
              {new Date(
                employee.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Last Updated
            </p>

            <p className="font-semibold">
              {new Date(
                employee.updatedAt
              ).toLocaleDateString()}
            </p>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Status
            </p>

            <p className="font-semibold capitalize">
              {employee.status}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default EmployeeDetails;