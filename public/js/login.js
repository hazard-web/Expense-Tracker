 // Function to handle form submission
 document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send POST request using Axios
    axios.post('http://localhost:4000/login', {
            email: email,
            password: password
        })
        .then(function(response) {
            console.log('Login successful', response);
            localStorage.setItem('token', response.data.token); // Save token for later use in the app
            // window.location.href = '../expense.html'; // Redirect to dashboard; // Redirect to dashboard
        })
        .catch(function(error) {
            console.error('Error during login:', error);
            // You can handle the error here, such as displaying an error message to the user
        });
});

// // Function to handle GET request (example)
// axios.get('http://localhost:4000/addExpensePage')
//     .then(function(response) {
//         console.log('GET request successful:', response.data);
//         // You can handle the response here
//     })
//     .catch(function(error) {
//         console.error('Error during GET request:', error);
//         // You can handle the error here
//     });