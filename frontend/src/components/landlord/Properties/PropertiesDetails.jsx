import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft , MapPin, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const mockProperties = [
  {
    id: 1,
    title: "Sunset Apartments Unit 101",
    location: "123 Main Street, Dubai Marina, Dubai",
    rating: 4.5,
    status: "active",
    leaseEnd: "2025-12-31",
    daysRemaining: 209,
    features: ["Balcony", "Parking", "Pool", "Gym"],
  },
  {
    id: 2,
    title: "Marina View Villa",
    location: "456 Palm Street, Palm Jumeirah, Dubai",
    rating: 4.8,
    status: "pending",
    leaseEnd: "2025-06-30",
    daysRemaining: 25,
    features: ["Garden", "Private Pool", "Garage", "+1 more"],
  },
];

function getStatusLabel(status) {
  if (status === "active")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
        Active
      </span>
    );
  if (status === "pending")
    return (
      <span className="px-3 py-1 mr-2 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
        Pending
      </span>
    );
  return (
    <span className="px-3 py-1 mr-2 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
      Ended
    </span>
  );
}

const initialDocuments = [];
const initialWorkOrders = [];
const initialTenants = [
  {
    name: "Michael Davis",
    email: "michael.davis@email.com",
    phone: "+971 50 123 4567",
    moveIn: "2024-01-01",
    leaseEnd: "2025-12-31",
    status: "Active",
  },
];
const initialTransactions = [
  { date: "2025-05-01", description: "Rent Payment", amount: "AED 8,500" },
  { date: "2025-04-01", description: "Rent Payment", amount: "AED 8,500" },
];

const PropertiesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = mockProperties.find((p) => p.id === Number(id));

  const [documents, setDocuments] = useState(initialDocuments);
  const [showDocDialog, setShowDocDialog] = useState(false);
  const [docFile, setDocFile] = useState(null);
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [showWorkOrderDialog, setShowWorkOrderDialog] = useState(false);
  const [workOrderForm, setWorkOrderForm] = useState({
    title: "",
    description: "",
    status: "Open",
    date: new Date().toISOString().slice(0, 10),
  });
  const [tenants] = useState(initialTenants);
  const [transactions] = useState(initialTransactions);
  const [docPreview, setDocPreview] = useState(null);
  const [showDocPreview, setShowDocPreview] = useState(false);

  if (!property) {
    return <div className="p-6">Property not found.</div>;
  }

  // Document upload handler
  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setDocuments((prev) => [
        ...prev,
        {
          name: file.name,
          size: file.size,
          type: file.type,
          uploaded: new Date().toLocaleString(),
          url: fileUrl,
        },
      ]);
      setShowDocDialog(false);
    }
  };

  // Work order add handler
  const handleAddWorkOrder = () => {
    setWorkOrders((prev) => [
      ...prev,
      { ...workOrderForm, id: prev.length + 1 },
    ]);
    setWorkOrderForm({
      title: "",
      description: "",
      status: "Open",
      date: new Date().toISOString().slice(0, 10),
    });
    setShowWorkOrderDialog(false);
  };

  return (
    <div className="bg-transparent">
      <button
        className="flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-gray-700 transition duration-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white"
        aria-label="Back to Properties"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Properties
      </button>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Main Info */}
        <div className="flex flex-col col-span-2 gap-4 p-6 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-1 text-2xl font-bold text-gray-900">
                {property.title}
              </h2>
              <div className="flex items-center mb-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                {property.location}
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-50">
              <Star className="w-4 h-4 text-yellow-400" fill="#facc15" />
              <span className="text-base font-semibold text-yellow-600">
                {property.rating}
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-700">
              Features
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {property.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Lease Status */}
        <div className="flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-semibold text-gray-700">
              Lease Status
            </span>
          </div>
          <div className="flex items-center gap-2">
            {getStatusLabel(property.status)}
            <span className="text-xs text-gray-500">
              Ends{" "}
              {new Date(property.leaseEnd).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="mt-2">
            <span className="block mb-1 text-xs text-gray-500">
              Lease Progress
            </span>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full"
                style={{
                  width: property.status === "active" ? "43%" : "12%",
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{property.status === "active" ? "43%" : "12%"}</span>
              <span>{property.daysRemaining} days remaining</span>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Section */}
      <div className="mt-6">
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="flex items-center self-center justify-start w-full max-w-2xl gap-3 p-2 mb-6 border border-gray-200 rounded-lg bg-gray-50">
            <TabsTrigger
              value="documents"
              className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-500 hover:text-white font-medium"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="workorders"
              className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-500 hover:text-white font-medium "
            >
              Work Orders
            </TabsTrigger>
            <TabsTrigger
              value="tenantinfo"
              className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-500 hover:text-white font-medium"
            >
              Tenant Info
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-500 hover:text-white font-medium"
            >
              Financial Summary
            </TabsTrigger>
          </TabsList>
          {/* Documents Tab */}
          <TabsContent
            value="documents"
            className="p-6 bg-white border border-gray-200 rounded-b-xl"
          >
            <h3 className="mb-2 text-lg font-semibold">Property Documents</h3>
            <div className="flex justify-end mb-4 ">
              <Dialog
                open={showDocDialog}
                onOpenChange={setShowDocDialog}
                className="w-full bg-amber-50"
              >
                <DialogTrigger asChild>
                  <button className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                    Upload Document
                  </button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md bg-white">
                  <h4 className="mb-4 text-lg font-semibold">
                    Upload Document
                  </h4>
                  <input
                    type="file"
                    className="block p-2 mb-4 text-sm border border-gray-300 rounded-lg cursor-pointer bg-blue-305 text-gray-00 "
                    onChange={handleDocUpload}
                  />
                  <button
                    className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600"
                    onClick={() => setShowDocDialog(false)}
                  >
                    Cancel
                  </button>
                </DialogContent>
              </Dialog>
            </div>
            {documents.length === 0 ? (
              <div className="text-base text-gray-400">
                No documents available for this property.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="text-gray-500 border-b">
                      <th className="px-2 py-2 font-medium">Name</th>
                      <th className="px-2 py-2 font-medium">Type</th>
                      <th className="px-2 py-2 font-medium">Size</th>
                      <th className="px-2 py-2 font-medium">Uploaded</th>
                      <th className="px-2 py-2 font-medium">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="px-2 py-2">{doc.name}</td>
                        <td className="px-2 py-2">{doc.type}</td>
                        <td className="px-2 py-2">
                          {(doc.size / 1024).toFixed(1)} KB
                        </td>
                        <td className="px-2 py-2">{doc.uploaded}</td>
                        <td className="px-2 py-2">
                          {doc.url && (
                            <button
                              className="px-3 py-1 text-xs font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-800"
                              onClick={() => {
                                setDocPreview(doc);
                                setShowDocPreview(true);
                              }}
                            >
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Document Preview Modal */}
                <Dialog open={showDocPreview} onOpenChange={setShowDocPreview}>
                  <DialogContent className="w-full max-w-2xl bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">
                        Document Preview
                      </h4>
                      {/* <button
                        className="px-2 py-1 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setShowDocPreview(false)}
                      >
                        Close
                      </button> */}
                    </div>
                    {docPreview && (
                      <div className="w-full h-[60vh] flex items-center justify-center">
                        {docPreview.type.startsWith("image/") ? (
                          <img
                            src={docPreview.url}
                            alt={docPreview.name}
                            className="max-w-full max-h-full rounded shadow"
                          />
                        ) : docPreview.type === "application/pdf" ? (
                          <iframe
                            src={docPreview.url}
                            title={docPreview.name}
                            className="w-full h-full border rounded"
                          />
                        ) : (
                          <a
                            href={docPreview.url}
                            download={docPreview.name}
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800"
                          >
                            Download {docPreview.name}
                          </a>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>

          {/* Work Orders Tab */}
          <TabsContent
            value="workorders"
            className="p-0 bg-transparent border-0"
          >
            <div className="flex flex-col items-start justify-between px-6 pt-6 pb-2 bg-white border border-gray-200 md:flex-row md:items-center rounded-t-xl">
              <h3 className="mb-2 text-lg font-semibold">Work Orders</h3>
              <Dialog
                open={showWorkOrderDialog}
                onOpenChange={setShowWorkOrderDialog}
              >
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600">
                    <span className="text-lg font-bold leading-none">+</span>{" "}
                    New Work Order
                  </button>
                </DialogTrigger>
                <DialogContent className="w-full max-w-md bg-amber-50">
                  <h4 className="mb-4 text-lg font-semibold">
                    Add New Work Order
                  </h4>
                  <input
                    type="text"
                    placeholder="Title"
                    className="block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
                    value={workOrderForm.title}
                    onChange={(e) =>
                      setWorkOrderForm({
                        ...workOrderForm,
                        title: e.target.value,
                      })
                    }
                  />
                  <textarea
                    placeholder="Description"
                    className="block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
                    value={workOrderForm.description}
                    onChange={(e) =>
                      setWorkOrderForm({
                        ...workOrderForm,
                        description: e.target.value,
                      })
                    }
                  />
                  <select
                    className="block w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
                    value={workOrderForm.status}
                    onChange={(e) =>
                      setWorkOrderForm({
                        ...workOrderForm,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <input
                    type="date"
                    className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
                    value={workOrderForm.date}
                    onChange={(e) =>
                      setWorkOrderForm({
                        ...workOrderForm,
                        date: e.target.value,
                      })
                    }
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="px-4 py-2 font-semibold text-gray-700 transition bg-gray-200 rounded-lg hover:bg-gray-300"
                      onClick={() => setShowWorkOrderDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                      onClick={handleAddWorkOrder}
                    >
                      Add
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="p-6 bg-white border-b border-gray-200 border-x rounded-b-xl">
              {workOrders.length === 0 ? (
                <div className="flex items-center justify-center p-8">
                  <span className="text-base text-gray-400">
                    No work orders available for this property.
                  </span>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="text-gray-500 border-b">
                        <th className="px-2 py-2 font-medium">Title</th>
                        <th className="px-2 py-2 font-medium">Description</th>
                        <th className="px-2 py-2 font-medium">Status</th>
                        <th className="px-2 py-2 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workOrders.map((wo, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="px-2 py-2">{wo.title}</td>
                          <td className="px-2 py-2">{wo.description}</td>
                          <td className="px-2 py-2">{wo.status}</td>
                          <td className="px-2 py-2">{wo.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </TabsContent>
          {/* Tenant Info Tab */}
          <TabsContent
            value="tenantinfo"
            className="p-6 bg-white border border-gray-200 rounded-xl"
          >
            <h3 className="mb-4 text-lg font-semibold">Tenant Information</h3>
            {tenants.length == 0 ? (
              <div className="flex items-center justify-center min-h-[80px]">
                <span className="text-base text-gray-400">
                  No tenants available for this property.
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-col w-full max-w-6xl gap-3 p-8 transition border border-gray-200 shadow bg-gray-50 rounded-2xl hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-white bg-blue-600 rounded-full">
                      {tenants[0].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-2xl font-semibold text-gray-900">
                        {tenants[0].name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {tenants[0].email}
                      </div>
                    </div>
                    <span
                      className={`ml-auto px-4 py-2 text-sm font-semibold rounded-full ${
                        tenants[0].status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tenants[0].status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-base text-gray-700 md:grid-cols-2">
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {tenants[0].phone}
                    </div>
                    <div>
                      <span className="font-medium">Move In:</span>{" "}
                      {tenants[0].moveIn}
                    </div>
                    <div>
                      <span className="font-medium">Lease End:</span>{" "}
                      {tenants[0].leaseEnd}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> 123 Main
                      Street, Dubai Marina, Dubai
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>{" "}
                      +971 55 987 6543
                    </div>
                    <div>
                      <span className="font-medium">Payment Status:</span> Paid
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Notes:</span> No outstanding
                      issues. Good tenant record.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          {/* Financial Summary Tab */}
          <TabsContent
            value="financial"
            className="p-0 bg-transparent border-0"
          >
            <div className="grid grid-cols-1 gap-4 p-6 bg-transparent md:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="mb-1 text-sm text-gray-500">Monthly Rent</div>
                <div className="text-2xl font-bold text-blue-500">
                  AED 8,500
                </div>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="mb-1 text-sm text-gray-500">
                  Security Deposit
                </div>
                <div className="text-2xl font-bold text-blue-500">AED 0</div>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="mb-1 text-sm text-gray-500">Total Paid</div>
                <div className="text-2xl font-bold text-green-600">
                  AED 17,000
                </div>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-xl">
                <div className="mb-1 text-sm text-gray-500">
                  Current Balance
                </div>
                <div className="text-2xl font-bold text-green-600">
                  AED 0 credit
                </div>
              </div>
            </div>
            <div className="p-6 mt-4 bg-white border border-gray-200 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">$</span>
                <span className="text-lg font-semibold">
                  Transaction History
                </span>
              </div>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="px-2 py-2 font-medium">Date</th>
                    <th className="px-2 py-2 font-medium">Description</th>
                    <th className="px-2 py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-6 text-center text-gray-400"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    transactions.map((txn, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="px-2 py-2">{txn.date}</td>
                        <td className="px-2 py-2">{txn.description}</td>
                        <td className="px-2 py-2">{txn.amount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertiesDetails;
