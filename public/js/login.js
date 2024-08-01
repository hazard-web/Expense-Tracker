const signUp = document.getElementById("signUp");
const signIn = document.getElementById("signIn");
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

signUp.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signIn.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function login() {
  const loginDetails = {
    loginEmail: loginEmail.value,
    loginPassword: loginPassword.value,
  };

  axios
    .post(`http://13.233.233.233:3000/user/login`, loginDetails)
    .then((result) => {
      console.log('Response Data:', result.data);
      alert(result.data.message);
      localStorage.setItem("token", result.data.token);
      window.location.href = "/homePage";
    })
    .catch((error) => {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server Error:', error.response);
        const errorMessage = error.response.data.message || 'An error occurred on the server.';
        alert(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request);
        alert('No response received from the server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        console.error('Error:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    });
}

loginBtn.addEventListener("click", login);
