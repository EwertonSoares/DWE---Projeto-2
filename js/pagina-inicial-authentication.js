const sair = document.getElementById("logout");

sair.addEventListener("click", function logout() {
    firebase.auth().signOut()
        .then(function () {
            window.location.replace("index.html");
        }).catch(function () {

        });
});