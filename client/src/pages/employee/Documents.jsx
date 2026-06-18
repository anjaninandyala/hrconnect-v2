import { useEffect, useState } from "react";
import { FileText, Eye, Download } from "lucide-react";
import { getMyProfile } from "../../api/employeeApi";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const profile = await getMyProfile();

        setDocuments(profile?.documents || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Loading Documents...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          My Documents
        </h1>

        <p className="text-slate-500 mt-2">
          View and download uploaded documents
        </p>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white rounded-2xl border p-8 text-center">
          No documents uploaded yet
        </div>
      ) : (
        <div className="grid gap-4">

          {documents.map((doc) => (
            <div
              key={doc._id}
              className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                p-5
                flex
                justify-between
                items-center
              "
            >

              <div className="flex items-center gap-4">

                <div className="bg-blue-100 p-3 rounded-xl">
                  <FileText
                    className="text-blue-600"
                    size={24}
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {doc.documentType}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {doc.fileName}
                  </p>
                </div>

              </div>

              <div className="flex gap-2">

                {doc.filePath && (
                  <>
                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                      "
                    >
                      <Eye size={16} />
                      View
                    </a>

                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      download
                      className="
                        flex
                        items-center
                        gap-2
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                        hover:bg-green-700
                      "
                    >
                      <Download size={16} />
                      Download
                    </a>
                  </>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Documents;