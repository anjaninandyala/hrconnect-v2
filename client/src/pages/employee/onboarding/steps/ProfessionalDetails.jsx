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

      <h2 className="text-2xl font-semibold mb-6">
        Professional Details
      </h2>

      <div className="space-y-5">

        {/* Previous Organization */}

        <div>
          <label className="block mb-2 font-medium">
            Previous Organization
          </label>

          <input
            type="text"
            name="previousOrganization"
            placeholder="Previous Organization"
            value={
              formData.professionalDetails
                ?.previousOrganization || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "
          />
        </div>

        {/* Company Name */}

        <div>
          <label className="block mb-2 font-medium">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={
              formData.professionalDetails
                ?.companyName || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "
          />
        </div>

        {/* Designation */}

        <div>
          <label className="block mb-2 font-medium">
            Designation
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="designation"
            required
            placeholder="Designation"
            value={
              formData.professionalDetails
                ?.designation || ""
            }
            onChange={handleChange}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "
          />
        </div>

        {/* Department */}

        <div>
          <label className="block mb-2 font-medium">
            Department
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
              rounded-lg
              px-4
              py-3
            "
          >
            <option value="">
              Select Department
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

        {/* Experience Start */}

        <div>

          <label className="block mb-2 font-medium">
            Experience Start Date
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
              rounded-lg
              px-4
              py-3
            "
          />

        </div>

        {/* Experience End */}

        <div>

          <label className="block mb-2 font-medium">
            Experience End Date
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
              rounded-lg
              px-4
              py-3
            "
          />

        </div>

        {/* Experience Calculation */}

        <div className="bg-blue-50 p-4 rounded-xl">

          <p className="font-medium">
            Experience Calculated
          </p>

          <p className="text-blue-700">

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