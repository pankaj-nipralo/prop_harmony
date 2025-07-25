import React, { useState, useMemo } from "react";
import RentCollectionHeader from "./RentCollectionHeader";
import SummaryCards from "./SummaryCards";
import RentTrendChart from "./RentTrendChart";
import RentCollectionTable from "./RentCollectionTable";

const tableData = [
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 101",
    tenant: "John Smith",
    amount: "2,500",
    due: "1/1/2025",
    status: "collected",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 205",
    tenant: "Sarah Johnson",
    amount: "3,200",
    due: "1/1/2025",
    status: "pending",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 304",
    tenant: "Mike Wilson",
    amount: "2,800",
    due: "1/1/2025",
    status: "overdue",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 102",
    tenant: "Lisa Brown",
    amount: "2,400",
    due: "1/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 501",
    tenant: "David Lee",
    amount: "3,500",
    due: "1/1/2025",
    status: "pending",
  },
  // Additional data for Pankaj Gupta
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 102",
    tenant: "Emma Davis",
    amount: "2,600",
    due: "2/1/2025",
    status: "collected",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 206",
    tenant: "James Wilson",
    amount: "3,300",
    due: "2/1/2025",
    status: "pending",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 103",
    tenant: "Sophie Brown",
    amount: "2,700",
    due: "3/1/2025",
    status: "collected",
  },
  // Additional data for Gaurav Kanchan
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 305",
    tenant: "Alex Turner",
    amount: "2,900",
    due: "2/1/2025",
    status: "overdue",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 502",
    tenant: "Maria Garcia",
    amount: "3,600",
    due: "3/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 306",
    tenant: "Tom Harris",
    amount: "2,850",
    due: "4/1/2025",
    status: "pending",
  },
  // Additional data for Uzair Sayyed
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 103",
    tenant: "Rachel Green",
    amount: "2,450",
    due: "2/1/2025",
    status: "collected",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 104",
    tenant: "Chris Martin",
    amount: "2,550",
    due: "3/1/2025",
    status: "overdue",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 105",
    tenant: "Emma Watson",
    amount: "2,650",
    due: "4/1/2025",
    status: "pending",
  },
  // More data for future months
  {
    landlord: "Pankaj Gupta",
    property: "Sunset Apartments",
    unit: "Unit 104",
    tenant: "Daniel Lee",
    amount: "2,800",
    due: "5/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Bay View",
    unit: "Unit 503",
    tenant: "Sarah Parker",
    amount: "3,700",
    due: "5/1/2025",
    status: "pending",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 106",
    tenant: "Michael Brown",
    amount: "2,750",
    due: "5/1/2025",
    status: "overdue",
  },
  {
    landlord: "Pankaj Gupta",
    property: "Marina View",
    unit: "Unit 207",
    tenant: "Jessica White",
    amount: "3,400",
    due: "6/1/2025",
    status: "collected",
  },
  {
    landlord: "Gaurav Kanchan",
    property: "Central Plaza",
    unit: "Unit 307",
    tenant: "David Miller",
    amount: "2,950",
    due: "6/1/2025",
    status: "pending",
  },
  {
    landlord: "Uzair Sayyed",
    property: "Garden Heights",
    unit: "Unit 107",
    tenant: "Emily Davis",
    amount: "2,850",
    due: "6/1/2025",
    status: "collected",
  },
];
const uniqueLandlords = [...new Set(tableData.map((item) => item.landlord))];

const RentCollectionMaster = () => {
  const [selectedLandlord, setSelectedLandlord] = useState("all");

  // Filter table data based on selected landlord
  const filteredTableData = useMemo(() => {
    return selectedLandlord === "all"
      ? tableData
      : tableData.filter((item) => item.landlord === selectedLandlord);
  }, [selectedLandlord]);

  // Calculate summary stats from filtered data
  const summaryStats = useMemo(() => {
    const stats = {
      totalCollected: 0,
      totalPending: 0,
      totalOverdue: 0,
      collectedCount: 0,
      pendingCount: 0,
      overdueCount: 0,
    };

    filteredTableData.forEach((item) => {
      const amount = parseInt(item.amount.replace(/,/g, ""));
      if (item.status === "collected") {
        stats.totalCollected += amount;
        stats.collectedCount++;
      } else if (item.status === "pending") {
        stats.totalPending += amount;
        stats.pendingCount++;
      } else if (item.status === "overdue") {
        stats.totalOverdue += amount;
        stats.overdueCount++;
      }
    });

    const totalExpected =
      stats.totalCollected + stats.totalPending + stats.totalOverdue;
    const collectionRate =
      totalExpected > 0
        ? Math.round((stats.totalCollected / totalExpected) * 100)
        : 0;

    return {
      ...stats,
      totalExpected,
      collectionRate,
    };
  }, [filteredTableData]);

  // Generate chart data from filtered data
  const chartData = useMemo(() => {
    const months = [
      "Jan 2025",
      "Feb 2025",
      "Mar 2025",
      "Apr 2025",
      "May 2025",
      "Jun 2025",
    ];

    return months.map((month) => {
      const monthData = filteredTableData.filter((item) => {
        const dueDate = new Date(item.due);
        const dueMonth =
          dueDate.toLocaleString("default", { month: "short" }) +
          " " +
          dueDate.getFullYear();
        return dueMonth === month;
      });

      return {
        month,
        collected: monthData
          .filter((item) => item.status === "collected")
          .reduce(
            (sum, item) => sum + parseInt(item.amount.replace(/,/g, "")),
            0
          ),
        pending: monthData
          .filter((item) => item.status === "pending")
          .reduce(
            (sum, item) => sum + parseInt(item.amount.replace(/,/g, "")),
            0
          ),
        overdue: monthData
          .filter((item) => item.status === "overdue")
          .reduce(
            (sum, item) => sum + parseInt(item.amount.replace(/,/g, "")),
            0
          ),
      };
    });
  }, [filteredTableData]);

  return (
    <div className="min-h-screen">
      <div className="p-6">
        <RentCollectionHeader
          selectedLandlord={selectedLandlord}
          setSelectedLandlord={setSelectedLandlord}
          uniqueLandlords={uniqueLandlords}
        />

        <SummaryCards summaryStats={summaryStats} />

        <RentTrendChart chartData={chartData} />

        <RentCollectionTable filteredTableData={filteredTableData} />
      </div>
    </div>
  );
};

export default RentCollectionMaster;
