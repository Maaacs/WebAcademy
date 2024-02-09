const botoes = document.getElementsByTagName("button");
const cssLogo = document.getElementById("css-logo");

for (var i=0; i<botoes.length; i++){
    botoes[i].onclick = function (e){
        console.log("botão clicado");
        cssLogo.style.position = e.target.innerHTML;
    };
}