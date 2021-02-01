function cadastraProblema(id, problema) {

    problema.nomeImagem = `${id}image`;

    db.ref('problemas/' + id).set(problema);
}

async function atualizaProblema(id, problema, tipo) {
    var upload = salvaImagemNoStorage(problema.nomeImagem);

    await upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL()
            .then(function (url) {

                editaProblema(url, id, problema, tipo);

            }).catch(function (error) {
                console.log(`Tivemos um problema para fazer o upload da imagem. Refaça o cadastro ou edite o problema e reeenvie a imagem. Erro: ${error.message}`);
            })
    });

}

function editaProblema(url, id, problema, tipo) {

    if (url != "" && url != undefined) {
        db.ref("problemas/" + id)
            .update({
                userUid: problema.userUid,
                userEmail: problema.userEmail,
                local: problema.local,
                image: problema.nomeImagem,
                imgUrl: url,
                descricao: problema.descricao,
                status: "Cadastrado"
            });

        if (tipo === "update") {
            limparSessilStorage();
            window.location.href = "/index.html";

        } else {

            limparSessilStorage();
            abrirModal();
        }
    } else {
        atualizaProblema(id, problema, tipo)
    }
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
    var metadata = { content: file.type }

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