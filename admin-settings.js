// =====================================
// AQUA GUARD - ADMIN SETTINGS
// =====================================

function logoutAdmin() {
    window.location.href = "index.html";
}


function updateAdminName() {

    const adminNameElement =
        document.getElementById("adminName");

    const adminFullName =
        document.getElementById("adminFullName");

    const email =
        sessionStorage.getItem("adminEmail");


    let name = "Administrator";


    if (email === "anish@aquaguard.com") {
        name = "Anish";
    }
    else if (email === "rithwika@aquaguard.com") {
        name = "Rithwika";
    }
    else if (email === "lasya@aquaguard.com") {
        name = "Lasya";
    }


    if (adminNameElement) {
        adminNameElement.textContent = name;
    }


    if (
        adminFullName &&
        adminFullName.value === "Administrator"
    ) {
        adminFullName.value = name;
    }
}


function saveSettings() {

    const adminName =
        document.getElementById("adminFullName").value;

    const adminEmail =
        document.getElementById("adminEmail").value;

    const waterLimit =
        document.getElementById("waterLimit").value;

    const alertThreshold =
        document.getElementById("alertThreshold").value;


    if (
        adminName.trim() === "" ||
        adminEmail.trim() === "" ||
        waterLimit === "" ||
        alertThreshold === ""
    ) {

        alert(
            "Please complete all settings before saving."
        );

        return;
    }


    localStorage.setItem(
        "adminFullName",
        adminName
    );

    localStorage.setItem(
        "adminSettingsEmail",
        adminEmail
    );

    localStorage.setItem(
        "waterLimit",
        waterLimit
    );

    localStorage.setItem(
        "alertThreshold",
        alertThreshold
    );


    alert(
        "Settings Saved ✓\n\n" +
        "Your Aqua Guard administrator settings have been saved successfully."
    );
}


function loadSettings() {

    const savedName =
        localStorage.getItem("adminFullName");

    const savedEmail =
        localStorage.getItem("adminSettingsEmail");

    const savedWaterLimit =
        localStorage.getItem("waterLimit");

    const savedThreshold =
        localStorage.getItem("alertThreshold");


    if (savedName) {
        document.getElementById("adminFullName").value =
            savedName;
    }

    if (savedEmail) {
        document.getElementById("adminEmail").value =
            savedEmail;
    }

    if (savedWaterLimit) {
        document.getElementById("waterLimit").value =
            savedWaterLimit;
    }

    if (savedThreshold) {
        document.getElementById("alertThreshold").value =
            savedThreshold;
    }
}


updateAdminName();
loadSettings();