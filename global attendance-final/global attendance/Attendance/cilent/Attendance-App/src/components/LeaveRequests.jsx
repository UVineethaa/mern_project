import React, { useEffect, useState } from "react";

const LeaveRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

  // Fetch pending leave requests
  const fetchPendingRequests = async () => {
    try {
      const response = await fetch("http://localhost:8000/pendingLeaveRequests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPendingRequests(data);
    } catch (error) {
      console.error("Error fetching pending leave requests:", error);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  // Function to update leave request status
  const updateLeaveStatus = async (id, status) => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    try {
      const response = await fetch(`http://localhost:8000/leaveRequest/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        alert("Leave request status updated successfully.");
        // Re-fetch the pending requests after updating
        fetchPendingRequests();
      } else {
        console.error("Error updating leave request status:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating leave request status:", error);
    }
  };

  // Render the pending leave requests
  return (
    <div>
      <h2>Pending Leave Requests</h2>
      {pendingRequests.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Roll Number</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Reason</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Status</th>
              <th style={{ border: "1px solid #ccc", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request._id}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.rollnum}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.date}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.reason}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>{request.status}</td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  <button onClick={() => updateLeaveStatus(request._id, "Approved")}>Approve</button>
                  <button onClick={() => updateLeaveStatus(request._id, "Not Approved")}>Decline</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending leave requests.</p>
      )}
    </div>
  );
};

export default LeaveRequests;
