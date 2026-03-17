package com.sms.student_management.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.sms.student_management.entity.Student;
import com.sms.student_management.repository.StudentRepository;

@RestController
@CrossOrigin
@RequestMapping("/students")
public class StudentController {

private final StudentRepository repo;

public StudentController(StudentRepository repo){
this.repo = repo;
}

@GetMapping
public List<Student> getStudents(){
return repo.findAll();
}

@PostMapping
public Student addStudent(@RequestBody Student student){
return repo.save(student);
}

@PutMapping("/{id}")
public Student updateStudent(@PathVariable Long id,@RequestBody Student student){
student.setId(id);
return repo.save(student);
}

@DeleteMapping("/{id}")
public void deleteStudent(@PathVariable Long id){
repo.deleteById(id);
}

}
