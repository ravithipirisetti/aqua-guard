// =====================================
// AQUA GUARD - USER DASHBOARD
// =====================================


// =====================================
// LOGOUT
// =====================================

function goHome() {
    window.location.href = "index.html";
}


// =====================================
// SHOW ALERTS
// =====================================

function showAlerts() {

    alert(
        "Aqua Guard Alerts\n\n" +
        "⚠ Higher usage detected\n" +
        "Your usage was above your usual level this afternoon.\n\n" +
        "✓ System check complete\n" +
        "All sensors are communicating normally."
    );
}


// =====================================
// REQUEST ADDITIONAL WATER
// =====================================

function requestWater() {

    const currentLimit =
        Number(localStorage.getItem("userWaterLimit")) || 250;

    const confirmed = confirm(
        "Request Additional Water\n\n" +
        "Your daily limit is " +
        currentLimit +
        " L.\n\n" +
        "Would you like to send an additional-water request to the administrator?"
    );

    if (confirmed) {

        alert(
            "Request Sent ✓\n\n" +
            "Your additional-water request has been sent to the Aqua Guard administrator."
        );
    }
}


// =====================================
// UPDATE WATER LIMIT
// =====================================

function updateWaterLimit() {

    // Prototype today's usage
    const todayUsage = 184;


    // Get approved limit
    const dailyLimit =
        Number(localStorage.getItem("userWaterLimit")) || 250;


    // Calculate remaining
    const remaining =
        Math.max(dailyLimit - todayUsage, 0);


    // Calculate percentage
    const percentage =
        Math.min((todayUsage / dailyLimit) * 100, 100);


    // =====================================
    // STAT CARDS
    // =====================================

    const statCards =
        document.querySelectorAll(".stat-card");


    if (statCards.length >= 2) {

        // Today's usage card
        const usageCard = statCards[0];

        const usageText =
            usageCard.querySelector("h2");

        if (usageText) {

            usageText.innerHTML =
                todayUsage +
                ' <small>L</small>';

        }


        // Daily limit + percentage
        const usageInfo =
            usageCard.querySelector("p");

        if (usageInfo) {

            usageInfo.innerHTML =
                '<span>· ' +
                dailyLimit +
                ' L</span>' +
                '<strong>' +
                percentage.toFixed(1) +
                '%</strong>';

        }


        // Remaining card
        const remainingCard = statCards[1];

        const remainingText =
            remainingCard.querySelector("h2");

        if (remainingText) {

            remainingText.innerHTML =
                remaining +
                ' <small>L</small>';

        }
    }


    // =====================================
    // WATER BUDGET SECTION
    // =====================================

    const budgetLimit =
        document.getElementById("budgetLimit");

    if (budgetLimit) {
        budgetLimit.textContent =
            dailyLimit;
    }


    const budgetRemaining =
        document.getElementById("budgetRemaining");

    if (budgetRemaining) {
        budgetRemaining.textContent =
            remaining;
    }


    const budgetUsed =
        document.getElementById("budgetUsed");

    if (budgetUsed) {
        budgetUsed.textContent =
            todayUsage;
    }


    const budgetPercentage =
        document.getElementById("budgetPercentage");

    if (budgetPercentage) {
        budgetPercentage.textContent =
            percentage.toFixed(1) + "%";
    }


    // =====================================
    // PROGRESS BAR
    // =====================================

    const progress =
        document.getElementById("usageProgress");

    if (progress) {

        progress.style.width =
            percentage + "%";

    }


    // =====================================
    // REQUEST BUTTON TEXT
    // =====================================

    const requestButtons =
        document.querySelectorAll("button, a");


    requestButtons.forEach(function (button) {

        const text =
            button.textContent.toLowerCase();

        if (
            text.includes("request additional water")
        ) {

            button.onclick =
                requestWater;

        }

    });
}


// =====================================
// UPDATE LAST UPDATED TIME
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


// =====================================
// SIMULATE LIVE DATA
// =====================================

function simulateLiveData() {

    const flowRates = [
        "4.6 L/min",
        "4.8 L/min",
        "5.0 L/min",
        "4.7 L/min"
    ];


    const randomFlow =
        flowRates[
            Math.floor(
                Math.random() * flowRates.length
            )
        ];


    const flowElements =
        document.querySelectorAll(".stat-card h2");


    if (flowElements.length >= 3) {

        flowElements[2].innerHTML =
            randomFlow.replace(
                " ",
                " <small>"
            ) +
            "</small>";

    }


    // Keep approved water limit synced
    updateWaterLimit();

    updateTime();
}


// =====================================
// START DASHBOARD
// =====================================

updateWaterLimit();

updateTime();


// Update demo data every 5 seconds
setInterval(
    simulateLiveData,
    5000
);