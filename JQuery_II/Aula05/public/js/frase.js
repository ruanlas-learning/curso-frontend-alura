
$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

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

function buscaFrase(){

    $("#spinner").show();
    var fraseId = $("#frase-id").val(); //obtendo o id da frase pelo - input type="number" -

    //criacao do objeto JS que guarda a id para ser passada como parâmetro na busca
    var parametro = { id : fraseId }; //O 'id' deste objeto deve estar com o mesmo nome que o 'id' do banco

    //passando objeto como segundo parametro, e a função que será executada como terceiro parâmetro
    $.get("http://localhost:3000/frases", parametro, trocaFrase) //esta requisição deve retornar apenas um objeto, pois estamos buscando um elemento em espefícico através do parametro
    .fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").hide();
    },2000);
    })
    .always(function(){
        $("#spinner").hide();
    });
}

function trocaFrase(retorno){ //função responsável por trocar a frase que é passado como parâmetro através do $.get()
        // console.log(retorno);

        //o retorno não é mais um array, mas apenas um único objeto, pois filtramos através do
        //comando $.get() passando um id para retornar apenas um único objeto que queremos
        var frase = $(".frase");
        frase.text(retorno.texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(retorno.tempo);
}