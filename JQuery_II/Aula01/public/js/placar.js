
$("#botao-placar").click(mostrarPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(500); //faz o placar ser exibido descendo em slide, num tempo de 500ms
    scrollPlacar();
}

function scrollPlacar(){  //esta função fará o scroll da página para o placar quando um placar novo for inserido

    var posicaoPlacar = $(".placar").offset().top; //usamos a opção offset() para achar a posição em que o placar se encontra na página.
                                                //Acessamos o valor 'top' para achar a posição do placar com relação ao 'top' da página
    $("body").animate( //passamos para esta função um objeto que tem as propiedades css a serem animadas e os seus valores.
    {           //A propiedade que queremos animar é a 'scrollTop' (que será responsável por fazer o scroll na página). Ela deve receber um valor em pixels.
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();

    // linha.fadeOut(1000); //insere a animação para fazer o elemento desaparecer aos poucos, atribuindo a opacidade ao elemento durante 1000ms
    // setTimeout(function(){ //esta função faz o navegador aguardar 1000ms para executar a instrução contida dentro dele (ou seja, após a animação acontecer)
    //     linha.remove(); 
    // }, 1000);

    linha.fadeOut(function(){ //mesmo efeito da função acima comentada, com o detalhe que não é necessário passar o tempo em ms.
        linha.remove(); //Logo após ser aplicado o efeito 'fadeOut', na sequencia é executado a função que foi passado como parâmetro
        //Exite o fadeIn, fadeOut e o fadeToggle
    });
}

function mostrarPlacar(){
    // $(".placar").toggle(); //esta função toggle adiciona ou esconde um elemento (hide() e show())
    // $(".placar").slideToggle(600); //esta função aplica uma animação de slide suave para exibir o placar, onde passamos o tempo de 600ms para acontecer a animação
                                                        //slideUp(), slideDown()
    $(".placar").stop().slideToggle(600); //a função stop para uma animação antes de começar uma nova. Ela é necessária para a animação não ser realizada
                                            //na mesma quantidade de vezes que o botão for clicado
}