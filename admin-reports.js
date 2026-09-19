// =====================================
// AQUA GUARD - REPORTS
// =====================================

function goBackToDashboard() {
    window.location.href = "admin-dashboard.html";
}


function searchReports() {

    const input =
        document.getElementById("searchInput").value.toLowerCase();

    const rows =
        document.querySelectorAll("#reportTable tbody tr");

    rows.forEach(function(row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });
}


function updateReport() {

    const period =
        document.getElementById("reportPeriod").value;

    const totalUsage =
        document.getElementById("totalUsage");

    const averageUsage =
        document.getElementById("averageUsage");

    const compliance =
        document.getElementById("compliance");


    if (period === "daily") {

        totalUsage.textContent = "4,286 L";
        averageUsage.textContent = "178.6 L";
        compliance.textContent = "87.5%";

    }

    else if (period === "weekly") {

        totalUsage.textContent = "29,842 L";
        averageUsage.textContent = "177.6 L";
        compliance.textContent = "89.2%";

    }

    else if (period === "monthly") {

        totalUsage.textContent = "124,680 L";
        averageUsage.textContent = "173.2 L";
        compliance.textContent = "91.4%";

    }
}


function generateReport() {

    const period =
        document.getElementById("reportPeriod");

    const selectedPeriod =
        period.options[period.selectedIndex].text;

    const totalUsage =
        document.getElementById("totalUsage").textContent;

    const averageUsage =
        document.getElementById("averageUsage").textContent;

    const compliance =
        document.getElementById("compliance").textContent;


    const reportWindow = window.open("", "_blank");

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>

            <title>Aqua Guard Water Report</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    background: #07111f;
                    color: #eaf6ff;
                    padding: 40px;
                }

                .report {
                    max-width: 900px;
                    margin: auto;
                    background: #0d1b2b;
                    padding: 35px;
                    border-radius: 15px;
                    border: 1px solid #1d354b;
                }

                h1 {
                    color: #55dfff;
                }

                .subtitle {
                    color: #91a5b8;
                }

                .stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin: 30px 0;
                }

                .stat {
                    background: #081523;
                    padding: 20px;
                    border-radius: 10px;
                }

                .stat span {
                    display: block;
                    color: #8da4b8;
                    font-size: 12px;
                }

                .stat strong {
                    display: block;
                    margin-top: 10px;
                    font-size: 25px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 25px;
                }

                th, td {
                    padding: 14px;
                    border-bottom: 1px solid #263c50;
                    text-align: left;
                }

                th {
                    color: #55dfff;
                }

                .footer {
                    margin-top: 30px;
                    color: #71899f;
                    font-size: 12px;
                }

                .print-btn {
                    margin-top: 25px;
                    padding: 12px 20px;
                    border: none;
                    border-radius: 8px;
                    background: #55dfff;
                    cursor: pointer;
                    font-weight: bold;
                }

                @media print {
                    .print-btn {
                        display: none;
                    }
                }

            </style>

        </head>

        <body>

            <div class="report">

                <h1>AQUA GUARD</h1>

                <p class="subtitle">
                    Community Water Consumption Report
                </p>

                <p>
                    <strong>Report Period:</strong>
                    ${selectedPeriod}
                </p>


                <div class="stats">

                    <div class="stat">
                        <span>TOTAL CONSUMPTION</span>
                        <strong>${totalUsage}</strong>
                    </div>

                    <div class="stat">
                        <span>AVERAGE DAILY USAGE</span>
                        <strong>${averageUsage}</strong>
                    </div>

                    <div class="stat">
                        <span>LIMIT COMPLIANCE</span>
                        <strong>${compliance}</strong>
                    </div>

                </div>


                <h2>Household Consumption</h2>

                <table>

                    <tr>
                        <th>Household</th>
                        <th>Name</th>
                        <th>Daily Limit</th>
                        <th>Usage</th>
                        <th>Status</th>
                    </tr>

                    <tr>
                        <td>AG-001</td>
                        <td>Demo Residence</td>
                        <td>250 L</td>
                        <td>184 L</td>
                        <td>Within Limit</td>
                    </tr>

                    <tr>
                        <td>AG-002</td>
                        <td>Green Residency</td>
                        <td>250 L</td>
                        <td>267 L</td>
                        <td>Over Limit</td>
                    </tr>

                    <tr>
                        <td>AG-003</td>
                        <td>Lake View Homes</td>
                        <td>200 L</td>
                        <td>143 L</td>
                        <td>Within Limit</td>
                    </tr>

                    <tr>
                        <td>AG-004</td>
                        <td>Sunrise Apartments</td>
                        <td>300 L</td>
                        <td>312 L</td>
                        <td>Over Limit</td>
                    </tr>

                    <tr>
                        <td>AG-005</td>
                        <td>Green Valley Home</td>
                        <td>250 L</td>
                        <td>198 L</td>
                        <td>Within Limit</td>
                    </tr>

                    <tr>
                        <td>AG-006</td>
                        <td>River View Residency</td>
                        <td>250 L</td>
                        <td>221 L</td>
                        <td>Within Limit</td>
                    </tr>

                </table>


                <button class="print-btn" onclick="window.print()">
                    Print / Save as PDF
                </button>


                <div class="footer">
                    Aqua Guard Admin Portal • Demo Prototype
                </div>

            </div>

        </body>
        </html>
    `);

    reportWindow.document.close();
}