// =====================================
// AQUA GUARD - USER REPORTS
// =====================================

function goHome() {
    window.location.href = "index.html";
}


// =====================================
// REPORT PERIOD
// =====================================

function updateReport() {

    const period =
        document.getElementById("reportPeriod").value;

    const totalUsage =
        document.getElementById("totalUsage");

    const averageUsage =
        document.getElementById("averageUsage");

    const periodLabel =
        document.getElementById("periodLabel");

    const limitStatus =
        document.getElementById("limitStatus");

    const statusText =
        document.getElementById("statusText");


    if (period === "daily") {

        totalUsage.textContent = "184 L";
        averageUsage.textContent = "184 L";
        periodLabel.textContent = "Today";

        limitStatus.textContent = "Within Limit";
        statusText.textContent = "66 L remaining today";

    }

    else if (period === "weekly") {

        totalUsage.textContent = "1,286 L";
        averageUsage.textContent = "183.7 L";
        periodLabel.textContent = "This Week";

        limitStatus.textContent = "Within Limit";
        statusText.textContent = "Average usage is within limit";

    }

    else if (period === "monthly") {

        totalUsage.textContent = "5,472 L";
        averageUsage.textContent = "182.4 L";
        periodLabel.textContent = "This Month";

        limitStatus.textContent = "Within Limit";
        statusText.textContent = "Average usage is within limit";

    }

}


// =====================================
// GENERATE REPORT
// =====================================

function generateReport() {

    const period =
        document.getElementById("reportPeriod");

    const selectedPeriod =
        period.options[period.selectedIndex].text;


    const reportWindow =
        window.open("", "_blank");

    if (!reportWindow) {

        alert(
            "Please allow pop-ups in your browser " +
            "to generate the report."
        );

        return;
    }


    reportWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>Aqua Guard Water Report</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    background: #f4f8fb;
                    color: #183247;
                    padding: 40px;
                }

                .report {
                    max-width: 850px;
                    margin: auto;
                    background: white;
                    padding: 35px;
                    border-radius: 12px;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.08);
                }

                .header {
                    border-bottom: 2px solid #dce8ef;
                    padding-bottom: 20px;
                    margin-bottom: 25px;
                }

                .header h1 {
                    margin: 0;
                    color: #0878a8;
                }

                .header p {
                    color: #6b8294;
                }

                .stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin-bottom: 30px;
                }

                .card {
                    background: #eef7fb;
                    padding: 18px;
                    border-radius: 8px;
                }

                .card span {
                    display: block;
                    color: #718796;
                    font-size: 11px;
                    margin-bottom: 7px;
                }

                .card strong {
                    font-size: 21px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }

                th,
                td {
                    padding: 13px;
                    border-bottom: 1px solid #e1e9ee;
                    text-align: left;
                }

                th {
                    background: #edf6fa;
                }

                .status {
                    color: #16845e;
                    font-weight: bold;
                }

                .footer {
                    margin-top: 30px;
                    padding-top: 18px;
                    border-top: 1px solid #dce8ef;
                    color: #78909f;
                    font-size: 12px;
                }

                .print-btn {
                    margin-top: 25px;
                    padding: 11px 18px;
                    border: none;
                    background: #0878a8;
                    color: white;
                    border-radius: 7px;
                    cursor: pointer;
                }

                @media print {

                    .print-btn {
                        display: none;
                    }

                    body {
                        background: white;
                        padding: 0;
                    }

                    .report {
                        box-shadow: none;
                    }

                }

            </style>

        </head>


        <body>

            <div class="report">

                <div class="header">

                    <h1>AQUA GUARD</h1>

                    <h2>Household Water Consumption Report</h2>

                    <p>
                        Household ID: AG-001
                    </p>

                    <p>
                        Report Period: ${selectedPeriod}
                    </p>

                </div>


                <div class="stats">

                    <div class="card">
                        <span>TOTAL CONSUMPTION</span>
                        <strong>
                            ${document.getElementById("totalUsage").textContent}
                        </strong>
                    </div>

                    <div class="card">
                        <span>AVERAGE DAILY</span>
                        <strong>
                            ${document.getElementById("averageUsage").textContent}
                        </strong>
                    </div>

                    <div class="card">
                        <span>DAILY LIMIT</span>
                        <strong>250 L</strong>
                    </div>

                </div>


                <h3>Consumption Breakdown</h3>

                <table>

                    <thead>

                        <tr>
                            <th>Time Period</th>
                            <th>Water Used</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>Morning</td>
                            <td>52 L</td>
                            <td class="status">Within Limit</td>
                        </tr>

                        <tr>
                            <td>Afternoon</td>
                            <td>88 L</td>
                            <td class="status">Within Limit</td>
                        </tr>

                        <tr>
                            <td>Evening</td>
                            <td>44 L</td>
                            <td class="status">Within Limit</td>
                        </tr>

                        <tr>
                            <td>Total</td>
                            <td>184 L</td>
                            <td class="status">Within Limit</td>
                        </tr>

                    </tbody>

                </table>


                <div class="footer">

                    <strong>Aqua Guard</strong>

                    <br><br>

                    Smart Water Management System

                    <br>

                    This is a demonstration report generated
                    by the Aqua Guard prototype.

                </div>


                <button
                    class="print-btn"
                    onclick="window.print()">

                    Print / Save as PDF

                </button>

            </div>

        </body>

        </html>

    `);

    reportWindow.document.close();

}


// =====================================
// NOTIFICATIONS
// =====================================

function showNotifications() {

    alert(
        "Aqua Guard Notifications\n\n" +
        "⚠ Higher water usage detected\n" +
        "Your current usage is 184 L.\n\n" +
        "⚠ Daily limit approaching\n" +
        "66 L of your daily allowance remains."
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
        "• Contact the administrator for additional water requests"
    );

}


// =====================================
// LAST UPDATED
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

updateTime();

setInterval(updateTime, 60000);