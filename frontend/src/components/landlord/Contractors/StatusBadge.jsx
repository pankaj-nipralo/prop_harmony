const statusColors = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-700",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
        statusColors[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;