import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const AddLeaseDialog = ({
  isOpen,
  setIsOpen,
  newLease,
  handleInputChange,
  handleSubmitNewLease,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-5 py-3 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New Lease
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Lease
            </h2>
          </div>
          <form onSubmit={handleSubmitNewLease} className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label
                  htmlFor="property"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Property *
                </Label>
                <Input
                  id="property"
                  name="property"
                  value={newLease.property}
                  onChange={handleInputChange}
                  placeholder="Enter property name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="unit"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Unit *
                </Label>
                <Input
                  id="unit"
                  name="unit"
                  value={newLease.unit}
                  onChange={handleInputChange}
                  placeholder="Enter unit number"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="tenant"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Tenant *
                </Label>
                <Input
                  id="tenant"
                  name="tenant"
                  value={newLease.tenant}
                  onChange={handleInputChange}
                  placeholder="Enter tenant name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="landlord"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Landlord *
                </Label>
                <Input
                  id="landlord"
                  name="landlord"
                  value={newLease.landlord}
                  onChange={handleInputChange}
                  placeholder="Enter landlord name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Start Date *
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={newLease.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="endDate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  End Date *
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={newLease.endDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                Create Lease
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeaseDialog;