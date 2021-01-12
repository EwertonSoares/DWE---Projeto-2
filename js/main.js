var emailrequired = document.getElementById("email");
emailrequired.addEventListener("change", function () {
    document.getElementById("email").style.borderColor = "#808080";
    document.getElementById("emailRequired").style.display = "none";
}) 

var senhaRequired = document.getElementById("senha");
senhaRequired.addEventListener("change", function () {
    document.getElementById("senha").style.borderColor = "#808080";
    document.getElementById("senhaRequired").style.display = "none";
}) 