// const prepareChartData = (bookingsData) => {
//     // Initialize arrays to store labels and data
//     const labels = [];
//     const bookingStatusData = [];

//     // Loop through each booking in the bookings data
//     bookingsData.forEach((booking) => {
//         // Extract relevant information from each booking
//         labels.push(`Booking ${booking.id}`); // Assuming there's an 'id' field in each booking
//         bookingStatusData.push(booking.status ? 1 : 0); // Assuming 'status' indicates whether the booking is active

//         // You may need to adjust this based on the actual structure of your bookings data
//     });

//     // Return an object with labels and datasets for Chart.js
//     return {
//         labels: labels,
//         datasets: [
//             {
//                 label: 'Booking Status',
//                 data: bookingStatusData,
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1,
//             },
//         ],
//     };
// };

// export default prepareChartData

const prepareChartData = (bookingsData) => {
    // Initialize an object to store the count of bookings per day
    const bookingsPerDay = {};

    // Loop through each booking in the bookings data
    bookingsData.forEach((booking) => {
        // Extract the booking date
        const bookingDate = new Date(booking.bookingDate).toLocaleDateString();

        // Increase the count for the corresponding day or initialize it if it doesn't exist
        bookingsPerDay[bookingDate] = (bookingsPerDay[bookingDate] || 0) + 1;
    });

    // Extract the last few days from the bookings data
    const lastFewDays = Object.keys(bookingsPerDay).slice(-7); // Change 7 to the number of days you want

    // Initialize arrays to store labels and data
    const labels = [];
    const bookingCountData = [];

    // Loop through the last few days
    lastFewDays.forEach((day) => {
        labels.push(day);
        bookingCountData.push(bookingsPerDay[day] || 0); // Push the count of bookings for the day, or 0 if no bookings
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
