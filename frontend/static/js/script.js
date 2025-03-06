/* script.js */
window.onload = function() {
    const messages = document.getElementById('flash-messages');
    if (messages) {
        const messageList = messages.children;
        for (let i = 0; i < messageList.length; i++) {
            const message = messageList[i].innerHTML;
            const category = messageList[i].classList;

            // Customize alert based on category (success, danger, etc.)
            if (category.contains('success')) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('danger')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('info')) {
                Swal.fire({
                    icon: 'info',
                    title: 'Information',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else if (category.contains('warning')) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            } else {
                Swal.fire({
                    icon: 'question',
                    title: 'Message',
                    text: message,
                    timer: 3000,
                    showConfirmButton: true,
                });
            }
        }
    }
};

/*document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");
    const usernameInput = document.querySelector("input[type='email']");
    const passwordInput = document.querySelector("input[type='password']");

    loginBtn.addEventListener("click", function () {
        if (!validateInputs()) return;
        alert("Login button clicked!");
    });

    signupBtn.addEventListener("click", function () {
        if (!validateInputs()) return;
        alert("Signup button clicked!");
    });

    function validateInputs() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,30}$/;

        if (!emailPattern.test(usernameInput.value) || usernameInput.value.length > 30) {
            alert("Invalid email format or exceeds 30 characters.");
            return false;
        }

        if (!passwordPattern.test(passwordInput.value) || passwordInput.value.length > 30) {
            alert("Password must contain uppercase, lowercase, and a number, and be at most 30 characters long.");
            return false;
        }
        return true;
    }
});*

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupBtn").addEventListener("click", function () {
        window.location.href = "signup.html"; // Redirect to signup page
    });
});
*/
