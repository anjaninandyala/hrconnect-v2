import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  applyLeave,
  getMyLeaves,
} from "../../api/leaveApi";

const Leave = () => {

  const [leaveType, setLeaveType] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const [leaves, setLeaves] =
    useState([]);

  const fetchLeaves =
    async () => {

      try {

        const data =
          await getMyLeaves();

        setLeaves(data);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchLeaves();

  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        new Date(fromDate) >
        new Date(toDate)
      ) {

        toast.error(
          "From Date cannot be greater than To Date"
        );

        return;
      }

      try {

        await applyLeave({
          leaveType,
          fromDate,
          toDate,
          reason,
        });

        setLeaveType("");
        setFromDate("");
        setToDate("");
        setReason("");

        fetchLeaves();

        toast.success(
          "Leave Applied Successfully"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to Apply Leave"
        );

      }
    };

  return (

    <div className="max-w-7xl mx-auto space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold">
          Leave Management
        </h1>

        <p className="text-gray-500">
          Apply and Track Leave Requests
        </p>

      </div>

      {/* APPLY FORM */}

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-xl font-bold mb-4">
          Apply Leave
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >

          <select
            value={leaveType}
            onChange={(e) =>
              setLeaveType(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
          >

            <option value="">
              Select Leave Type
            </option>

            <option>
              Sick Leave
            </option>

            <option>
              Casual Leave
            </option>

            <option>
              Earned Leave
            </option>

          </select>

          <div />

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
          />

          <textarea
            placeholder="Reason for Leave"
            value={reason}
            onChange={(e) =>
              setReason(
                e.target.value
              )
            }
            rows="4"
            required
            className="
              border
              rounded-xl
              p-3
              md:col-span-2
            "
          />

          <button
            className="
              bg-blue-600
              text-white
              rounded-xl
              p-3
              md:col-span-2
              hover:bg-blue-700
            "
          >
            Apply Leave
          </button>

        </form>

      </div>

      {/* LEAVE HISTORY */}

      <div className="bg-white rounded-2xl border p-6">

        <h2 className="text-xl font-bold mb-4">
          Leave History
        </h2>

        {
          leaves.length === 0 ? (

            <div className="text-center text-gray-500 py-8">
              No leave applications found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b bg-slate-50">

                    <th className="p-3 text-left">
                      Type
                    </th>

                    <th className="p-3 text-left">
                      From
                    </th>

                    <th className="p-3 text-left">
                      To
                    </th>

                    <th className="p-3 text-left">
                      Days
                    </th>

                    <th className="p-3 text-left">
                      Reason
                    </th>

                    <th className="p-3 text-left">
                      Status
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
                          className="border-b"
                        >

                          <td className="p-3">
                            {leave.leaveType}
                          </td>

                          <td className="p-3">
                            {
                              new Date(
                                leave.fromDate
                              ).toLocaleDateString()
                            }
                          </td>

                          <td className="p-3">
                            {
                              new Date(
                                leave.toDate
                              ).toLocaleDateString()
                            }
                          </td>

                          <td className="p-3">
                            {days}
                          </td>

                          <td className="p-3">
                            {leave.reason}
                          </td>

                          <td className="p-3">

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
                              {leave.status}
                            </span>

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

export default Leave;