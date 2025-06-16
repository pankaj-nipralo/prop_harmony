import React from "react";
import { Card } from "@/components/ui/card";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Users,
  Home,
  Calendar
} from "lucide-react";
import { formatCurrency, formatPercentage } from "@/data/landlord/reports/data";

const ReportsStats = ({ reportType, stats, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="p-6 bg-white border-0">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="w-24 h-8 mb-2 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const getStatsForReportType = () => {
    switch (reportType) {
      case 'financial':
        return [
          {
            title: "Total Revenue",
            value: formatCurrency(stats?.totalRevenue || 1175000),
            subtitle: "Last 12 months",
            icon: DollarSign,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+12.5%",
            trendUp: true
          },
          {
            title: "Total Expenses",
            value: formatCurrency(stats?.totalExpenses || 396000),
            subtitle: "Last 12 months",
            icon: TrendingDown,
            color: "red",
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            trend: "+8.2%",
            trendUp: true
          },
          {
            title: "Net Profit",
            value: formatCurrency(stats?.totalProfit || 779000),
            subtitle: "Last 12 months",
            icon: TrendingUp,
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+15.3%",
            trendUp: true
          },
          {
            title: "Profit Margin",
            value: formatPercentage(stats?.profitMargin || 66.3),
            subtitle: "Average margin",
            icon: Target,
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            trend: "+2.1%",
            trendUp: true
          }
        ];

      case 'payment':
        return [
          {
            title: "Collection Rate",
            value: formatPercentage(stats?.avgCollectionRate || 97.2),
            subtitle: "Average rate",
            icon: Target,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+1.8%",
            trendUp: true
          },
          {
            title: "Total Payments",
            value: stats?.totalPayments?.toLocaleString() || "358",
            subtitle: "This year",
            icon: BarChart3,
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+23%",
            trendUp: true
          },
          {
            title: "Payment Amount",
            value: formatCurrency(stats?.totalAmount || 1100000),
            subtitle: "Total collected",
            icon: DollarSign,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+18.5%",
            trendUp: true
          },
          {
            title: "Overdue Amount",
            value: formatCurrency(stats?.totalOverdue || 64400),
            subtitle: "Outstanding",
            icon: TrendingDown,
            color: "red",
            bgColor: "bg-red-50",
            iconColor: "text-red-600",
            trend: "-12.3%",
            trendUp: false
          }
        ];

      case 'property':
        return [
          {
            title: "Total Properties",
            value: "17",
            subtitle: "Active properties",
            icon: Home,
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+2",
            trendUp: true
          },
          {
            title: "Occupancy Rate",
            value: "93.8%",
            subtitle: "Average rate",
            icon: Users,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+2.4%",
            trendUp: true
          },
          {
            title: "Average ROI",
            value: "12.1%",
            subtitle: "Return on investment",
            icon: TrendingUp,
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            trend: "+1.2%",
            trendUp: true
          },
          {
            title: "Maintenance Cost",
            value: formatCurrency(275900),
            subtitle: "Total this year",
            icon: Activity,
            color: "orange",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            trend: "+5.8%",
            trendUp: true
          }
        ];

      case 'tenant':
        return [
          {
            title: "Total Tenants",
            value: "180",
            subtitle: "Active tenants",
            icon: Users,
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+12",
            trendUp: true
          },
          {
            title: "Satisfaction Score",
            value: "4.2/5.0",
            subtitle: "Average rating",
            icon: Target,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "+0.3",
            trendUp: true
          },
          {
            title: "Renewal Rate",
            value: "84.6%",
            subtitle: "Lease renewals",
            icon: Calendar,
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            trend: "+3.2%",
            trendUp: true
          },
          {
            title: "Avg Lease Length",
            value: "14.2 months",
            subtitle: "Average duration",
            icon: Activity,
            color: "orange",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            trend: "+1.1",
            trendUp: true
          }
        ];

      case 'maintenance':
        return [
          {
            title: "Total Requests",
            value: "564",
            subtitle: "This year",
            icon: Activity,
            color: "blue",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            trend: "+45",
            trendUp: true
          },
          {
            title: "Avg Response Time",
            value: "2.5 hours",
            subtitle: "Average time",
            icon: Target,
            color: "green",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            trend: "-0.3h",
            trendUp: false
          },
          {
            title: "Completion Rate",
            value: "96.8%",
            subtitle: "Completed on time",
            icon: TrendingUp,
            color: "purple",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            trend: "+2.1%",
            trendUp: true
          },
          {
            title: "Total Cost",
            value: formatCurrency(149345),
            subtitle: "Maintenance spend",
            icon: DollarSign,
            color: "orange",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            trend: "+8.7%",
            trendUp: true
          }
        ];

      default:
        return [];
    }
  };

  const statCards = getStatsForReportType();

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="p-6 transition-all duration-200 bg-white border-0 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  {stat.trend && (
                    <span className={`text-xs font-medium flex items-center gap-1 ${
                      stat.trendUp ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Insights */}
      <Card className="p-6 bg-white border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            View All Insights
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {getInsightsForReportType(reportType).map((insight, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                  <insight.icon className={`w-4 h-4 ${insight.iconColor}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const getInsightsForReportType = (reportType) => {
  switch (reportType) {
    case 'financial':
      return [
        {
          title: "Revenue Growth",
          description: "32% increase vs last year",
          icon: TrendingUp,
          bgColor: "bg-green-50",
          iconColor: "text-green-600"
        },
        {
          title: "Cost Optimization",
          description: "Maintenance costs reduced by 8%",
          icon: Target,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          title: "Profit Margin",
          description: "Above industry average of 58%",
          icon: BarChart3,
          bgColor: "bg-purple-50",
          iconColor: "text-purple-600"
        }
      ];

    case 'payment':
      return [
        {
          title: "Collection Efficiency",
          description: "97.2% collection rate achieved",
          icon: Target,
          bgColor: "bg-green-50",
          iconColor: "text-green-600"
        },
        {
          title: "Payment Methods",
          description: "68% prefer bank transfers",
          icon: PieChart,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          title: "Overdue Reduction",
          description: "12% decrease in overdue amounts",
          icon: TrendingDown,
          bgColor: "bg-orange-50",
          iconColor: "text-orange-600"
        }
      ];

    case 'property':
      return [
        {
          title: "High Performers",
          description: "Garden Heights leads with 96.7% occupancy",
          icon: Home,
          bgColor: "bg-green-50",
          iconColor: "text-green-600"
        },
        {
          title: "ROI Leaders",
          description: "Garden Heights: 14.5% ROI",
          icon: TrendingUp,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          title: "Maintenance Focus",
          description: "Downtown Loft needs attention",
          icon: Activity,
          bgColor: "bg-orange-50",
          iconColor: "text-orange-600"
        }
      ];

    case 'tenant':
      return [
        {
          title: "High Satisfaction",
          description: "Communication rated 4.5/5",
          icon: Users,
          bgColor: "bg-green-50",
          iconColor: "text-green-600"
        },
        {
          title: "Renewal Success",
          description: "84.6% renewal rate",
          icon: Calendar,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          title: "Demographics",
          description: "37% tenants aged 26-35",
          icon: BarChart3,
          bgColor: "bg-purple-50",
          iconColor: "text-purple-600"
        }
      ];

    case 'maintenance':
      return [
        {
          title: "Quick Response",
          description: "2.1 hour avg for emergencies",
          icon: Target,
          bgColor: "bg-green-50",
          iconColor: "text-green-600"
        },
        {
          title: "Cost Control",
          description: "Plumbing: 285 avg cost",
          icon: DollarSign,
          bgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          title: "Peak Season",
          description: "July had highest requests (63)",
          icon: Activity,
          bgColor: "bg-orange-50",
          iconColor: "text-orange-600"
        }
      ];

    default:
      return [];
  }
};

export default ReportsStats;
