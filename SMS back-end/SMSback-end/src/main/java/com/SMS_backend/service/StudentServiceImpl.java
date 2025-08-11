package com.SMS_backend.service;

import com.SMS_backend.entity.Student;
import com.SMS_backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Override
    public Student saveStudent(Student student) {
        return studentRepo.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepo.findById(id).orElse(null);
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Student existing = studentRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(student.getName());
            existing.setEmail(student.getEmail());
            existing.setCourse(student.getCourse());
            existing.setAge(student.getAge());
            return studentRepo.save(existing);
        }
        return null;
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepo.deleteById(id);
    }
}
