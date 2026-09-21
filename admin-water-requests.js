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


    // Get all requests
    const savedRequests =
        localStorage.getItem("waterLimitRequests");


    if (!savedRequests) {

        count.textContent = "0";

        container.innerHTML = `
            <div class="no-request">
                <h3>No pending applications</h3>
                <p>
                    Water limit extension requests from households
                    will appear here.
                </p>
            </div>
        `;

        return;
    }


    let requests;

    try {

        requests = JSON.parse(savedRequests);

    } catch (error) {

        console.error("Error reading requests:", error);

        count.textContent = "0";

        container.innerHTML = `
            <div class="no-request">
                <h3>No pending applications</h3>
                <p>Unable to load water requests.</p>
            </div>
        `;

        return;
    }


    // Only show pending requests
    const pendingRequests =
        requests.filter(request =>
            request.status === "Pending"
        );


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


    // Display all pending requests
    container.innerHTML =
        pendingRequests.map(request => `

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

                    <p>
                        ${request.reason}
                    </p>

                </div>


                <div class="actions">

                    <button
                        class="approve"
                        onclick="approveRequest(${request.id})">
                        ✓ Approve Request
                    </button>


                    <button
                        class="reject"
                        onclick="rejectRequest(${request.id})">
                        ✕ Reject Request
                    </button>

                </div>

            </div>

        `).join("");
}


// =====================================
// APPROVE REQUEST
// =====================================

function approveRequest(requestId) {

    const savedRequests =
        localStorage.getItem("waterLimitRequests");

    if (!savedRequests) return;


    let requests =
        JSON.parse(savedRequests);


    const requestIndex =
        requests.findIndex(
            request => request.id === requestId
        );


    if (requestIndex === -1) {

        alert("Request not found.");

        return;
    }


    const request =
        requests[requestIndex];


    // Apply new water limit
   const currentLimit =
    Number(localStorage.getItem("userWaterLimit")) || 250;

const approvedLimit =
    Math.max(currentLimit, Number(request.requestedLimit));

localStorage.setItem(
    "userWaterLimit",
    approvedLimit
);


    // Update request status
    request.status = "Approved";


    request.approvedDate =
        new Date().toLocaleString();


    // Save updated requests
    localStorage.setItem(
        "waterLimitRequests",
        JSON.stringify(requests)
    );


    alert(
        "Request Approved ✓\n\n" +
        request.household +
        " water limit is now " +
        request.requestedLimit +
        " L."
    );


    loadRequests();
}


// =====================================
// REJECT REQUEST
// =====================================

function rejectRequest(requestId) {

    const savedRequests =
        localStorage.getItem("waterLimitRequests");

    if (!savedRequests) return;


    let requests =
        JSON.parse(savedRequests);


    const requestIndex =
        requests.findIndex(
            request => request.id === requestId
        );


    if (requestIndex === -1) {

        alert("Request not found.");

        return;
    }


    const request =
        requests[requestIndex];


    // Update status
    request.status = "Rejected";


    request.rejectedDate =
        new Date().toLocaleString();


    // Save updated requests
    localStorage.setItem(
        "waterLimitRequests",
        JSON.stringify(requests)
    );


    alert(
        "Request Rejected\n\n" +
        "The household water limit remains " +
        request.currentLimit +
        " L."
    );


    loadRequests();
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