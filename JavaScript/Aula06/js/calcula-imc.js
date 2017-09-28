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

    if(validacao.informacoesValidas){
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
function validacaoPesoAltura(peso, altura){ //em desuso
    var resultadoValidacao = {
        informacoesValidas: true,
        //pesoValido: true,    //################## Refatorado
        //alturaValida: true,
        msgLog: []// null
    }

    if(!validaPeso(peso)){
        resultadoValidacao.msgLog.push("O peso é inválido");
    }
    if(!validaAltura(altura)){
        resultadoValidacao.msgLog.push("A altura é inválida");
    }
    
    if(resultadoValidacao.msgLog.length > 0){
        resultadoValidacao.informacoesValidas = false;
    }

    //Operador ternário =>   test ? expression1(resultado se true) : expression2(resultado se false)
    //################## Refatorado
    //if(peso <= 0 || peso >= 1000){ 
    //    resultadoValidacao.msgLog = (resultadoValidacao.msgLog == null) ? "Peso inválido!" : resultadoValidacao.msgLog.concat(" ","/ Peso inválido!") ;
    //    resultadoValidacao.pesoValido = false;
    //}
    //if(altura <= 0 || altura >= 3){
    //    resultadoValidacao.msgLog = (resultadoValidacao.msgLog == null) ? "Altura inválida!" : resultadoValidacao.msgLog.concat(" ","/ Altura inválida!") ;
    //    resultadoValidacao.alturaValida = false;
    //}
    
    return resultadoValidacao;
}
function validaPaciente(paciente){ //faz a validação do paciente
    var validacao = {
        pacienteEhValido: true,
        logsErro: []
    }
    if(!validaNomeEmBranco(paciente.nome)){
        validacao.logsErro.push("O nome não pode ser em branco");
    }
    if(!validaPesoEmBranco(paciente.peso)){
        validacao.logsErro.push("O peso não pode ser em branco");
    }
    if(!validaAlturaEmBranco(paciente.altura)){
        validacao.logsErro.push("A altura não pode ser em branco");
    }
    if(!validaGorduraEmBranco(paciente.gordura)){
        validacao.logsErro.push("A gordura não pode ser em branco");
    }
    if(!validaPeso(paciente.peso)){
        validacao.logsErro.push("O peso é inválido");
    }
    if(!validaAltura(paciente.altura)){
        validacao.logsErro.push("A altura é inválida");
    }

    if(validacao.logsErro.length > 0){ //Verifica se existe logs de erro
        validacao.pacienteEhValido = false;
    }

    return validacao;
}

function validaPeso(peso){
    return (peso > 0 && peso < 1000);
}
function validaAltura(altura){
    return (altura > 0 && altura < 3);
}
function validaNomeEmBranco(nome){
    return (nome != "");
}
function validaGorduraEmBranco(gordura){
    return (gordura != "");
}
function validaAlturaEmBranco(altura){
    return (altura != "");
}
function validaPesoEmBranco(peso){
    return (peso != "");
}