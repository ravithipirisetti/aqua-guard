// =====================================
// AQUA GUARD - USER ALERTS
// =====================================

function goHome() {
    window.location.href = "index.html";
}


// =====================================
// FILTER ALERTS
// =====================================

function filterAlerts() {

    const filter =
        document.getElementById("alertFilter").value;

    const alerts =
        document.querySelectorAll(".alert-item");

    alerts.forEach(function(alert) {

        const type =
            alert.getAttribute("data-type");

        if (filter === "all" || filter === type) {
            alert.style.display = "flex";
        } else {
            alert.style.display = "none";
        }

    });
}


// =====================================
// VIEW ALERT
// =====================================

function viewAlert(button) {

    const alertItem =
        button.closest(".alert-item");

    const title =
        alertItem.querySelector("h3").textContent;

    const message =
        alertItem.querySelector(".alert-content p").textContent;

    const confirmed =
        confirm(
            title +
            "\n\n" +
            message +
            "\n\n" +
            "Household: AG-001\n" +
            "Aqua Guard monitoring is active."
        );

    if (confirmed) {

        alert(
            "Alert Acknowledged ✓\n\n" +
            "The alert has been reviewed."
        );

    }
}


// =====================================
// NOTIFICATIONS
// =====================================

function showNotifications() {

    alert(
        "Aqua Guard Notifications\n\n" +
        "⚠ Higher water usage detected\n" +
        "Your usage is currently 184 L.\n\n" +
        "⚠ Daily limit approaching\n" +
        "66 L of your daily allowance remains."
    );
}


// =====================================
// SUPPORT
// =====================================

function showSupport() {

    alert(
        "Aqua Guard Support\n\n" +
        "For this demo prototype:\n\n" +
        "• Check your Water Usage page\n" +
        "• Review active Alerts\n" +
        "• Contact the administrator for additional water requests"
    );
}


// =====================================
// LAST UPDATED TIME
// =====================================

function updateTime() {

    const element =
        document.getElementById("lastUpdated");

    if (!element) return;

    const now = new Date();

    element.textContent =
        now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}

updateTime();

setInterval(updateTime, 60000);