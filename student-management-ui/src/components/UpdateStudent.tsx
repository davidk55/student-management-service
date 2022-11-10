import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentService from '../services/StudentService';
import UpdateStudentEntry from './UpdateStudentEntry';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function UpdateStudent() {
  const { id } = useParams();

  const [student, setStudent] = useState<Student>({
    id: id ? id : '-1',
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStudent() {
      if (!id) return;

      const student: Student | string = await StudentService.getStudentById(id);
      if (typeof student == 'string') return;
      setStudent(student);
    }

    fetchStudent();
  }, []);

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!id) return;
    if (id == '-1') return;

    StudentService.updateStudent(id, student);
    setTimeout(() => {
      navigate('/');
    }, 100);
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate('/');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    const { value } = e.target;

    setStudent((prevStudent) => {
      return {
        ...prevStudent,
        [name]: value,
      };
    });
  }

  return (
    <div className='h-3/4 w-4/5 sm:w-9/12 md:w-6/12 xl:w-2/6'>
      <form
        className='flex flex-col items-center gap-5 p-12 shadow'
        onSubmit={handleUpdate}
      >
        <h1 className='mb-5 text-2xl font-light'>
          Updating Student Information
        </h1>
        <UpdateStudentEntry
          name='firstName'
          value={student.firstName}
          label='First Name'
          handleChange={handleChange}
        />
        <UpdateStudentEntry
          name='lastName'
          value={student.lastName}
          label='Last Name'
          handleChange={handleChange}
        />
        <UpdateStudentEntry
          name='email'
          value={student.email}
          label='Email'
          handleChange={handleChange}
        />
        <div className='flex w-9/12 justify-start gap-6'>
          <button
            className='w-24 rounded bg-green-400 py-1 text-my-white hover:bg-green-500'
            type='submit'
          >
            Save
          </button>
          <button
            className='w-24 rounded bg-red-400 py-1 text-my-white hover:bg-red-500'
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateStudent;
