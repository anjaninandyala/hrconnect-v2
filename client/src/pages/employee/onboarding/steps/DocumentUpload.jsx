import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../../../api/axiosInstance";

const DocumentUpload = ({
  formData,
  setFormData,
}) => {

  const [documentType, setDocumentType] =
    useState("");

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload = async () => {

    if (!documentType || !selectedFile) {

      toast.error(
        "Select document type and file"
      );

      return;
    }

    try {

      setUploading(true);

      const uploadData =
        new FormData();

      uploadData.append(
        "documentType",
        documentType
      );

      uploadData.append(
        "file",
        selectedFile
      );

      await axiosInstance.post(
        "/documents/upload",
        uploadData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Document Uploaded"
      );

      setFormData({
        ...formData,

        documents: [
          ...formData.documents,

          {
            documentType,
            fileName:
              selectedFile.name,
          },
        ],
      });

      setSelectedFile(null);
      setDocumentType("");

    } catch (error) {

      toast.error(
        "Upload Failed"
      );

    } finally {

      setUploading(false);

    }
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Document Upload
      </h2>

      <div className="space-y-5">

        {/* Document Type */}

        <div>

          <label className="block mb-2 font-medium">
            Document Type
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            value={documentType}
            onChange={(e) =>
              setDocumentType(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "
          >
            <option value="">
              Select Document Type *
            </option>

            <option value="Resume">
              Resume (Required)
            </option>

            <option value="Certificate">
              Certificate
            </option>

            <option value="Government ID">
              Government ID
            </option>

            <option value="Address Proof">
              Address Proof
            </option>

          </select>

        </div>

        {/* Upload Area */}

        <div>

          <label className="block mb-2 font-medium">
            Upload Document
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <label
            className="
              flex
              items-center
              justify-center
              w-full
              h-36
              border-2
              border-dashed
              border-slate-300
              rounded-xl
              cursor-pointer
              hover:border-blue-500
              hover:bg-blue-50
              transition
            "
          >

            <div className="text-center">

              <p className="font-medium text-lg">
                Click to Upload File
              </p>

              <p className="text-sm text-slate-500 mt-1">
                PDF, JPG, PNG, DOCX
              </p>

              {selectedFile && (

                <p className="text-green-600 mt-3 font-medium">
                  {selectedFile.name}
                </p>

              )}

            </div>

            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files[0]
                )
              }
            />

          </label>

        </div>

        {/* Upload Button */}

        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-blue-700
            transition
          "
        >
          {
            uploading
              ? "Uploading..."
              : "Upload Document"
          }
        </button>

      </div>

      {/* Uploaded Documents */}

      <div className="mt-10">

        <h3 className="font-semibold text-lg mb-4">
          Uploaded Documents
        </h3>

        {
          formData.documents?.length === 0 && (

            <div className="bg-slate-50 border rounded-xl p-4 text-slate-500">
              No documents uploaded yet.
            </div>

          )
        }

        <div className="space-y-3">

          {formData.documents?.map(
            (doc, index) => (

              <div
                key={index}
                className="
                  border
                  rounded-xl
                  p-4
                  bg-slate-50
                  flex
                  justify-between
                  items-center
                "
              >

                <div>

                  <p className="font-medium">
                    {doc.documentType}
                  </p>

                  <p className="text-sm text-gray-500">
                    {doc.fileName}
                  </p>

                </div>

                <div className="text-green-600 font-semibold">
                  Uploaded ✓
                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
};

export default DocumentUpload;