package com.example.demo.Controller;

import com.example.demo.Repository.LeaveRequestRepository;
import com.example.demo.entity.LeaveRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")  // React frontend origin
@RestController
@RequestMapping("/api/leaverequests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    // Create new leave request
    @PostMapping
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        leaveRequest.setStatus("Pending");
        leaveRequest.setRequestTime(LocalDateTime.now());
        return leaveRequestRepository.save(leaveRequest);
    }

    // Get all leave requests
    @GetMapping
    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    // Get leave requests by employee ID
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getByEmployeeId(@PathVariable Long employeeId) {
        return leaveRequestRepository.findByEmployeeId(employeeId);
    }

    // Update leave request status (approve/reject)
    @PutMapping("/{id}/status")
    public LeaveRequest updateLeaveStatus(@PathVariable Long id, @RequestParam String status) {
        LeaveRequest request = leaveRequestRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Leave request not found with id: " + id));
        request.setStatus(status);
        return leaveRequestRepository.save(request);
    }

    // Delete leave request
    @DeleteMapping("/{id}")
    public void deleteLeaveRequest(@PathVariable Long id) {
        leaveRequestRepository.deleteById(id);
    }
}
