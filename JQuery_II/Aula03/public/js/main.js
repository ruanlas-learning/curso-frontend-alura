var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras  = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");

    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function() {
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    // var frase = $(".frase").text();
    campo.on("input", function() {
        var frase = $(".frase").text(); //temos que obter a frase quando estamos digitando algo, por isso ela foi movida para aqui

        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}

function inicializaCronometro() {
    // var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function() {
        var tempoRestante = $("#tempo-digitacao").text();// da mesma forma da frase, devemos obter o tempo de digitação da frase quando o elemento for selecionado
                                                            //pois irá pegar o valor atualizado do tempo, e não o valor que foi inserido estaticamente
    	var cronometroID = setInterval(function() {
    		tempoRestante--;
    		$("#tempo-digitacao").text(tempoRestante);
    		if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
    		}
    	}, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text(0);
    $("#contador-caracteres").text(0);
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo; //é necessário atualizar o tempo inicial quando mudar o tempo de digitação da palavra
    $("#tempo-digitacao").text(tempo);
}