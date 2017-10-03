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