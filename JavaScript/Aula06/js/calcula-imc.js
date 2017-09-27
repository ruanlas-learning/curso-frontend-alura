var titulo = document.querySelector(".titulo");
titulo.textContent = "Aparecida Nutricionista";

//outra opção abaixo:
// var titulo = document.getElementsByClassName("titulo");
// titulo[0].textContent = "Aparecida Nutricionista";

// var trPrimeiroPaciente = document.querySelector("#primeiro-paciente"); //document.querySelector() => retorna apenas um único elemento
var trPacientesList = document.querySelectorAll(".paciente");   //document.querySelectorAll() => retorna um array com todos elementos da classe '.paciente'

for(var i = 0; i < trPacientesList.length; i++){

    var trPaciente = trPacientesList[i];

    var tdPeso = trPaciente.querySelector(".info-peso");
    var tdAltura = trPaciente.querySelector(".info-altura");
    var tdImc = trPaciente.querySelector(".info-imc");
    
    var peso = tdPeso.textContent;
    var altura = tdAltura.textContent;
    
    //Validação
    var validacao = validacaoPesoAltura(peso,altura);

    if(validacao.pesoValido && validacao.alturaValida){
        tdImc.textContent = calculaImc(peso,altura);
    }else{
        console.log(validacao.msgLog);
        tdImc.textContent = validacao.msgLog;
        trPaciente.classList.add("paciente-valor-invalido");
    }
}
//Esta função faz o cálculo do IMC
function calculaImc(peso, altura){
    return (peso / (altura * altura)).toFixed(2); // '.toFixed(2)'  => converte o imc para ser exibido com apenas 2 casas decimais
}

//Faz a validação para checar se o peso ou a altura são válidos
function validacaoPesoAltura(peso, altura){
    var resultadoValidacao = {
        pesoValido: true,
        alturaValida: true,
        msgLog: null
    }
    //Operador ternário =>   test ? expression1(resultado se true) : expression2(resultado se false)
    if(peso <= 0 || peso >= 1000){
        resultadoValidacao.msgLog = (resultadoValidacao.msgLog == null) ? "Peso inválido!" : resultadoValidacao.msgLog.concat(" ","/ Peso inválido!") ;
        resultadoValidacao.pesoValido = false;
    }
    if(altura <= 0 || altura >= 3){
        resultadoValidacao.msgLog = (resultadoValidacao.msgLog == null) ? "Altura inválida!" : resultadoValidacao.msgLog.concat(" ","/ Altura inválida!") ;
        resultadoValidacao.alturaValida = false;
    }
    
    return resultadoValidacao;
}