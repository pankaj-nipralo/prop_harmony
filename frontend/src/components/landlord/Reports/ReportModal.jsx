import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  X,
  Download,
  Maximize2,
  Minimize2,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Settings,
  Share2,
} from "lucide-react";

const ReportModal = ({ isOpen, onClose, chart, onExport, onShare }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartSettings, setChartSettings] = useState({
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    animationEnabled: true,
  });

  if (!chart) return null;

  const handleExport = (format) => {
    onExport && onExport(chart.id, format);
  };

  const handleShare = () => {
    onShare && onShare(chart);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const exportFormats = [
    { value: "png", label: "PNG Image", icon: "Image" },
    { value: "pdf", label: "PDF Document", icon: "FileText" },
    { value: "svg", label: "SVG Vector", icon: "Image" },
    { value: "csv", label: "CSV Data", icon: "Database" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`border-0 bg-white ${
          isFullscreen
            ? "md:max-w-4xl max-h-[90vh]"
            : "md:max-w-4xl md:max-h-[90vh]"
        }  [&>button.absolute]:hidden`}
      >
        <DialogHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
          <div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {chart.title}
            </DialogTitle>
            <p className="mt-1 text-sm text-gray-600">{chart.subtitle}</p>
          </div>

          <div className="flex items-center space-x-2">
            {/* <button
              onClick={() =>
                setChartSettings((prev) => ({
                  ...prev,
                  showGrid: !prev.showGrid,
                }))
              }
              className={`p-2 rounded-lg transition-colors ${
                chartSettings.showGrid
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
              title="Toggle Grid"
            >
              <Settings size={16} />
            </button> */}

            {/* <button
              onClick={handleShare}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="Share Chart"
            >
              <Share2 size={16} />
            </button> */}

            {/* <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button> */}

            <button
              onClick={onClose}
              className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </DialogHeader>

        <div className="flex flex-col space-y-6 overflow-y-auto">
          {/* Chart Display */}
          <Card className="p-6 border-0">
            <div
              className={`w-full ${
                isFullscreen ? "h-[calc(100vh-200px)]" : "h-96"
              }`}
            >
              {chart.component}
            </div>
          </Card>

          {/* Chart Controls */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Export Options */}
            {/* <Card className="p-6 border-0">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Download className="w-5 h-5 text-blue-600" />
                Export Options
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {exportFormats.map((format) => (
                  <button
                    key={format.value}
                    onClick={() => handleExport(format.value)}
                    className="flex items-center gap-2 p-3 text-sm text-gray-700 transition-colors rounded-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <Download size={14} />
                    {format.label}
                  </button>
                ))}
              </div>
            </Card> */}

            {/* Chart Settings */}
            {/* <Card className="p-6 border-0">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
                <Settings className="w-5 h-5 text-blue-600" />
                Chart Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Grid
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chartSettings.showGrid}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          showGrid: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Legend
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chartSettings.showLegend}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          showLegend: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Show Tooltips
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chartSettings.showTooltip}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          showTooltip: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Enable Animations
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={chartSettings.animationEnabled}
                      onChange={(e) =>
                        setChartSettings((prev) => ({
                          ...prev,
                          animationEnabled: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card> */}
          </div>

          {/* Chart Information */}
          {/* <Card className="p-6 border-0">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-900">
              <Activity className="w-5 h-5 text-blue-600" />
              Chart Information
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Chart Type
                </div>
                <div className="flex items-center gap-2">
                  {chart.type === "bar" && (
                    <BarChart3 size={16} className="text-blue-600" />
                  )}
                  {chart.type === "line" && (
                    <LineChart size={16} className="text-blue-600" />
                  )}
                  {chart.type === "pie" && (
                    <PieChart size={16} className="text-blue-600" />
                  )}
                  {chart.type === "area" && (
                    <Activity size={16} className="text-blue-600" />
                  )}
                  <span className="text-sm text-gray-900 capitalize">
                    {chart.type} Chart
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Data Points
                </div>
                <div className="text-sm text-gray-900">
                  {chart.type === "pie" ? "6 categories" : "12 months"}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50">
                <div className="mb-1 text-sm font-medium text-gray-700">
                  Last Updated
                </div>
                <div className="text-sm text-gray-900">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </Card> */}

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="px-6 py-2 myButton"
            >
              Export as PDF
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
