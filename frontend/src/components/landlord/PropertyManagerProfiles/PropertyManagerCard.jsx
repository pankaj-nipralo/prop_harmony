import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Briefcase, Building2, Mail } from "lucide-react";

export const PropertyManagerCard = ({ manager, onViewProfile, onSendInvite }) => {
  return (
    <Card className="w-full max-w-full transition-shadow duration-200 bg-white border-0 hover:shadow-lg">
      <CardHeader className="rounded-t-lg bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-4">
          <img
            src={manager.image}
            alt={manager.name}
            className="object-cover w-16 h-16 rounded-full"
          />
          <div>
            <CardTitle className="text-blue-900">{manager.name}</CardTitle>
            <div className="flex items-center text-sm text-blue-600">
              <MapPin className="w-4 h-4 mr-1" />
              {manager.location}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
            <span>{manager.experience} years experience</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {manager.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm text-blue-700 rounded-full bg-blue-50"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4 border-t border-gray-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => onViewProfile(manager)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              View Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-0 shadow-xl md:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Property Manager Profile
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-rows-3 gap-6">
              <div className="row-span-2 space-y-4">
                <img
                  src={manager.image}
                  alt={manager.name}
                  className="object-cover w-32 h-32 mx-auto rounded-full ring-4 ring-blue-100"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-900">
                    {manager.name}
                  </h3>
                  <p className="text-blue-600">{manager.location}</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50">
                  <h4 className="mb-2 font-semibold text-blue-900">Bio</h4>
                  <p className="text-gray-700">{manager.bio}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col p-3 rounded-lg bg-blue-50">
                  <h4 className="mb-1 font-semibold text-blue-900">
                    Services Offered
                  </h4>
                  <ul className="space-y-1">
                    {manager.services.map((service, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col p-3 rounded-lg bg-blue-50">
                  <h4 className="mb-1 font-semibold text-blue-900">
                    Portfolio
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {manager.portfolio.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-white text-blue-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => onSendInvite(manager)}
          className="text-white bg-blue-600 hover:bg-blue-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Invite
        </Button>
      </CardFooter>
    </Card>
  );
};