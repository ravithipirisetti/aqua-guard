// =====================================
// AQUA GUARD - USER WATER USAGE
// =====================================

function goHome() {
    window.location.href = "index.html";
}


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


updateTime();

setInterval(updateTime, 60000);