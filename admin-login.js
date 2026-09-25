// =====================================
// AQUA GUARD
// ADMIN LOGIN
// Firebase Email/Password Authentication
// =====================================


function adminLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    const errorElement =
        document.getElementById("loginError");


    errorElement.textContent = "";


    if (typeof auth === "undefined") {

        errorElement.textContent =
            "Firebase Authentication is not available.";

        return;
    }


    auth.signInWithEmailAndPassword(
        email,
        password
    )

    .then(function (result) {

        const user = result.user;

        console.log(
            "Admin authentication successful:",
            user.email
        );


        // Check whether this Firebase account
        // is registered as an Aqua Guard admin.

        return database
            .ref("admins/" + user.uid)
            .once("value");

    })

    .then(function (snapshot) {

        if (!snapshot.exists()) {

            return auth.signOut()
                .then(function () {

                    throw new Error(
                        "This account is not authorized as an administrator."
                    );

                });

        }


        const adminData =
            snapshot.val();


        if (
            adminData &&
            adminData.authorized === true
        ) {

            localStorage.setItem(
                "adminEmail",
                auth.currentUser.email
            );

            localStorage.setItem(
                "adminUID",
                auth.currentUser.uid
            );


            window.location.href =
                "admin-dashboard.html";

        } else {

            return auth.signOut()
                .then(function () {

                    throw new Error(
                        "This account is not authorized as an administrator."
                    );

                });

        }

    })

    .catch(function (error) {

        console.error(
            "Admin login error:",
            error
        );


        if (
            error.code ===
            "auth/invalid-credential"
        ) {

            errorElement.textContent =
                "Invalid email or password.";

        } else if (
            error.code ===
            "auth/user-not-found"
        ) {

            errorElement.textContent =
                "Admin account not found.";

        } else if (
            error.code ===
            "auth/wrong-password"
        ) {

            errorElement.textContent =
                "Incorrect password.";

        } else {

            errorElement.textContent =
                error.message;
        }

    });
}


// =====================================
// BACK TO USER LOGIN
// =====================================

function goToUserLogin() {

    window.location.href =
        "index.html";

}