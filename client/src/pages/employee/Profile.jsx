import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MapPin,
  Shield,
  Users,
} from "lucide-react";

import { getMyProfile } from "../../api/employeeApi";

const Profile = () => {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const data =
            await getMyProfile();

          setProfile(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProfile();

  }, []);

  if (loading) {

    return (
      <div className="p-10">
        Loading Profile...
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto p-8 space-y-8">

      {/* PROFILE HERO */}

      <div
        className="
          bg-gradient-to-r
          from-blue-600
          to-indigo-600
          rounded-3xl
          p-8
          text-white
          shadow-lg
        "
      >

        <div className="flex items-center gap-5">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
            "
          >
            <User size={36} />
          </div>

          <div>

            <h1 className="text-4xl font-bold">

              {
                profile?.personalDetails
                  ?.fullName || "Employee"
              }

            </h1>

            <p className="mt-2 text-blue-100">

              {
                profile?.employeeCode ||
                "Employee Code Pending"
              }

            </p>

            <p className="text-blue-100">

              {
                profile?.professionalDetails
                  ?.department || "-"
              }

              {" • "}

              {
                profile?.professionalDetails
                  ?.designation || "-"
              }

            </p>

          </div>

        </div>

      </div>

      {/* PERSONAL */}

      <SectionTitle
        icon={<User size={20} />}
        title="Personal Information"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <InfoCard
          label="Full Name"
          value={
            profile?.personalDetails
              ?.fullName
          }
        />

        <InfoCard
          label="Parent Name"
          value={
            profile?.personalDetails
              ?.parentName
          }
        />

        <InfoCard
          label="Gender"
          value={
            profile?.personalDetails
              ?.gender
          }
        />

        <InfoCard
          label="Date Of Birth"
          value={
            profile?.personalDetails
              ?.dateOfBirth
              ? new Date(
                  profile.personalDetails.dateOfBirth
                ).toLocaleDateString()
              : "-"
          }
        />

      </div>

      {/* CONTACT */}

      <SectionTitle
        icon={<Mail size={20} />}
        title="Contact Information"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <InfoCard
          label="Email"
          value={
            profile?.contactDetails
              ?.email
          }
        />

        <InfoCard
          label="Mobile"
          value={
            profile?.contactDetails
              ?.mobileNumber
          }
        />

        <InfoCard
          label="City"
          value={
            profile?.addressDetails
              ?.city
          }
        />

        <InfoCard
          label="State"
          value={
            profile?.addressDetails
              ?.state
          }
        />

      </div>

      {/* PROFESSIONAL */}

      <SectionTitle
        icon={<Briefcase size={20} />}
        title="Professional Information"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <InfoCard
          label="Department"
          value={
            profile?.professionalDetails
              ?.department
          }
        />

        <InfoCard
          label="Designation"
          value={
            profile?.professionalDetails
              ?.designation
          }
        />

        <InfoCard
          label="Company"
          value={
            profile?.professionalDetails
              ?.companyName
          }
        />

        <InfoCard
          label="Experience"
          value={`${profile?.professionalDetails?.experienceYears || 0} Years ${profile?.professionalDetails?.experienceMonths || 0} Months`}
        />

      </div>

      {/* ADDRESS */}

      <SectionTitle
        icon={<MapPin size={20} />}
        title="Address Information"
      />

      <div className="grid md:grid-cols-2 gap-5">

        <InfoCard
          label="Address"
          value={
            profile?.addressDetails
              ?.address
          }
        />

        <InfoCard
          label="Zip Code"
          value={
            profile?.addressDetails
              ?.zipCode
          }
        />

      </div>

      {/* GOVERNMENT */}

      <SectionTitle
        icon={<Shield size={20} />}
        title="Government Information"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

        <InfoCard
          label="Aadhaar"
          value={
            profile?.governmentDetails
              ?.aadhaarNumber
          }
        />

        <InfoCard
          label="PAN"
          value={
            profile?.governmentDetails
              ?.panNumber
          }
        />

        <InfoCard
          label="ESI"
          value={
            profile?.governmentDetails
              ?.esiNumber
          }
        />

        <InfoCard
          label="Passport"
          value={
            profile?.governmentDetails
              ?.passportNumber
          }
        />

      </div>

      {/* EMERGENCY */}

      <SectionTitle
        icon={<Users size={20} />}
        title="Emergency Contact"
      />

      <div className="grid md:grid-cols-3 gap-5">

        <InfoCard
          label="Contact Name"
          value={
            profile?.emergencyDetails
              ?.contactName
          }
        />

        <InfoCard
          label="Contact Number"
          value={
            profile?.emergencyDetails
              ?.contactNumber
          }
        />

        <InfoCard
          label="Relationship"
          value={
            profile?.emergencyDetails
              ?.relationship
          }
        />

      </div>

    </div>

  );
};

const SectionTitle = ({
  title,
  icon,
}) => (
  <div className="flex items-center gap-2">

    <div className="text-blue-600">
      {icon}
    </div>

    <h2 className="text-2xl font-bold">
      {title}
    </h2>

  </div>
);

const InfoCard = ({
  label,
  value,
}) => (
  <div
    className="
      bg-white
      border
      rounded-2xl
      p-5
      hover:shadow-md
      transition
    "
  >

    <p
      className="
        text-xs
        uppercase
        tracking-wide
        text-slate-500
        mb-2
      "
    >
      {label}
    </p>

    <p
      className="
        font-semibold
        text-lg
        break-words
      "
    >
      {value || "-"}
    </p>

  </div>
);

export default Profile;