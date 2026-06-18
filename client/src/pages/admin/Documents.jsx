import {
  useEffect,
  useState,
} from "react";

import {
  FileText,
  AlertCircle,
  Users,
  Eye,
  Download,
} from "lucide-react";

import {
  getEmployees,
} from "../../api/employeeApi";

const Documents = () => {

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState({
      totalDocuments: 0,
      employeesWithDocs: 0,
      missingDocs: 0,
    });

  useEffect(() => {

    const fetchDocs = async () => {

      try {

        const employees =
          await getEmployees();

        const docs = [];

        let employeesWithDocs = 0;

        employees.forEach((emp) => {

          const employeeDocs =
            emp.documents || [];

          if (
            employeeDocs.length > 0
          ) {
            employeesWithDocs++;
          }

          employeeDocs.forEach(
            (doc) => {

              docs.push({
                employee:
                  emp.personalDetails
                    ?.fullName ||
                  "N/A",

                department:
                  emp.professionalDetails
                    ?.department ||
                  "N/A",

                fileName:
                  doc.fileName ||
                  "Unknown File",

                documentType:
                  doc.documentType ||
                  "Document",

                filePath:
                  doc.filePath || "",
              });

            }
          );
        });

        setDocuments(docs);

        setStats({
          totalDocuments:
            docs.length,

          employeesWithDocs,

          missingDocs:
            employees.length -
            employeesWithDocs,
        });

      } catch (error) {

        console.log(
          "DOCUMENT ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    fetchDocs();

  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading Documents...
      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Documents
        </h1>

        <p className="text-gray-500 mt-2">
          Manage employee uploaded documents
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Documents
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.totalDocuments}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">

              <FileText
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
                Employees With Docs
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.employeesWithDocs}
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

        <div className="bg-white rounded-3xl border shadow-sm p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Missing Documents
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.missingDocs}
              </h2>

            </div>

            <div className="h-14 w-14 rounded-2xl bg-red-100 flex items-center justify-center">

              <AlertCircle
                size={28}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Uploaded Documents
          </h2>

        </div>

        {documents.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No documents uploaded yet
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-slate-50 border-b">

                  <th className="p-4 text-left">
                    Employee
                  </th>

                  <th className="p-4 text-left">
                    Department
                  </th>

                  <th className="p-4 text-left">
                    Document Type
                  </th>

                  <th className="p-4 text-left">
                    File Name
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {documents.map(
                  (doc, index) => (

                    <tr
                      key={index}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4 font-medium">
                        {doc.employee}
                      </td>

                      <td className="p-4">
                        {doc.department}
                      </td>

                      <td className="p-4">
                        {doc.documentType}
                      </td>

                      <td className="p-4 text-blue-600">
                        {doc.fileName}
                      </td>

                      <td className="p-4">

                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-medium
                            bg-green-100
                            text-green-700
                          "
                        >
                          Uploaded
                        </span>

                      </td>

                      <td className="p-4">

                        {doc.filePath ? (

                          <div className="flex gap-2">

                            <a
                              href={`https://hrconnect-v2.onrender.com${doc.filePath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                              "
                            >
                              <Eye size={16} />
                              View
                            </a>

                            <a
                              href={`https://hrconnect-v2.onrender.com${doc.filePath}`}
                              download
                              className="
                                flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-green-600
                                text-white
                                hover:bg-green-700
                              "
                            >
                              <Download size={16} />
                              Download
                            </a>

                          </div>

                        ) : (

                          <span className="text-red-500">
                            Missing File
                          </span>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );
};

export default Documents;