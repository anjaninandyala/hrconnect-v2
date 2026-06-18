const PersonalDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      personalDetails: {
        ...formData.personalDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Personal Details
      </h2>

      <div className="space-y-5">

        {/* Full Name */}

        <div>
          <label className="block mb-2 font-medium">
            Full Name
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="fullName"
            required
            placeholder="Enter Full Name"
            value={
              formData.personalDetails
                ?.fullName || ""
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

        {/* Parent Name */}

        <div>
          <label className="block mb-2 font-medium">
            Parent Name
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="parentName"
            required
            placeholder="Enter Parent Name"
            value={
              formData.personalDetails
                ?.parentName || ""
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

        {/* Date Of Birth */}

        <div>
          <label className="block mb-2 font-medium">
            Date Of Birth
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="date"
            name="dateOfBirth"
            required
            value={
              formData.personalDetails
                ?.dateOfBirth || ""
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

        {/* Gender */}

        <div>
          <label className="block mb-2 font-medium">
            Gender
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            name="gender"
            required
            value={
              formData.personalDetails
                ?.gender || ""
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
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>
        </div>

      </div>

    </div>
  );
};

export default PersonalDetails;