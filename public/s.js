document.addEventListener('DOMContentLoaded', () => {
  const socket = io(); // Initialize Socket.IO

  const requestCountElement = document.getElementById('requestCount');

  // Function to fetch request count from server
  const fetchRequestCount = () => {
    fetch('/requests')
      .then(response => response.json())
      .then(data => {
        requestCountElement.textContent = data.request; // Update this line to match the response structure
      })
      .catch(err => console.error('Error fetching request count:', err));
  };

  // Socket.IO event listener for receiving updated request count
  socket.on('updateRequestCount', (data) => {
    requestCountElement.textContent = data.request; // Update request count in real-time
  });

  // Initial setup
  fetchRequestCount(); // Fetch initial request count on page load
});
