

        // Toggle between forms
        function showSignUp() {
            document.querySelector('.sign-in-container').style.display = 'none';
            document.querySelector('.sign-up-container').style.display = 'block';
            document.querySelector('.forgot-password-container').style.display = 'none';
        }

        function showSignIn() {
            document.querySelector('.sign-up-container').style.display = 'none';
            document.querySelector('.sign-in-container').style.display = 'block';
            document.querySelector('.forgot-password-container').style.display = 'none';
        }

        function showForgotPassword() {
            document.querySelector('.sign-in-container').style.display = 'none';
            document.querySelector('.sign-up-container').style.display = 'none';
            document.querySelector('.forgot-password-container').style.display = 'block';
        }

        // Social login/signup functions
        function socialLogin(provider) {
            showMessage('loginMessage', `Signing in with ${provider}... (This is a demo)`, 'success');
            // In a real app, this would redirect to the provider's authentication page
        }

        function socialSignup(provider) {
            showMessage('signupMessage', `Signing up with ${provider}... (This is a demo)`, 'success');
            // In a real app, this would redirect to the provider's authentication page
        }

        // Form submission handlers
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            if (!email || !password) {
                showMessage('loginMessage', 'Please fill in all fields', 'error');
                return;
            }
            
            // Check if user exists in localStorage (demo purposes)
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            if (!users[email]) {
                showMessage('loginMessage', 'Email not found. Please sign up.', 'error');
                return;
            }
            
            if (users[email].password !== password) {
                showMessage('loginMessage', 'Incorrect password', 'error');
                return;
            }
            
            showMessage('loginMessage', `Welcome back, ${users[email].name}!`, 'success');
            // In a real app, you would redirect to the user dashboard
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            
            if (!name || !email || !password) {
                showMessage('signupMessage', 'Please fill in all fields', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('signupMessage', 'Password must be at least 6 characters', 'error');
                return;
            }
            
            // Check if email already exists (demo purposes)
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            if (users[email]) {
                showMessage('signupMessage', 'Email already registered. Please sign in.', 'error');
                showSignIn();
                return;
            }
            
            // Save user (demo purposes)
            users[email] = { name, email, password };
            localStorage.setItem('users', JSON.stringify(users));
            
            showMessage('signupMessage', 'Account created successfully!', 'success');
            document.getElementById('signupForm').reset();
            showSignIn();
        });

        document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('forgotPasswordEmail').value.trim();
            
            if (!email) {
                showMessage('forgotPasswordMessage', 'Please enter your email', 'error');
                return;
            }
            
            // Check if email exists (demo purposes)
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            if (!users[email]) {
                showMessage('forgotPasswordMessage', 'Email not found in our system', 'error');
                return;
            }
            
            showMessage('forgotPasswordMessage', `Password reset link sent to ${email} (demo)`, 'success');
            document.getElementById('forgotPasswordForm').reset();
            
            // In a real app, you would send an actual reset link
            setTimeout(() => {
                showSignIn();
            }, 2000);
        });

        // Helper function to show messages
        function showMessage(elementId, message, type) {
            const element = document.getElementById(elementId);
            element.textContent = message;
            element.className = 'message ' + type;
            
            // Clear message after 3 seconds
            setTimeout(() => {
                element.textContent = '';
                element.className = 'message';
            }, 3000);
        }
    
