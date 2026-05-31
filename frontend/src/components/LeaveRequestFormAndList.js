import React, { useState, useEffect } from "react";

const LeaveRequestFormAndList = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  // Fetch all leave requests from backend
  const fetchLeaveRequests = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/leaverequests");
      const data = await response.json();
      setLeaveRequests(data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Submit new leave request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !leaveType || !startDate || !endDate) {
      alert("Please fill all required fields.");
      return;
    }

    const leaveRequestData = {
      employeeId: parseInt(employeeId, 10),
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await fetch("http://localhost:8080/api/leaverequests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaveRequestData),
      });

      if (response.ok) {
        alert("Leave request submitted successfully!");
        // Reset form
        setEmployeeId("");
        setLeaveType("");
        setStartDate("");
        setEndDate("");
        setReason("");
        fetchLeaveRequests(); // Refresh list
      } else {
        alert("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
      alert("Error submitting leave request");
    }
  };

  // Update leave request status
  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8080/api/leaverequests/${id}/status?status=${status}`, {
        method: "PUT",
      });
      if (response.ok) {
        alert(`Leave request ${status.toLowerCase()} successfully!`);
        fetchLeaveRequests();
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    }
  };

  // Delete leave request
  const deleteLeaveRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/leaverequests/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Leave request deleted!");
        fetchLeaveRequests();
      } else {
        alert("Failed to delete leave request");
      }
    } catch (error) {
      console.error("Error deleting leave request:", error);
      alert("Error deleting leave request");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h2>Leave Request Form</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <div>
          <label>Employee ID:</label><br />
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Leave Type:</label><br />
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
          >
            <option value="">Select leave type</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Annual Leave">Annual Leave</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label><br />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label><br />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reason:</label><br />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="3"
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Submit Leave Request</button>
      </form>

      <h2>Leave Requests List</h2>
      <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Request Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length === 0 ? (
            <tr><td colSpan="9" align="center">No leave requests found</td></tr>
          ) : (
            leaveRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.employeeId}</td>
                <td>{req.leaveType}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.reason}</td>
                <td>{req.status}</td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>
                <td>
                  {req.status === "Pending" && (
                    <>
                      <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>{" "}
                      <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>{" "}
                    </>
                  )}
                  <button onClick={() => deleteLeaveRequest(req.id)} style={{ color: "red" }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequestFormAndList;
