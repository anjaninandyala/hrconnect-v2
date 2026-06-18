const ContactDetails = ({
  formData,
  setFormData,
}) => {

  const handleChange = (e) => {
    setFormData({
      ...formData,

      contactDetails: {
        ...formData.contactDetails,

        [e.target.name]:
          e.target.value,
      },
    });
  };

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-6">
        Contact Details
      </h2>

      <div className="space-y-5">

        {/* Mobile Number */}

        <div>
          <label className="block mb-2 font-medium">
            Mobile Number
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="tel"
            name="mobileNumber"
            required
            maxLength="10"
            placeholder="Enter Mobile Number"
            value={
              formData.contactDetails
                ?.mobileNumber || ""
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

        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email Address
            <span className="text-red-500 ml-1">
              *
            </span>
          </label>

          <input
            type="email"
            name="email"
            required
            placeholder="Enter Email Address"
            value={
              formData.contactDetails
                ?.email || ""
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

export default ContactDetails;