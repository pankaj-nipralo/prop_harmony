import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export const InviteModal = ({ isOpen, onOpenChange, onSendInvite }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md p-6 bg-white border border-blue-100 shadow-2xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl font-bold text-blue-900">
            Send Invitation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Message Box */}
          <div className="space-y-1">
            <Label
              htmlFor="message"
              className="text-sm font-medium text-blue-900"
            >
              Message (Optional)
            </Label>
            <textarea
              id="message"
              placeholder="Write your invitation message..."
              className="w-full h-32 p-3 text-sm bg-transparent border rounded-md shadow-none resize-none focus:outline-none"
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={onSendInvite}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Invitation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};