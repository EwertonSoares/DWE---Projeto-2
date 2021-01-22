function salvarproblemas(id, problema) {
    let storage = firebase.storage();
    let nomeImg = `${id}-image`;
    let file = document.querySelector("#inputImage").files[0];
    let metadata = {
        content: file.type
    }

    let upload = storage.ref().child("imagens").child(nomeImg).put(file, metadata);
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

function deletarImagem(nomeImagem) {
    let str = firebase.storage();

    if (nomeImagem === undefined) { return; }

    str.ref().child("imagens").child(nomeImagem).delete().then(function () {
        console.log("Arquivo deletado com sucesso!!!");
    }).catch(function (error) {
        console.log("Erro ao deletar arquivo: " + error.message);
    });
}

function atualizaProblema(idProblema, obj) {
    let storage = firebase.storage();
    let nomeNovaImg = `${idProblema}-image`;
    let file = document.querySelector("#inputImage").files[0];
    let metadata = {
        content: file.type
    }

    let upload = storage.ref().child("imagens").child(nomeNovaImg).put(file, metadata);
    upload.on("state_changed", function () {
        upload.snapshot.ref.getDownloadURL().then(function (url) {

            db.ref("problemas/" + idProblema).update({
                userUid: obj.userUid,
                userEmail: obj.userEmail,
                local: obj.local,
                image: nomeNovaImg,
                imgUrl: url,
                descricao: obj.descricao,
                status: "Cadastrado"
            });

            limparSessilStorage() ;
            window.location.href = "index.html";

        })
    });
}

function abrirModal() {
    bgLoader.style.display = "none";
    bgModal.style.display = "block";
}