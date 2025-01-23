const prepareChartData = (bookingsData, graphRange) => {

    const bookingsPerInterval = {};

    // Determine the time interval based on the selected graph range
    let interval = 'hour';
    if (graphRange === 'hourly') {
        interval = 'hour';
    } else if (graphRange === 'weekly') {
        interval = 'day';
    } else if (graphRange === 'monthly') {
        interval = 'month';
    }

    // Loop through each booking in the bookings data
    bookingsData.forEach((booking) => {
        let bookingDate;
        if (interval === 'hour') {
            bookingDate = new Date(booking.bookingDate).toLocaleTimeString('en-US', {hour: '2-digit', hour12: false});
        } else if (interval === 'day') {
            bookingDate = new Date(booking.bookingDate).toLocaleDateString();
        } else if (interval === 'month') {
            bookingDate = new Date(booking.bookingDate).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
        }

        bookingsPerInterval[bookingDate] = (bookingsPerInterval[bookingDate] || 0) + 1;
    });

    // Extract the last few time intervals from the bookings data
    let lastFewIntervals;
    if (interval === 'hour') {
        lastFewIntervals = Array.from({length: 24}, (_, i) => i.toString().padStart(2, '0'));
    } else {
        lastFewIntervals = Object.keys(bookingsPerInterval).slice(-7);
    }

    const labels = [];
    const bookingCountData = [];

    lastFewIntervals.forEach((interval) => {
        labels.push(interval);
        bookingCountData.push(bookingsPerInterval[interval] || 0);
    });

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