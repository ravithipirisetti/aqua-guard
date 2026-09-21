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

    const now = new Date();

    const request = {

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


    // =====================================
    // SAVE TO FIREBASE
    // =====================================

    database
        .ref("waterLimitRequests")
        .push(request)

        .then(function () {

            // Also keep a local copy
            let requests = [];

            const savedRequests =
                localStorage.getItem("waterLimitRequests");


            if (savedRequests) {

                try {

                    requests =
                        JSON.parse(savedRequests);

                } catch (error) {

                    requests = [];

                }

            }


            request.id = Date.now();


            requests.push(request);


            localStorage.setItem(
                "waterLimitRequests",
                JSON.stringify(requests)
            );


            // =====================================
            // SHOW STATUS
            // =====================================

            const status =
                document.getElementById("requestStatus");


            if (status) {

                status.textContent =
                    "Extension request submitted. Waiting for administrator approval.";

            }


            // =====================================
            // SUCCESS MESSAGE
            // =====================================

            alert(

                "Water Limit Extension Request Submitted ✓\n\n" +

                "Requested Limit: " +
                requestedLimit +
                " L\n\n" +

                "Status: Pending"

            );

        })

        .catch(function (error) {

            console.error(
                "Firebase request error:",
                error
            );


            alert(

                "Unable to submit request.\n\n" +

                "Please check your internet connection."

            );

        });

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