var sair = document.getElementById("logout");

sair.addEventListener("click", function logout() {
    firebase.auth().signOut()
        .then(function () {

            localStorage.setItem("acesso", false);
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userUid");

            window.location.href = "login.html";

        }).catch(function () {

        });
});