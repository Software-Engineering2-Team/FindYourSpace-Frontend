import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import prepareChartData from './prepareChart';
import BookingsStore from '../../api/BookingStore';
const Stats = () => {
    const [bookingsData, setBookingsData] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                await BookingsStore.getState().fetchBookings();
                setBookingsData(BookingsStore.getState().userData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        if (bookingsData) {
            const ctx = document.getElementById('bookingChart').getContext('2d');
            const data = prepareChartData(bookingsData);

            new Chart(ctx, {
                type: 'line',
                data: data,
            });
        }
    }, [bookingsData]);

    return (
        <div>
            <h1>Booking Stats</h1>
            <canvas id="bookingChart" width="400" height="400"></canvas>
        </div>
    );
};

export default Stats;
