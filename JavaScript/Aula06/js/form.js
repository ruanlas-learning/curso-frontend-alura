
var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event) {
    event.preventDefault();
    //Extrai o form do html
    var formAdiciona = document.querySelector("#form-adiciona");
    //extrai os dados do form para um objeto paciente
    var paciente = extraiPacienteForm(formAdiciona);
    //Criação da linha da tabela paciente e passando como parâmetro um objeto paciente
    var trPaciente = criaTrPaciente(paciente);

    //var validacaoPaciente = validaPaciente(paciente); //é devolvido um objeto de validação
    //if(!validacaoPaciente.pacienteEhValido){ //checa para verificar se os dados do paciente são válidos
        //exibeMensagemErro(validacaoPaciente.logsErro);

    if( !validaPaciente(paciente).pacienteEhValido ){ //checa para verificar se os dados do paciente são válidos
        exibeMensagemErro( validaPaciente(paciente).logsErro );
        return; //este comando faz a função retornar e ignora todo o código abaixo desta linha
    }
    
    //Extrai o elemento tabela da página html
    var tabelaPacientes = document.querySelector("#tabela-pacientes");
    //Adiciona a linha que acabamos de criar na tabela
    tabelaPacientes.appendChild(trPaciente);

    //A função abaixo limpa o formulário
    formAdiciona.reset();
    document.querySelector("#mensagens-erro").innerHTML = ""; // este comando limpa os logs de erro da página (limpa os filhos do ul)
});

function criaTrPaciente(paciente){
    //Criação do tr (linha da tabela) e atribuição de uma classe
    var trPaciente = criaTr("paciente");
    //Criação das td's (colunas da linha da tabela), atribui o conteudo delas
    //e adiciona as 'td's ao elemento pai 'tr'
    trPaciente.appendChild( criaTd(paciente.nome, "info-nome"));
    trPaciente.appendChild( criaTd(paciente.peso, "info-peso"));
    trPaciente.appendChild( criaTd(paciente.altura, "info-altura"));
    trPaciente.appendChild( criaTd(paciente.gordura, "info-gordura"));
    trPaciente.appendChild( criaTd(paciente.imc, "info-imc"));

    return trPaciente;
}

//Cria uma 'tr' e recebe uma classe como parâmetro
function criaTr(classe){
    var tr = document.createElement("tr");
    tr.classList.add(classe);
    return tr;
}
//Cria uma 'td' e recebe um conteúdo e uma classe como parâmetro
function criaTd(conteudo, classe){
    var td = document.createElement("td");
    td.textContent = conteudo;
    td.classList.add(classe);
    return td;
}
//Extrai os dados do form para um objeto paciente
function extraiPacienteForm(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value ,form.altura.value)
        // calcImc: function(){  //Esta função deu certo!!!
        //     //return calculaImc(this.peso, this.altura);
        //     this.imc = calculaImc(this.peso, this.altura);
        // }
        //imc: calculaImc(this.peso ,this.altura) // não funcionou !!
    }
    //paciente.imc = calculaImc(paciente.peso ,paciente.altura);
    return paciente;
}

//Responsável por exibir as mensagens de erro no ul
function exibeMensagemErro(logsErros){
    var ulMsgErro = document.querySelector("#mensagens-erro");
    ulMsgErro.innerHTML = ""; // este comando limpa os logs de erro da página (limpa os filhos do ul)
    logsErros.forEach(function(logErro) { //foreach
        var li = document.createElement("li");
        li.textContent = logErro;
        ulMsgErro.appendChild(li);
    });
}