import React from "react";

import {
  Home,
  CalendarDays,
  CreditCard,
  WrenchIcon,
  AppWindowIcon,
  CodeIcon,
} from "lucide-react";
import { dashboardData } from "@/data/landlord/dashboard/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "./DashboardOverview";
import DashboardProperties from "./DashboardProperties";
const DashboardBody = () => {
  return (
    <div className="flex-1 w-full py-10 overflow-y-auto">
      <Tabs defaultValue="overview" className="w-full mx-auto">
        <TabsList className="flex items-center self-center justify-between w-full max-w-2xl gap-3 p-2 mb-6 border border-gray-200 rounded-lg bg-gray-50">
          <TabsTrigger
            value="overview"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-[#324867] data-[state=active]:text-white
                  hover:bg-[#3b83f7] hover:text-white font-medium"
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="properties"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-[#324867] data-[state=active]:text-white
                  hover:bg-[#3b83f7] hover:text-white font-medium"
          >
            Properties
          </TabsTrigger>

          <TabsTrigger
            value="maintenance"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-[#324867] data-[state=active]:text-white
                  hover:bg-[#3b83f7] hover:text-white font-medium"
          >
            Maintenance
          </TabsTrigger>

          <TabsTrigger
            value="payment"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-[#324867] data-[state=active]:text-white
                  hover:bg-[#3b83f7] hover:text-white font-medium"
          >
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="rounded-lg"
        >
          <DashboardOverview />
        </TabsContent>

        <TabsContent
          value="properties"
          className="rounded-lg "
        >
          <DashboardProperties />
        </TabsContent>

        <TabsContent
          value="maintenance"
          className="p-6 bg-white border border-gray-200 rounded-lg"
        >
          <div>Maintenance content here</div>
        </TabsContent>

        <TabsContent
          value="payment"
          className="p-6 bg-white border border-gray-200 rounded-lg"
        >
          <div>Payment content here</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardBody;
