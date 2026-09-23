// =====================================
// AQUA GUARD
// USER WATER QUALITY DASHBOARD
// =====================================

// Get household ID
const householdId =
    localStorage.getItem("aquaGuardHouseholdId") || "AG-001";


// =====================================
// DEMO DATA
// =====================================

const demoQualityData = {
    ph: 7.2,
    tds: 420,
    turbidity: 1.8,
    temperature: 27,
    timestamp: Date.now()
};


// =====================================
// START
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    loadHousehold();

    loadFirebaseReading();

});


// =====================================
// LOAD HOUSEHOLD
// =====================================

function loadHousehold() {

    const element =
        document.getElementById("householdDisplay");

    if (element) {
        element.textContent = householdId;
    }

}


// =====================================
// LOAD FIREBASE DATA
// =====================================

function loadFirebaseReading() {

    // Firebase not available
    if (typeof database === "undefined") {

        console.log(
            "Firebase not available. Using demo data."
        );

        updateDashboard(demoQualityData);

        return;
    }


    // ---------------------------------
    // LATEST READING
    // ---------------------------------

    const latestRef = database.ref(
        "waterQuality/" +
        householdId +
        "/latest"
    );


    latestRef.on("value", function (snapshot) {

        const data = snapshot.val();


        if (data) {

            updateDashboard(data);

        } else {

            updateDashboard(
                demoQualityData
            );

        }

    }, function (error) {

        console.error(
            "Firebase latest reading error:",
            error
        );

        updateDashboard(
            demoQualityData
        );

    });


    // ---------------------------------
    // HISTORY
    // ---------------------------------

    const historyRef = database.ref(
        "waterQualityHistory/" +
        householdId
    );


    historyRef.limitToLast(10).on(
        "value",
        function (snapshot) {

            const history = [];


            snapshot.forEach(function (child) {

                const reading =
                    child.val();

                if (reading) {

                    history.push(reading);

                }

            });


            // Newest first
            history.reverse();


            if (history.length > 0) {

                displayQualityHistory(
                    history
                );

            }

        },
        function (error) {

            console.error(
                "Firebase history error:",
                error
            );

        }
    );

}


// =====================================
// DISPLAY HISTORY
// =====================================

function displayQualityHistory(history) {

    const table =
        document.getElementById(
            "qualityHistory"
        );


    if (!table) {
        return;
    }


    table.innerHTML = "";


    history.forEach(function (reading) {

        const row =
            document.createElement("tr");


        const timestamp =
            Number(reading.timestamp);


        const date =
            timestamp
                ? new Date(timestamp)
                : new Date();


        const time =
            date.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        const status =
            getReadingStatus(reading);


        let statusText = "Normal";


        if (status === "warning") {

            statusText = "Warning";

        }


        if (status === "abnormal") {

            statusText = "Abnormal";

        }


        row.innerHTML = `

            <td>${time}</td>

            <td>
                ${Number(reading.ph || 0).toFixed(1)}
            </td>

            <td>
                ${Math.round(
                    Number(reading.tds || 0)
                )} ppm
            </td>

            <td>
                ${Number(
                    reading.turbidity || 0
                ).toFixed(1)} NTU
            </td>

            <td>
                ${Number(
                    reading.temperature || 0
                ).toFixed(1)}°C
            </td>

            <td>
                <span class="table-status ${status}">
                    ${statusText}
                </span>
            </td>

        `;


        table.appendChild(row);

    });

}


// =====================================
// READING STATUS
// =====================================

function getReadingStatus(reading) {

    const phStatus =
        getPHStatus(
            Number(reading.ph || 0)
        );


    const tdsStatus =
        getTDSStatus(
            Number(reading.tds || 0)
        );


    const turbidityStatus =
        getTurbidityStatus(
            Number(reading.turbidity || 0)
        );


    const temperatureStatus =
        getTemperatureStatus(
            Number(reading.temperature || 0)
        );


    const statuses = [

        phStatus,
        tdsStatus,
        turbidityStatus,
        temperatureStatus

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
// UPDATE DASHBOARD
// =====================================

function updateDashboard(data) {

    const ph =
        Number(data.ph || 0);

    const tds =
        Number(data.tds || 0);

    const turbidity =
        Number(data.turbidity || 0);

    const temperature =
        Number(data.temperature || 0);


    // ---------------------------------
    // DISPLAY VALUES
    // ---------------------------------

    const phElement =
        document.getElementById("phValue");

    const tdsElement =
        document.getElementById("tdsValue");

    const turbidityElement =
        document.getElementById(
            "turbidityValue"
        );

    const temperatureElement =
        document.getElementById(
            "temperatureValue"
        );


    if (phElement) {

        phElement.textContent =
            ph.toFixed(1);

    }


    if (tdsElement) {

        tdsElement.textContent =
            Math.round(tds);

    }


    if (turbidityElement) {

        turbidityElement.textContent =
            turbidity.toFixed(1);

    }


    if (temperatureElement) {

        temperatureElement.textContent =
            temperature.toFixed(1);

    }


    // ---------------------------------
    // STATUS
    // ---------------------------------

    const phStatus =
        getPHStatus(ph);

    const tdsStatus =
        getTDSStatus(tds);

    const turbidityStatus =
        getTurbidityStatus(turbidity);

    const temperatureStatus =
        getTemperatureStatus(
            temperature
        );


    setParameterStatus(
        "phStatus",
        phStatus
    );


    setParameterStatus(
        "tdsStatus",
        tdsStatus
    );


    setParameterStatus(
        "turbidityStatus",
        turbidityStatus
    );


    setParameterStatus(
        "temperatureStatus",
        temperatureStatus
    );


    // ---------------------------------
    // PROGRESS BARS
    // ---------------------------------

    const phBar =
        document.getElementById("phBar");

    const tdsBar =
        document.getElementById("tdsBar");

    const turbidityBar =
        document.getElementById(
            "turbidityBar"
        );

    const temperatureBar =
        document.getElementById(
            "temperatureBar"
        );


    if (phBar) {

        phBar.style.width =
            Math.min(
                (ph / 10) * 100,
                100
            ) + "%";

    }


    if (tdsBar) {

        tdsBar.style.width =
            Math.min(
                (tds / 1000) * 100,
                100
            ) + "%";

    }


    if (turbidityBar) {

        turbidityBar.style.width =
            Math.min(
                (turbidity / 10) * 100,
                100
            ) + "%";

    }


    if (temperatureBar) {

        temperatureBar.style.width =
            Math.min(
                (temperature / 50) * 100,
                100
            ) + "%";

    }


    // ---------------------------------
    // OVERALL STATUS
    // ---------------------------------

    const statuses = [

        phStatus,
        tdsStatus,
        turbidityStatus,
        temperatureStatus

    ];


    if (
        statuses.includes("abnormal")
    ) {

        setOverallStatus(
            "Possible Water Quality Issue",
            "abnormal"
        );

    }

    else if (
        statuses.includes("warning")
    ) {

        setOverallStatus(
            "Water Quality Warning",
            "warning"
        );

    }

    else {

        setOverallStatus(
            "Normal",
            "normal"
        );

    }


    // ---------------------------------
    // LAST UPDATED
    // ---------------------------------

    const timestamp =
        Number(data.timestamp) || Date.now();


    const lastUpdated =
        document.getElementById(
            "lastUpdated"
        );


    if (lastUpdated) {

        lastUpdated.textContent =
            "Last checked: " +
            new Date(
                timestamp
            ).toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }

}


// =====================================
// pH STATUS
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
// TDS STATUS
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
// TURBIDITY STATUS
// =====================================

function getTurbidityStatus(
    turbidity
) {

    if (turbidity > 5) {

        return "abnormal";

    }


    if (turbidity > 2) {

        return "warning";

    }


    return "normal";

}


// =====================================
// TEMPERATURE STATUS
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
// PARAMETER STATUS UI
// =====================================

function setParameterStatus(
    elementId,
    status
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.className =
        "parameter-status " +
        status;


    if (status === "normal") {

        element.textContent =
            "Normal";

    }

    else if (status === "warning") {

        element.textContent =
            "Warning";

    }

    else {

        element.textContent =
            "Abnormal";

    }

}


// =====================================
// OVERALL STATUS UI
// =====================================

function setOverallStatus(
    status,
    type
) {

    const statusText =
        document.getElementById(
            "overallStatus"
        );


    const statusPill =
        document.getElementById(
            "overallPill"
        );


    const alertBox =
        document.getElementById(
            "qualityAlert"
        );


    if (!statusText ||
        !statusPill ||
        !alertBox) {

        return;
    }


    statusText.textContent =
        status;


    statusPill.className =
        "status-pill " + type;


    if (type === "normal") {

        statusPill.textContent =
            "● Normal";


        alertBox.className =
            "quality-alert";


        alertBox.innerHTML = `

            <div class="alert-icon">
                ✓
            </div>

            <div>

                <h3>
                    No abnormal water-quality reading detected
                </h3>

                <p>
                    Current sensor readings are within the
                    configured monitoring ranges.
                </p>

            </div>

        `;

    }

    else if (type === "warning") {

        statusPill.textContent =
            "● Warning";


        alertBox.className =
            "quality-alert abnormal";


        alertBox.innerHTML = `

            <div class="alert-icon">
                !
            </div>

            <div>

                <h3>
                    Water-quality reading requires attention
                </h3>

                <p>
                    An unusual reading has been detected.
                    Please continue monitoring and contact
                    the administrator if it persists.
                </p>

            </div>

        `;

    }

    else {

        statusPill.textContent =
            "● Abnormal";


        alertBox.className =
            "quality-alert abnormal";


        alertBox.innerHTML = `

            <div class="alert-icon">
                !
            </div>

            <div>

                <h3>
                    Possible water-quality issue detected
                </h3>

                <p>
                    An abnormal sensor reading has been detected.
                    This does not by itself confirm contamination.
                    Further verification may be required.
                </p>

            </div>

        `;

    }

}


// =====================================
// TEST FIREBASE SAVE
// =====================================

function saveTestReading() {

    if (typeof database === "undefined") {

        alert(
            "Firebase database is not available."
        );

        return;

    }


    const reading = {

        household: householdId,

        ph: 7.2,

        tds: 420,

        turbidity: 1.8,

        temperature: 27,

        timestamp: Date.now(),

        date: new Date().toLocaleString()

    };


    // Save latest
    database
        .ref(
            "waterQuality/" +
            householdId +
            "/latest"
        )
        .set(reading)

        .then(function () {

            console.log(
                "Latest water-quality reading saved."
            );

        })
        .catch(function (error) {

            console.error(
                "Latest Firebase error:",
                error
            );

        });


    // Save history
    database
        .ref(
            "waterQualityHistory/" +
            householdId
        )
        .push(reading)

        .then(function () {

            console.log(
                "History reading saved."
            );


            alert(
                "Water-quality reading logged to Firebase."
            );

        })
        .catch(function (error) {

            console.error(
                "History Firebase error:",
                error
            );


            alert(
                "Firebase error: " +
                error.message
            );

        });

}


// =====================================
// ALERTS
// =====================================

function openAlerts() {

    window.location.href =
        "user-alerts.html";

}


// =====================================
// LOGOUT
// =====================================

function logoutUser() {

    localStorage.removeItem(
        "userEmail"
    );

    localStorage.removeItem(
        "aquaGuardUserEmail"
    );

    localStorage.removeItem(
        "aquaGuardHouseholdId"
    );


    window.location.href =
        "index.html";

}