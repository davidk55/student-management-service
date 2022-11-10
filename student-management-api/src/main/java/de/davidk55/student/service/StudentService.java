package de.davidk55.student.service;


import de.davidk55.student.model.Student;

import java.util.List;

public interface StudentService  {
    Student createStudent(Student student);

    List<Student> getAllStudents();
}
