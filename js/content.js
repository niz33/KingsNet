// Function to simulate scrolling with visual feedback
function simulateScroll() {
    // Scroll down a noticeable amount (e.g., 100px) and then back up
    window.scrollBy(0, 100);
    setTimeout(() => window.scrollBy(0, -100), 500); // Wait 500ms before scrolling back
    
    // Optional: Log a message in the console so you know it's working
    console.log('Simulated scroll action executed');
  }
  
  // Run the function every 5 minutes (5 minutes = 300,000 milliseconds)
  // For testing purposes, you can change it to 10 seconds (10000 milliseconds) for a faster check
  setInterval(simulateScroll, 10000);  // Change to 10000 for testing
  