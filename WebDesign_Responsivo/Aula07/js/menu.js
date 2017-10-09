document.querySelector('.menu-abrir').onclick = function() {
    /*
    Esse evento de click sinalizará para o CSS abrir o menu lateral. Fazemos isso
    criando uma classe, a qual chamaremos de menu-ativo. Vamos optar por inserí-la
    na raiz do documento, ou seja, na tag HTML. Em javascript funciona dessa maneira:
    */
    document.documentElement.classList.add('menu-ativo'); //este comando adiciona uma classe no próprio elemento HTML
    //A classe menu-ativo do css contém uma regra que será responsável por fazer o descolamento,
    //fazendo aparecer a barra-nav na tela
};

document.querySelector('.menu-fechar').onclick = function() {
    //quando clicado no botão fechar, é removido a classe, e a tag recebe a regra css anterior
    document.documentElement.classList.remove('menu-ativo');
};
//###############################################################################################


//O evento abaixo permite que o menu se "feche" quando for clicado no fundo
//para isso atribuímos o evento de click na tag HTML
document.documentElement.onclick = function(event) {
    //e logo após verificamos o elemento que foi clicado. Caso o elemento clicado seja
    //realmente o "fundo" da barra-nav, ou seja, o pseudo-elemento da tag HTML, ele
    //também removerá a classe menu-ativo
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('menu-ativo');
    }
};

/*
Um ponto interessante a se observar é como pegar eventos no pseudo-elemento. Como pseudo-elementos
são coisas de CSS, eles não podem ser selecionados no JavaScript para colocar um evento de clique.
A solução é colocar o evento no elemento pai (no caso, no <html>, acessado via document.documentElement).
Todo clique no pseudo-elemento vai disparar em seu respectivo pai.

Mas é importante lembrar dos mecanismos de propagação de eventos do JS. Escutar cliques no <html>
vai pegar todos os cliques na página, mesmo os do menu e outros elementos (afinal tudo é descendente
de <html>). Para evitar isso, adicionamos o if que filtra a ação para executar apenas se o
elemento clicado (target) for exatamente o <html> e não algum filho interno, como menu.
*/