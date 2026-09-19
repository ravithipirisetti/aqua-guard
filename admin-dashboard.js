// =====================================
// AQUA GUARD - ADMIN DASHBOARD
// =====================================


// LOGOUT
function logoutAdmin() {
    window.location.href = "index.html";
}


// UPDATE ADMIN NAME
function updateAdminName() {

    const adminNameElement = document.getElementById("adminName");

    if (!adminNameElement) return;

    const email = sessionStorage.getItem("adminEmail");

    if (email === "anish@aquaguard.com") {
        adminNameElement.textContent = "Anish";
    }
    else if (email === "rithwika@aquaguard.com") {
        adminNameElement.textContent = "Rithwika";
    }
    else if (email === "lasya@aquaguard.com") {
        adminNameElement.textContent = "Lasya";
    }
    else {
        adminNameElement.textContent = "Administrator";
    }
}


// UPDATE LAST UPDATED TIME
function updateTime() {

    const element = document.getElementById("lastUpdated");

    if (!element) return;

    const now = new Date();

    element.textContent =
        "Updated " +
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}


// START
updateAdminName();
updateTime();


// Update time every minute
setInterval(updateTime, 60000);