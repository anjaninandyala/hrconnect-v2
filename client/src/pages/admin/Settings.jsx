import {
  Building2,
  User,
  Shield,
  Database,
  LogOut,
  KeyRound,
} from "lucide-react";

const Settings = () => {

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href =
      "/auth/login";
  };

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage company information, security and system settings.
        </p>

      </div>

      {/* COMPANY INFO */}

      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <div className="flex items-center gap-3 mb-6">

          <Building2 className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            Company Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-sm text-gray-500">
              Company Name
            </label>

            <input
              type="text"
              value="HRConnect Pvt Ltd"
              readOnly
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
                bg-slate-50
              "
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">
              HR Email
            </label>

            <input
              type="text"
              value="hr@hrconnect.com"
              readOnly
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
                bg-slate-50
              "
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">
              Phone Number
            </label>

            <input
              type="text"
              value="+91 9876543210"
              readOnly
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
                bg-slate-50
              "
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">
              Address
            </label>

            <input
              type="text"
              value="Hyderabad, Telangana"
              readOnly
              className="
                w-full
                mt-2
                border
                rounded-xl
                p-3
                bg-slate-50
              "
            />

          </div>

        </div>

      </div>

      {/* ADMIN PROFILE */}

      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <div className="flex items-center gap-3 mb-6">

          <User className="text-green-600" />

          <h2 className="text-2xl font-bold">
            Admin Profile
          </h2>

        </div>

        <div className="space-y-4">

          <div>

            <p className="text-sm text-gray-500">
              Name
            </p>

            <p className="font-medium">
              Admin User
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Role
            </p>

            <p className="font-medium">
              HR Administrator
            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="font-medium">
              admin@hrconnect.com
            </p>

          </div>

        </div>

      </div>

      {/* SECURITY */}

      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <div className="flex items-center gap-3 mb-6">

          <Shield className="text-orange-600" />

          <h2 className="text-2xl font-bold">
            Security
          </h2>

        </div>

        <div className="flex flex-wrap gap-4">

          <button
            className="
              flex
              items-center
              gap-2
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-blue-700
            "
          >
            <KeyRound size={18} />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              bg-red-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-red-700
            "
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

      {/* SYSTEM INFO */}

      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <div className="flex items-center gap-3 mb-6">

          <Database className="text-purple-600" />

          <h2 className="text-2xl font-bold">
            System Information
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <strong>Application:</strong>
            {" "}
            HRConnect v2
          </div>

          <div>
            <strong>Frontend:</strong>
            {" "}
            React + Vite
          </div>

          <div>
            <strong>Backend:</strong>
            {" "}
            Node.js + Express
          </div>

          <div>
            <strong>Database:</strong>
            {" "}
            MongoDB Atlas
          </div>

          <div>
            <strong>Authentication:</strong>
            {" "}
            JWT
          </div>

          <div>
            <strong>Status:</strong>
            {" "}
            <span className="text-green-600 font-medium">
              Online
            </span>
          </div>

        </div>

      </div>

    </div>

  );
};

export default Settings;