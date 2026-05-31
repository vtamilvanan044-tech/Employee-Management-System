import React, { useState, useEffect } from "react";
import './EmployeeForm.css';
const EmployeeForm = ({ selectedEmployee, onEmployeeUpdated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setPosition(selectedEmployee.position);
    } else {
      setName("");
      setEmail("");
      setPosition("");
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = { name, email, position };

    const method = selectedEmployee ? "PUT" : "POST";
    const url = selectedEmployee
      ? `http://localhost:8080/api/employees/${selectedEmployee.id}`
      : "http://localhost:8080/api/employees";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        alert(`Employee ${selectedEmployee ? "updated" : "added"} successfully`);
        onEmployeeUpdated();
        // Clear form if adding new employee
        if (!selectedEmployee) {
          setName("");
          setEmail("");
          setPosition("");
        }
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedEmployee ? "Edit Employee" : "Add Employee"}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>

      <button type="submit">{selectedEmployee ? "Update" : "Add"}</button>
    </form>
  );
};

export default EmployeeForm;
