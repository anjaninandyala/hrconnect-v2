import React from "react";

const statusColors = {

  approved:
    "bg-green-100 text-green-700",

  pending:
    "bg-blue-100 text-blue-700",

  rejected:
    "bg-red-100 text-red-700",

  draft:
    "bg-gray-100 text-gray-700",

};

const RecentActivity = ({
  activities = [],
}) => {

  return (

    <div className="bg-white rounded-3xl shadow-sm p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map(
          (activity) => (

            <div
              key={activity.id}
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  h-12
                  w-12
                  rounded-full
                  bg-blue-100
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-blue-600
                "
              >
                {
                  activity.employee
                    ?.substring(0, 2)
                    .toUpperCase()
                }
              </div>

              <div className="flex-1">

                <p className="font-semibold">
                  {activity.employee}
                </p>

                <p className="text-sm text-gray-500">
                  Status changed
                </p>

              </div>

              <div className="text-right">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    ${
                      statusColors[
                        activity.action
                      ] ||
                      "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {activity.action}
                </span>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(
                    activity.timestamp
                  ).toLocaleDateString()}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
};

export default RecentActivity;