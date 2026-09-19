// =====================================
// AQUA GUARD - HOUSEHOLD CONFIRMATION
// =====================================


// CONFIRM HOUSEHOLD
function confirmHousehold() {

    const confirmed = confirm(
        "Confirm Household\n\n" +
        "Household ID: AG-001\n" +
        "Household: Demo Residence\n" +
        "Daily Water Limit: 250 L\n\n" +
        "Do you want to continue?"
    );

    if (confirmed) {

        // Open the user dashboard
        window.location.href = "user-dashboard.html";

    }
}


// GO BACK TO LOGIN
function goBack() {

    window.location.href = "index.html";

}