package de.davidk55.student.service;

import de.davidk55.student.entity.StudentEntity;
import de.davidk55.student.model.Student;
import de.davidk55.student.repository.StudentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {

    @Mock private StudentRepository studentRepository;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
        underTest = new StudentServiceImpl(studentRepository);
    }

    @Test
    void canCreateStudent() {
        // given
        long id = 1L;
        String firstName = "Joe";
        String lastName = "Shmoe";
        String email = "joe.shmoe@gmail.com";
        Student student = new Student(id, firstName, lastName, email);
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(id);
        studentEntity.setFirstName(firstName);
        studentEntity.setLastName(lastName);
        studentEntity.setEmail(email);

        // when
        underTest.createStudent(student);

        // then
        ArgumentCaptor<StudentEntity> studentArgumentCaptor = ArgumentCaptor.forClass(StudentEntity.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());
        StudentEntity capturedStudent = studentArgumentCaptor.getValue();
        Assertions.assertEquals(studentEntity, capturedStudent);
    }

    @Test
    void canGetAllStudents() {
        // given
        List<StudentEntity> studentEntities = new ArrayList<>();
        long id = 3L;
        String firstName = "Joe";
        String lastName = "Shmoe";
        String email = "joe.shmoe@gmail.com";
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(id);
        studentEntity.setFirstName(firstName);
        studentEntity.setLastName(lastName);
        studentEntity.setEmail(email);
        studentEntities.add(studentEntity);
        given(studentRepository.findAll()).willReturn(studentEntities);

        // when
        List<Student> students = underTest.getAllStudents();

        // then
        verify(studentRepository).findAll();
        Student firstStudent = students.get(0);
        Assertions.assertEquals(firstStudent, new Student(id, firstName, lastName, email));
    }

    @Test
    void canDeleteStudent() {
        // given
        long id = 5L;
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(id);
        studentEntity.setFirstName("John");
        studentEntity.setLastName("Merrit");
        studentEntity.setEmail("john.merrit@gmail.com");
        given(studentRepository.findById(id)).willReturn(Optional.of(studentEntity));

        // when
        underTest.deleteStudent(id);

        // then
        verify(studentRepository).delete(studentEntity);
    }

    @Test
    void canGetStudentById() {
        // given
        long id = 5L;

        // when
        underTest.getStudentById(id);

        // then
        verify(studentRepository).findById(id);
    }

    @Test
    void updateStudent() {
        // given
        long id = 5L;
        String firstName = "Joe";
        String lastName = "Shmoe";
        String email = "joe.shmoe@gmail.com";
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setId(id);
        studentEntity.setFirstName(firstName);
        studentEntity.setLastName(lastName);
        studentEntity.setEmail(email);
        given(studentRepository.findById(id)).willReturn(Optional.of(studentEntity));
        Student student = new Student(id, firstName, lastName, email);

        // when
        Student updatedStudent = underTest.updateStudent(id, student);

        // then
        verify(studentRepository).findById(id);
        Assertions.assertEquals(student, updatedStudent);
    }
}