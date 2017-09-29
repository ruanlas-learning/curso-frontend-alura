
var frase = $(".frase").text();
var numeroPalavras = frase.split(" ").length; /* a função '.split(separador)' devolve um vetor, separando as strings através de um separador
                                                que pode ser um espaço, vírgula ou qualquer outro caractere. Neste exemplo, o separador é o
                                                espaço, e cada palavra ocupa uma posição do vetor */
var tamanhoFrase = $("#tamanho-frase"); //acessa o span com o id tamanho-frase
tamanhoFrase.text(numeroPalavras);