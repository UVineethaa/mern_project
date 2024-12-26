import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAttendance from './components/AddAttendance';
import DeleteStudent from './components/DeleteStudent';
import GetStudentsData from './components/GetStudentsData';
import Login from './components/Login'; 
import Signup from './components/Signup'; 
import StudentAttendance from './components/Student-Attendane'; 
import UpdateStudent from './components/UpdateStudent';
import Home from './components/Home'; 
import './App.css';
import StudentAttendance_4th from './components/Student-Attendence-4th';
import StudentHome from './components/studenthome';
import StudentAttendanceDisplay from './components/StudentAttendanceDisplay';
import StudentLeaveStatus from './components/StudentLeaveStatus';
import LeaveRequests from './components/LeaveRequests';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/add-attendance" element={<AddAttendance />} />
          <Route path="/delete-student" element={<DeleteStudent />} />
          <Route path="/get-students-data" element={<GetStudentsData />} />
          <Route path="/student-attendance/:id" element={<StudentAttendance />} />
          <Route path="/student-attendance/4th-year" element={<StudentAttendance_4th />} />
          <Route path="/student-attendance-display" element={<StudentAttendanceDisplay />} />
          <Route path="/update-student" element={<UpdateStudent />} />
          <Route path="/update-student/:id" element={<UpdateStudent />} /> 
          <Route path="/delete-student/:id" element={<DeleteStudent />} />
          <Route path="/leave-request-status" element={<StudentLeaveStatus/>} />
          <Route path="/leave-requests" element={<LeaveRequests/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
