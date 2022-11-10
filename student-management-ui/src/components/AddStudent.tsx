import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';
import StudentInput from './StudentInput';

function AddStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: '-1',
    firstName: '',
    lastName: '',
    email: '',
  });

  interface Input {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
    pattern: string;
    errorMessage: string;
  }

  const inputs: Input[] = [
    {
      type: 'text',
      name: 'firstName',
      value: student.firstName,
      placeholder: 'First Name',
      handleChange: handleChange,
      required: true,
      pattern: '^[A-Za-z]{2,30}$',
      errorMessage:
        'You should use atleast 2 characters and no numbers or special characters.',
    },
    {
      type: 'text',
      name: 'lastName',
      value: student.lastName,
      placeholder: 'Last Name',
      handleChange: handleChange,
      required: true,
      pattern: '^[A-Za-z]{2,30}$',
      errorMessage:
        'You should use atleast 2 characters and no numbers or special characters.',
    },
    {
      type: 'email',
      name: 'email',
      value: student.email,
      placeholder: 'Email',
      handleChange: handleChange,
      required: true,
      pattern: '^[w-.]+@([w-]+.)+[w-]{2,4}$',
      errorMessage: 'Enter a valid email address.',
    },
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setStudent((prevStudent) => {
      return {
        ...prevStudent,
        [name]: value,
      };
    });
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate('/');
  }

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    StudentService.saveStudent(student);
    setTimeout(() => {
      navigate('/');
    }, 100);
  }

  return (
    <div className='h-3/4 w-4/5 sm:w-9/12 md:w-6/12 xl:w-2/6'>
      <form
        className='flex flex-col items-center p-12 shadow'
        onSubmit={handleSave}
      >
        <h1 className='mb-5 text-2xl font-light'>Adding new Student</h1>

        {inputs.map((input) => {
          return (
            <StudentInput
              type={input.type}
              name={input.name}
              value={input.value}
              placeholder={input.placeholder}
              required={input.required}
              pattern={input.pattern ? input.pattern : ''}
              handleChange={input.handleChange}
              errorMessage={input.errorMessage}
            />
          );
        })}
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
export default AddStudent;
