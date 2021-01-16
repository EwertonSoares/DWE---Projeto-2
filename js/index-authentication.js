const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const btnEnviar = document.getElementById("btnEnviar");
const btnEsqueceuAsenha = document.getElementById("esqueceu-a-senha");
const loader = document.getElementById("backgroud-loader");

btnEnviar.addEventListener("click", function () {
    loader.style.display = "block";

    let resultado = validaEmailESenha(inputEmail, inputSenha);

    if (!resultado) {
        return;
    }

    firebase.auth().signInWithEmailAndPassword(inputEmail.value, inputSenha.value)
        .then(function (result) {

            localStorage.setItem("useremail", result.user.email);
            localStorage.setItem("userUid", result.user.uid);
            
            window.location.replace("pagina-inicial.html");

        })
        .catch(function (error) {
            tratarErroLogin(error.message);
        });
});

btnEsqueceuAsenha.addEventListener("click", function () {
    var email = document.getElementById("email");

    firebase.auth().sendPasswordResetEmail(email.value)
        .then(function () {
            alert("Enviamos um email para alteração de senha!!!");
        }).catch(function (error) {
            alert("Erro ao resetar a senha!!!")
        });;
});