function salvarproblemas(id, problema) {
    var nomeImg = `${id}-image`;

    var upload = salvaImagemNoStorage(nomeImg);

    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            problema.nomeImagem = nomeImg;
            problema.imgUrl = url;

            db.ref('problemas/' + id).set(problema);

            abrirModal();
        })

    }, function (erro) {
        console.log("Não foi possivel fazer o cadastro desse problema! " + erro.message);
        alert("Não foi possivel fazer o cadastro desse problema, por favor tente novamente!");
        window.location.href = "https://registro-de-problemas-d501d.web.app/cadastra-usuario.html";
    })
}

function atualizaProblema(id, problema) {
    var img = `${id}-image`;

    var upload = salvaImagemNoStorage(img);

    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            db.ref("problemas/" + id).update({
                userUid: problema.userUid,
                userEmail: problema.userEmail,
                local: problema.local,
                image: img,
                imgUrl: url,
                descricao: problema.descricao,
                status: "Cadastrado"
            });

            limparSessilStorage();
            window.location.href = "https://registro-de-problemas-d501d.web.app/index.html";

        })
    });
}

function deletarImagem(nomeImagem) {
    let str = firebase.storage();

    if (nomeImagem === undefined) { return; }

    str.ref().child("imagens").child(nomeImagem).delete().then(function () {
        console.log("Arquivo deletado com sucesso!!!");
    }).catch(function (error) {
        console.log("Erro ao deletar arquivo: " + error.message);
    });
}

function salvaImagemNoStorage(image) {
    var storage = firebase.storage();
    var file = document.querySelector("#inputImage").files[0];
    var metadata = {
        content: file.type
    }

    try {
        var upload = storage.ref().child("imagens").child(image).put(file, metadata);
        return upload;

    } catch (e) {
        console.log("Algo deu errado, a imagem não foi recuperada do firebase storage: " + e);
    }
}

function abrirModal() {
    bgLoader.style.display = "none";
    bgModal.style.display = "block";
}