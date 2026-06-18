import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/forms/InputField";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {

const [formData, setFormData] =
useState({
email: "",
password: "",
});

const [loading, setLoading] =
useState(false);

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]:
    e.target.value,
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  setLoading(true);

  const { data } =
    await axiosInstance.post(
      "/auth/login",
      formData
    );

  localStorage.setItem(
    "token",
    data.token
  );

  localStorage.setItem(
    "user",
    JSON.stringify(
      data.user
    )
  );

  toast.success(
    "Login Successful"
  );

  /*
  -----------------------------
  ADMIN LOGIN
  -----------------------------
  */

  if (
    data.user?.role ===
    "admin"
  ) {

    window.location.href =
      "/admin/dashboard";

    return;
  }

  /*
  -----------------------------
  EMPLOYEE LOGIN
  -----------------------------
  */

  try {

    const {
      data: statusData,
    } =
      await axiosInstance.get(
        "/employee/status"
      );

    const status =
      statusData.status;

    if (
      status === "draft"
    ) {

      window.location.href =
        "/employee/onboarding";

    } else if (
      status === "pending"
    ) {

      window.location.href =
        "/employee/pending";

    } else if (
      status === "rejected"
    ) {

      window.location.href =
        "/employee/rejected";

    } else if (
      status === "approved"
    ) {

      window.location.href =
        "/employee/dashboard";

    } else {

      window.location.href =
        "/employee/onboarding";

    }

  } catch (error) {

    console.log(
      "STATUS ERROR:",
      error
    );

    window.location.href =
      "/employee/onboarding";

  }

} catch (error) {

  console.log(error);

  toast.error(
    error.response?.data
      ?.message ||
      "Login Failed"
  );

} finally {

  setLoading(false);

}


};

return ( <AuthLayout title="Login">


  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >

    <InputField
      label="Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />

    <InputField
      label="Password"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
    />

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        bg-blue-600
        text-white
        py-2
        rounded-lg
        hover:bg-blue-700
        transition
      "
    >
      {loading
        ? "Logging in..."
        : "Login"}
    </button>

    <p className="text-center mt-4 text-sm">

      Don't have an account?{" "}

      <Link
        to="/auth/register"
        className="
          text-blue-600
          font-medium
        "
      >
        Register
      </Link>

    </p>

  </form>

</AuthLayout>


);
};

export default Login;
