// =====================================
// AQUA GUARD - ADMIN WATER REQUESTS
// =====================================

function loadRequests() {

    const container =
        document.getElementById("requestContainer");

    const count =
        document.getElementById("requestCount");

    database
        .ref("waterLimitRequests")
        .on("value", function(snapshot) {

            const data = snapshot.val();

            if (!data) {

                count.textContent = "0";

                container.innerHTML = `
                    <div class="no-request">
                        <h3>No pending applications</h3>
                        <p>
                            Water limit extension requests from
                            households will appear here.
                        </p>
                    </div>
                `;

                return;
            }

            const requests =
                Object.entries(data).map(function(entry) {

                    return {
                        id: entry[0],
                        ...entry[1]
                    };

                });

            const pendingRequests =
                requests.filter(function(request) {

                    return request.status === "Pending";

                });

            count.textContent =
                pendingRequests.length;

            if (pendingRequests.length === 0) {

                container.innerHTML = `
                    <div class="no-request">
                        <h3>No pending applications</h3>
                        <p>
                            There are no requests waiting for approval.
                        </p>
                    </div>
                `;

                return;
            }

            container.innerHTML =
                pendingRequests.map(function(request) {

                    return `
                        <div class="request">

                            <div class="request-top">

                                <div>
                                    <h3>${request.household}</h3>
                                    <p>${request.email}</p>
                                </div>

                                <span class="pending">
                                    ${request.status}
                                </span>

                            </div>

                            <div class="details">

                                <div class="detail">
                                    <span>Current Limit</span>
                                    <strong>
                                        ${request.currentLimit} L
                                    </strong>
                                </div>

                                <div class="detail">
                                    <span>Requested Limit</span>
                                    <strong>
                                        ${request.requestedLimit} L
                                    </strong>
                                </div>

                                <div class="detail">
                                    <span>Application Date</span>
                                    <strong>
                                        ${request.date}
                                    </strong>
                                </div>

                                <div class="detail">
                                    <span>Household</span>
                                    <strong>
                                        ${request.household}
                                    </strong>
                                </div>

                            </div>

                            <div class="reason">
                                <span>REASON</span>
                                <p>${request.reason}</p>
                            </div>

                            <div class="actions">

                                <button
                                    class="approve"
                                    onclick="approveRequest('${request.id}')">
                                    ✓ Approve Request
                                </button>

                                <button
                                    class="reject"
                                    onclick="rejectRequest('${request.id}')">
                                    ✕ Reject Request
                                </button>

                            </div>

                        </div>
                    `;

                }).join("");

        })
        .catch(function(error) {

            console.error(
                "Firebase request loading error:",
                error
            );

        });
}


// =====================================
// APPROVE REQUEST
// =====================================

function approveRequest(requestId) {

    const requestRef =
        database
            .ref("waterLimitRequests")
            .child(requestId);

    requestRef.once("value")
        .then(function(snapshot) {

            const request = snapshot.val();

            if (!request) {

                alert("Request not found.");
                return;

            }

            return database
                .ref("households")
                .child(request.household)
                .update({
                    waterLimit:
                        Number(request.requestedLimit)
                })
                .then(function() {

                    return requestRef.update({

                        status: "Approved",

                        approvedDate:
                            new Date().toLocaleString()

                    });

                });

        })
        .then(function() {

            alert(
                "Request Approved ✓\n\n" +
                "The requested water limit has been applied."
            );

        })
        .catch(function(error) {

            console.error(
                "Approval error:",
                error
            );

            alert(
                "Unable to approve the request."
            );

        });
}


// =====================================
// REJECT REQUEST
// =====================================

function rejectRequest(requestId) {

    const requestRef =
        database
            .ref("waterLimitRequests")
            .child(requestId);

    requestRef.update({

        status: "Rejected",

        rejectedDate:
            new Date().toLocaleString()

    })
    .then(function() {

        alert(
            "Request Rejected\n\n" +
            "The household water limit remains unchanged."
        );

    })
    .catch(function(error) {

        console.error(
            "Rejection error:",
            error
        );

        alert(
            "Unable to reject the request."
        );

    });
}


// =====================================
// LOGOUT
// =====================================

function logoutAdmin() {

    window.location.href = "index.html";

}


// =====================================
// START
// =====================================

loadRequests();