import React, { useState } from "react";
import BookkeepingHeader from "./BookkeepingHeader";
import BookkeepingStats from "./BookkeepingStats";
import BookkeepingBody from "./BookkeepingBody";
import AddTransactionModal from "./AddTransactionModal";
import { bookkeepingData } from "@/data/landlord/bookkeeping/data";

const BookKeepingMaster = () => {
  const [transactions, setTransactions] = useState(bookkeepingData);
  const [addModal, setAddModal] = useState(false);
  const [filters, setFilters] = useState({
    propertyFilter: "All Properties",
    categoryFilter: "All Categories",
    typeFilter: "All Types",
    search: "",
  });

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => {
      const updatedTransactions = [...prev];
      if (updatedTransactions.length > 0) {
        updatedTransactions[0] = {
          ...updatedTransactions[0],
          transactionsList: [
            newTransaction,
            ...updatedTransactions[0].transactionsList,
          ],
        };
      } else {
        updatedTransactions.push({
          id: 1,
          transactionsList: [newTransaction],
        });
      }
      return updatedTransactions;
    });
  };

  return (
    <div className="min-h-screen p-6 ">
      <BookkeepingHeader
        onNewTransaction={() => setAddModal(true)}
        transactions={transactions}
        filters={filters}
      />
      <BookkeepingStats transactions={transactions} />
      <BookkeepingBody
        transactions={transactions}
        setTransactions={setTransactions}
        filters={filters}
        setFilters={setFilters}
      />

      <AddTransactionModal
        open={addModal}
        onClose={() => setAddModal(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
};

export default BookKeepingMaster;
