const EmergencyDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      emergencyDetails: {
        ...formData.emergencyDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Emergency Details
      </h2>

      <div className="space-y-5">

        {/* Contact Name */}

        <div>
          <label className="block mb-2 font-medium">
            Emergency Contact Name
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="contactName"
            required
            placeholder="Enter Contact Name"
            value={
              formData.emergencyDetails
                ?.contactName || ""
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

        {/* Contact Number */}

        <div>
          <label className="block mb-2 font-medium">
            Emergency Contact Number
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="tel"
            name="contactNumber"
            required
            maxLength="10"
            placeholder="Enter Contact Number"
            value={
              formData.emergencyDetails
                ?.contactNumber || ""
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

        {/* Relationship */}

        <div>
          <label className="block mb-2 font-medium">
            Relationship
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            name="relationship"
            required
            value={
              formData.emergencyDetails
                ?.relationship || ""
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
              Select Relationship
            </option>

            <option value="Father">
              Father
            </option>

            <option value="Mother">
              Mother
            </option>

            <option value="Brother">
              Brother
            </option>

            <option value="Sister">
              Sister
            </option>

            <option value="Spouse">
              Spouse
            </option>

            <option value="Friend">
              Friend
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

export default EmergencyDetails;