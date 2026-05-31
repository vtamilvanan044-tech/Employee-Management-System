import React, { useState, useEffect } from "react";
import EmployeeForm from "./EmployeeForm";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch all employees from backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Called after adding/updating employee to refresh list and clear selection
  const handleEmployeeUpdated = () => {
    setSelectedEmployee(null);
    fetchEmployees();
  };

  // Delete employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Employee deleted successfully");
          fetchEmployees();
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        alert("Error deleting employee: " + error.message);
      }
    }
  };

  return (
    <div>
      <EmployeeForm
        selectedEmployee={selectedEmployee}
        onEmployeeUpdated={handleEmployeeUpdated}
      />

      <hr />

      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.position}</td>
                <td>
                  <button onClick={() => setSelectedEmployee(emp)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(emp.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeList;
