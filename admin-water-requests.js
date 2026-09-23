// =====================================
// AQUA GUARD - ADMIN WATER REQUESTS
// =====================================


// =====================================
// LOAD REQUESTS
// =====================================

function loadRequests() {

    const container =
        document.getElementById("requestContainer");

    const count =
        document.getElementById("requestCount");


    if (!container || !count) {

        console.error(
            "Request container or request count element not found."
        );

        return;
    }


    database
        .ref("waterLimitRequests")
        .on("value", function(snapshot) {

            const data = snapshot.val();


            // ---------------------------------
            // NO REQUESTS
            // ---------------------------------

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


            // ---------------------------------
            // CONVERT FIREBASE DATA TO ARRAY
            // ---------------------------------

            const requests =
                Object.entries(data).map(function(entry) {

                    return {

                        id: entry[0],

                        ...entry[1]

                    };

                });


            // ---------------------------------
            // ONLY PENDING REQUESTS
            // ---------------------------------

            const pendingRequests =
                requests.filter(function(request) {

                    return request.status === "Pending";

                });


            count.textContent =
                pendingRequests.length;


            // ---------------------------------
            // NO PENDING REQUESTS
            // ---------------------------------

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


            // ---------------------------------
            // DISPLAY REQUESTS
            // ---------------------------------

            container.innerHTML =
                pendingRequests.map(function(request) {

                    return `

                        <div class="request">

                            <div class="request-top">

                                <div>

                                    <h3>
                                        ${request.household || "Unknown Household"}
                                    </h3>

                                    <p>
                                        ${request.email || "No email provided"}
                                    </p>

                                </div>


                                <span class="pending">
                                    ${request.status || "Pending"}
                                </span>

                            </div>


                            <div class="details">


                                <div class="detail">

                                    <span>
                                        Current Limit
                                    </span>

                                    <strong>
                                        ${request.currentLimit || 0} L
                                    </strong>

                                </div>


                                <div class="detail">

                                    <span>
                                        Requested Limit
                                    </span>

                                    <strong>
                                        ${request.requestedLimit || 0} L
                                    </strong>

                                </div>


                                <div class="detail">

                                    <span>
                                        Application Date
                                    </span>

                                    <strong>
                                        ${request.date || "Not available"}
                                    </strong>

                                </div>


                                <div class="detail">

                                    <span>
                                        Household
                                    </span>

                                    <strong>
                                        ${request.household || "Unknown"}
                                    </strong>

                                </div>


                            </div>


                            <div class="reason">

                                <span>
                                    REASON
                                </span>

                                <p>
                                    ${request.reason || "No reason provided"}
                                </p>

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


            container.innerHTML = `
                <div class="no-request">

                    <h3>Unable to load requests</h3>

                    <p>
                        Please check the Firebase connection.
                    </p>

                </div>
            `;

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

            const request =
                snapshot.val();


            if (!request) {

                alert(
                    "Request not found."
                );

                return Promise.reject(
                    new Error("Request not found")
                );

            }


            // ---------------------------------
            // UPDATE HOUSEHOLD WATER LIMIT
            // ---------------------------------

            return database

                .ref("households")

                .child(request.household)

                .update({

                    waterLimit:
                        Number(request.requestedLimit)

                })

                .then(function() {


                    // ---------------------------------
                    // MARK REQUEST AS APPROVED
                    // ---------------------------------

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


            if (
                error.message !==
                "Request not found"
            ) {

                alert(
                    "Unable to approve the request.\n\n" +
                    error.message
                );

            }

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
            "Unable to reject the request.\n\n" +
            error.message
        );

    });

}



// =====================================
// LOGOUT
// =====================================

function logoutAdmin() {

    window.location.href =
        "index.html";

}



// =====================================
// START
// =====================================

loadRequests();