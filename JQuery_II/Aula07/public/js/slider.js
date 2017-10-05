// plugin Selectize: http://selectize.github.io/selectize.js/

$(function(){
    //este trecho abaixo faz a ativação do carrossel ## "plugin slick"
    $(".slider").slick( {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });
});