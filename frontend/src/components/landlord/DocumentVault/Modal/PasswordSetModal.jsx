import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export const PasswordSetModal = ({
  open,
  onClose,
  item,
  onSetPassword
}) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim()) {
      onSetPassword(item, password.trim());
      setPassword("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-white border-0 rounded-lg shadow-xl">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Set Password Protection
          </h2>
          <p className="mb-4 text-gray-600">
            Set a password to protect "{item?.name}".
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Set Password
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};