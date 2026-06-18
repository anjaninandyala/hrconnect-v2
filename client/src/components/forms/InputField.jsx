const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <div className="mb-4">

      <label
        className="
          block
          mb-2
          text-sm
          font-medium
        "
      >
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="
          w-full
          border
          rounded-lg
          px-4
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

    </div>
  );
};

export default InputField;