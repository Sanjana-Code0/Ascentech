import React, { useState } from 'react';
import BookingList from './components/BookingList';
import BookingForm from './components/BookingForm';

function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingBooking, setEditingBooking] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Handler to switch to form for creating a new booking
    const handleCreateNew = () => {
        setEditingBooking(null);
        setIsEditing(true);
    };

    // Handler to switch to form for updating an existing booking
    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setIsEditing(true);
    };

    // Handler after form submission (save/update)
    const handleSave = () => {
        setIsEditing(false);
        setEditingBooking(null);
        setRefreshKey(prev => prev + 1); // Trigger list refresh
    };

    // Handler for the "Back" button on the form
    const handleCancel = () => {
        setIsEditing(false);
        setEditingBooking(null);
    };

    return (
        <div className="App">
            <h1>Ascentech Hall Booking System</h1>
            {isEditing ? (
                <BookingForm 
                    currentBooking={editingBooking} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                />
            ) : (
                <BookingList 
                    key={refreshKey} // Use key to force re-render/re-fetch
                    onEdit={handleEdit} 
                    onCreateNew={handleCreateNew} 
                />
            )}
        </div>
    );
}

export default App;