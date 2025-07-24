import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EditContractorDialog = ({
  isOpen,
  onOpenChange,
  formData,
  onFormChange,
  onSpecialtyChange,
  onSubmit,
  specialtiesList,
//   contractor,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-2xl max-h-screen overflow-y-auto bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Contractor
            </h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label
                  htmlFor="edit-name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Name *
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={onFormChange}
                  placeholder="Enter contractor name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-company"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Company *
                </Label>
                <Input
                  id="edit-company"
                  name="company"
                  value={formData.company}
                  onChange={onFormChange}
                  placeholder="Enter company name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email *
                </Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onFormChange}
                  placeholder="Enter email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-phone"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Phone *
                </Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={onFormChange}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="edit-rate"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Rate/Hour *
                </Label>
                <Input
                  id="edit-rate"
                  name="rate"
                  type="number"
                  value={formData.rate}
                  onChange={onFormChange}
                  placeholder="Enter hourly rate"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label className="block mb-2 text-sm font-medium text-gray-700">
                  Specialties
                </Label>
                <div className="flex flex-wrap gap-2">
                  {specialtiesList.map((specialty) => (
                    <button
                      key={specialty}
                      type="button"
                      onClick={() => onSpecialtyChange(specialty)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        formData.specialties.includes(specialty)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="edit-status"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Status *
                </Label>
                <select
                  id="edit-status"
                  name="status"
                  value={formData.status}
                  onChange={onFormChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end pt-4 space-x-3 border-t border-gray-200">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
              >
                Update Contractor
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditContractorDialog;