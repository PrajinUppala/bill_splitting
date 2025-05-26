    // const loginBtn = document.getElementById("loginBtn");
    // const signupBtn = document.getElementById("signupBtn");
    // const formContainer = document.getElementById("formContainer");

    // function loadForm(url) {
    //   fetch(url)
    //     .then(response => response.text())
        // .then(html => {
    //       formContainer.innerHTML = html;
    //     })
    //     .catch(error => {
    //       formContainer.innerHTML = "<p>Failed to load form.</p>";
    //       console.error("Error loading form:", error);
    //     });
    // }

    // loginBtn.addEventListener("click", () => {
    //   loginBtn.classList.add("active");
    //   signupBtn.classList.remove("active");
    //   loadForm("login.html");
    // });

    // signupBtn.addEventListener("click", () => {
    //   signupBtn.classList.add("active");
    //   loginBtn.classList.remove("active");
    //   loadForm("register.html");
    // });

    // // Load login form by default
    // loadForm("login.html");


    

    const loginBtn = document.getElementById("loginBtn");
    const signupBtn = document.getElementById("signupBtn");
    const formContainer = document.getElementById("formContainer");

    // Function to load any form HTML and attach the login handler if it's the login form
    function loadForm(url, attachHandler) {
        fetch(url)
        .then(response => response.text())
        .then(html => {
        formContainer.innerHTML = html;
            if (attachHandler) attachHandler();
        })
        .catch(err => {
            formContainer.innerHTML = "<p>Error loading form.</p>";
            console.error(err);
        });
    }

// Show login form initially and attach handler

    function attachLoginHandler() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        const resultEl = document.getElementById('login-result');

        if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        resultEl.textContent = 'Login successful! Redirecting...';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        } else {
        resultEl.textContent = data.message || 'Login failed';
        }
    });
    }

    function attachRegisterHandler() {
        const form = document.getElementById('register-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = e.target.username.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();
        const phone = e.target.phone.value.trim();

        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password, phone }),
        });

        const data = await res.json();

        const resultEl = document.getElementById('register-result');

        if (res.ok) {
          resultEl.textContent = 'Registration successful! You can now login.';
          form.reset();
        } else {
          resultEl.textContent = data.message || 'Registration failed';
        }
    });
    }

// When login button clicked, load login form + attach handler
    loginBtn.addEventListener("click", () => {
        loginBtn.classList.add("active");
        signupBtn.classList.remove("active");
        loadForm('login.html', attachLoginHandler);
    });

// When signup button clicked, just load signup form (no handler for now)
    signupBtn.addEventListener("click", () => {
        signupBtn.classList.add("active");
        loginBtn.classList.remove("active");
        loadForm('register.html',attachRegisterHandler); // Assume your register.html has its own handler
    });

    loadForm('login.html', attachLoginHandler);



