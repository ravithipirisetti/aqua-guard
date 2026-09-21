function loadSettings() {

    const email = localStorage.getItem("userEmail");
    const savedLimit = localStorage.getItem("userWaterLimit");
    const savedSource = localStorage.getItem("userWaterSource");

    const usageAlerts = localStorage.getItem("userUsageAlerts");
    const limitAlerts = localStorage.getItem("userLimitAlerts");
    const systemAlerts = localStorage.getItem("userSystemAlerts");

    // Email
    const emailInput = document.getElementById("userEmail");

    if (email && emailInput) {
        emailInput.value = email;
    }

    // Water limit
    const waterLimit = document.getElementById("waterLimit");

    if (savedLimit && waterLimit) {
        waterLimit.value = savedLimit;
    }

    // Water source
    const waterSource = document.getElementById("waterSource");

    if (savedSource && waterSource) {
        waterSource.value = savedSource;
    }

    // Notifications
    if (usageAlerts !== null) {
        document.getElementById("usageAlerts").checked =
            usageAlerts === "true";
    }

    if (limitAlerts !== null) {
        document.getElementById("limitAlerts").checked =
            limitAlerts === "true";
    }

    if (systemAlerts !== null) {
        document.getElementById("systemAlerts").checked =
            systemAlerts === "true";
    }
}


function saveSettings() {

    const email =
        document.getElementById("userEmail").value.trim();

    const waterSource =
        document.getElementById("waterSource").value;


    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    // Save user information
    localStorage.setItem("userEmail", email);

    localStorage.setItem(
        "userWaterSource",
        waterSource
    );


    // Save notification preferences
    localStorage.setItem(
        "userUsageAlerts",
        document.getElementById("usageAlerts").checked
    );

    localStorage.setItem(
        "userLimitAlerts",
        document.getElementById("limitAlerts").checked
    );

    localStorage.setItem(
        "userSystemAlerts",
        document.getElementById("systemAlerts").checked
    );


    alert(
        "Settings Saved ✓\n\n" +
        "Your Aqua Guard settings have been saved successfully."
    );
}


function showSupport() {

    alert(
        "Aqua Guard Support\n\n" +
        "For this demo prototype:\n\n" +
        "• Check Water Usage\n" +
        "• Review Alerts\n" +
        "• Generate Reports\n" +
        "• Contact the administrator for additional water requests"
    );
}


function logoutUser() {

    const confirmed =
        confirm("Logout\n\nAre you sure you want to logout?");

    if (confirmed) {
        window.location.href = "index.html";
    }
}


// Load saved settings when page opens
loadSettings();

function submitLimitRequest() {

    const requestedLimit =
        document.getElementById("requestedLimit").value;

    const reason =
        document.getElementById("extensionReason").value.trim();

    const email =
        localStorage.getItem("userEmail") || "Unknown User";


    // Validate requested limit
    if (requestedLimit === "") {
        alert("Please enter the requested water limit.");
        return;
    }


    // Validate reason
    if (reason === "") {
        alert("Please enter a reason for the request.");
        return;
    }


    // Get existing requests
    let requests = [];

    const savedRequests =
        localStorage.getItem("waterLimitRequests");


    if (savedRequests) {

        try {
            requests = JSON.parse(savedRequests);
        } catch (error) {
            requests = [];
        }

    }


    // =====================================
    // CHECK 3 REQUESTS PER MONTH
    // =====================================

    const now = new Date();

    const currentMonth =
        now.getMonth();

    const currentYear =
        now.getFullYear();


    const monthlyRequests =
        requests.filter(request => {

            const requestDate =
                new Date(request.timestamp);

            return (
                requestDate.getMonth() === currentMonth &&
                requestDate.getFullYear() === currentYear
            );

        });


    if (monthlyRequests.length >= 3) {

        alert(
            "Monthly Request Limit Reached\n\n" +
            "You can submit a maximum of 3 water-limit " +
            "extension requests per month."
        );

        return;
    }


    // =====================================
    // CURRENT WATER LIMIT
    // =====================================

    const currentLimit =
        Number(
            localStorage.getItem("userWaterLimit")
        ) || 250;


    // =====================================
    // CREATE REQUEST
    // =====================================

    const request = {

        id: Date.now(),

        household: "AG-001",

        email: email,

        currentLimit: currentLimit,

        requestedLimit:
            Number(requestedLimit),

        reason: reason,

        date:
            now.toLocaleString(),

        timestamp:
            now.toISOString(),

        status: "Pending"

    };


    // Add request to array
    requests.push(request);


    // Save requests
    localStorage.setItem(
        "waterLimitRequests",
        JSON.stringify(requests)
    );


    // Show status
    const status =
        document.getElementById("requestStatus");

    if (status) {

        status.textContent =
            "Extension request submitted. Waiting for administrator approval.";

    }


    alert(
        "Water Limit Extension Request Submitted ✓\n\n" +
        "Requested Limit: " +
        requestedLimit +
        " L\n\n" +
        "Status: Pending"
    );
}

// =====================================
// CONNECT WATER LIMIT REQUEST BUTTON
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const requestedLimit =
        document.getElementById("requestedLimit");

    if (!requestedLimit) return;


    // Find the form containing the request fields
    const form =
        requestedLimit.closest("form");


    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            submitLimitRequest();

        });

    }


    // Also connect a request/submit button if present
    const buttons =
        document.querySelectorAll("button");


    buttons.forEach(function (button) {

        const text =
            button.textContent.toLowerCase().trim();


        if (
            text.includes("submit") &&
            text.includes("request")
        ) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    submitLimitRequest();

                }
            );

        }

    });

});