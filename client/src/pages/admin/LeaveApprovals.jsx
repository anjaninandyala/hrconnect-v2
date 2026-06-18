import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from "../../api/adminLeaveApi";

const LeaveApprovals = () => {

  const [leaves, setLeaves] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchLeaves =
    async () => {

      try {

        const data =
          await getAllLeaves();

        setLeaves(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load leave requests"
        );

      } finally {

        setLoading(false);

      }
    };

  useEffect(() => {

    fetchLeaves();

  }, []);

  const handleApprove =
    async (id) => {

      try {

        await approveLeave(id);

        toast.success(
          "Leave Approved"
        );

        fetchLeaves();

      } catch (error) {

        toast.error(
          "Approval Failed"
        );

      }
    };

  const handleReject =
    async (id) => {

      try {

        await rejectLeave(id);

        toast.success(
          "Leave Rejected"
        );

        fetchLeaves();

      } catch (error) {

        toast.error(
          "Rejection Failed"
        );

      }
    };

  if (loading) {

    return (
      <div className="text-center p-10">
        Loading Leave Requests...
      </div>
    );
  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Leave Approvals
        </h1>

        <p className="text-gray-500 mt-2">
          Review and manage employee leave requests
        </p>

      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        {
          leaves.length === 0 ? (

            <div className="p-10 text-center text-gray-500">
              No Leave Requests Found
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b">

                    <th className="p-4 text-left">
                      Employee
                    </th>

                    <th className="p-4 text-left">
                      Type
                    </th>

                    <th className="p-4 text-left">
                      From
                    </th>

                    <th className="p-4 text-left">
                      To
                    </th>

                    <th className="p-4 text-left">
                      Days
                    </th>

                    <th className="p-4 text-left">
                      Reason
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {leaves.map(
                    (leave) => {

                      const days =
                        Math.ceil(
                          (
                            new Date(
                              leave.toDate
                            ) -
                            new Date(
                              leave.fromDate
                            )
                          ) /
                          (
                            1000 *
                            60 *
                            60 *
                            24
                          )
                        ) + 1;

                      return (

                        <tr
                          key={leave._id}
                          className="border-b hover:bg-slate-50"
                        >

                          <td className="p-4">
                            {
                              leave.employee
                                ?.user?.name ||
                              "Employee"
                            }
                          </td>

                          <td className="p-4">
                            {
                              leave.leaveType
                            }
                          </td>

                          <td className="p-4">
                            {
                              new Date(
                                leave.fromDate
                              ).toLocaleDateString()
                            }
                          </td>

                          <td className="p-4">
                            {
                              new Date(
                                leave.toDate
                              ).toLocaleDateString()
                            }
                          </td>

                          <td className="p-4">
                            {days}
                          </td>

                          <td className="p-4 max-w-xs">
                            {
                              leave.reason
                            }
                          </td>

                          <td className="p-4">

                            <span
                              className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-medium
                                ${
                                  leave.status ===
                                  "approved"
                                    ? "bg-green-100 text-green-700"
                                    : leave.status ===
                                      "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }
                              `}
                            >
                              {
                                leave.status
                              }
                            </span>

                          </td>

                          <td className="p-4 flex gap-2">

                            {
                              leave.status ===
                              "pending" ? (
                                <>

                                  <button
                                    onClick={() =>
                                      handleApprove(
                                        leave._id
                                      )
                                    }
                                    className="
                                      bg-green-600
                                      text-white
                                      px-3
                                      py-2
                                      rounded-lg
                                      hover:bg-green-700
                                    "
                                  >
                                    Approve
                                  </button>

                                  <button
                                    onClick={() =>
                                      handleReject(
                                        leave._id
                                      )
                                    }
                                    className="
                                      bg-red-600
                                      text-white
                                      px-3
                                      py-2
                                      rounded-lg
                                      hover:bg-red-700
                                    "
                                  >
                                    Reject
                                  </button>

                                </>
                              ) : (
                                <span className="text-gray-400">
                                  Processed
                                </span>
                              )
                            }

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>

  );
};

export default LeaveApprovals;