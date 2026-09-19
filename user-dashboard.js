// =====================================
// AQUA GUARD - USER DASHBOARD
// =====================================


// LOGOUT
function goHome() {
    window.location.href = "index.html";
}


// SHOW ALERTS
function showAlerts() {
    alert(
        "Aqua Guard Alerts\n\n" +
        "⚠ Higher usage detected\n" +
        "Your usage was above your usual level this afternoon.\n\n" +
        "✓ System check complete\n" +
        "All sensors are communicating normally."
    );
}


// REQUEST ADDITIONAL WATER
function requestWater() {

    const confirmed = confirm(
        "Request Additional Water\n\n" +
        "Your daily limit is 250 L.\n\n" +
        "Would you like to send an additional-water request to the administrator?"
    );

    if (confirmed) {
        alert(
            "Request Sent ✓\n\n" +
            "Your additional-water request has been sent to the Aqua Guard administrator."
        );
    }
}


// UPDATE LAST UPDATED TIME
function updateTime() {

    const element = document.getElementById("lastUpdated");

    if (!element) return;

    const now = new Date();

    element.textContent = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}


// SIMULATE LIVE DATA
function simulateLiveData() {

    const flowRates = [
        "4.6 L/min",
        "4.8 L/min",
        "5.0 L/min",
        "4.7 L/min"
    ];

    const randomFlow =
        flowRates[Math.floor(Math.random() * flowRates.length)];

    const flowElements =
        document.querySelectorAll(".stat-card h2");

    if (flowElements.length >= 3) {

        flowElements[2].innerHTML =
            randomFlow.replace(" ", " <small>") + "</small>";

    }

    updateTime();
}


// START DASHBOARD
updateTime();


// Update the demo data every 5 seconds
setInterval(simulateLiveData, 5000);