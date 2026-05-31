import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import EmployeeList from "./components/EmployeeList";
import AttendanceFormAndList from "./components/AttendanceFormAndList";
import LeaveRequestFormAndList from "./components/LeaveRequestFormAndList";
import'./App.css';
const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <nav
          style={{
            width: "220px",
            backgroundColor: "#282c34",
            color: "#fff",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h2>Dashboard</h2>
          <a href="/employees" style={{ color: "#61dafb", textDecoration: "none" }}>
            Employees
          </a>
          <a href="/attendance" style={{ color: "#61dafb", textDecoration: "none" }}>
            Attendance
          </a>
          <a href="/leaves" style={{ color: "#61dafb", textDecoration: "none" }}>
            Leave Requests
          </a>
        </nav>

        {/* Main content */}
        <main style={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/employees" replace />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/attendance" element={<AttendanceFormAndList />} />
            <Route path="/leaves" element={<LeaveRequestFormAndList />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
