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
        trPaciente.classList.add("paciente-valor-invalido");
    }
}

var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    
    var formAdiciona = document.querySelector("#form-adiciona");

    var nome = formAdiciona.nome.value;
    var peso = formAdiciona.peso.value;
    var altura = formAdiciona.altura.value;
    var gordura = formAdiciona.gordura.value;
    //Criação do tr (linha da tabela)
    var trPaciente = document.createElement("tr");
    //Criação das td's (colunas da linha da tabela)
    var tdNome = document.createElement("td");
    var tdPeso = document.createElement("td");
    var tdAltura = document.createElement("td");
    var tdGordura = document.createElement("td");
    var tdImc = document.createElement("td");
    //Atribuindo os valores aos campos
    tdNome.textContent = nome;
    tdPeso.textContent = peso;
    tdAltura.textContent = altura;
    tdGordura.textContent = gordura;
    //Adicionando as colunas à linha (atribuindo os elementos 'filhos ao pai')
    trPaciente.appendChild(tdNome);
    trPaciente.appendChild(tdPeso);
    trPaciente.appendChild(tdAltura);
    trPaciente.appendChild(tdGordura);
    //Pegando o elemento tabela da página
    var tabelaPacientes = document.querySelector("#tabela-pacientes");
    //Adicionando a linha que acabamos de criar na tabela
    tabelaPacientes.appendChild(trPaciente);
});


