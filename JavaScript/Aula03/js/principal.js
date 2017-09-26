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
        
        tdImc.textContent = imc.toFixed(2); // '.toFixed(2)'  => converte o imc para ser exibido com apenas 2 casas decimais
    }else{
        console.log(msgLog);
        tdImc.textContent = msgLog;
        trPaciente.classList.add("valor-invalido");
    }
}


