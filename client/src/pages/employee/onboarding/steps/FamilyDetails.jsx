const FamilyDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      familyDetails: {
        ...formData.familyDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  const maritalStatus =
    formData.familyDetails
      ?.maritalStatus || "";

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Family Details
      </h2>

      <div className="space-y-5">

        {/* Father Name */}

        <div>
          <label className="block mb-2 font-medium">
            Father Name
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="fatherName"
            required
            placeholder="Enter Father Name"
            value={
              formData.familyDetails
                ?.fatherName || ""
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

        {/* Mother Name */}

        <div>
          <label className="block mb-2 font-medium">
            Mother Name
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="motherName"
            required
            placeholder="Enter Mother Name"
            value={
              formData.familyDetails
                ?.motherName || ""
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

        {/* Marital Status */}

        <div>
          <label className="block mb-2 font-medium">
            Marital Status
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            name="maritalStatus"
            required
            value={maritalStatus}
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
              Select Marital Status
            </option>

            <option value="Single">
              Single
            </option>

            <option value="Married">
              Married
            </option>

          </select>
        </div>

        {/* Spouse Name */}

        {maritalStatus === "Married" && (

          <div>
            <label className="block mb-2 font-medium">
              Spouse Name
            </label>

            <input
              type="text"
              name="spouseName"
              placeholder="Enter Spouse Name"
              value={
                formData.familyDetails
                  ?.spouseName || ""
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

        )}

        {/* Family Occupation */}

        <div>
          <label className="block mb-2 font-medium">
            Family Occupation
          </label>

          <input
            type="text"
            name="familyOccupation"
            placeholder="Family Occupation"
            value={
              formData.familyDetails
                ?.familyOccupation || ""
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

      </div>

    </div>
  );
};

export default FamilyDetails;