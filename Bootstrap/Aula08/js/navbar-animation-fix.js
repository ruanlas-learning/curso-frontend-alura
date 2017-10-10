// Agora repare que temos um conflito, quando abrimos o menu a nossa chamada principal fica por cima.
// Vamos resolver isso com JQuery fazendo uma animação bonita.
// Faça conforme fora feito no video utilizando o evento show.bs.collapse e hide.bs.collapse do bootstrap
// para mudar o transform:translate da chamada.

$('#menu-topCasaFina').on('show.bs.collapse', function() {
    //quando o evento colapse for acionado (show) no menu, ele deslocará o banner para baixo
    $('.topCasaFina-banner').css('transform', 'translate(-50%, 10%)');
});

$('#menu-topCasaFina').on('hide.bs.collapse', function() {
    //quando o evento colapse for escondido (hide) do menu, ele deslocará o banner para sua posição inicial
    $('.topCasaFina-banner').css('transform', 'translate(-50%, -50%)');
});