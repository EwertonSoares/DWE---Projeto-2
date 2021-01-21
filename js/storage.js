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
            abrirModal();
        })

    }, function (erro) {
        console.log("Não foi possivel fazer o resgistro desse problema! " + erro.message);
        abrirModal();
    })
}

function deletarImagem(nomeImagem) {
    let str = firebase.storage();

    // Create a reference to the file to delete
    var desertRef = str.ref().child('imagens/' + nomeImagem);

    // Delete the file
    desertRef.delete().then(function () {
        console.log("File deleted successfully");
    }).catch(function (error) {
        console.log("Erro ao deletar arquivo");
    });
}

function abrirModal() {
    bgLoader.style.display = "none";
    bgModal.style.display = "block";
}