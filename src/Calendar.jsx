import React, { useState } from 'react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];

  const getDaysArray = (year, month) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDaysArray(currentDate.getFullYear(), currentDate.getMonth());

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = (date) => {
    const time = prompt("Enter the time for the event:");
    const description = prompt("Enter a description for the event:");

    const newEvent = { time, description, id: Date.now() };

    setEvents(prevEvents => ({
      ...prevEvents,
      [date.toISOString().split('T')[0]]: [...(prevEvents[date.toISOString().split('T')[0]] || []), newEvent]
    }));
  };

  const removeEvent = (date, id) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [date]: prevEvents[date].filter(event => event.id !== id)
    }));
  };

  return (
    <div>
      <div className="header">
        <button onClick={goToPreviousMonth}>«</button>
        <span>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={goToNextMonth}>»</button>
      </div>
      <div className="calendar">
        {daysOfWeek.map(day => (
          <div key={day} className="day-name">{day}</div>
        ))}
        {days.map((day, index) => (
          <div key={index} className="day" onClick={() => handleAddEvent(day)}>
            {day.getDate()}
            <div className="events">
              {(events[day.toISOString().split('T')[0]] || []).map(event => (
                <div key={event.id}>
                  {event.time} - {event.description}
                  <button onClick={() => removeEvent(day.toISOString().split('T')[0], event.id)}>X</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
