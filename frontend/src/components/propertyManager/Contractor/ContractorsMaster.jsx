import React, { useState } from "react";
import ContractorsHeader from "../../landlord/Contractors/ContractorsHeader";
import ContractorsFilters from "../../landlord/Contractors/ContractorsFilters";
import ContractorsTable from "../../landlord/Contractors/ContractorsTable";
import AddContractorDialog from "../../landlord/Contractors/AddContractorDialog";
import EditContractorDialog from "../../landlord/Contractors/EditContractorDialog";
import DeleteContractorDialog from "../../landlord/Contractors/DeleteContractorDialog";

// Dummy contractor data
const contractorData = [
  {
    id: 1,
    name: "Ahmed Hassan",
    company: "Hassan Plumbing Services",
    jobsCompleted: 45,
    email: "ahmed@hassanplumbing.ae",
    phone: "+971-50-123-4567",
    address: "Dubai Marina, Dubai, UAE",
    specialties: ["Plumbing", "Water Heater Repair"],
    rating: 4.8,
    rate: 150,
    status: "active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Elite Electrical Solutions",
    jobsCompleted: 62,
    email: "sarah@eliteelectrical.ae",
    phone: "+971-55-987-6543",
    address: "Business Bay, Dubai, UAE",
    specialties: ["Electrical", "AC Installation", "Smart Home"],
    rating: 4.9,
    rate: 175,
    status: "active",
  },
];

const specialtiesList = [
  "Plumbing",
  "Water Heater Repair",
  "Electrical",
  "AC Installation",
  "Smart Home",
];

const ContractorMaster = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [contractors, setContractors] = useState(contractorData);
  const [addForm, setAddForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    specialties: [],
    rate: "",
    status: "active",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    specialties: [],
    rate: "",
    status: "active",
  });

  // Filtering logic
  const filteredContractors = contractors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSpecialty =
      specialtyFilter === "all" || c.specialties.includes(specialtyFilter);
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const handleEditClick = (contractor) => {
    setSelectedContractor(contractor);
    setEditForm({
      name: contractor.name,
      company: contractor.company,
      email: contractor.email,
      phone: contractor.phone,
      specialties: contractor.specialties,
      rate: contractor.rate,
      status: contractor.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setContractors((prevContractors) =>
      prevContractors.map((contractor) =>
        contractor.id === selectedContractor.id
          ? { ...contractor, ...editForm }
          : contractor
      )
    );
    setIsEditDialogOpen(false);
    setSelectedContractor(null);
  };

  const handleDelete = () => {
    setContractors((prevContractors) =>
      prevContractors.filter(
        (contractor) => contractor.id !== selectedContractor.id
      )
    );
    setIsDeleteDialogOpen(false);
    setSelectedContractor(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSpecialtyChange = (specialty) => {
    setEditForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSpecialtyChange = (specialty) => {
    setAddForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newContractor = {
      id: contractors.length + 1,
      ...addForm,
      jobsCompleted: 0,
      rating: 0,
      address: "Dubai, UAE", // Default address
    };
    setContractors((prev) => [...prev, newContractor]);
    setAddForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      specialties: [],
      rate: "",
      status: "active",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-6">
        <ContractorsHeader onAddContractor={() => setIsAddDialogOpen(true)} />

        <ContractorsFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          specialtyFilter={specialtyFilter}
          onSpecialtyFilterChange={setSpecialtyFilter}
          specialtiesList={specialtiesList}
        />

        <ContractorsTable
          contractors={filteredContractors}
          onEdit={handleEditClick}
          onDelete={(contractor) => {
            setSelectedContractor(contractor);
            setIsDeleteDialogOpen(true);
          }}
        />

        <AddContractorDialog
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          formData={addForm}
          onFormChange={handleAddFormChange}
          onSpecialtyChange={handleAddSpecialtyChange}
          onSubmit={handleAddSubmit}
          specialtiesList={specialtiesList}
        />

        <EditContractorDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          formData={editForm}
          onFormChange={handleEditFormChange}
          onSpecialtyChange={handleSpecialtyChange}
          onSubmit={handleEditSubmit}
          specialtiesList={specialtiesList}
          contractor={selectedContractor}
        />

        <DeleteContractorDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onDelete={handleDelete}
          contractor={selectedContractor}
        />
      </div>
    </div>
  );
};

export default ContractorMaster;
