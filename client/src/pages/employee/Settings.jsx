import { useEffect, useState } from "react";

import {
    User,
    Mail,
    Shield,
    BadgeCheck,
    Lock,
    Bell,
    FileText,
    CalendarDays,
    Settings as SettingsIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    getMyProfile,
    getEmployeeStatus,
} from "../../api/employeeApi";

const Settings = () => {
    const navigate = useNavigate();

    const [profile, setProfile] =
        useState(null);

    const [status, setStatus] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const profileData =
                    await getMyProfile();

                const statusData =
                    await getEmployeeStatus();

                setProfile(profileData);
                setStatus(statusData);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);

    if (loading) {

        return (
            <div className="p-10">
                Loading Settings...
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            {/* HERO */}

            <div
                className="
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          rounded-3xl
          p-8
          text-white
        "
            >

                <h1 className="text-4xl font-bold">
                    Settings
                </h1>

                <p className="mt-2 text-blue-100">
                    Manage your account, security and preferences
                </p>

            </div>

            {/* ACCOUNT INFO */}

            <div className="bg-white rounded-3xl border p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Account Information
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                    <InfoCard
                        icon={<User size={18} />}
                        label="Name"
                        value={
                            profile?.personalDetails?.fullName
                        }
                    />

                    <InfoCard
                        icon={<Mail size={18} />}
                        label="Email"
                        value={
                            profile?.contactDetails?.email
                        }
                    />

                    <InfoCard
                        icon={<BadgeCheck size={18} />}
                        label="Employee Code"
                        value={
                            status?.employeeCode ||
                            "Pending"
                        }
                    />

                    <InfoCard
                        icon={<Shield size={18} />}
                        label="Status"
                        value={
                            status?.status
                                ? status.status.charAt(0).toUpperCase() +
                                status.status.slice(1)
                                : "-"
                        }
                    />

                </div>

            </div>

            {/* SECURITY */}

            <div className="bg-white rounded-3xl border p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Security
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <InfoCard
                        icon={<Lock size={18} />}
                        label="Password"
                        value="Protected"
                    />

                    <InfoCard
                        icon={<Shield size={18} />}
                        label="2FA"
                        value="Coming Soon"
                    />

                    <InfoCard
                        icon={<BadgeCheck size={18} />}
                        label="Login Security"
                        value="Active"
                    />

                </div>

            </div>

            {/* QUICK ACTIONS */}

            <div className="bg-white rounded-3xl border p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Quick Actions
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <button
                        onClick={() =>
                            navigate("/employee/profile")
                        }
                        className="
        border
        rounded-2xl
        p-5
        text-left
        hover:bg-slate-50
        hover:shadow-md
        transition
      "
                    >

                        <User size={20} />

                        <h3 className="font-semibold mt-3">
                            My Profile
                        </h3>

                        <p className="text-sm text-slate-500">
                            View employee profile information
                        </p>

                    </button>

                    <button
                        onClick={() =>
                            navigate("/employee/documents")
                        }
                        className="
        border
        rounded-2xl
        p-5
        text-left
        hover:bg-slate-50
        hover:shadow-md
        transition
      "
                    >

                        <FileText size={20} />

                        <h3 className="font-semibold mt-3">
                            Documents
                        </h3>

                        <p className="text-sm text-slate-500">
                            Manage uploaded documents
                        </p>

                    </button>

                    <button
                        onClick={() =>
                            navigate("/employee/leave")
                        }
                        className="
        border
        rounded-2xl
        p-5
        text-left
        hover:bg-slate-50
        hover:shadow-md
        transition
      "
                    >

                        <CalendarDays size={20} />

                        <h3 className="font-semibold mt-3">
                            Leave Requests
                        </h3>

                        <p className="text-sm text-slate-500">
                            Apply and track leave requests
                        </p>

                    </button>

                </div>

            </div>

            {/* PREFERENCES */}

            <div className="bg-white rounded-3xl border p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Preferences
                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <InfoCard
                        icon={<SettingsIcon size={18} />}
                        label="Theme"
                        value="Light Mode"
                    />

                    <InfoCard
                        icon={<Bell size={18} />}
                        label="Notifications"
                        value="Enabled"
                    />

                    <InfoCard
                        icon={<Mail size={18} />}
                        label="Language"
                        value="English"
                    />

                </div>

            </div>

            {/* SYSTEM INFO */}

            <div className="bg-white rounded-3xl border p-8">

                <h2 className="text-2xl font-bold mb-6">
                    System Information
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                    <InfoCard
                        label="Application"
                        value="HRConnect v2"
                    />

                    <InfoCard
                        label="Role"
                        value="Employee"
                    />

                    <InfoCard
                        label="Account Status"
                        value={
                            status?.status
                        }
                    />

                    <InfoCard
                        label="Version"
                        value="2.0"
                    />

                </div>

            </div>

        </div>

    );
};

const InfoCard = ({
    icon,
    label,
    value,
}) => (

    <div
        className="
      border
      rounded-2xl
      p-5
      hover:shadow-md
      transition
    "
    >

        <div className="flex items-center gap-2 text-blue-600 mb-3">

            {icon && icon}

            <span className="text-sm font-medium">
                {label}
            </span>

        </div>

        <p className="font-semibold text-lg">
            {value || "-"}
        </p>

    </div>

);

export default Settings;