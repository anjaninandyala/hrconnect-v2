const PendingApproval = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-10 rounded-3xl shadow-md max-w-lg text-center">

        <h1 className="text-3xl font-bold text-yellow-600">
          ⏳ Under Review
        </h1>

        <p className="mt-4 text-gray-600">
          Your onboarding form has been submitted
          and is waiting for HR approval.
        </p>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          Status: Pending Approval
        </div>

      </div>

    </div>
  );
};

export default PendingApproval;