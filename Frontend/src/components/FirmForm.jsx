import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

const FirmForm = ({ firm, onSuccess, setEditingFirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
  });
  const api = useAxios();

  useEffect(() => {
    if (firm) {
      setFormData(firm);
    } else {
      setFormData({ name: "", address: "", phone_number: "" });
    }
  }, [firm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (firm) {
        // Update existing firm
        await api.put(`/firms/${firm.id}/`, formData);
        alert("Firm updated successfully!");
      } else {
        // Create new firm
        await api.post("/firms/", formData);
        alert("Firm created successfully!");
      }
      onSuccess();
      setFormData({ name: "", address: "", phone_number: "" }); // Reset form
    } catch (error) {
      console.error("Failed to save firm:", error);
      alert("An error occurred while saving the firm.");
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", address: "", phone_number: "" });
    setEditingFirm(null);
  };

  return (
    <div className="form-container">
      <h3>{firm ? "Edit Firm" : "Create New Firm"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Firm Name"
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <div className="form-buttons">
          <button type="submit">{firm ? "Update" : "Create"}</button>
          {firm && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FirmForm;
