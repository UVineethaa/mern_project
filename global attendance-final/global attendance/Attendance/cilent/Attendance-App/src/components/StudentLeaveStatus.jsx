import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './StudentAttendance.css';

const StudentAttendance = () => {
    const [leaveRecords, setLeaveRecords] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const rollnum = localStorage.getItem('username');
    const navigate = useNavigate();

    // Fetch leave request records
    const fetchLeaveRecords = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/studentLeaveRequests/${rollnum}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const sortedRecords = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setLeaveRecords(sortedRecords);
        } catch (error) {
            setError("Error fetching leave requests: " + (error.response?.data || error.message));
        }
    };

    useEffect(() => {
        fetchLeaveRecords();
    }, []);

    return (
        <div className="student-attendance-container">
            <div className="attendance-summary">
                <h1>Leave Request Status</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {leaveRecords.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRecords.map((record, index) => (
                                <tr key={index}>
                                    <td>{new Date(record.date).toLocaleDateString()}</td>
                                    <td>{record.status || "N/A"}</td>
                                    <td>{record.reason || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No records found.</p>
                )}
            </div>
        </div>
    );
};

export default StudentAttendance;
