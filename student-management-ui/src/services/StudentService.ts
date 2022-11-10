import axios from 'axios';

const STUDENT_API_BASE_URL = 'http://localhost:8080/api/v1/students';

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

class StudentService {
  async saveStudent(student: Student) {
    try {
      const { data } = await axios.post<Student>(
        STUDENT_API_BASE_URL,
        student,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  async getStudents() {
    try {
      const { data } = await axios.get<Student[]>(STUDENT_API_BASE_URL, {
        headers: {
          Accept: 'application/json',
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

