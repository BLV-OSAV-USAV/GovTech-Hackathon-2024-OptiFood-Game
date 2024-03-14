// Function to perform logina
async function login() {
    // Make a request to your backend server to authenticate the user
    // This could be done using fetch or XMLHttpRequest
    // Example using fetch:
    email= document.getElementById("loginUsername").value;
    password= document.getElementById("loginPassword").value;
    const url = 'https://optifood.directus.app/auth/login';

    const data = '{ "email":"'+email+'", "password":"'+password +'"}';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });
    const text = await response.text();
    responseJson= JSON.parse(text).data
    const accessToken = responseJson.access_token;
    const refreshToken = responseJson.refresh_token;

    // Store tokens in localStorage or sessionStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    window.location="index.html";
  }
  
  
  
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
  // Function to check if the access token is expired
  function getUserData() {
    // Retrieve access token from localStorage or sessionStorage
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return false; // Access token not found, consider it as expired
    }
  
    // Decode the access token (if needed) to check its expiration time
    // Here, you would typically decode the JWT access token and check its expiration time
    // For simplicity, let's assume the token is JWT and expiration time is stored in 'exp' claim
  
    // Example: Decode JWT token (for demonstration purposes only, use a proper library for decoding)
    return parseJwt(accessToken);
  }