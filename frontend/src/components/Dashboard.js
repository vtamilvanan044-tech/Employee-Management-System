import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import EmployeeList from "./EmployeeList";
import AttendanceFormAndList from "./AttendanceFormAndList";
import LeaveRequestFormAndList from "./LeaveRequestFormAndList";
import'./Dashboard.css';
const Dashboard = () => {
  return (
    <Router>
      <div >
        {/* Sidebar */}
        <nav className="sidebar">
          <h2>Dashboard</h2>
          <Link to="/employees">Employees</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/leaves">Leave Requests</Link>
        </nav>

        {/* Main content */}
        <main className="main-content">
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
