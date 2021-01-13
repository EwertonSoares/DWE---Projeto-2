
function login() {
    var loader = document.getElementById("backgroud-loader");
    loader.style.display = "block";

    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    validaEmailESenha(email, senha, loader);

    firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
        .then(function () {
            window.location.replace("pagina-inicial.html");
        })
        .catch(function (error) {
            var errorMessage = error.message;
            console.log("Erro ao logar: " + errorMessage);
        });
}

function cadastrar() {
    var auth = null;

    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    firebase.auth().createUserWithEmailAndPassword(email.value, senha.value)
        .then(function (user) {
            alert("Cadastrado com sucesso!!!")
            auth = user;
        }).catch(function (error) {
            alert("Erro ao tentar cadastrar!!!")
        });
}

function forgotPassWord() {
    var email = document.getElementById("email");

    firebase.auth().sendPasswordResetEmail(email.value)
        .then(function () {
            alert("Enviamos um email para alteração de senha!!!");
        }).catch(function (error) {
            alert("Erro ao resetar a senha!!!")
        });;
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    });
}

function validaEmailESenha(email, senha, loader) {
    if (email.value === "" && senha.value === "") {
        loader.style.display = "none"

        document.getElementById("email").style.borderColor = "red";
        document.getElementById("senha").style.borderColor = "red";

        document.getElementById("emailRequired").style.display = "flex";
        document.getElementById("senhaRequired").style.display = "flex";

        return;

    } else if (email.value === "") {
        loader.style.display = "none"

        document.getElementById("email").style.borderColor = "red";
        document.getElementById("emailRequired").style.display = "flex";

        return;

    } else if (senha.value === "") {
        loader.style.display = "none"

        document.getElementById("senha").style.borderColor = "red";
        document.getElementById("senhaRequired").style.display = "flex";

        return;
    }
}