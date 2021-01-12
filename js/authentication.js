function login() {
    if (firebase.auth().currentUser) {
        logout();
    }

    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
        .then(function (result) {
            console.log("Logado com sucesso")
            window.location.replace("pagina_inicial.html");
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
        alert("Senha alterada com sucesso!!!");
    }).catch(function (error) {
        alert("Erro ao resetar a senha!!!")
    });;
}


function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    });
}
