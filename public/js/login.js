const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/listing/new');
      } else {
        alert(response.statusText);
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log("we are here");
   
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  console.log(email)
  console.log(password)

    if (email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({  email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log(response)
      if (response.ok) {
        // document.location.replace('/listing/new');
        await fetch('/api/listing/new', {
          method:'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('#login')
    .addEventListener('click', loginFormHandler);
  
  document
    .querySelector('#signup')
    .addEventListener('click', signupFormHandler);
  