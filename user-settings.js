// =====================================
// AQUA GUARD - USER SETTINGS
// =====================================

const HOUSEHOLD_ID =
    localStorage.getItem("aquaGuardHouseholdId") || "AG-001";


// =====================================
// LOAD SETTINGS
// =====================================

function loadSettings() {

    const waterLimit =
        document.getElementById("waterLimit");

    const waterSource =
        document.getElementById("waterSource");

    const userEmail =
        document.getElementById("userEmail");


    if (waterLimit) {
        waterLimit.value = 250;
    }


    if (waterSource) {

        const savedSource =
            localStorage.getItem("aquaGuardWaterSource");

        waterSource.value =
            savedSource || "borewell";
    }


    // Load saved email
    const savedEmail =
        localStorage.getItem("aquaGuardUserEmail");

    if (savedEmail && userEmail) {
        userEmail.value = savedEmail;
    }
}


// =====================================
// SUBMIT WATER LIMIT EXTENSION
// =====================================

function submitLimitRequest() {

    const requestedLimitElement =
        document.getElementById("requestedLimit");

    const reasonElement =
        document.getElementById("extensionReason");

    const waterLimitElement =
        document.getElementById("waterLimit");

    const userEmailElement =
        document.getElementById("userEmail");

    const status =
        document.getElementById("requestStatus");


    const requestedLimit =
        Number(requestedLimitElement.value);

    const reason =
        reasonElement.value.trim();

    const currentLimit =
        Number(waterLimitElement.value || 250);

    const email =
        userEmailElement.value ||
        localStorage.getItem("aquaGuardUserEmail") ||
        "user@aquaguard.com";


    // =================================
    // VALIDATION
    // =================================

    if (!requestedLimit) {

        status.textContent =
            "Please enter the requested water limit.";

        status.style.color = "red";

        return;
    }


    if (requestedLimit <= currentLimit) {

        status.textContent =
            "Requested limit must be greater than your current limit.";

        status.style.color = "red";

        return;
    }


    if (!reason) {

        status.textContent =
            "Please enter a reason for the request.";

        status.style.color = "red";

        return;
    }


    // =================================
    // CREATE REQUEST
    // =================================

    const requestData = {

        household: HOUSEHOLD_ID,

        email: email,

        currentLimit: currentLimit,

        requestedLimit: requestedLimit,

        reason: reason,

        status: "Pending",

        date: new Date().toLocaleString(),

        timestamp: Date.now()

    };


    // =================================
    // SAVE TO FIREBASE
    // =================================

    database
        .ref("waterLimitRequests")
        .push(requestData)

        .then(function() {

            status.textContent =
                "✓ Extension request submitted successfully.";

            status.style.color = "green";


            // Clear form

            requestedLimitElement.value = "";

            reasonElement.value = "";


            alert(
                "Water limit extension request submitted successfully.\n\n" +
                "Your administrator will review the request."
            );

        })

        .catch(function(error) {

            console.error(
                "Firebase request error:",
                error
            );


            status.textContent =
                "Unable to submit request. Please try again.";

            status.style.color = "red";


            alert(
                "Request could not be submitted.\n\n" +
                "Firebase error: " +
                error.message
            );

        });
}


// =====================================
// SAVE SETTINGS
// =====================================

function saveSettings() {

    const email =
        document.getElementById("userEmail").value;

    const waterSource =
        document.getElementById("waterSource").value;


    if (email) {

        localStorage.setItem(
            "aquaGuardUserEmail",
            email
        );

    }


    localStorage.setItem(
        "aquaGuardWaterSource",
        waterSource
    );


    alert(
        "Settings saved successfully ✓"
    );
}


// =====================================
// SUPPORT
// =====================================

function showSupport() {

    alert(
        "Aqua Guard Support\n\n" +
        "For assistance, please contact your administrator."
    );

}


// =====================================
// LOGOUT
// =====================================

function logoutUser() {

    localStorage.removeItem(
        "aquaGuardUserEmail"
    );

    window.location.href =
        "index.html";

}


// =====================================
// START
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSettings();

    }
);