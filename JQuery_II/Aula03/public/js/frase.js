
$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){ //será responsável por sortear uma frase aleatória para exibir no html
    $("#spinner").show(); //ao pressionar o botão, o spinner (animação de progresso) é mostrada ao usuário
    $.get("http://localhost:3000/frases", trocaFraseAleatoria) //está sendo feito uma requisição ao servidor (GET). O comando GET devolve um
                                                                //retorno que é passado como parâmetro para a função que é chamada depois do link
    .fail(function(){ //esta função 'fail' é chamada sempre que ocorre uma falha durante a requisição
        $("#erro").show(); //ao falhar, a mensagem será mostrada
        setTimeout(function(){ //e depois de 1500ms a mensagem é escondida, de acordo com a função 'setTimeout'
            $("#erro").hide();
        },1500);
    })
    .always(function(){ //este método 'always' sempre é executado ao final da requisição
        $("#spinner").hide();//ao finalizar a atividade, o spinner (animação de progresso) é escondido do usuário
    });

    //$.get().fail().always();
}

function trocaFraseAleatoria(retorno){
    // console.log(retorno);
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * retorno.length); //responsável por fazer um 'random' de 0 até o tamanho do array do objeto

    frase.text( retorno[numeroAleatorio].texto ); //com base no numero sorteado, escolhe aleatoriamente uma posição do array para escolher a frase
    atualizaTamanhoFrase();
    atualizaTempoInicial( retorno[numeroAleatorio].tempo );
}