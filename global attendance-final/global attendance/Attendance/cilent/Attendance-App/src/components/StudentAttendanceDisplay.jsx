import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentAttendance.css';

const StudentAttendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leaveDate, setLeaveDate] = useState('');
    const [leaveReason, setLeaveReason] = useState('');
    const [submitError, setSubmitError] = useState(null);
    const token = localStorage.getItem('token');
    const rollnum = localStorage.getItem('username');
    const navigate = useNavigate();

    // Fetch attendance records
    const fetchAllAttendance = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/studentAttendanceAll/${rollnum}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const sortedRecords = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setAttendanceRecords(sortedRecords);
        } catch (error) {
            setError("Error fetching attendance: " + (error.response?.data || error.message));
        }
    };

    useEffect(() => {
        fetchAllAttendance();
    }, []);

    // Open and close modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setLeaveDate('');
        setLeaveReason('');
        setSubmitError(null);
    };

    // Submit leave request
    const submitLeaveRequest = async () => {
        try {
            await axios.post(`http://localhost:8000/leaveRequest`, {
                rollnum,
                date: leaveDate,
                reason: leaveReason,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            closeModal();
            alert("Leave request submitted successfully!");
        } catch (error) {
            setSubmitError("Error submitting leave request: " + (error.response?.data || error.message));
        }
    };

    return (
        <div className="student-attendance-container">
            <div className="attendance-summary">
                <h1>All Attendance Records</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {attendanceRecords.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.date}</td>
                                    <td>{record.attendance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No attendance records found.</p>
                )}
            </div>
            <div className="button-container">
                <button onClick={openModal}>Leave Request</button>
                <button onClick={() => navigate('/leave-request-status')}>Leave Request Status</button>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Submit Leave Request</h2>
                        <div className="modal-form">
                            <label>
                                Date:
                                <input 
                                    type="date" 
                                    value={leaveDate} 
                                    onChange={(e) => setLeaveDate(e.target.value)} 
                                />
                            </label>
                            <label>
                                Reason:
                                <textarea 
                                    value={leaveReason} 
                                    onChange={(e) => setLeaveReason(e.target.value)} 
                                />
                            </label>
                            {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
                            <button onClick={submitLeaveRequest}>Submit</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentAttendance;
