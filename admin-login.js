// =====================================
// AQUA GUARD - ADMIN LOGIN
// =====================================

function adminLogin(event) {

    event.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();

    if (
        (email === "anish@aquaguard.com" ||
         email === "rithwika@aquaguard.com" ||
         email === "lasya@aquaguard.com") &&
        password === "9963"
    ) {

        sessionStorage.setItem("adminEmail", email);

        window.location.href = "admin-dashboard.html";

    } else {

      alert("Invalid admin login details.");
}


// BACK TO USER LOGIN
function goToUserLogin() {
    window.location.href = "index.html";
}