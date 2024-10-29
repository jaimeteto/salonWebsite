import React, { useState } from "react";
import "./Calendar.css";

const Calendar = ({ availableDates }) => {
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = ()=>{
    return new Date().getDate();
  }
  //selected date is the current day of the month
  var selected = today();
  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    for (let day = 1; day <= totalDays; day++) {
      days.push(day);
    }
    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
// on click listener that changes the selected day
  const handleDayClick = (day) => {
        
    setCurrentDay(day);
  }
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {months[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {generateCalendarDays().map((day) => (
            <div onClick={() => handleDayClick(day)} key={day} className={day === currentDay ? "currentDay" : "calendar-day"}>
          {day}
          </div>
        ))}
      </div>
      
      <div className="available-dates">
      <hr className = "divide"/>
        <h3>Available Times:</h3>
        <ul>
          {availableDates.map((date, index) => (
            <li key={index}>
                <button className="available-date-btn">{date}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;