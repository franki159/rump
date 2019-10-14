$(document).ready(function ()
{
    $('.main').load('/inicio');
});

$("#integrate").click(function () {
    $('.main').load('/integrate', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#beneficios").click(function () {
    $('.main').load('/beneficios', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#rump").click(function ()
{
    $('.main').load('/rump', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#adoptame").click(function ()
{
    $('.main').load('/adoptame', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#novedades").click(function ()
{
    window.open('https://worldpetsperu.com/novedades/', '_blank');
});

$("#iniciar_a").click(function () {
    $('.main').load('/login', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#encontraste").click(function () {
    $('.main').load('/encontrastemascota', function () {
        $('li a').addClass('black-text');
        $('footer').addClass('grey lighten-3');
    });
});

$("#inicio").click(function () {
    $('.main').load('/inicio', function () {
        $('li a').removeClass('black-text');
        $('footer').removeClass('white lighten-3');
    });
});










