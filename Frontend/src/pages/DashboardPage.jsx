import React, { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import FirmForm from "../components/FirmForm";
import FirmList from "../components/FirmList";

const DashboardPage = () => {
  const [firms, setFirms] = useState([]);
  const [editingFirm, setEditingFirm] = useState(null);
  const api = useAxios();

  const fetchFirms = async () => {
    try {
      const response = await api.get("/firms/");
      setFirms(response.data);
    } catch (error) {
      console.error("Failed to fetch firms:", error);
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  const handleSuccess = () => {
    fetchFirms(); // Refresh the list after a successful create/update
    setEditingFirm(null); // Reset the form
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="dashboard-layout">
        <div className="form-section">
          <FirmForm
            firm={editingFirm}
            onSuccess={handleSuccess}
            setEditingFirm={setEditingFirm}
          />
        </div>
        <div className="list-section">
          <FirmList
            firms={firms}
            setFirms={setFirms}
            setEditingFirm={setEditingFirm}
            api={api}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
