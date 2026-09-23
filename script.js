// =====================================
// AQUA GUARD
// MAIN LOGIN SCRIPT
// Firebase Google Authentication
// =====================================


// =====================================
// GOOGLE LOGIN
// =====================================

function loginUser(event) {
    event.preventDefault();

    if (typeof firebase === "undefined") {
        alert("Firebase has not loaded.");
        return;
    }

    if (typeof auth === "undefined") {
        alert("Firebase Authentication is not available.");
        return;
    }

    const provider =
        new firebase.auth.GoogleAuthProvider();

    provider.setCustomParameters({
        prompt: "select_account"
    });

    auth.signInWithPopup(provider)

        .then(function (result) {

            const user = result.user;

            console.log(
                "Google login successful:",
                user.email
            );

            // Save basic session information locally
            localStorage.setItem(
                "userEmail",
                user.email
            );

            localStorage.setItem(
                "firebaseUID",
                user.uid
            );

            return createOrLoadHousehold(user);
        })

        .then(function (householdId) {

            console.log(
                "Household ID:",
                householdId
            );

            // This is only a local session copy.
            // The real account → household relationship
            // is stored in Firebase.
            localStorage.setItem(
                "aquaGuardHouseholdId",
                householdId
            );

            window.location.href =
                "household-confirm.html";
        })

        .catch(function (error) {

            console.error(
                "Google Sign-In error:",
                error
            );

            alert(
                "Google Sign-In failed.\n\n" +
                error.message
            );
        });
}


// =====================================
// CREATE OR LOAD HOUSEHOLD
// =====================================

function createOrLoadHousehold(user) {

    const userRef =
        database.ref(
            "users/" + user.uid
        );

    return userRef.once("value")
        .then(function (snapshot) {

            const existingUser =
                snapshot.val();

            // Existing Google account
            if (
                existingUser &&
                existingUser.householdId
            ) {

                return existingUser.householdId;
            }

            // New Google account
            return createNewHousehold(user);
        });
}


// =====================================
// CREATE NEW HOUSEHOLD
// =====================================

function createNewHousehold(user) {

    const counterRef =
        database.ref(
            "counters/householdNumber"
        );

    return counterRef.transaction(
        function (currentValue) {

            if (currentValue === null) {
                return 1;
            }

            return Number(currentValue) + 1;
        }
    )
    .then(function (result) {

        if (!result.committed) {
            throw new Error(
                "Could not create household ID."
            );
        }

        const householdNumber =
            result.snapshot.val();

        const householdId =
            "AG-" +
            String(householdNumber)
                .padStart(3, "0");

        const userData = {

            email: user.email,

            name:
                user.displayName || "",

            photoURL:
                user.photoURL || "",

            householdId:
                householdId,

            createdAt:
                Date.now()

        };

        return database
            .ref("users/" + user.uid)
            .set(userData)
            .then(function () {

                return householdId;
            });
    });
}


// =====================================
// AUTH STATE
// =====================================

function checkUserLogin() {

    if (
        typeof auth === "undefined"
    ) {
        return;
    }

    auth.onAuthStateChanged(
        function (user) {

            if (user) {

                console.log(
                    "Authenticated user:",
                    user.email
                );

            } else {

                console.log(
                    "No authenticated user."
                );
            }
        }
    );
}


// =====================================
// FORGOT PASSWORD
// =====================================

function forgotPassword(event) {

    if (event) {
        event.preventDefault();
    }

    alert(
        "Aqua Guard now uses Google Sign-In.\n\n" +
        "Please select 'Continue with Google' " +
        "and sign in with your Google account."
    );
}


// =====================================
// LOGOUT
// =====================================

function logoutUser() {

    if (
        typeof auth !== "undefined"
    ) {

        auth.signOut()
            .then(function () {

                localStorage.removeItem(
                    "userEmail"
                );

                localStorage.removeItem(
                    "firebaseUID"
                );

                localStorage.removeItem(
                    "aquaGuardHouseholdId"
                );

                window.location.href =
                    "index.html";
            })
            .catch(function (error) {

                console.error(
                    "Logout error:",
                    error
                );

            });

    } else {

        localStorage.clear();

        window.location.href =
            "index.html";
    }
}


// =====================================
// START AUTH LISTENER
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkUserLogin();

    }
);