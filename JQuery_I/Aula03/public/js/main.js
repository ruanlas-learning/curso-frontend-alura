
var frase = $(".frase").text();
var numeroPalavras = frase.split(" ").length; /* a função '.split(separador)' devolve um vetor, separando as strings através de um separador
                                                que pode ser um espaço, vírgula ou qualquer outro caractere. Neste exemplo, o separador é o
                                                espaço, e cada palavra ocupa uma posição do vetor */
var tamanhoFrase = $("#tamanho-frase"); //acessa o span com o id tamanho-frase
tamanhoFrase.text(numeroPalavras);

var campoDigitacao = $(".campo-digitacao");
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

var tempoRestante = $("#tempo-digitacao").text(); //estamos selecionando o span correspondente ao tempo de digitação
campoDigitacao.one("focus", function(){
    /* a função '.one()' garante que o código seja executado apenas uma vez, ao contrário do '.on()'
    que é excecutado toda vez que o evento acontece. O evento 'focus' é associado quando o nosso elemento
    "recebe o foco", seja através do clique, ou seja através da tecla tab. De forma resumida, o 'focus' é quando
    entramos no elemento */
    var cronometroId = setInterval(function(){
        /* o 'setInterval()' permite repetir uma instrução a cada certo tempo. Esta função retorna um ID
        que identifica a instancia desta função, o que permite usar ela futuramente para parar a execução*/
        tempoRestante--;
        $("#tempo-digitacao").text(tempoRestante);
        if(tempoRestante < 1){ //verifica se o tempoRestante é menor que 1
            campoDigitacao.attr("disabled", true); //"seta" o atributo 'disabled' ao campoDigitação, desabilitando a digitação do usuário
            clearInterval(cronometroId); //para de executar o 'setInterval'
        }
    }, 1000); //repete a função a cada 1000ms (1s)
});

