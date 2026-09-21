// =====================================
// AQUA GUARD - USER WATER USAGE
// =====================================

function goHome() {
    window.location.href = "index.html";
}


// =====================================
// CURRENT WATER USAGE
// =====================================

function updateWaterUsage() {

    // Current day's usage
    const todayUsage = 184;

    // Get approved water limit
    const savedLimit =
        Number(localStorage.getItem("userWaterLimit")) || 250;

    // Calculate remaining water
    const remaining =
        Math.max(savedLimit - todayUsage, 0);

    // Calculate percentage used
    const percentage =
        Math.min((todayUsage / savedLimit) * 100, 100);


    // Daily limit
    const dailyLimit =
        document.getElementById("dailyLimit");

    if (dailyLimit) {
        dailyLimit.textContent = savedLimit;
    }


    // Remaining water
    const remainingWater =
        document.getElementById("remainingWater");

    if (remainingWater) {
        remainingWater.textContent = remaining;
    }


    // Progress limit
    const progressLimit =
        document.getElementById("progressLimit");

    if (progressLimit) {
        progressLimit.textContent = savedLimit;
    }


    // Percentage
    const usagePercentage =
        document.getElementById("usagePercentage");

    if (usagePercentage) {
        usagePercentage.textContent =
            percentage.toFixed(1);
    }


    // Progress bar
    const usageProgress =
        document.getElementById("usageProgress");

    if (usageProgress) {
        usageProgress.style.width =
            percentage + "%";
    }


    // Remaining in progress section
    const progressRemaining =
        document.getElementById("progressRemaining");

    if (progressRemaining) {
        progressRemaining.textContent =
            remaining;
    }


    // Bottom percentage circle
    const limitCircle =
        document.getElementById("limitCircle");

    if (limitCircle) {
        limitCircle.textContent =
            percentage.toFixed(1) + "%";
    }


    // Bottom remaining
    const limitRemaining =
        document.getElementById("limitRemaining");

    if (limitRemaining) {
        limitRemaining.textContent =
            remaining;
    }
}


// =====================================
// LAST UPDATED TIME
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
// START
// =====================================

updateWaterUsage();

updateTime();

setInterval(updateTime, 60000);