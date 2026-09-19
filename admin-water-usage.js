// =====================================
// AQUA GUARD - WATER USAGE
// =====================================

function goBackToDashboard() {
    window.location.href = "admin-dashboard.html";
}


function searchUsage() {

    const input =
        document.getElementById("searchInput").value.toLowerCase();

    const rows =
        document.querySelectorAll("#usageTable tbody tr");

    rows.forEach(function(row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}