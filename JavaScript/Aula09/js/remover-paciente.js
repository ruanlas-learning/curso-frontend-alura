//##### remove apenas os elementos (linhas) que foram carregados na página estaticamente
//##### com o duplo clique, não consegue acessar os elementos inseridos dinamicamente
// var pacientes = document.querySelectorAll(".paciente");

// pacientes.forEach(function(paciente) {
//     paciente.addEventListener("dblclick", function() {
//         this.remove();
//     });
// });

//o trecho abaixo remove as linhas da tabela selecionadas com o duplo clique
var tabela = document.querySelector("#tabela-pacientes");
tabela.addEventListener("dblclick", function(event){ //Adiciona o evento de ouvinte à tabela
    if( event.target.tagName != "TD"){
        return; /*este trecho faz a validação para saber se foi clicado em algum elemento 'td', garantindo que foi
        selecionado o conteúdo da tabela, evitando excluir o cabeçalho da tabela. Caso o elemento clicado 
        não seja um 'td', ele retorna esta função. Se o elemento clicado for um 'td', ele ignora este bloco
        */
    }
    var tdSelecionado = event.target; //'Captura' o elemento selecionado (td)
    var trPaiDoTdSelecionado = tdSelecionado.parentNode; //'Aponta' para o pai do elemento selecionado (tr)
    //o trecho abaixo adiciona uma classe CSS responsável por fazer uma transição de 500ms para deixar a remoção da linha mais suave,
    //fazendo a linha ficar opaca
    trPaiDoTdSelecionado.classList.add("fade-out");
    //o trecho abaixo faz o navegador esperar um tempo (timeout) para executar a função para remover a linha selecionada. Isso é
    //importate para aguardar a transição acima ser aplicada ao elemento para depois remover a linha
    setTimeout(function(){  //setTimeout(função, tempoEmMS)
        trPaiDoTdSelecionado.remove(); //remove o pai do elemento selecionado (tr)
    },500);
});