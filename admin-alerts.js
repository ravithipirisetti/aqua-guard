// =====================================
// AQUA GUARD - ALERTS
// =====================================

function goBackToDashboard() {
    window.location.href = "admin-dashboard.html";
}


function filterAlerts() {

    const filter =
        document.getElementById("alertFilter").value;

    const alerts =
        document.querySelectorAll(".alert-item");

    alerts.forEach(function(alert) {

        const type = alert.getAttribute("data-type");

        if (filter === "all" || filter === type) {
            alert.style.display = "flex";
        } else {
            alert.style.display = "none";
        }

    });
}


function resolveAlert(button) {

    const alertItem = button.closest(".alert-item");

    const confirmed = confirm(
        "Resolve Alert\n\n" +
        "Are you sure you want to mark this alert as resolved?"
    );

    if (confirmed) {

        alertItem.style.opacity = "0.5";
        button.textContent = "Resolved";
        button.disabled = true;

        alert(
            "Alert Resolved ✓\n\n" +
            "The alert has been marked as resolved."
        );
    }
}