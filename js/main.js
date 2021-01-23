function salvarproblemas(id, problema) {
    let nomeImg = `${id}-image`;

    let upload = salvaImagemNoStorage(nomeImg);

    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            problema.nomeImagem = nomeImg;
            problema.imgUrl = url;
            db.ref('problemas/' + id).set(problema);

            limparSessilStorage();
            abrirModal();
        })

    }, function (erro) {
        console.log("Não foi possivel fazer o resgistro desse problema! " + erro.message);
        abrirModal();
    })
}

function atualizaProblema(id, problema) {
    let nomeImg = `${id}-image`;

    let upload = salvaImagemNoStorage(nomeImg);

    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            db.ref("problemas/" + id).update({
                userUid: problema.userUid,
                userEmail: problema.userEmail,
                local: problema.local,
                image: nomeImg,
                imgUrl: url,
                descricao: problema.descricao,
                status: "Cadastrado"
            });

            limparSessilStorage();
            window.location.href = "index.html";

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

function salvaImagemNoStorage(nomeImg) {
    let storage = firebase.storage();
    let file = document.querySelector("#inputImage").files[0];
    let metadata = {
        content: file.type
    }

    return storage.ref().child("imagens").child(nomeImg).put(file, metadata);
}

function abrirModal() {
    bgLoader.style.display = "none";
    bgModal.style.display = "block";
}