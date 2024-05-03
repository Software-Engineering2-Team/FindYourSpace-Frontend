const prepareChartData = (bookingsData) => {
    // Initialize arrays to store labels and data
    const labels = [];
    const bookingStatusData = [];

    // Loop through each booking in the bookings data
    bookingsData.forEach((booking) => {
        // Extract relevant information from each booking
        labels.push(`Booking ${booking.id}`); // Assuming there's an 'id' field in each booking
        bookingStatusData.push(booking.status ? 1 : 0); // Assuming 'status' indicates whether the booking is active

        // You may need to adjust this based on the actual structure of your bookings data
    });

    // Return an object with labels and datasets for Chart.js
    return {
        labels: labels,
        datasets: [
            {
                label: 'Booking Status',
                data: bookingStatusData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
};

export default prepareChartData