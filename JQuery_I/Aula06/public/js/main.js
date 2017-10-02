
var campoDigitacao = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();


$(function(){ //Primeira função à ser executada quando a página carrega. Como se fosse uma função "main" de outras linguagens
    atualizaTamanhoFrase(); // atualiza o tamanho da frase que será digitada
    inicializaContadoresNoCampo();
    validaCampoDigitado();
    iniciaCronometroCampo();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function inserePlacar(){
    var placar = $(".placar");//está acessando a section com a classe placar
    var corpoTabela = placar.find("tbody"); // busca pelo 'tbody' que é filho do elemento de classe 'placar'
    var usuario = "Seu-nome";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinhaTabela(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinhaTabela); //Atribui o evento na 'tr' (linha) definido na função 'removeLinhaTabela' de remover a linha clicada

    //adiciona a linha no corpo da tabela
    corpoTabela.append(linha);
}

function novaLinhaTabela(usuario, numPalavras){
    var linha = $("<tr>"); //cria uma 'tr' em jQuery
    var colunaUsuario = $("<td>").text(usuario); //cria uma 'td' em jQuery e atribui um texto ao elemento
    var colunaNumPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");

    var linkRemove = $("<a>").attr("href", "#").addClass("botao-remover");
    var iconeRemove = $("<i>").addClass("small").addClass("material-icons").text("delete");

    //adicionando ícone dentro do 'a' (linkRemove)
    linkRemove.append(iconeRemove);
    //adicionando link dentro da 'td' (colunaRemover)
    colunaRemover.append(linkRemove);

    //adiciona as duas colunas dentro do tr
    linha.append(colunaUsuario);
    linha.append(colunaNumPalavras);
    //adição da colunaRemover à linha
    linha.append(colunaRemover);

    return linha;
}

function removeLinhaTabela(event){
    event.preventDefault(); // remove o comportamento padrão do elemento 'a', que é tentar redirecionar a algum endereço
    $(this).parent().parent().remove(); //Acessa o avô do link (que seria a linha 'tr') e o remove
}

function validaCampoDigitado() {  
        var frase = $(".frase").text();
        campoDigitacao.on("input", function() {
            var digitado = campoDigitacao.val(); //recupera as informações digitadas
            // var comparavel = frase.substr(0 , digitado.length); //gera uma substring da frase baseado no tamanho do conteúdo digitado para analisar se é igual ou não
            // if(digitado == comparavel) { // ou....... (abaixo:)
            
            if(frase.startsWith(digitado)){ //a função startsWith verifica se uma string começa ou não com uma outra string
                //se os valores digitados estiverem corretos com o da frase.....
                //adiciona as bordas para sinalizar o acerto
                campoDigitacao.addClass("borda-verde");
                campoDigitacao.removeClass("borda-vermelha");
            } else {
                campoDigitacao.addClass("borda-vermelha");
                campoDigitacao.removeClass("borda-verde");
            }
        });
}

function inicializaContadoresNoCampo(){
    campoDigitacao.on("input", function(){
        var conteudoDigitado = campoDigitacao.val(); //recupera o valor do textArea
        var qtdPalavras = (conteudoDigitado.split(/\S+/).length -1); /* o problema de utilizar o '.split(" ")' com espaço vazio, é que a validação
                                                                        do campo é falha, pois a cada espaço vazio é contado como uma palavra. Assim,
                                                                        se tiver uma sequencia de espaços, cada espaço é contado como palavra. Para 
                                                                        ter uma validação mais efetiva, utilizamos a expressão regular '/\S+/' que 
                                                                        faz a busca de qualquer caractere, exceto espaço vazio 
    
                                                                        ##### utilizamos o '.length - 1' pois ele apresenta um bug que considera
                                                                        um número a mais de palavras do que a quantidade real
                                                                        */
        var qtdCaracteres = conteudoDigitado.length;
        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(qtdCaracteres);
    });
}
function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length; /* a função '.split(separador)' devolve um vetor, separando as strings através de um separador
                                                    que pode ser um espaço, vírgula ou qualquer outro caractere. Neste exemplo, o separador é o
                                                    espaço, e cada palavra ocupa uma posição do vetor */
    var tamanhoFrase = $("#tamanho-frase"); //acessa o span com o id tamanho-frase
    tamanhoFrase.text(numeroPalavras);
}
function iniciaCronometroCampo(){
    var tempoRestante = $("#tempo-digitacao").text(); //estamos selecionando o span correspondente ao tempo de digitação
    campoDigitacao.one("focus", function(){
        /* a função '.one()' garante que o código seja executado apenas uma vez, ao contrário do '.on()'
        que é excecutado toda vez que o evento acontece. O evento 'focus' é associado quando o nosso elemento
        "recebe o foco", seja através do clique, ou seja através da tecla tab. De forma resumida, o 'focus' é quando
        entramos no elemento */
        $("#botao-reiniciar").attr("disabled", true); //este comando faz o botão de reiniciar ficar desabilitado quando o usuário começar a digitar
        var cronometroId = setInterval(function(){
            /* o 'setInterval()' permite repetir uma instrução a cada certo tempo. Esta função retorna um ID
            que identifica a instancia desta função, o que permite usar ela futuramente para parar a execução*/
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){ //verifica se o tempoRestante é menor que 1
                clearInterval(cronometroId); //para de executar o 'setInterval'
                finalizaJogo(); //termina o jogo
            }
        }, 1000); //repete a função a cada 1000ms (1s)
    });
}

function finalizaJogo(){
    campoDigitacao.attr("disabled", true); //"seta" o atributo 'disabled' ao campoDigitação, desabilitando a digitação do usuário
    $("#botao-reiniciar").attr("disabled", false); //este comando faz o botão de reiniciar ficar habilitado quando der o tempo de digitação
    // campoDigitacao.addClass("campo-desativado"); //atingindo o limite do tempo, esta classe muda a cor de fundo
    campoDigitacao.toggleClass("campo-desativado"); // se a classe existir, remove; se não existir, adiciona
    inserePlacar();
}
function reiniciaJogo(){ //deve esatar atribuído ao botão de reiniciar
    campoDigitacao.attr("disabled", false);
    //inicializando os campos
    campoDigitacao.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    //volta ao tempo inicial
    $("#tempo-digitacao").text(tempoInicial);

    // campoDigitacao.removeClass("campo-desativado");//reiniciando o jogo, remove esta classe para voltar a cor de fundo anterior
    campoDigitacao.toggleClass("campo-desativado"); // se a classe existir, remove; se não existir, adiciona

    //removem as bordas
    campoDigitacao.removeClass("borda-vermelha");
    campoDigitacao.removeClass("borda-verde"); 

    iniciaCronometroCampo();
}


