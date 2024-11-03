import React, { useState, useEffect } from 'react';

function AvailableTimes({ serviceId, selectedDate }) {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    async function fetchAvailableDates() {
      try {
        const response = await fetch(`http://localhost:3000/api/services/Atonio/availability/2024-11-01`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch availability: ${response.statusText}`);
        }
        const text = await response.text();  // Get the response as text first
        console.log("Raw response text:", text);
  

        const data = await response.json();
        setAvailableDates(data);  // Assuming the backend returns `availableSlots`
        console.log(data);
      } catch (error) {
        console.error("Error fetching available time slots:", error);
      }
    }

    if (serviceId && selectedDate) {
      fetchAvailableDates();
    }
  }, [serviceId, selectedDate]);

  return (
    <div className="available-dates">
      <hr className="divide"/>
      <h3>Available Times:</h3>
      <ul>
        {availableDates.length > 0 ? (
          availableDates.map((date, index) => (
            <li key={index}>
              <button className="available-date-btn">{date}</button>
            </li>
          ))
        ) : (
          <li>No available times for this date.</li>
        )}
      </ul>
    </div>
  );
}

export default AvailableTimes;
