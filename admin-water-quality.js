// =====================================
// AQUA GUARD
// ADMIN WATER QUALITY DASHBOARD
// =====================================

let allQualityData = {};


// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    loadWaterQuality();

    const searchInput =
        document.getElementById("searchInput");

    const statusFilter =
        document.getElementById("statusFilter");

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            applyFilters
        );
    }

    if (statusFilter) {
        statusFilter.addEventListener(
            "change",
            applyFilters
        );
    }
});


// =====================================
// LOAD FIREBASE DATA
// =====================================

function loadWaterQuality() {

    if (typeof database === "undefined") {

        setConnectionStatus(false);

        showEmptyMessage(
            "Firebase database is not available."
        );

        return;
    }

    setConnectionStatus(true);

    const qualityRef =
        database.ref("waterQuality");

    qualityRef.on(
        "value",
        function (snapshot) {

            allQualityData = {};

            const data = snapshot.val();

            if (!data) {

                renderTable({});

                return;
            }

            Object.keys(data).forEach(function (householdId) {

                const householdData =
                    data[householdId];

                if (
                    householdData &&
                    householdData.latest
                ) {

                    allQualityData[householdId] =
                        householdData.latest;
                }

            });

            renderTable(allQualityData);

            updateSummary(allQualityData);

            generateAlerts(allQualityData);

        },
        function (error) {

            console.error(
                "Firebase water-quality error:",
                error
            );

            setConnectionStatus(false);

            showEmptyMessage(
                "Unable to load water-quality data."
            );
        }
    );
}


// =====================================
// CONNECTION STATUS
// =====================================

function setConnectionStatus(connected) {

    const element =
        document.getElementById(
            "connectionStatus"
        );

    if (!element) {
        return;
    }

    if (connected) {

        element.textContent =
            "● Firebase Connected";

        element.className =
            "connection-status connected";

    } else {

        element.textContent =
            "● Firebase Offline";

        element.className =
            "connection-status";
    }
}


// =====================================
// RENDER TABLE
// =====================================

function renderTable(data) {

    const tableBody =
        document.getElementById(
            "qualityTableBody"
        );

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = "";

    const householdIds =
        Object.keys(data);

    if (householdIds.length === 0) {

        showEmptyMessage(
            "No water-quality readings found."
        );

        return;
    }

    householdIds.forEach(function (householdId) {

        const reading = data[householdId];

        const status =
            getReadingStatus(reading);

        const row =
            document.createElement("tr");

        const ph =
            Number(reading.ph || 0);

        const tds =
            Number(reading.tds || 0);

        const turbidity =
            Number(reading.turbidity || 0);

        const temperature =
            Number(reading.temperature || 0);

        const timestamp =
            Number(reading.timestamp);

        const date =
            timestamp
                ? new Date(timestamp)
                : new Date();

        const time =
            date.toLocaleString([], {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit"
            });

        let statusText = "Normal";

        if (status === "warning") {
            statusText = "Warning";
        }

        if (status === "abnormal") {
            statusText = "Abnormal";
        }

        row.innerHTML = `

            <td>
                <span class="household-id">
                    ${householdId}
                </span>
            </td>

            <td>
                ${ph.toFixed(1)}
            </td>

            <td>
                ${Math.round(tds)} ppm
            </td>

            <td>
                ${turbidity.toFixed(1)} NTU
            </td>

            <td>
                ${temperature.toFixed(1)} °C
            </td>

            <td>
                <span class="status-badge ${status}">
                    ${statusText}
                </span>
            </td>

            <td>
                ${time}
            </td>

            <td>
                <button
                    class="view-btn"
                    onclick="viewHousehold('${householdId}')"
                >
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);

    });
}


// =====================================
// SHOW EMPTY MESSAGE
// =====================================

function showEmptyMessage(message) {

    const tableBody =
        document.getElementById(
            "qualityTableBody"
        );

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = `

        <tr>

            <td
                colspan="8"
                class="empty-row"
            >
                ${message}
            </td>

        </tr>
    `;
}


// =====================================
// FILTER
// =====================================

function applyFilters() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";

    const filteredData = {};

    Object.keys(allQualityData).forEach(
        function (householdId) {

            const reading =
                allQualityData[householdId];

            const status =
                getReadingStatus(reading);

            const matchesSearch =
                householdId
                    .toLowerCase()
                    .includes(search);

            const matchesStatus =
                selectedStatus === "all" ||
                status === selectedStatus;

            if (
                matchesSearch &&
                matchesStatus
            ) {

                filteredData[householdId] =
                    reading;
            }
        }
    );

    renderTable(filteredData);
}


// =====================================
// UPDATE SUMMARY
// =====================================

function updateSummary(data) {

    let normal = 0;
    let warning = 0;
    let abnormal = 0;

    Object.keys(data).forEach(
        function (householdId) {

            const status =
                getReadingStatus(
                    data[householdId]
                );

            if (status === "normal") {
                normal++;
            }

            if (status === "warning") {
                warning++;
            }

            if (status === "abnormal") {
                abnormal++;
            }

        }
    );

    const householdCount =
        document.getElementById(
            "householdCount"
        );

    const normalCount =
        document.getElementById(
            "normalCount"
        );

    const warningCount =
        document.getElementById(
            "warningCount"
        );

    const abnormalCount =
        document.getElementById(
            "abnormalCount"
        );

    if (householdCount) {
        householdCount.textContent =
            Object.keys(data).length;
    }

    if (normalCount) {
        normalCount.textContent =
            normal;
    }

    if (warningCount) {
        warningCount.textContent =
            warning;
    }

    if (abnormalCount) {
        abnormalCount.textContent =
            abnormal;
    }
}


// =====================================
// READING STATUS
// =====================================

function getReadingStatus(reading) {

    const ph =
        Number(reading.ph || 0);

    const tds =
        Number(reading.tds || 0);

    const turbidity =
        Number(reading.turbidity || 0);

    const temperature =
        Number(reading.temperature || 0);

    const statuses = [

        getPHStatus(ph),

        getTDSStatus(tds),

        getTurbidityStatus(turbidity),

        getTemperatureStatus(temperature)

    ];

    if (
        statuses.includes("abnormal")
    ) {

        return "abnormal";
    }

    if (
        statuses.includes("warning")
    ) {

        return "warning";
    }

    return "normal";
}


// =====================================
// pH
// =====================================

function getPHStatus(ph) {

    if (ph < 6.5 || ph > 8.5) {
        return "abnormal";
    }

    if (ph < 6.8 || ph > 8.2) {
        return "warning";
    }

    return "normal";
}


// =====================================
// TDS
// =====================================

function getTDSStatus(tds) {

    if (tds > 1000) {
        return "abnormal";
    }

    if (tds > 500) {
        return "warning";
    }

    return "normal";
}


// =====================================
// TURBIDITY
// =====================================

function getTurbidityStatus(turbidity) {

    if (turbidity > 5) {
        return "abnormal";
    }

    if (turbidity > 2) {
        return "warning";
    }

    return "normal";
}


// =====================================
// TEMPERATURE
// =====================================

function getTemperatureStatus(
    temperature
) {

    if (
        temperature < 5 ||
        temperature > 45
    ) {

        return "abnormal";
    }

    if (
        temperature < 10 ||
        temperature > 35
    ) {

        return "warning";
    }

    return "normal";
}


// =====================================
// ALERTS
// =====================================

function generateAlerts(data) {

    const alertList =
        document.getElementById(
            "alertList"
        );

    if (!alertList) {
        return;
    }

    alertList.innerHTML = "";

    const alerts = [];

    Object.keys(data).forEach(
        function (householdId) {

            const reading =
                data[householdId];

            const status =
                getReadingStatus(reading);

            if (
                status === "warning" ||
                status === "abnormal"
            ) {

                alerts.push({
                    household:
                        householdId,

                    status:
                        status,

                    reading:
                        reading
                });
            }
        }
    );

    if (alerts.length === 0) {

        alertList.innerHTML = `

            <div class="empty-alert">
                No water-quality alerts yet.
            </div>

        `;

        return;
    }

    alerts.forEach(function (alert) {

        const reading =
            alert.reading;

        const item =
            document.createElement("div");

        item.className =
            "quality-alert-item";

        let statusText =
            alert.status === "abnormal"
                ? "Abnormal"
                : "Warning";

        item.innerHTML = `

            <div>

                <strong>
                    ${alert.household}
                </strong>

                <p>
                    Water-quality ${statusText.toLowerCase()}
                    detected.
                </p>

            </div>

            <span class="
                status-badge
                ${alert.status}
            ">
                ${statusText}
            </span>

        `;

        alertList.appendChild(item);

    });
}


// =====================================
// VIEW HOUSEHOLD
// =====================================

function viewHousehold(householdId) {

    const reading =
        allQualityData[householdId];

    if (!reading) {
        return;
    }

    const status =
        getReadingStatus(reading);

    alert(
        "Household: " +
        householdId +
        "\n\n" +

        "pH: " +
        Number(reading.ph || 0).toFixed(1) +
        "\n" +

        "TDS: " +
        Math.round(
            Number(reading.tds || 0)
        ) +
        " ppm\n" +

        "Turbidity: " +
        Number(
            reading.turbidity || 0
        ).toFixed(1) +
        " NTU\n" +

        "Temperature: " +
        Number(
            reading.temperature || 0
        ).toFixed(1) +
        " °C\n\n" +

        "Status: " +
        status.toUpperCase()
    );
}


// =====================================
// ADMIN LOGOUT
// =====================================

function logoutAdmin() {

    localStorage.removeItem(
        "aquaGuardAdmin"
    );

    localStorage.removeItem(
        "adminEmail"
    );

    window.location.href =
        "index.html";
}