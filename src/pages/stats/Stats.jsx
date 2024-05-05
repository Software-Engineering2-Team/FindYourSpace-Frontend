import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import prepareChartData from './prepareChart';
import BookingsStore from '../../api/BookingStore';

const Stats = () => {
    const [bookingsData, setBookingsData] = useState(null);
    const [graphRange, setGraphRange] = useState('daily');
    const [chartInstance, setChartInstance] = useState(null);

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
            const data = prepareChartData(bookingsData, graphRange);

            // Destroy existing chart to prevent duplicates
            if (chartInstance) {
                chartInstance.destroy();
            }

            const newChartInstance = new Chart(ctx, {
                type: 'bar', // Default chart type to 'bar'
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true // Start y-axis at 0
                        }
                    }
                }
            });

            setChartInstance(newChartInstance);
        }
    }, [bookingsData, graphRange,chartInstance]);

    const handleRangeChange = (event) => {
        setGraphRange(event.target.value);
    };

    return (
        <div>
            <h1>Booking Stats</h1>
            <div>
                <label htmlFor="graphRange">Select Graph Range: </label>
                <select id="graphRange" value={graphRange} onChange={handleRangeChange}>
                    <option value="hourly">Hour</option>
                    <option value="weekly">Day</option>
                    <option value="monthly">Month</option>
                </select>
            </div>
            <canvas id="bookingChart" width="400" height="100"></canvas>
        </div>
    );
};

export default Stats;
