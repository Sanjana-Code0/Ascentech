import React, { useState, useEffect } from 'react';
import axios from 'axios';

// FAKE API URL - Should be loaded from environment variable in a real app
const API_URL = 'http://127.0.0.1:8000/api/bookings/'; 

const HallOptions = [
    '-- Select Option --', 'Budhavihar', 'Nagarbhavan', 
    'Padmabhusan Dr Appasaheb Dharmadhikari Sabhagruha'
];

const BookingForm = ({ currentBooking, onSave, onCancel }) => {
    const initialState = {
        mobile_no: '', hall_name: HallOptions[0], applicant_name: '', email: '', 
        purpose_of_use: '', rent: 0, additional_charges: 0, total: 0, 
        remark: '', receipt_no: '', receipt_date: '', 
        start_date: '', end_date: '', application_no: generateFakeAppNo(), 
        status: 'Pending', booking_time_slot: ''
    };

    const [formData, setFormData] = useState(initialState);

    // Populate form if an existing booking is being updated
    useEffect(() => {
        if (currentBooking) {
            setFormData({
                ...currentBooking,
                // Ensure date format is YYYY-MM-DD for input type="date"
                receipt_date: currentBooking.receipt_date || '',
                start_date: currentBooking.start_date || '',
                end_date: currentBooking.end_date || ''
            });
        } else {
            setFormData(initialState);
        }
    }, [currentBooking]);

    // Simple fake application number generator
    function generateFakeAppNo() {
        return 'MBMC' + Math.floor(10000000 + Math.random() * 90000000);
    }

    // Handle all input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            let newFormData = { ...prev, [name]: value };
            
            // Calculate Total based on Rent and Additional Charges
            if (name === 'rent' || name === 'additional_charges') {
                const rent = parseFloat(newFormData.rent || 0);
                const charges = parseFloat(newFormData.additional_charges || 0);
                newFormData.total = (rent + charges).toFixed(2);
            }
            return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentBooking && currentBooking.id) {
                // UPDATE operation (PUT/PATCH)
                await axios.put(`${API_URL}${currentBooking.id}/`, formData);
                alert("Booking updated successfully!");
            } else {
                // CREATE operation (POST)
                await axios.post(API_URL, formData);
                alert("Booking submitted successfully!");
            }
            onSave();
            setFormData(initialState); // Clear form after submit
        } catch (error) {
            console.error("Submission Error:", error.response ? error.response.data : error.message);
            alert("Failed to submit booking. Check console for details.");
        }
    };

    const handleBack = () => {
        setFormData(initialState);
        onCancel();
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2>{currentBooking ? 'Update Booking' : 'New Hall Booking'}</h2>
                
                {/* Row 1: Mobile No. */}
                <div style={styles.row}>
                    <label style={styles.label}>* Mobile No.</label>
                    <input type="text" name="mobile_no" value={formData.mobile_no} onChange={handleChange} required style={styles.input} />
                </div>
                
                {/* Row 2: Hall Name */}
                <div style={styles.row}>
                    <label style={styles.label}>* Hall Name</label>
                    <select name="hall_name" value={formData.hall_name} onChange={handleChange} required style={styles.input}>
                        {HallOptions.map(hall => <option key={hall} value={hall}>{hall}</option>)}
                    </select>
                </div>
                
                {/* Row 3: Applicant Name */}
                <div style={styles.row}>
                    <label style={styles.label}>* Applicant Name</label>
                    <input type="text" name="applicant_name" value={formData.applicant_name} onChange={handleChange} required style={styles.input} />
                </div>
                
                {/* Row 4: Email */}
                <div style={styles.row}>
                    <label style={styles.label}>* Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />
                </div>
                
                {/* Row 5: Purpose Of Use */}
                <div style={styles.row}>
                    <label style={styles.label}>* Purpose Of Use</label>
                    <input type="text" name="purpose_of_use" value={formData.purpose_of_use} onChange={handleChange} required style={styles.input} />
                </div>

                {/* --- Date Fields (from Table image logic) --- */}
                <div style={styles.row}>
                    <label style={styles.label}>Start Date</label>
                    <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} style={styles.input} />
                </div>
                <div style={styles.row}>
                    <label style={styles.label}>End Date</label>
                    <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} style={styles.input} />
                </div>
                
                {/* Row 6: Rent (and calculation logic in handleChange) */}
                <div style={styles.row}>
                    <label style={styles.label}>* Rent</label>
                    <input type="number" name="rent" value={formData.rent} onChange={handleChange} required style={styles.input} />
                </div>
                
                {/* Row 7: Additional Charges */}
                <div style={styles.row}>
                    <label style={styles.label}>Additional Charges</label>
                    <input type="number" name="additional_charges" value={formData.additional_charges} onChange={handleChange} style={styles.input} />
                </div>
                
                {/* Row 8: Total (Read-only) */}
                <div style={styles.row}>
                    <label style={styles.label}>* Total</label>
                    <input type="number" name="total" value={formData.total} readOnly style={{...styles.input, backgroundColor: '#eee'}} />
                </div>
                
                {/* Row 9: Remark */}
                <div style={styles.row}>
                    <label style={styles.label}>* Remark</label>
                    <textarea name="remark" value={formData.remark} onChange={handleChange} required style={{...styles.input, height: '80px'}} />
                </div>
                
                {/* Row 10: Receipt No. */}
                <div style={styles.row}>
                    <label style={styles.label}>* Receipt No.</label>
                    <input type="text" name="receipt_no" value={formData.receipt_no} onChange={handleChange} required style={styles.input} />
                </div>
                
                {/* Row 11: Receipt Date */}
                <div style={styles.row}>
                    <label style={styles.label}>* Receipt Date</label>
                    <input type="date" name="receipt_date" value={formData.receipt_date} onChange={handleChange} required style={styles.input} />
                </div>

                {/* Submission Buttons */}
                <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.submitButton}>{currentBooking ? 'Update' : 'Submit'}</button>
                    <button type="button" onClick={handleBack} style={styles.backButton}>Back</button>
                </div>
            </form>
        </div>
    );
};

// Basic Inline Styles to match the provided image
const styles = {
    container: { maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' },
    form: { display: 'flex', flexDirection: 'column' },
    row: { display: 'flex', marginBottom: '10px', alignItems: 'center' },
    label: { flex: '0 0 150px', fontWeight: 'bold', marginRight: '10px' },
    input: { flex: 1, padding: '8px', border: '1px solid #ccc' },
    buttonGroup: { display: 'flex', justifyContent: 'center', marginTop: '20px' },
    submitButton: { padding: '10px 20px', margin: '0 10px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' },
    backButton: { padding: '10px 20px', margin: '0 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer' }
};

export default BookingForm;