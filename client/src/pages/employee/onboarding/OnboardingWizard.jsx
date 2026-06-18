import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../../../api/axiosInstance";

import PersonalDetails from "./steps/PersonalDetails";

import AddressDetails from "./steps/AddressDetails";

import ContactDetails from "./steps/ContactDetails";

import ProfessionalDetails from "./steps/ProfessionalDetails";

import EmergencyDetails from "./steps/EmergencyDetails";

import GovernmentDetails from "./steps/GovernmentDetails";

import FamilyDetails from "./steps/FamilyDetails";

import DocumentUpload from "./steps/DocumentUpload";

import ReviewSubmit from "./ReviewSubmit";

const OnboardingWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        personalDetails: {},
        addressDetails: {},
        contactDetails: {},
        professionalDetails: {},
        emergencyDetails: {},
        governmentDetails: {},
        familyDetails: {},
        documents: [],
    });

    // Load Existing Draft
    const loadDraft = async () => {
        try {
            const { data } = await axiosInstance.get(
                "/employee/me"
            );

            if (data) {
                setFormData({
                    personalDetails:
                        data.personalDetails || {},

                    addressDetails:
                        data.addressDetails || {},

                    contactDetails:
                        data.contactDetails || {},

                    professionalDetails:
                        data.professionalDetails || {},

                    emergencyDetails:
                        data.emergencyDetails || {},

                    governmentDetails:
                        data.governmentDetails || {},

                    familyDetails:
                        data.familyDetails || {},

                    documents:
                        data.documents || [],
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadDraft();
    }, []);
    const validateStep = () => {

        switch (currentStep) {

            case 1:
                return (
                    formData.personalDetails?.fullName &&
                    formData.personalDetails?.parentName &&
                    formData.personalDetails?.dateOfBirth &&
                    formData.personalDetails?.gender
                );

            case 2:
                return (
                    formData.addressDetails?.address &&
                    formData.addressDetails?.city &&
                    formData.addressDetails?.state &&
                    formData.addressDetails?.zipCode
                );

            case 3:
                return (
                    formData.contactDetails?.mobileNumber &&
                    formData.contactDetails?.email
                );

            case 4:
                return (
                    formData.professionalDetails?.department &&
                    formData.professionalDetails?.designation
                );

            case 5:
                return (
                    formData.emergencyDetails?.contactName &&
                    formData.emergencyDetails?.contactNumber &&
                    formData.emergencyDetails?.relationship
                );

            case 6:
                return (
                    formData.governmentDetails?.aadhaarNumber &&
                    formData.governmentDetails?.panNumber
                );

            case 7:
                return (
                    formData.familyDetails?.fatherName &&
                    formData.familyDetails?.motherName &&
                    formData.familyDetails?.maritalStatus
                );

            case 8:
                return (
                    formData.documents &&
                    formData.documents.length > 0
                );

            default:
                return true;
        }
    };
    // Save Draft + Next Step
    const saveDraft = async () => {

        if (!validateStep()) {

            toast.error(
                "Please fill all required fields"
            );

            return;
        }

        try {
            
                setLoading(true);

                await axiosInstance.post(
                    "/employee/save-draft",
                    formData
                );

                toast.success("Draft Saved");

                if (currentStep < 9) {
                    setCurrentStep(
                        (prev) => prev + 1
                    );
                }
            } catch (error) {
                toast.error("Failed to Save Draft");
            } finally {
                setLoading(false);
            }
        };

        // Previous Step
        const previousStep = () => {
            if (currentStep > 1) {
                setCurrentStep((prev) => prev - 1);
            }
        };

        // Render Current Step
        const renderStep = () => {
            switch (currentStep) {
                case 1:
                    return (
                        <PersonalDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );

                case 2:
                    return (
                        <AddressDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 3:
                    return (
                        <ContactDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 4:
                    return (
                        <ProfessionalDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 5:
                    return (
                        <EmergencyDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 6:
                    return (
                        <GovernmentDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 7:
                    return (
                        <FamilyDetails
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 8:
                    return (
                        <DocumentUpload
                            formData={formData}
                            setFormData={setFormData}
                        />
                    );
                case 9:
                    return (
                        <ReviewSubmit
                            formData={formData}
                        />
                    );
                default:
                    return (
                        <div>
                            <h2 className="text-2xl font-semibold">
                                More Steps Coming...
                            </h2>
                        </div>
                    );
            }
        };

        const progress = (currentStep / 9) * 100;
        const submitOnboarding =
            async () => {

                try {

                    setLoading(true);

                    await axiosInstance.post(
                        "/employee/submit",
                        formData
                    );

                    toast.success(
                        "Onboarding Submitted Successfully"
                    );

                    window.location.href =
                        "/employee/pending";

                } catch (error) {

                    console.log(error);

                    toast.error(
                        "Failed To Submit"
                    );

                } finally {

                    setLoading(false);

                }
            };
        return (
            <div className="min-h-screen bg-slate-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">

                    {/* Progress Section */}
                    <div className="mb-6">

                        <p className="font-medium mb-2">
                            Step {currentStep} of 9
                        </p>

                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                    </div>

                    {/* Current Step */}
                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">

                        <button
                            onClick={previousStep}
                            disabled={currentStep === 1}
                            className={`px-6 py-3 rounded-xl ${currentStep === 1
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        >
                            Previous
                        </button>

                        {
                            currentStep === 9 ? (

                                <button
                                    onClick={submitOnboarding}
                                    disabled={loading}
                                    className="
        bg-green-600
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-green-700
      "
                                >
                                    {loading
                                        ? "Submitting..."
                                        : "Submit Onboarding"}
                                </button>

                            ) : (

                                <button
                                    onClick={saveDraft}
                                    disabled={loading}
                                    className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-blue-700
      "
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Next"}
                                </button>

                            )
                        }

                    </div>

                </div>
            </div>
        );
    };

    export default OnboardingWizard;