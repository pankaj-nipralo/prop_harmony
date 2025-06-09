import React from "react";
 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardOverview from "./DashboardOverview";
import DashboardProperties from "./DashboardProperties";
import DashboardMaintenance from "./DashboardMaintenance";
import DashboardPayment from "./DashboardPayment";
const DashboardBody = () => {
  return (
    <div className="flex-1 w-full py-10 overflow-y-auto">
      <Tabs defaultValue="overview" className="w-full mx-auto">
        <TabsList className="flex items-center self-center justify-between w-full max-w-2xl gap-3 p-2 mb-6 border border-gray-200 rounded-lg bg-gray-50">
          <TabsTrigger
            value="overview"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-400 hover:text-white font-medium"
          >
            Overview
          </TabsTrigger>

          <TabsTrigger
            value="properties"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-400 hover:text-white font-medium"
          >
            Properties
          </TabsTrigger>

          <TabsTrigger
            value="maintenance"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-400 hover:text-white font-medium"
          >
            Maintenance
          </TabsTrigger>

          <TabsTrigger
            value="payment"
            className="cursor-pointer relative px-4 py-4 rounded-md transition-all duration-200 
                  data-[state=active]:bg-blue-600 data-[state=active]:text-white
                  hover:bg-blue-400 hover:text-white font-medium"
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
          className="rounded-lg p"
        >
          <DashboardMaintenance />
        </TabsContent>

        <TabsContent
          value="payment"
          className="rounded-lg "
        >
          <DashboardPayment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardBody;
