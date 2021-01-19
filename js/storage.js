function salvarImageNoStorage(id) {
    let storage = firebase.storage();

    let file = document.querySelector("#inputImage").files[0];
    let metadata = {
        content: file.type
    }

    let upload = storage.ref().child("imagens").child(`${id}-image`).put(file, metadata);

    upload.on("state_changed", function () {
        console.log("Sucesso ao fazer upload da imagem");
    }, function (erro) {
        console.log("Erro ao fazer upload da imagem " + erro.message);
    })
}