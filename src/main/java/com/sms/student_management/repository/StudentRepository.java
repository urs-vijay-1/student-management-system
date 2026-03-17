package com.sms.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sms.student_management.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
