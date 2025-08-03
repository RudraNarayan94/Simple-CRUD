const FirmList = ({ firms, setFirms, setEditingFirm, api }) => {
  const handleDelete = async (firmId) => {
    if (window.confirm("Are you sure you want to delete this firm?")) {
      try {
        await api.delete(`/firms/${firmId}/`);
        setFirms(firms.filter((firm) => firm.id !== firmId));
        alert("Firm deleted successfully.");
      } catch (error) {
        console.error("Failed to delete firm:", error);
        alert("An error occurred while deleting the firm.");
      }
    }
  };

  return (
    <div className="list-container">
      <h3>My Firms</h3>
      {firms.length === 0 ? (
        <p>No firms found. Add one using the form!</p>
      ) : (
        <ul>
          {firms.map((firm) => (
            <li key={firm.id}>
              <strong>{firm.name}</strong> - {firm.address} ({firm.phone_number}
              )
              <div className="item-actions">
                <button onClick={() => setEditingFirm(firm)}>Edit</button>
                <button
                  onClick={() => handleDelete(firm.id)}
                  className="delete-button">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FirmList;
