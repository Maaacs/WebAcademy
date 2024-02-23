let box = document.getElementById("box");  
let botaomudar = document.getElementById("mudar");
let botaopadrao = document.getElementById("padrao");

botaomudar.onclick = function() {
	box.style.fontSize = "25px";  
	box.style.color = "blue";
    box.style.border = "5px solid green";
    console.log("a")
}

botaopadrao.onclick = function() {
	box.style.fontSize = "15px";  
	box.style.color = "black";
    box.style.border = "5px solid black";
    console.log("a")
}
