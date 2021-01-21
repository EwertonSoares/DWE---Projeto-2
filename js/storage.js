function salvarproblemas(id, problema, tipo) {
    let storage = firebase.storage();
    let nomeImg = `${id}-image`;
    let file = document.querySelector("#inputImage").files[0];
    let metadata = {
        content: file.type
    }

    let upload = storage.ref().child("imagens").child(nomeImg).put(file, metadata);
    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            if (tipo === "cadastrar") {
                problema.nomeImagem = nomeImg;
                problema.imgUrl = url;

                db.ref('problemas/' + id).set(problema);
                abrirModal();
            } else {
                // problema.userUid
                problema.nomeImagem = nomeImg;
                problema.imgUrl = url;

                db.ref('problemas/' + id).set(problema);

                removerProblema(sessionStorage.getItem("idProblema"));
                window.location.href = "index.html";
            }
        })

    }, function (erro) {
        console.log("Não foi possivel fazer o resgistro desse problema! " + erro.message);
        abrirModal();
    })
}

function deletarImagem(nomeImagem) {
    let str = firebase.storage();

    str.ref().child("imagens").child(nomeImagem).delete().then(function () {
        console.log("Arquivo deletado com sucesso!!!");
    }).catch(function (error) {
        console.log("Erro ao deletar arquivo: " + error.message);
    });
}

function abrirModal() {
    bgLoader.style.display = "none";
    bgModal.style.display = "block";
}