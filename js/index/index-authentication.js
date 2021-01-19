var sair = document.getElementById("logout");
var loader = document.getElementById("backgroud-loader");

sair.addEventListener("click", function logout() {
    loader.style.display = "block";

    firebase.auth().signOut()
        .then(function () {

            localStorage.setItem("acesso", false);
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userUid");
            
            loader.style.display = "none";

            window.location.href = "login.html";

        }).catch(function (error) {
            loader.style.display = "none";
            console.log(error.message);
        });
});