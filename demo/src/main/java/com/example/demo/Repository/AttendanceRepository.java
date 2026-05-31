package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
  List<Attendance> findByEmployeeId(Long employeeId);
  List<Attendance> findByDate(LocalDate date);
}
