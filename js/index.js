var inputLocal = document.getElementById("local");
var inputImg = document.getElementById("inputImage");
var inputTextArea = document.getElementById("textArea");
var spanErro = document.getElementById("erroCmapos");
var h2Message = document.getElementById("h2Message");

inputLocal.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputLocal.value.length > 0) {

        inputLocal.style.borderColor = "black";

        return;
    }

    if (inputLocal.value.length > 0 && inputImg.value.length > 0 && 
        inputTextArea.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputImg.style.borderColor = "black";

        return;
    }

    if (inputLocal.value.length > 0 && inputTextArea.value.length > 0 && 
        inputImg.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

inputImg.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputImg.value.length > 0) {

        inputImg.style.borderColor = "black";
        inputImg.style.border = "none";

        return;
    }

    if (inputImg.value.length > 0 && inputLocal.value.length > 0 && 
        inputTextArea.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputImg.style.borderColor = "black";

        return;
    }

    if (inputImg.value.length > 0 && inputTextArea.value.length > 0 && 
        inputLocal.value.length === 0) {

        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

inputTextArea.addEventListener("change", function () {

    var result = checkSeCamposSaoIguais();
    if (result) {
        return;
    }

    if (inputTextArea.value.length > 0) {

        inputTextArea.style.borderColor = "black";

        return;
    }

    if (inputTextArea.value.length > 0 && inputLocal.value.length > 0 && 
        inputImg.value.length === 0) {

        inputLocal.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }

    if (inputTextArea.value.length > 0 && inputImg.value.length > 0 && 
        inputLocal.value.length === 0) {

        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return;
    }
})

function problemaCadastrado() {

}


function checkSeCamposSaoIguais() {
    if (inputLocal.value.length > 0 && inputImg.value.length > 0 &&
        inputTextArea.value.length > 0) {

        h2Message.style.display = "block";
        spanErro.style.display = "none";
        inputLocal.style.borderColor = "black";
        inputImg.style.border = "none";
        inputImg.style.borderColor = "black";
        inputTextArea.style.borderColor = "black";

        return true;
    }

    return false;
}

function verificaCampos() {
    if (inputLocal.value.length === 0 &&
        inputImg.value.length === 0 &&
        inputTextArea.value.length === 0) {

        esconderH2MostrarSpan();

        inputLocal.style.borderColor = "red";

    }

    if (inputLocal.value.length === 0) {
        esconderH2MostrarSpan();

        inputLocal.style.borderColor = "red";
        inputImg.style.border = "solid 1px";

        inputImg.style.borderColor = "red";
        inputTextArea.style.borderColor = "red";

        return true;
    }

    if (inputImg.value.length === 0) {
        esconderH2MostrarSpan();
        inputImg.style.border = "solid 1px";
        inputImg.style.borderColor = "red";

        return true;
    }

    if (inputTextArea.value.length === 0) {
        esconderH2MostrarSpan();
        inputTextArea.style.borderColor = "red";

        return true;
    }

    return false;
};

function esconderH2MostrarSpan() {
    h2Message.style.display = "none";
    spanErro.style.display = "block";
}
