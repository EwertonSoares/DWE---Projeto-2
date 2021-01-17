window.addEventListener("load", function () {
    var logado = false;

    if (localStorage.getItem("acesso") === "true") {
        logado = true;
    }

    if (logado === false) {
        window.location.href = "login.html";
    }
});
