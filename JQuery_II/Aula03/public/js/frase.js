
$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){ //será responsável por sortear uma frase aleatória para exibir no html
    $.get("http://localhost:3000/frases", trocaFraseAleatoria); //está sendo feito uma requisição ao servidor (GET). O comando GET devolve um
                                                                //retorno que é passado como parâmetro para a função que é chamada depois do link
    
}

function trocaFraseAleatoria(retorno){
    // console.log(retorno);
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * retorno.length); //responsável por fazer um 'random' de 0 até o tamanho do array do objeto

    frase.text( retorno[numeroAleatorio].texto ); //com base no numero sorteado, escolhe aleatoriamente uma posição do array para escolher a frase
    atualizaTamanhoFrase();
    atualizaTempoInicial( retorno[numeroAleatorio].tempo );
}