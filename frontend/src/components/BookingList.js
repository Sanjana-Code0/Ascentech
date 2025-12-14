import React, { useState, useEffect } from 'react';
import axios from 'axios';

// FAKE API URL - Should be loaded from environment variable in a real app
const API_URL = 'http://127.0.0.1:8000/api/bookings/'; 

const BookingList = ({ onEdit, onCreateNew }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setBookings(response.data);
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to fetch bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this booking?')) return;
        
        try {
            // DELETE operation
            await axios.delete(`${API_URL}${id}/`);
            alert("Booking deleted successfully!");
            fetchBookings(); // Refresh the list
        } catch (error) {
            console.error("Delete Error:", error.response ? error.response.data : error.message);
            alert("Failed to delete booking.");
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div style={styles.listContainer}>
            <div style={styles.header}>
                <h2>Hall Booking List</h2>
                <button onClick={onCreateNew} style={styles.addButton}>ADD NEW</button>
            </div>
            
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th>Applicant Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Rent</th>
                        <th>Add. Charges</th>
                        <th>Hall</th>
                        <th>App. No.</th>
                        <th>Status</th>
                        <th>Remark</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id} style={styles.dataRow}>
                            <td>{booking.applicant_name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.mobile_no}</td>
                            <td>{booking.start_date}</td>
                            <td>{booking.end_date}</td>
                            <td>{booking.rent}</td>
                            <td>{booking.additional_charges}</td>
                            <td>{booking.hall_name}</td>
                            <td>{booking.application_no}</td>
                            <td>{booking.status}</td>
                            <td>{booking.remark.substring(0, 30)}...</td>
                            <td>
                                <button onClick={() => onEdit(booking)} style={styles.actionButton}>Edit</button>
                                <button onClick={() => handleDelete(booking.id)} style={styles.deleteButton}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {bookings.length === 0 && <p style={{textAlign: 'center', marginTop: '20px'}}>No bookings found. Click ADD NEW to create one.</p>}
        </div>
    );
};

// Basic Inline Styles to match the provided image
const styles = {
    listContainer: { padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    addButton: { padding: '10px 15px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer', fontSize: '14px' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    headerRow: { backgroundColor: '#0056b3', color: 'white' },
    dataRow: { borderBottom: '1px solid #ccc' },
    actionButton: { margin: '2px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f0ad4e', border: 'none', color: 'white' },
    deleteButton: { margin: '2px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#d9534f', border: 'none', color: 'white' }
};

export default BookingList;