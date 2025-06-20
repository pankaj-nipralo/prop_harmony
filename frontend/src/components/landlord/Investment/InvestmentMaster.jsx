import React, { useState } from "react";
import InvestmentHeader from "./InvestmentHeader";
import InvestmentStats from "./InvestmentStats";
import InvestmentBody from "./InvestmentBody";
import InvestmentCalculatorModal from "./InvestmentCalculatorModal";
import { investmentData } from "@/data/landlord/investment/data";

const InvestmentMaster = () => {
  const [calculations, setCalculations] = useState(investmentData);
  const [calculatorModal, setCalculatorModal] = useState(false);
  const [filters, setFilters] = useState({
    propertyFilter: "All Properties",
    search: ""
  });

  const handleAddCalculation = (newCalculation) => {
    setCalculations(prev => {
      const updatedCalculations = [...prev];
      
      // Find existing group or create new one
      let targetGroup = updatedCalculations.find(group => group.id === 1);
      
      if (targetGroup) {
        targetGroup.calculationsList.unshift(newCalculation);
      } else {
        updatedCalculations.push({
          id: 1,
          calculationsList: [newCalculation],
        });
      }
      
      return updatedCalculations;
    });
  };

  return (
    <div className="min-h-screen p-6"> 
        <InvestmentHeader 
          onNewCalculation={() => setCalculatorModal(true)} 
          calculations={calculations}
          filters={filters}
        />
        <InvestmentStats calculations={calculations} />
        <InvestmentBody
          calculations={calculations}
          setCalculations={setCalculations}
          filters={filters}
          setFilters={setFilters}
        />

        <InvestmentCalculatorModal
          open={calculatorModal}
          onClose={() => setCalculatorModal(false)}
          onSaveCalculation={handleAddCalculation}
        />
      </div> 
  );
};

export default InvestmentMaster;
