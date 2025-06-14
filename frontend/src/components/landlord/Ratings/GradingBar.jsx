import React from "react";
import { convertRatingToGrade, getGradeColor } from "@/data/landlord/ratings/data";

const GradingBar = ({ rating, showLabel = true, size = "md" }) => {
  const { grade, label } = convertRatingToGrade(rating);
  const colors = getGradeColor(grade);
  
  // Size configurations
  const sizeConfig = {
    sm: { height: "h-2", text: "text-xs", padding: "px-2 py-1" },
    md: { height: "h-3", text: "text-sm", padding: "px-3 py-1" },
    lg: { height: "h-4", text: "text-base", padding: "px-4 py-2" }
  };
  
  const config = sizeConfig[size] || sizeConfig.md;
  
  // Calculate position percentage for the rating indicator
  const getPositionPercentage = (rating) => {
    // Map 0-5 rating to 0-100% position
    return Math.min(Math.max((rating / 5) * 100, 0), 100);
  };
  
  const position = getPositionPercentage(rating);
  
  return (
    <div className="space-y-2">
      {/* Grading Bar */}
      <div className="relative">
        {/* Background bar with grade sections */}
        <div className={`w-full ${config.height} bg-gray-200 rounded-full overflow-hidden flex`}>
          {/* Grade F: 0-1.5 (30%) */}
          <div className="bg-red-500 flex-none" style={{ width: '30%' }}></div>
          {/* Grade D: 1.5-2.5 (20%) */}
          <div className="bg-orange-500 flex-none" style={{ width: '20%' }}></div>
          {/* Grade C: 2.5-3.5 (20%) */}
          <div className="bg-yellow-500 flex-none" style={{ width: '20%' }}></div>
          {/* Grade B: 3.5-4.5 (20%) */}
          <div className="bg-blue-500 flex-none" style={{ width: '20%' }}></div>
          {/* Grade A: 4.5-5.0 (10%) */}
          <div className="bg-green-500 flex-none" style={{ width: '10%' }}></div>
        </div>
        
        {/* Rating indicator */}
        <div 
          className="absolute top-0 transform -translate-x-1/2"
          style={{ left: `${position}%` }}
        >
          <div className={`w-1 ${config.height} bg-white border-2 border-gray-800 rounded-full shadow-lg`}></div>
        </div>
      </div>
      
      {/* Grade labels */}
      <div className="flex justify-between text-xs text-gray-600 px-1">
        <span className="font-medium text-red-600">F</span>
        <span className="font-medium text-orange-600">D</span>
        <span className="font-medium text-yellow-600">C</span>
        <span className="font-medium text-blue-600">B</span>
        <span className="font-medium text-green-600">A</span>
      </div>
      
      {/* Rating value and grade display */}
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center ${config.padding} rounded-full ${colors.light} ${colors.text} font-semibold ${config.text}`}>
              {grade}
            </span>
            <span className={`${config.text} text-gray-600`}>
              {label}
            </span>
          </div>
          <span className={`${config.text} font-bold text-gray-900`}>
            {rating.toFixed(1)}/5.0
          </span>
        </div>
      )}
    </div>
  );
};

export default GradingBar;
