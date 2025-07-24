import React from "react";
import {
  Calendar,
  LineChart as LineIcon,
  BarChart3,
  Building2,
  Activity,
  ClipboardList,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DirhamSvg from "@/assets/Dirham";

const incomeExpenseData = [
  { month: "Jan", income: 8500, expenses: 4200 },
  { month: "Feb", income: 8700, expenses: 4300 },
  { month: "Mar", income: 8900, expenses: 4000 },
  { month: "Apr", income: 9100, expenses: 3900 },
];

const propertyValueData = [
  { month: "Jan", value: 30000 },
  { month: "Feb", value: 305000 },
  { month: "Mar", value: 50000 },
  { month: "Apr", value: 320000 },
];

const COLORS = ["#22c55e", "#ef4444"]; // green, red

const occupancyData = [
  { name: "Occupied", value: 50 },
  { name: "Vacant", value: 50 },
];

const properties = [
  { name: "Sunset Apartments Unit 101", date: "21 June, 2025" },
  { name: "Marina View Villa", date: "2 July, 2025" },
  { name: "Marina View Villa", date: "2 July, 2025" },
  { name: "Marina View Villa", date: "2 July, 2025" },
];

const workOrders = [
  {
    property: "Sunset Apartments Unit 101",
    issue: "Leaky faucet",
    status: "In Progress",
    priority: "Medium",
    date: "2025-06-03",
  },
  {
    property: "Marina View Villa",
    issue: "Air conditioning failure",
    status: "Resolved",
    priority: "High",
    date: "2025-06-02",
  },
  {
    property: "Palm Grove Tower",
    issue: "Broken window",
    status: "Pending",
    priority: "Medium",
    date: "2025-06-01",
  },
  {
    property: "Skyline Residences",
    issue: "Elevator malfunction",
    status: "In Progress",
    priority: "High",
    date: "2025-05-30",
  },
];

const DashboardOverview = () => {
  return (
    <>
      {/* Rent Collection  */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="flex items-center justify-start gap-3 mb-4 text-2xl font-semibold">
          {" "}
          <Calendar /> Rent Collection Summary
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Collected</h3>
            <div className="flex items-center gap-2 text-gray-600 jusitfy-start">
              <DirhamSvg
                size={16}
                className="inline-block !m-0 align-middle"
                color1=""
              />{" "}
              <p className="text-lg font-bold">5300</p>
            </div>
          </div>
          <div className="p-4 rounded-lg shadow bg-amber-100">
            <h3 className="text-lg font-semibold">Pending</h3>
            <div className="flex items-center gap-2 text-gray-600 jusitfy-start">
              <DirhamSvg
                size={16}
                className="self-center inline-block !m-0"
                color1=""
              />{" "}
              <p className="text-lg font-bold ">0</p>
            </div>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Overdue</h3>
            <div className="flex items-center gap-2 text-gray-600 jusitfy-start">
              <DirhamSvg
                size={16}
                className="inline-block !m-0 align-middle"
                color1=""
              />{" "}
              <p className="text-lg font-bold">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        {/* Income vs Expenses Chart */}
        <Card className="bg-white border-0 shadow-md border-border rounded-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <BarChart3 className="w-4 h-4 text-primary" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    borderColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Value Trends */}
        <Card className="bg-white border-0 shadow-md border-border rounded-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <LineIcon className="w-4 h-4 text-primary" />
              Property Value Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={propertyValueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    borderColor: "#e5e7eb",
                    backgroundColor: "#fff",
                    fontSize: "14px",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    strokeWidth: 2,
                    fill: "#fff",
                    stroke: "#6366f1",
                  }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* DashboardWidgets */}
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        {/* Recently Added Properties */}
        <Card className="bg-white border-0 shadow-md border-border rounded-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <Building2 className="w-4 h-4 text-primary" />
              Recently Added Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 bg-white border-0">
            {properties.slice(0, 2).map((property, idx) => (
              <div
                key={idx}
                className="p-3 border-gray-300 rounded-lg border-1"
              >
                <p className="font-medium">{property.name}</p>
                <p className="text-sm text-muted-foreground">Added on</p>
                <p className="text-sm font-semibold">{property.date}</p>
              </div>
            ))}
            {/* <div className="p-3 border-gray-300 rounded-lg border-1"> */}
            <p className="p-1 text-sm underline cursor-pointer text-muted-foreground">
              View all properties
            </p>
            {/* </div> */}
          </CardContent>
        </Card>

        {/* Occupancy Breakdown */}
        <Card className="bg-white border-0 shadow-md border-border rounded-2xl">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              Occupancy Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  dataKey="value"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={1}
                  startAngle={180}
                  endAngle={-180}
                  cx="49%"
                  cy="50%"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>

                {/* ✅ Tooltip on hover */}
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    border: "1px solid #e5e7eb",
                    padding: "8px",
                    fontSize: "14px",
                  }}
                />

                <Legend
                  layout="vertical"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value) =>
                    value === "Occupied" ? (
                      <span className="text-sm text-green-600">
                        {value} 50%
                      </span>
                    ) : (
                      <span className="text-sm text-red-500">{value} 50%</span>
                    )
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      {/* Recent Work Orders */}
      <Card className="bg-white border-0 shadow-md rounded-2xl mt-5">
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <ClipboardList className="w-5 h-5 text-primary" />
            Recent Work Orders
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 overflow-x-auto">
          <table className="min-w-full overflow-hidden text-sm text-left border border-gray-200 rounded-lg">
            <thead>
              <tr className="border-b border-gray-200 bg-muted text-muted-foreground">
                <th className="px-4 py-2 font-semibold border-r border-gray-100">
                  Property
                </th>
                <th className="px-4 py-2 font-semibold border-r border-gray-100">
                  Issue
                </th>
                <th className="px-4 py-2 font-semibold border-r border-gray-100">
                  Status
                </th>
                <th className="px-4 py-2 font-semibold border-r border-gray-100">
                  Priority
                </th>
                <th className="px-4 py-2 font-semibold">Date</th>
              </tr>
            </thead>

            <tbody>
              {workOrders.length > 0 ? (
                workOrders.slice(0, 2).map((order, index) => (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } border-b border-gray-200 hover:bg-muted/40`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 border-r border-gray-100">
                      {order.property}
                    </td>
                    <td className="px-4 py-3 text-gray-700 border-r border-gray-100">
                      {order.issue}
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-r border-gray-100">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : order.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-6 italic text-center text-muted-foreground"
                  >
                    No recent work orders
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardOverview;
