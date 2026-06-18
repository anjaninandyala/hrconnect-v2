import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import {
  UserCheck,
  BadgeCheck,
  Briefcase,
  Building2,
  Mail,
  Phone,
  FileText,
  Clock,

} from "lucide-react";

import {
  getEmployeeStatus,
  getMyProfile,
} from "../../api/employeeApi";


import toast from "react-hot-toast";

const Dashboard = () => {


  const navigate = useNavigate();

  const [statusData, setStatusData] =
    useState(null);

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const status =
            await getEmployeeStatus();

          const employeeProfile =
            await getMyProfile();

          setStatusData(status);
          setProfile(employeeProfile);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-lg text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  const statusColor =
    statusData?.status === "approved"
      ? "bg-green-100 text-green-700"
      : statusData?.status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";
  const checklist = [
    {
      label: "Personal Details",
      completed:
        !!profile?.personalDetails?.fullName,
    },

    {
      label: "Address Details",
      completed:
        !!profile?.addressDetails?.address,
    },

    {
      label: "Professional Details",
      completed:
        !!profile?.professionalDetails?.department,
    },

    {
      label: "Government Details",
      completed:
        !!profile?.governmentDetails?.aadhaarNumber,
    },

    {
      label: "Documents Uploaded",
      completed:
        profile?.documents?.length > 0,
    },

    {
      label: "HR Approval",
      completed:
        statusData?.status === "approved",
    },
  ];

  const completedCount =
    checklist.filter(
      (item) => item.completed
    ).length;
  const progress =
    Math.round(
      (completedCount /
        checklist.length) *
      100
    );
  const downloadIDCard = () => {

    const pdf = new jsPDF();

    pdf.setFontSize(22);

    pdf.text(
      "HRCONNECT EMPLOYEE ID CARD",
      20,
      20
    );

    pdf.setFontSize(14);

    pdf.text(
      `Employee Code: ${statusData?.employeeCode || "N/A"
      }`,
      20,
      45
    );

    pdf.text(
      `Name: ${profile?.personalDetails?.fullName || ""
      }`,
      20,
      60
    );

    pdf.text(
      `Department: ${profile?.professionalDetails?.department || ""
      }`,
      20,
      75
    );

    pdf.text(
      `Designation: ${profile?.professionalDetails?.designation || ""
      }`,
      20,
      90
    );

    pdf.text(
      `Email: ${profile?.contactDetails?.email || ""
      }`,
      20,
      105
    );

    pdf.text(
      `Status: ${statusData?.status || ""
      }`,
      20,
      120
    );

    pdf.save(
      `${statusData?.employeeCode || "employee"}-IDCard.pdf`
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <div>

            <h1 className="text-4xl font-bold">
              Employee Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Welcome back,
              {
                profile?.personalDetails?.fullName ||
                "Employee"
              }
            </p>

          </div>



        </div>

        {/* TOP CARDS */}

        <div className="grid md:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold ${statusColor}`}
                >
                  {statusData?.status || "draft"}
                </span>
              </div>

              <UserCheck
                size={32}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Employee Code
                </p>

                <h2 className="text-xl font-bold mt-3">
                  {
                    statusData?.employeeCode ||
                    "Not Assigned"
                  }
                </h2>

              </div>

              <BadgeCheck
                size={32}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Department
                </p>

                <h2 className="text-xl font-bold mt-3">
                  {
                    profile?.professionalDetails
                      ?.department || "-"
                  }
                </h2>

              </div>

              <Briefcase
                size={32}
                className="text-purple-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Designation
                </p>

                <h2 className="text-xl font-bold mt-3">
                  {
                    profile?.professionalDetails
                      ?.designation || "-"
                  }
                </h2>

              </div>

              <Building2
                size={32}
                className="text-orange-600"
              />

            </div>

          </div>

        </div>

        {/* PROFILE */}

        <div className="mt-8 bg-white rounded-3xl border p-8">

          <h2 className="text-2xl font-bold mb-8">
            Employee Information
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-xs uppercase text-slate-500 mb-2">
                Full Name
              </p>

              <p className="font-semibold text-lg">
                {profile?.personalDetails?.fullName || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-xs uppercase text-slate-500 mb-2">
                Parent Name
              </p>

              <p className="font-semibold text-lg">
                {profile?.personalDetails?.parentName || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <p className="text-xs uppercase text-slate-500 mb-2">
                Gender
              </p>

              <p className="font-semibold text-lg">
                {profile?.personalDetails?.gender || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Mail size={16} />
                <span className="text-xs uppercase">
                  Email
                </span>
              </div>

              <p className="font-semibold">
                {profile?.contactDetails?.email || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Phone size={16} />
                <span className="text-xs uppercase">
                  Mobile
                </span>
              </div>

              <p className="font-semibold">
                {profile?.contactDetails?.mobileNumber || "-"}
              </p>
            </div>

            <div className="border rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Clock size={16} />
                <span className="text-xs uppercase">
                  Experience
                </span>
              </div>

              <p className="font-semibold">
                {profile?.professionalDetails?.experienceYears || 0}
                {" "}Years{" "}
                {profile?.professionalDetails?.experienceMonths || 0}
                {" "}Months
              </p>
            </div>

          </div>

        </div>


        <div className="mt-8 bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Onboarding Progress
            </h2>

            <span className="font-bold text-blue-600">
              {progress}%
            </span>

          </div>

          <div className="w-full bg-slate-200 rounded-full h-4 mb-6">

            <div
              className="
        bg-blue-600
        h-4
        rounded-full
        transition-all
      "
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {checklist.map((item) => (

              <div
                key={item.label}
                className="
          flex
          items-center
          gap-3
          border
          rounded-xl
          p-3
        "
              >

                <div
                  className={`
            h-6
            w-6
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-xs
            ${item.completed
                      ? "bg-green-500"
                      : "bg-gray-400"
                    }
          `}
                >
                  ✓
                </div>

                <span>
                  {item.label}
                </span>

              </div>

            ))}

          </div>

        </div>
        {/* Employee ID Card */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Employee ID Card
          </h2>

          <div
            className="
      max-w-md
      bg-gradient-to-r
      from-blue-600
      to-indigo-700
      text-white
      rounded-2xl
      shadow-xl
      p-5
    "
          >

            <div className="flex justify-between items-center">

              <div>

                <h3 className="text-xl font-bold">
                  HRConnect
                </h3>

                <p className="text-blue-100">
                  Employee Identity Card
                </p>

              </div>

              <div
                className="
          h-16
          w-16
          rounded-full
          bg-white
          text-blue-600
          flex
          items-center
          justify-center
          text-xl
          font-bold
        "
              >
                {
                  profile?.personalDetails
                    ?.fullName
                    ?.split(" ")
                    .map(
                      (name) => name[0]
                    )
                    .join("")
                    .slice(0, 2)
                }
              </div>

            </div>

            <div className="mt-6">

              <p className="text-sm text-blue-100">
                Employee Code
              </p>

              <h2 className="text-3xl font-bold">
                {
                  statusData?.employeeCode ||
                  "Pending"
                }
              </h2>

            </div>

            <div className="mt-6 space-y-2">

              <p>
                <span className="text-blue-100">
                  Name:
                </span>{" "}
                {
                  profile?.personalDetails
                    ?.fullName
                }
              </p>

              <p>
                <span className="text-blue-100">
                  Department:
                </span>{" "}
                {
                  profile?.professionalDetails
                    ?.department
                }
              </p>

              <p>
                <span className="text-blue-100">
                  Designation:
                </span>{" "}
                {
                  profile?.professionalDetails
                    ?.designation
                }
              </p>

              <p>
                <span className="text-blue-100">
                  Status:
                </span>{" "}

                <span
                  className="
            bg-green-500
            px-2
            py-1
            rounded-full
            text-xs
          "
                >
                  {
                    statusData?.status
                  }
                </span>

              </p>

            </div>

          </div>

        </div>
        {/* Documents */}

        <div className="mt-8 bg-white rounded-2xl shadow-sm p-5">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              Uploaded Documents
            </h2>

            <span className="text-sm text-gray-500">
              {profile?.documents?.length || 0} Files
            </span>

          </div>

          {profile?.documents?.length > 0 ? (

            <div className="space-y-4">

              {profile.documents.map((doc) => (

                <div
                  key={doc._id}
                  className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
            border
            rounded-2xl
            p-4
            hover:bg-slate-50
          "
                >

                  <div className="flex items-center gap-4">

                    <div
                      className="
                h-12
                w-12
                rounded-xl
                bg-blue-100
                flex
                items-center
                justify-center
              "
                    >

                      <FileText
                        className="text-blue-600"
                        size={24}
                      />

                    </div>

                    <div>

                      <p className="font-semibold">
                        {doc.documentType}
                      </p>

                      <p className="text-sm text-gray-500">
                        {doc.fileName}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    {doc.filePath && (

                      <>
                        <a
                          href={`http://localhost:5000/${doc.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                    px-4
                    py-2
                    rounded-xl
                    bg-blue-600
                    text-white
                    hover:bg-blue-700
                  "
                        >
                          View
                        </a>

                        <a
                          href={`http://localhost:5000/${doc.filePath}`}
                          download
                          className="
                    px-4
                    py-2
                    rounded-xl
                    bg-green-600
                    text-white
                    hover:bg-green-700
                  "
                        >
                          Download
                        </a>
                      </>
                    )}

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div
              className="
        border-2
        border-dashed
        rounded-2xl
        p-10
        text-center
      "
            >

              <FileText
                size={50}
                className="
          mx-auto
          text-gray-300
          mb-4
        "
              />

              <p className="text-gray-500">
                No documents uploaded yet
              </p>

            </div>

          )}

        </div>
        {/* Activity Timeline */}

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

          <h2 className="text-2xl font-bold mb-6">
            Activity Timeline
          </h2>

          <div className="space-y-6">

            <div className="flex gap-4">

              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                ✓
              </div>

              <div>
                <p className="font-semibold">
                  Profile Created
                </p>

                <p className="text-gray-500 text-sm">
                  {new Date(
                    profile?.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            {profile?.documents?.length > 0 && (

              <div className="flex gap-4">

                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  📄
                </div>

                <div>
                  <p className="font-semibold">
                    Documents Uploaded
                  </p>

                  <p className="text-gray-500 text-sm">
                    {profile.documents.length}
                    {" "}
                    document(s)
                  </p>
                </div>

              </div>

            )}

            <div className="flex gap-4">

              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                ⏳
              </div>

              <div>
                <p className="font-semibold">
                  Submitted For Approval
                </p>

                <p className="text-gray-500 text-sm">
                  Status:
                  {" "}
                  {statusData?.status}
                </p>
              </div>

            </div>

            {statusData?.status === "approved" && (

              <div className="flex gap-4">

                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  ✓
                </div>

                <div>
                  <p className="font-semibold text-green-700">
                    Approved By HR
                  </p>

                  <p className="text-gray-500 text-sm">
                    Employee Code:
                    {" "}
                    {statusData?.employeeCode}
                  </p>
                </div>

              </div>

            )}

          </div>

        </div>
        {/* ACTIONS */}

        <div className="mt-8 flex gap-4">

          <button
            onClick={() =>
              navigate(
                "/employee/onboarding"
              )
            }
            className="
              bg-blue-600
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-blue-700
            "
          >
            Update Onboarding
          </button>

          <button
            onClick={downloadIDCard}
            className="
              bg-green-600
              text-white
              px-6
              py-3
              rounded-xl
              hover:bg-green-700
            "
          >
            Download ID Card PDF
          </button>

        </div>

      </div>

    </div>

  );
};

export default Dashboard;