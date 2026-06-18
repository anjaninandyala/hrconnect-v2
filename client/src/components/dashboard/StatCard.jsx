import React from "react";

const StatCard = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        shadow-sm
        p-6
        hover:shadow-md
        transition
      "
    >
      <div className="flex justify-between items-start">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {value}
          </h2>
        </div>

        {Icon && (
          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-slate-100
              flex
              items-center
              justify-center
            "
          >
            <Icon size={28} />
          </div>
        )}

      </div>
    </div>
  );
};

export default StatCard;