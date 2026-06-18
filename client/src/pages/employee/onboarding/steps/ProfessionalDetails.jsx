import { useEffect } from "react";

const ProfessionalDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      professionalDetails: {
        ...formData.professionalDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  const calculateExperience = () => {

    const start =
      formData.professionalDetails
        ?.experienceStartDate;

    const end =
      formData.professionalDetails
        ?.experienceEndDate;

    if (!start || !end) return;

    const startDate =
      new Date(start);

    const endDate =
      new Date(end);

    let months =
      (endDate.getFullYear() -
        startDate.getFullYear()) *
        12 +
      (endDate.getMonth() -
        startDate.getMonth());

    const years =
      Math.floor(months / 12);

    months =
      months % 12;

    setFormData((prev) => ({
      ...prev,

      professionalDetails: {
        ...prev.professionalDetails,

        experienceYears:
          years,

        experienceMonths:
          months,
      },
    }));
  };

  useEffect(() => {
    calculateExperience();
  }, [
    formData.professionalDetails
      ?.experienceStartDate,

    formData.professionalDetails
      ?.experienceEndDate,
  ]);

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Work Experience & Department Preferences
        </h2>

        <p className="text-gray-500 mt-2">
          Tell us about your previous work experience
          and preferred department.
        </p>

      </div>

      <div className="space-y-5">

        {/* PREVIOUS COMPANY */}

        <div>

          <label className="block mb-2 font-medium">
            Previous Company
          </label>

          <input
            type="text"
            name="previousOrganization"
            placeholder="Enter Previous Company Name"
            value={
              formData.professionalDetails
                ?.previousOrganization || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        {/* PREVIOUS DESIGNATION */}

        <div>

          <label className="block mb-2 font-medium">
            Previous Designation
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="designation"
            required
            placeholder="Enter Previous Designation"
            value={
              formData.professionalDetails
                ?.designation || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        {/* PREFERRED DEPARTMENT */}

        <div>

          <label className="block mb-2 font-medium">
            Preferred Department
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            name="department"
            required
            value={
              formData.professionalDetails
                ?.department || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          >

            <option value="">
              Select Preferred Department
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

        {/* EMPLOYMENT START DATE */}

        <div>

          <label className="block mb-2 font-medium">
            Previous Employment Start Date
          </label>

          <input
            type="date"
            name="experienceStartDate"
            value={
              formData.professionalDetails
                ?.experienceStartDate || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        {/* EMPLOYMENT END DATE */}

        <div>

          <label className="block mb-2 font-medium">
            Previous Employment End Date
          </label>

          <input
            type="date"
            name="experienceEndDate"
            value={
              formData.professionalDetails
                ?.experienceEndDate || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

        </div>

        {/* EXPERIENCE CARD */}

        <div
          className="
            bg-blue-50
            border
            border-blue-100
            rounded-2xl
            p-5
          "
        >

          <p
            className="
              text-sm
              text-blue-600
              font-medium
            "
          >
            Total Work Experience
          </p>

          <p
            className="
              text-2xl
              font-bold
              text-blue-700
              mt-1
            "
          >

            {
              formData.professionalDetails
                ?.experienceYears || 0
            }
            {" "}Years{" "}

            {
              formData.professionalDetails
                ?.experienceMonths || 0
            }
            {" "}Months

          </p>

        </div>

      </div>

    </div>

  );
};

export default ProfessionalDetails;