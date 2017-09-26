var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

//outra opção abaixo:
// var titulo = document.getElementsByClassName("titulo");
// titulo[0].textContent = "Aparecida Nutricionista";

var trPrimeiroPaciente = document.querySelector("#primeiro-paciente");
var tdPeso = trPrimeiroPaciente.querySelector(".info-peso");
var tdAltura = trPrimeiroPaciente.querySelector(".info-altura");
var tdImc = trPrimeiroPaciente.querySelector(".info-imc");

var peso = tdPeso.textContent;
var altura = tdAltura.textContent;

var msgLog = null;
var alturaEhValida = true;
var pesoEhValido = true;

//Operador ternário =>   test ? expression1(resultado se true) : expression2(resultado se false)
//Validação
if(peso <= 0 || peso >= 1000){
    msgLog = (msgLog == null) ? "Peso inválido!" : msgLog.concat(" ","/ Peso inválido!") ;
    pesoEhValido = false;
}
if(altura <= 0 || altura >= 3){
    msgLog = (msgLog == null) ? "Altura inválida!" : msgLog.concat(" ","/ Altura inválida!") ;
    alturaEhValida = false;
}

if(alturaEhValida && pesoEhValido){
    var imc = peso / (altura * altura);
    
    tdImc.textContent = imc;
}else{
    console.log(msgLog);
    tdImc.textContent = msgLog;
}
