const AddressDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      addressDetails: {
        ...formData.addressDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Present Address
      </h2>

      <div className="space-y-5">

        {/* Address */}

        <div>
          <label className="block mb-2 font-medium">
            Full Present Address
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <textarea
            name="address"
            required
            placeholder="Enter Full Present Address"
            value={
              formData.addressDetails
                ?.address || ""
            }
            onChange={handleChange}
            rows="4"
            className="
              w-full
              border
              rounded-lg
              px-4
              py-3
            "
          />
        </div>

        {/* City */}

        <div>
          <label className="block mb-2 font-medium">
            City
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="city"
            required
            placeholder="Enter City"
            value={
              formData.addressDetails
                ?.city || ""
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

        {/* State */}

        <div>
          <label className="block mb-2 font-medium">
            State
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <select
            name="state"
            required
            value={
              formData.addressDetails
                ?.state || ""
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
              Select State
            </option>

            <option value="Telangana">
              Telangana
            </option>

            <option value="Andhra Pradesh">
              Andhra Pradesh
            </option>

            <option value="Karnataka">
              Karnataka
            </option>

            <option value="Tamil Nadu">
              Tamil Nadu
            </option>

            <option value="Kerala">
              Kerala
            </option>

            <option value="Maharashtra">
              Maharashtra
            </option>

          </select>
        </div>

        {/* Zip Code */}

        <div>
          <label className="block mb-2 font-medium">
            Zip Code
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="text"
            name="zipCode"
            required
            placeholder="Enter Zip Code"
            value={
              formData.addressDetails
                ?.zipCode || ""
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

export default AddressDetails;