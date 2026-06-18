import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../../api/axiosInstance";

const ReviewSubmit = ({ formData }) => {
  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      await axiosInstance.post(
        "/employee/submit"
      );

      toast.success(
        "Onboarding Submitted Successfully"
      );

      window.location.href =
        "/employee/dashboard";

    } catch (error) {
      toast.error(
        "Submission Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Review & Submit
      </h2>

      <div className="space-y-6">

        {/* Personal */}

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            Personal Details
          </h3>

          <p>
            Name:
            {" "}
            {
              formData.personalDetails
                ?.fullName
            }
          </p>

          <p>
            Gender:
            {" "}
            {
              formData.personalDetails
                ?.gender
            }
          </p>
        </div>

        {/* Address */}

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            Address
          </h3>

          <p>
            {
              formData.addressDetails
                ?.address
            }
          </p>

          <p>
            {
              formData.addressDetails
                ?.city
            }
          </p>
        </div>

        {/* Contact */}

        <div className="border rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            Contact
          </h3>

          <p>
            {
              formData.contactDetails
                ?.mobileNumber
            }
          </p>

          <p>
            {
              formData.contactDetails
                ?.email
            }
          </p>
        </div>

        {/* Documents */}

        <div className="border rounded-xl p-4">

          <h3 className="font-semibold mb-2">
            Uploaded Documents
          </h3>

          {
            formData.documents?.map(
              (
                doc,
                index
              ) => (
                <div
                  key={index}
                >
                  {doc.documentType}
                  {" - "}
                  {doc.fileName}
                </div>
              )
            )
          }

        </div>

      </div>

      

    </div>
  );
};

export default ReviewSubmit;