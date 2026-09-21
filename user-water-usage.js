// =====================================
// AQUA GUARD - USER WATER USAGE
// =====================================

function loadWaterUsage() {

    const todayUsage = 184;

    // Read approved limit from Firebase
    database
        .ref("households/AG-001/waterLimit")
        .once("value")
        .then(function(snapshot) {

            let dailyLimit = snapshot.val();

            // Fallback if Firebase doesn't have a limit yet
            if (!dailyLimit) {
                dailyLimit =
                    Number(localStorage.getItem("userWaterLimit")) || 250;
            }

            dailyLimit = Number(dailyLimit);

            const remaining =
                Math.max(dailyLimit - todayUsage, 0);

            const percentage =
                Math.min(
                    (todayUsage / dailyLimit) * 100,
                    100
                );

            // =====================================
            // UPDATE PAGE
            // =====================================

            const dailyLimitElement =
                document.getElementById("dailyLimit");

            if (dailyLimitElement) {
                dailyLimitElement.textContent =
                    dailyLimit + " L";
            }


            const remainingElement =
                document.getElementById("remainingWater");

            if (remainingElement) {
                remainingElement.textContent =
                    remaining + " L";
            }


            const percentageElement =
                document.getElementById("usagePercentage");

            if (percentageElement) {
                percentageElement.textContent =
                    percentage.toFixed(1) + "%";
            }


            const progressLimit =
                document.getElementById("progressLimit");

            if (progressLimit) {
                progressLimit.textContent =
                    dailyLimit + " L";
            }


            const progressRemaining =
                document.getElementById("progressRemaining");

            if (progressRemaining) {
                progressRemaining.textContent =
                    remaining + " L";
            }


            const usageProgress =
                document.getElementById("usageProgress");

            if (usageProgress) {
                usageProgress.style.width =
                    percentage + "%";
            }


            const limitCircle =
                document.getElementById("limitCircle");

            if (limitCircle) {
                limitCircle.style.setProperty(
                    "--progress",
                    percentage + "%"
                );
            }


            const limitRemaining =
                document.getElementById("limitRemaining");

            if (limitRemaining) {
                limitRemaining.textContent =
                    remaining + " L";
            }

        })
        .catch(function(error) {

            console.error(
                "Firebase water limit error:",
                error
            );

        });
}


// =====================================
// TIME
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
// LOGOUT
// =====================================

function goHome() {

    window.location.href =
        "index.html";
}


// =====================================
// START
// =====================================

loadWaterUsage();

updateTime();

setInterval(updateTime, 5000);