import { useNavigate } from "react-router-dom";

const Rejected = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-3xl shadow-md max-w-lg text-center">

        <h1 className="text-3xl font-bold text-red-600">
          ❌ Application Rejected
        </h1>

        <p className="mt-4 text-gray-600">
          HR requested changes to your onboarding information.
        </p>

        <button
          onClick={() =>
            navigate("/employee/onboarding")
          }
          className="
            mt-6
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Update Information
        </button>

      </div>

    </div>
  );
};

export default Rejected;