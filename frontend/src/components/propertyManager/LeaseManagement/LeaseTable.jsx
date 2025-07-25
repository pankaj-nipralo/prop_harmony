import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const statusColors = {
  expired: "bg-red-100 text-red-700",
  expiring: "bg-yellow-100 text-yellow-700",
  active: "bg-green-100 text-green-700",
};

const renewalColors = {
  pending: "bg-blue-100 text-blue-700",
  "in negotiation": "bg-orange-100 text-orange-700",
  "not started": "bg-gray-100 text-gray-700",
};

const LeaseTable = ({
  leases,
  handleViewLease,
  handleRenewLease,
  selectedLease,
  isViewDialogOpen,
  setIsViewDialogOpen,
  isRenewDialogOpen,
  setIsRenewDialogOpen,
  handleRenewSubmit,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-gray-700">
            <th className="px-4 py-3 font-semibold text-left">Landlord</th>
            <th className="px-4 py-3 font-semibold text-left">Property</th>
            <th className="px-4 py-3 font-semibold text-left">Tenant</th>
            <th className="px-4 py-3 font-semibold text-left">End Date</th>
            <th className="px-4 py-3 font-semibold text-left">Status</th>
            <th className="px-4 py-3 font-semibold text-left">
              Renewal Status
            </th>
            <th className="px-4 py-3 font-semibold text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {leases.map((row) => (
            <tr key={row.id} className="transition-colors hover:bg-gray-50/80">
              <td className="px-4 py-4">
                <div className="font-semibold text-gray-900">{row.landlord}</div>
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold text-gray-900">
                  {row.property}
                </div>
                <div className="text-xs text-gray-500">{row.unit}</div>
              </td>
              <td className="px-4 py-4">
                <div className="font-medium text-gray-900">{row.tenant}</div>
                <div className="text-xs text-gray-500">{row.landlord}</div>
              </td>
              <td className="px-4 py-4">
                <div className="text-gray-700">{row.endDate}</div>
                <div
                  className={`text-xs font-medium ${
                    row.daysUntilExpiry < 0
                      ? "text-red-600"
                      : row.daysUntilExpiry <= 30
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {row.daysUntilExpiry < 0
                    ? `Expired ${Math.abs(row.daysUntilExpiry)} days ago`
                    : `${row.daysUntilExpiry} days remaining`}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium max-w-fit ${
                      statusColors[row.status]
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-1">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium max-w-fit ${
                      renewalColors[row.renewalStatus]
                    }`}
                  >
                    {row.renewalStatus}
                  </span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <Dialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleViewLease(row)}
                        className="px-3 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-200 rounded-full hover:bg-blue-50"
                      >
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">
                            Lease Details
                          </h2>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Property
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.property}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Unit
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.unit}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Tenant
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.tenant}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Landlord
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.landlord}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Start Date
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.startDate}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              End Date
                            </Label>
                            <p className="text-gray-900">
                              {selectedLease?.endDate}
                            </p>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Status
                            </Label>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                statusColors[selectedLease?.status]
                              }`}
                            >
                              {selectedLease?.status}
                            </span>
                          </div>
                          <div>
                            <Label className="block mb-2 text-sm font-medium text-gray-700">
                              Renewal Status
                            </Label>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                renewalColors[selectedLease?.renewalStatus]
                              }`}
                            >
                              {selectedLease?.renewalStatus}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
                          <Button
                            onClick={() => setIsViewDialogOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={isRenewDialogOpen}
                    onOpenChange={setIsRenewDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleRenewLease(row)}
                        className="px-3 py-1 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-full hover:bg-blue-700"
                      >
                        Renew
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold text-gray-800">
                            Renew Lease
                          </h2>
                        </div>
                        <form
                          onSubmit={handleRenewSubmit}
                          className="space-y-4"
                        >
                          <div className="grid gap-4">
                            <div>
                              <Label className="block mb-2 text-sm font-medium text-gray-700">
                                Property
                              </Label>
                              <p className="text-gray-900">
                                {selectedLease?.property}
                              </p>
                            </div>
                            <div>
                              <Label className="block mb-2 text-sm font-medium text-gray-700">
                                Unit
                              </Label>
                              <p className="text-gray-900">
                                {selectedLease?.unit}
                              </p>
                            </div>
                            <div>
                              <Label className="block mb-2 text-sm font-medium text-gray-700">
                                Current End Date
                              </Label>
                              <p className="text-gray-900">
                                {selectedLease?.endDate}
                              </p>
                            </div>
                            <div>
                              <Label className="block mb-2 text-sm font-medium text-gray-700">
                                New End Date
                              </Label>
                              {selectedLease &&
                                (() => {
                                  const newEndDate = new Date(
                                    selectedLease.endDate
                                  );
                                  newEndDate.setFullYear(
                                    newEndDate.getFullYear() + 1
                                  );
                                  return newEndDate.toLocaleDateString();
                                })()}
                            </div>
                          </div>
                          <div className="flex justify-end pt-4 mt-6 space-x-3 border-t border-gray-200">
                            <Button
                              type="button"
                              onClick={() => setIsRenewDialogOpen(false)}
                              className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                            >
                              Confirm Renewal
                            </Button>
                          </div>
                        </form>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaseTable;