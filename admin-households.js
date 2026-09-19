// =====================================
// AQUA GUARD - HOUSEHOLD MANAGEMENT
// =====================================


// BACK TO ADMIN DASHBOARD
function goBackToDashboard() {
    window.location.href = "admin-dashboard.html";
}


// SEARCH HOUSEHOLDS
function searchHouseholds() {

    const input =
        document.getElementById("searchInput").value.toLowerCase();

    const rows =
        document.querySelectorAll("#householdTable tbody tr");

    rows.forEach(function(row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}