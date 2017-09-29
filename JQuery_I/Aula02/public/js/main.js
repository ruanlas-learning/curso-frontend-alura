
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