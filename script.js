// =====================================
// AQUA GUARD - LOGIN
// =====================================

function loginUser(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email !== "" && password !== "") {

        // Store the logged-in user's email
        localStorage.setItem("userEmail", email);

        // Continue to household confirmation
        window.location.href = "household-confirm.html";

    } else {

        alert("Please enter your email and password.");

    }
}


function forgotPassword(event) {

    event.preventDefault();

    alert(
        "Password Reset\n\n" +
        "For this prototype, please contact the Aqua Guard administrator."
    );
}


function forgotPassword(event) {

    event.preventDefault();

    alert(
        "Password Reset\n\n" +
        "For this demo, please use:\n\n" +
        "Email: user@aquaguard.com\n" +
        "Password: 123456"
    );
}