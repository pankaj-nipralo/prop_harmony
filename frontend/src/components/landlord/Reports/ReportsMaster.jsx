import React, { useState, useEffect } from "react";
import ReportsHeader from "./ReportsHeader";
import ReportsStats from "./ReportsStats";
import ReportsBody from "./ReportsBody";
import ReportModal from "./ReportModal";
import {
  reportsData,
  getReportData,
  generateReportSummary,
  formatCurrency,
} from "@/data/landlord/reports/data";

const ReportsMaster = () => {
  const [selectedReportType, setSelectedReportType] = useState("financial");
  const [dateRange, setDateRange] = useState("lastyear");
  const [customDateRange, setCustomDateRange] = useState({ from: "", to: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [reportStats, setReportStats] = useState({});
  const [selectedChart, setSelectedChart] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());

  // Load report data when type or date range changes
  useEffect(() => {
    const loadReportData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data = getReportData(selectedReportType, dateRange);
        const stats = generateReportSummary(selectedReportType);

        setReportData(data);
        setReportStats(stats);
        setLastUpdated(new Date().toISOString());
      } catch (error) {
        console.error("Error loading report data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReportData();
  }, [selectedReportType, dateRange, customDateRange]);

  const handleReportTypeChange = (type) => {
    setSelectedReportType(type);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleCustomDateRangeChange = (range) => {
    setCustomDateRange(range);
  };

  const handleExport = async (format) => {
    try {
      setIsLoading(true);

      // Simulate export process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would generate and download the file
      const fileName = `${selectedReportType}-report-${
        new Date().toISOString().split("T")[0]
      }.${format}`;

      if (format === "pdf") {
        // Simulate PDF generation
        alert(`PDF report "${fileName}" has been generated and downloaded.`);
      } else if (format === "excel") {
        // Simulate Excel generation
        alert(`Excel report "${fileName}" has been generated and downloaded.`);
      } else if (format === "png") {
        // Simulate PNG generation
        alert(`PNG report "${fileName}" has been generated and downloaded.`);
      }
    } catch (error) {
      console.error("Error exporting report:", error);
      alert("Error exporting report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate data refresh
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const data = getReportData(selectedReportType, dateRange);
      const stats = generateReportSummary(selectedReportType);

      setReportData(data);
      setReportStats(stats);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScheduleReport = async () => {
    try {
      // Simulate scheduling report
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(
        "Report has been scheduled successfully! You will receive it via email."
      );
    } catch (error) {
      console.error("Error scheduling report:", error);
      alert("Error scheduling report. Please try again.");
    }
  };

  const handleChartClick = (chart) => {
    setSelectedChart(chart);
    setShowReportModal(true);
  };

  const handleExportChart = async (chartId, format = "png") => {
    try {
      // Simulate chart export
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const fileName = `${chartId}-chart-${
        new Date().toISOString().split("T")[0]
      }.${format}`;
      alert(`Chart "${fileName}" has been exported successfully.`);
    } catch (error) {
      console.error("Error exporting chart:", error);
      alert("Error exporting chart. Please try again.");
    }
  };

  const handleShareChart = (chart) => {
    // Simulate sharing functionality
    const shareUrl = `${window.location.origin}/reports/shared/${chart.id}`;

    if (navigator.share) {
      navigator.share({
        title: chart.title,
        text: chart.subtitle,
        url: shareUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Chart link copied to clipboard!");
      });
    }
  };

  const getTotalReports = () => {
    // Calculate total number of available reports
    const reportCounts = {
      financial: 4,
      payment: 3,
      property: 3,
      tenant: 3,
      maintenance: 3,
    };

    return Object.values(reportCounts).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <ReportsHeader
          selectedReportType={selectedReportType}
          onReportTypeChange={handleReportTypeChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          customDateRange={customDateRange}
          onCustomDateRangeChange={handleCustomDateRangeChange}
          onExport={handleExport}
          onRefresh={handleRefresh}
          onScheduleReport={handleScheduleReport}
          isLoading={isLoading}
          totalReports={getTotalReports()}
          lastUpdated={lastUpdated}
        />

        {/* Stats */}
        <ReportsStats
          reportType={selectedReportType}
          stats={reportStats}
          isLoading={isLoading}
        />

        {/* Body */}
        <ReportsBody
          reportType={selectedReportType}
          dateRange={dateRange}
          onChartClick={handleChartClick}
          onExportChart={handleExportChart}
          isLoading={isLoading}
        />

        {/* Report Modal */}
        <ReportModal
          isOpen={showReportModal}
          onClose={() => {
            setShowReportModal(false);
            setSelectedChart(null);
          }}
          chart={selectedChart}
          onExport={handleExportChart}
          onShare={handleShareChart}
        />
      </div>
    </div>
  );
};

export default ReportsMaster;
