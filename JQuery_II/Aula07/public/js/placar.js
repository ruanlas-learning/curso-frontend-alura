
$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val(); //recupera o usuário que foi selecionado no Combobox com o plugin Selectize
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

function sincronizaPlacar(){ //esta função é responsável por atualizar o placar no servidor
    var placar = [];
    var linhas = $("tbody>tr"); //seleciona todas as linhas 'tr' que são filhos diretos do 'tbody'

    linhas.each(function (){ //semelhante ao forEach
        var usuario = $(this).find("td:nth-child(1)").text(); // obtém/busca o primeiro 'td' filho da linha ('tr')
        var qtdPalavras = $(this).find("td:nth-child(2)").text(); // obtém/busca o segundo 'td' filho da linha ('tr')

        var score = { //cria um objeto score para armazenar o usuário e a pontuação
            usuario: usuario,
            pontos: qtdPalavras
        };

        placar.push(score); //armazena o score na lista (array)
    });

    //cria um objeto para enviar de parâmetro para a requisição 'post' para armazenar em banco
    var dadosParaArmazenar = {
        placar: placar
    };

    // $.post("urlDoServidor", dadosParaArmazenar, funcaoASerExecutadaDepoisDeArmazenado)  ###> o terceiro parâmetro é a função que é chamada quando o $.post()
                                                                                                // for concluido
    $.post("http://localhost:3000/placar", dadosParaArmazenar, function(){ //responsável por fazer a resuisição post para armazenar os dados no servidor
        console.log("Placar sincronizado com sucesso");
        //aciona o tooltip quando a sincronização obteve sucesso
        $(".tooltip").tooltipster("open");
    }).fail(function(){
        //em caso de falha, é exibido o tooltip, mas com uma mensagem de erro
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function(){
        //no final, aguardamos cerca de 1200ms e fechamos o tooltip
        setTimeout(function() {
            $(".tooltip").tooltipster("close"); 
        }, 1200);
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(dataReceived){

        $(dataReceived).each(function(){
            var linha = novaLinha(this.usuario, this.pontos); //cria uma nova linha, recebendo como parâmetro o nome do usuário e a quantidade de palavras (pontos)

            linha.find(".botao-remover").click(removeLinha); //adicionando à linha o evento de click do botão remover

            $("tbody").append(linha);

        });
    });
}