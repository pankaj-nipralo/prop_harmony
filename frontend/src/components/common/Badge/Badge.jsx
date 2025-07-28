import React from "react";

const Badge = ({ varient = "alert", children, className, icon, ...props }) => {
  const badgeTypes = {
    alert: "bg-red-100 text-red-600",
    completed: "bg-green-100 text-green-600",
    info: "bg-red-100 text-red-600",
    progress: "bg-red-100 text-red-600",
    high: "bg-red-100 text-red-600",
    low: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${badgeTypes[varient]} ${className}`}
    >
      {icon && icon}
      {children}
    </div>
  );
};

export default Badge;
