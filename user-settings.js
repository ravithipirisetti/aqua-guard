// =====================================
// AQUA GUARD - USER SETTINGS
// =====================================


function loadSettings() {

    const email =
        localStorage.getItem("userEmail");

    const savedLimit =
        localStorage.getItem("userWaterLimit");

    const savedSource =
        localStorage.getItem("userWaterSource");

    const usageAlerts =
        localStorage.getItem("userUsageAlerts");

    const limitAlerts =
        localStorage.getItem("userLimitAlerts");

    const systemAlerts =
        localStorage.getItem("userSystemAlerts");


    // EMAIL

    const emailInput =
        document.getElementById("userEmail");

    if (email && emailInput) {
        emailInput.value = email;
    }


    // WATER LIMIT

    if (savedLimit) {

        document.getElementById("waterLimit").value =
            savedLimit;

    }


    // WATER SOURCE

    if (savedSource) {

        document.getElementById("waterSource").value =
            savedSource;

    }


    // NOTIFICATIONS

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


// =====================================
// SAVE SETTINGS
// =====================================

function saveSettings() {

    const email =
        document.getElementById("userEmail").value.trim();

    const waterLimit =
        document.getElementById("waterLimit").value;

    const waterSource =
        document.getElementById("waterSource").value;


    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    if (waterLimit === "" || Number(waterLimit) <= 0) {

        alert("Please enter a valid daily water limit.");

        return;
    }


    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "userWaterLimit",
        waterLimit
    );

    localStorage.setItem(
        "userWaterSource",
        waterSource
    );


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


// =====================================
// SUPPORT
// =====================================

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


// =====================================
// LOGOUT
// =====================================

function logoutUser() {

    const confirmed =
        confirm(
            "Logout\n\n" +
            "Are you sure you want to logout?"
        );

    if (confirmed) {

        window.location.href = "index.html";

    }

}


// =====================================
// LOAD SETTINGS
// =====================================

loadSettings();