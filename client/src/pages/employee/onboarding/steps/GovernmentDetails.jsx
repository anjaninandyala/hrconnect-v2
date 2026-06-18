const GovernmentDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      governmentDetails: {
        ...formData.governmentDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Government Details
      </h2>

      <div className="space-y-5">

        {/* Aadhaar */}

        <div>
          <label className="block mb-2 font-medium">
            Aadhaar Number
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="aadhaarNumber"
            required
            maxLength="12"
            placeholder="Enter Aadhaar Number"
            value={
              formData.governmentDetails
                ?.aadhaarNumber || ""
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

        {/* PAN */}

        <div>
          <label className="block mb-2 font-medium">
            PAN Number
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="panNumber"
            required
            placeholder="Enter PAN Number"
            value={
              formData.governmentDetails
                ?.panNumber || ""
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

        {/* ESI */}

        <div>
          <label className="block mb-2 font-medium">
            ESI Number
          </label>

          <input
            type="text"
            name="esiNumber"
            placeholder="Enter ESI Number"
            value={
              formData.governmentDetails
                ?.esiNumber || ""
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

        {/* Passport */}

        <div>
          <label className="block mb-2 font-medium">
            Passport Number
          </label>

          <input
            type="text"
            name="passportNumber"
            placeholder="Passport Number (Optional)"
            value={
              formData.governmentDetails
                ?.passportNumber || ""
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

export default GovernmentDetails;