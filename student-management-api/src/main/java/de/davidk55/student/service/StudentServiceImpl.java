package de.davidk55.student.service;

import de.davidk55.student.entity.StudentEntity;
import de.davidk55.student.model.Student;
import de.davidk55.student.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        StudentEntity studentEntity = new StudentEntity();
        BeanUtils.copyProperties(student, studentEntity);
        studentRepository.save(studentEntity);
        return student;
    }

    @Override
    public List<Student> getAllStudents() {
        List<StudentEntity> studentEntities = studentRepository.findAll();

        return studentEntities
                .stream()
                .map(studentEntity -> new Student(
                        studentEntity.getId(),
                        studentEntity.getFirstName(),
                        studentEntity.getLastName(),
                        studentEntity.getEmail()
                ))
                .collect(Collectors.toList());
    }
}
