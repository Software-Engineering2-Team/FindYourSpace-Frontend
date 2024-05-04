const prepareChartData = (bookingsData, graphRange) => {
    // Initialize an object to store the count of bookings per time interval (hour, day, month)
    const bookingsPerInterval = {};

    // Determine the time interval based on the selected graph range
    let interval = 'hour';
    if (graphRange === 'hourly') {
        interval = 'hour'; // Aggregating by hour for daily
    } else if (graphRange === 'weekly') {
        interval = 'day'; // Aggregating by day for weekly
    } else if (graphRange === 'monthly') {
        interval = 'month'; // Aggregating by month for monthly
    }

    // Loop through each booking in the bookings data
    bookingsData.forEach((booking) => {
        // Extract the booking date
        let bookingDate;
        if (interval === 'hour') {
            // Extract the hour of the booking date with leading zeros
            bookingDate = new Date(booking.bookingDate).toLocaleTimeString('en-US', { hour: '2-digit', hour12: false });
        } else if (interval === 'day') {
            // Extract the day of the booking date
            bookingDate = new Date(booking.bookingDate).toLocaleDateString();
        } else if (interval === 'month') {
            // Extract the month and year of the booking date
            bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }

        // Increase the count for the corresponding time interval or initialize it if it doesn't exist
        bookingsPerInterval[bookingDate] = (bookingsPerInterval[bookingDate] || 0) + 1;
    });

    // Extract the last few time intervals from the bookings data
    let lastFewIntervals;
    if (interval === 'hour') {
        lastFewIntervals = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')); // Pad with leading zeros
    } else {
        lastFewIntervals = Object.keys(bookingsPerInterval).slice(-7); // Change 7 to the number of intervals you want
    }

    // Initialize arrays to store labels and data
    const labels = [];
    const bookingCountData = [];

    // Loop through the last few time intervals
    lastFewIntervals.forEach((interval) => {
        labels.push(interval);
        bookingCountData.push(bookingsPerInterval[interval] || 0); // Push the count of bookings for the interval, or 0 if no bookings
    });

    // Return an object with labels and datasets for Chart.js
    return {
        labels: labels,
        datasets: [
            {
                label: 'Number of Bookings',
                data: bookingCountData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };
};

export default prepareChartData;
