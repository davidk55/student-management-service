import Navbar from './Navbar';
import AddStudent from './AddStudent';
import StudentList from './StudentList';
import UpdateStudent from './UpdateStudent';
import Attribution from './Attribution';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-between gap-12 bg-my-white font-my-font tracking-wider'>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element=<StudentList /> />
          <Route index element=<StudentList /> />
          <Route path="/studentList" element={<StudentList />} />
          <Route path="/addStudent" element=<AddStudent /> />
          <Route path="/updateStudent/:id" element=<UpdateStudent /> />
        </Routes>

      <Attribution />
      </BrowserRouter>
    </div>
  );
}

export default App;
