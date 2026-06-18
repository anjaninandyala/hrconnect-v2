import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import InputField from "../../components/forms/InputField";
import axiosInstance from "../../api/axiosInstance";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axiosInstance.post(
                "/auth/register",
                formData
            );

            toast.success(
                "Registration Successful. Please Login."
            );

            setTimeout(() => {
                navigate("/auth/login");
            }, 1500);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Employee Registration">
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/auth/login"
                        className="text-blue-600 font-medium"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Register;