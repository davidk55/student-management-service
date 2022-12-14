package de.davidk55.student.service;

import de.davidk55.student.entity.StudentEntity;
import de.davidk55.student.model.Student;
import de.davidk55.student.repository.StudentRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

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

    @Override
    public boolean deleteStudent(Long id) {
        Optional<StudentEntity> student = studentRepository.findById(id);
        if(student.isEmpty()) return false;

        studentRepository.delete(student.get());
        return true;
    }

    @Override
    public Student getStudentById(Long id) {
        Optional<StudentEntity> studentOpt = studentRepository.findById(id);
        if(studentOpt.isEmpty()) return null;

        Student student = new Student();
        BeanUtils.copyProperties(studentOpt.get(), student);
        return student;
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        Optional<StudentEntity> studentOpt = studentRepository.findById(id);

        if(studentOpt.isEmpty()) return null;
        StudentEntity studentEntity = studentOpt.get();

        studentEntity.setFirstName(student.getFirstName());
        studentEntity.setLastName(student.getLastName());
        studentEntity.setEmail(student.getEmail());

        studentRepository.save(studentEntity);
        return student;
    }
}
