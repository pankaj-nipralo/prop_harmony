import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Star, Home, MapPin, Calendar, Plus } from "lucide-react";

const defaultForm = {
  title: "",
  location: "",
  rating: "",
  status: "active",
  leaseEnd: "",
  features: "",
};

const PropertiesHeader = ({ onAddProperty }) => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddProperty) {
      onAddProperty({
        ...form,
        rating: parseFloat(form.rating),
        features: form.features.split(",").map((f) => f.trim()),
        daysRemaining: 0,
        id: Date.now(),
      });
    }
    setForm(defaultForm);
    setShowModal(false);
  };

  return (
    <></>
  );
};

export default PropertiesHeader;
