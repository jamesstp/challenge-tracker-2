// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the entered username and password
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Send an AJAX request to your server for authentication
  // Replace the URL with your server endpoint for login
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => {
      if (response.ok) {
        // Authentication successful
        return response.json();
      } else {
        // Authentication failed
        throw new Error('Login failed');
      }
    })
    .then((data) => {
      // Handle successful login response
      console.log('Logged in:', data);
      // Save the JWT token and perform any necessary redirects or UI updates
    })
    .catch((error) => {
      // Handle login error
      console.error('Login error:', error);
      // Display error message to the user, e.g., show an error div on the page
    });
});

// Handle sign-up form submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the entered username and password for sign-up
  const signupUsername = document.getElementById('signupUsername').value;
  const signupPassword = document.getElementById('signupPassword').value;

  // Send an AJAX request to your server for sign-up
  // Replace the URL with your server endpoint for sign-up
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: signupUsername, password: signupPassword }),
  })
    .then((response) => {
      if (response.ok) {
        // Sign-up successful
        return response.json();
      } else {
        // Sign-up failed
        throw new Error('Sign-up failed');
      }
    })
    .then((data) => {
      // Handle successful sign-up response
      console.log('Signed up:', data);
      // Perform any necessary redirects or UI updates after successful sign-up
    })
    .catch((error) => {
      // Handle sign-up error
      console.error('Sign-up error:', error);
      // Display error message to the user, e.g., show an error div on the page
    });
});

// Handle back button click event
document.getElementById('backButton').addEventListener('click', function () {
  // Go back to the previous page
  window.history.back();
});
