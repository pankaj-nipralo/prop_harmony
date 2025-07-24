import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const SearchFilters = ({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedExperience,
  setSelectedExperience,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Find Property Managers</h1>
        <Button
          onClick={resetFilters}
          className="text-sm text-blue-600 transition-all duration-300 ease-out border border-blue-600 cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          Reset Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="relative w-full col-span-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
          <Input
            placeholder="Search by name, city, or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 text-sm bg-white border border-blue-200 rounded-md focus:ring-blue-600 focus:outline-none focus:border-none"
          />
        </div>

        {/* Location Filter */}
        <Select
          value={selectedLocation}
          onValueChange={setSelectedLocation}
        >
          <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
            <SelectItem
              value="dubai"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Dubai
            </SelectItem>
            <SelectItem
              value="mumbai"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Mumbai
            </SelectItem>
            <SelectItem
              value="bangalore"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Bangalore
            </SelectItem>
            <SelectItem
              value="delhi"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Delhi NCR
            </SelectItem>
            <SelectItem
              value="abu dhabi"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Abu Dhabi
            </SelectItem>
            <SelectItem
              value="sharjah"
              className="px-3 py-2 hover:bg-gray-50"
            >
              Sharjah
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Experience Filter */}
        <Select
          value={selectedExperience}
          onValueChange={setSelectedExperience}
        >
          <SelectTrigger className="w-full py-2 text-sm bg-white border border-blue-200 rounded-md focus:border-blue-600 focus:ring-blue-600">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent className="text-sm bg-white border border-blue-100 rounded-md shadow-md">
            <SelectItem value="0-2" className="px-3 py-2 hover:bg-gray-50">
              0-2 years
            </SelectItem>
            <SelectItem value="3-5" className="px-3 py-2 hover:bg-gray-50">
              3-5 years
            </SelectItem>
            <SelectItem value="5+" className="px-3 py-2 hover:bg-gray-50">
              5+ years
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};