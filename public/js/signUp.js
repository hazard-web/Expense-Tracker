
    // Function to handle form submission
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send POST request using Axios
        axios.post('http://localhost:4000/signUp', {
                name: name,
                email: email,
                password: password
            })
            .then(function(response) {
                console.log('SignUp successful', response);
                alert('User Created Successfully.')
            })
            .catch(function(error) {
                console.error('Error during SignUp:', error);
                
            });
    });

    // // Example of GET request using Axios
    // axios.get('http://localhost:4000/signUp')
    //     .then(function(response) {
    //         console.log('GET request successful:', response.data);
    //         // You can handle the response here
    //     })
    //     .catch(function(error) {
    //         console.error('Error during GET request:', error);
    //         // You can handle the error here
    //     });
