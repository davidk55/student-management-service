import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      const students: Student[] | string = await StudentService.getStudents();
      if (typeof students != 'string') setStudents(students);
    }
    fetchStudents();
  }, []);

  function deleteStudent(id: string) {
    StudentService.deleteStudent(id);
    setStudents((prevStudents) => {
      return prevStudents.filter((prevStudent) => prevStudent.id != id);
    });
  }


  return (
    <div className='h-3/4 w-9/12'>
      <main className='flex  flex-col'>
        <button
          className='mb-4 max-w-max rounded-md bg-[#5C7DAE] py-2 px-10 text-white hover:bg-cyan-800'
        >
          Add Student
        </button>
        <table className='max-w-full table-auto shadow'>
          <thead className='pl-4'>
            <tr className='bg-[#EDEDED] px-2'>
              <th id='first-name'>FIRST NAME</th>
              <th id='last-name'>LAST NAME</th>
              <th id='email'>EMAIL</th>
              <th id='actions'>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td className='flex gap-9'>
                  <button
                    className='text-[#5390A3] hover:text-blue-300'
                  >
                    Edit
                  </button>
                  <button
                    className='text-[#AE5C5C] hover:text-red-400'
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
export default StudentList;
