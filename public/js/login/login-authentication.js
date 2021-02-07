const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const btnEnviar = document.getElementById("btnEnviar");
const loader = document.getElementById("backgroud-loader");

btnEnviar.addEventListener("click", function () {
    loader.style.display = "block";

    let resultado = validaEmailESenha(inputEmail, inputSenha);

    if (!resultado) {
        return;
    }

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function (result) {

            localStorage.setItem("acesso", true);
            localStorage.setItem("userUid", result.user.uid);
            localStorage.setItem("userEmail", result.user.email);

            if (result.user.email === "servidor@admin.com") {
                window.location.href = "/administrador.html";

                return;
            }

            window.location.href = "/index.html";

        })
        .catch(function (error) {
            tratarErroLogin(error.message);
        });
});