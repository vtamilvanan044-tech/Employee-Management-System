import React, { useState, useEffect } from "react";
import './AttendanceFormAndList.css';
const AttendanceFormAndList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [present, setPresent] = useState(false);

  // Fetch all attendance records from backend
  const fetchAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attendance");
      const data = await response.json();
      setAttendanceList(data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Submit new attendance record
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeId || !date || !timeIn || !timeOut) {
      alert("Please fill all fields");
      return;
    }

    const attendanceData = {
      employeeId: parseInt(employeeId, 10),
      date,       // ISO format yyyy-MM-dd
      timeIn,     // ISO format HH:mm:ss (e.g. 08:30)
      timeOut,
      present
    };

    try {
      const response = await fetch("http://localhost:8080/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData),
      });

      if (response.ok) {
        alert("Attendance recorded successfully!");
        setEmployeeId("");
        setDate("");
        setTimeIn("");
        setTimeOut("");
        setPresent(false);
        fetchAttendance();  // Refresh list
      } else {
        alert("Failed to save attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Attendance Form</h2>
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
          <label>Date:</label><br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time In:</label><br />
          <input
            type="time"
            value={timeIn}
            onChange={(e) => setTimeIn(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Time Out:</label><br />
          <input
            type="time"
            value={timeOut}
            onChange={(e) => setTimeOut(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={present}
              onChange={() => setPresent(!present)}
            />
            Present
          </label>
        </div>
        <button type="submit">Submit Attendance</button>
      </form>

      <h2>Attendance Records</h2>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Present</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.length === 0 ? (
            <tr><td colSpan="6" align="center">No attendance records found</td></tr>
          ) : (
            attendanceList.map((att) => (
              <tr key={att.id}>
                <td>{att.id}</td>
                <td>{att.employeeId}</td>
                <td>{att.date}</td>
                <td>{att.timeIn}</td>
                <td>{att.timeOut}</td>
                <td>{att.present ? "Yes" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceFormAndList;
