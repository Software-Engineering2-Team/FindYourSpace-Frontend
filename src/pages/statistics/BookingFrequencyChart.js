import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('D:/SoftwareEngineering2/Software_Engineering/rent_space/db.sqlite3');

const BookingFrequencyChart = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    db.all('SELECT bookingDate, COUNT(*) AS frequency FROM space_booking_booking GROUP BY bookingDate', (err, rows) => {
      if (err) {
        console.error(err.message);
        return;
      }
      // Format data for Chart.js
      const formattedData = rows.map(row => ({
        date: row.bookingDate,
        frequency: row.frequency
      }));
      setBookingData(formattedData);
    });

    // Close the database connection when the component unmounts
    return () => {
      db.close();
    };
  }, []);

  // Prepare data for Chart.js
  const data = {
    labels: bookingData.map(booking => booking.date),
    datasets: [{
      label: 'Booking Frequency',
      data: bookingData.map(booking => booking.frequency),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  // Chart.js options
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>Booking Frequency Over Time</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BookingFrequencyChart;
