var value;
$(window).resize(function () {
    var ventana = window.innerHeight;// tamaño de la ventana del navegador
    var a = parseFloat(ventana - menbrete - 50);
    var b = parseFloat(ventana / 2);
    var principal_2 = $("#principal_2").height();//tamaño de la etiqeuta
    var menbrete = $("#menbrete").height();//tamaño de la etiqeuta  
    ventana = parseFloat((ventana - principal_2) / 2);
    $('#imagen_princi').css({
        "margin-top": ventana + 'px'
    });
    var wpp = window.innerHeight;// tamaño de la wpp del navegador
    wpp = parseFloat(wpp / 1.5);
    $('#blue').css({
        "height": wpp + 'px'
    });
    var unete = $("#unete").height();//tamaño de la etiqeuta
    if (unete > b) {
        $('#unete').css({
            "height": unete + 'px'
        });
    } else {
        $('#unete').css({
            "height": b + 'px'
        });
    }
    $('#unete_img').css({
        "height": b + 'px'
    });
    var banner_4 = $("#banner_4").height();//tamaño de la etiqeuta 
    banner_4 = banner_4 + 100;
    $('#fondo2').css({
        "height": banner_4 + 'px'
    });
});

$(document).ready(function () {
    $('.slider').slider();
    var ventana = window.innerHeight;// tamaño de la ventana del navegador
    var a = parseFloat(ventana - menbrete - 50);
    var b = parseFloat(ventana / 2);
    var principal_2 = $("#principal_2").height();//tamaño de la etiqeuta 
    var menbrete = $("#menbrete").height();//tamaño de la etiqeuta 
    ventana = parseFloat((ventana - principal_2) / 2);

    $('#imagen_princi').css({
        "margin-top": ventana + 'px'
    });

    var wpp = window.innerHeight;// tamaño de la wpp del navegador
    wpp = parseFloat(wpp / 1.5);
    $('#blue').css({
        "height": wpp + 'px'
    });

    var unete = $("#unete").height();//tamaño de la etiqeuta 

    if (unete > b) {
        $('#unete').css({
            "height": unete + 'px'
        });
    } else {
        $('#unete').css({
            "height": b + 'px'
        });
    }

    $('#unete_img').css({
        "height": b + 'px'
    });



    var banner_4 = $("#banner_4").height();//tamaño de la etiqeuta 
    banner_4 = banner_4 + 100;
    $('#fondo2').css({
        "height": banner_4 + 'px'
    });

    var options = [{

            selector: '#staggered-test', offset: 50, callback: function (el) {
                Materialize.showStaggeredList($(el));
            }
        }];
    Materialize.scrollFire(options);


    // CLIENTES CAROUSEL

    var cli_corousel = function ()
    {
        var images_carousel = [
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'alimento',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'alimento',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Comas
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Breña
            'veterinaria',
            'veterinaria',

            // San Juan de Miraflores
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Independencia
            'veterinaria',
            'veterinaria',

            // Puente Piedra
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // San Martin de Porras
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Los Olivos
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Callao
            'veterinaria',

            // Surco
            'veterinaria',
            'veterinaria',
            'veterinaria',
            'veterinaria',

            // Redes Sociales y Páginas Web
            'veterinaria'

        ];
        var text_carousel = [
            'Veterinaria Zevallos',
            'Vet. Groming',
            'Veterinaria Mascovilla',
            'Alimentos Balanceados ',
            'Animal Med',
            'Veterinaria Yana Pata',
            'Leuvets',
            'Dogtor Cats',
            'Vet. Pet Valpi',
            'Arce',
            'Veterinaria Solis',
            'Vet. San Judas Tadeo',
            'Huellita de mis cachorros',
            'Alimentos y motor',
            'Happy Dogs',
            'Coripets',
            'Juan Vet',
            'Live Pets Shop',
            'Veterinaria Amerikan',
            'Ballestas Pet Spa',
            'Veterinaria Kaled',
            'Veter. San Martin de Porres',
            'Clinica vet. Los Portales',
            'Lucho Pets',
            'Veterinaria Veter Kat',

            // Comas
            'HPN ( healthy pet nutrition)',
            'El Gran Can',
            'Veterinaria Pet Shop',
            'Jose y su mascota',
            'Jose y su mascota',
            'Jose y su mascota',
            'Pet Shop Valentino',
            'MyR',
            'Veterinaria Cerbero',
            'Vet Mascotitas',
            'Econo Pets',

            // Breña
            'Distibuidora Segundo Vargas',
            'Distribuidora Paradero San Judas',

            // San Juan de Miraflores
            'Veterinaria Sin Fronteras',
            'DKF Pets Clinica Veterinaria',
            'Pet Shop Super Can',
            'Pet Shop Super Can',
            'Pet Shop Dog Me',
            'Dogtor Cats',
            'Pet Shop Mundo Mascota',

            // Independencia
            'Veterinaria Balino',
            'Veterinaria Galeno ',

            // Puente Piedra
            'La Veterinaria 911',
            'Todo Mascotas',
            'Pet Shop El encantador de Plos',

            // San Martín de Porras
            'Peru Dog',
            'Veterinaria Ariels',
            'Yela y su mascota',
            'Pet Buddyes',
            'Dog Bull',
            'Veterinaria San Martin de Porres',
            'Veterinaria  Galeno',

            // Los Olivos
            'Terror Verde Acuario',
            'Consultorio Veterinario D8G',
            'Patitas Pet Shop ',
            'Clinica Veterinaria Alizos',
            'Veterinaria Animal',
            'Veterinaria Fauna',
            'Tienda de animales',
            'Veterinaria Consentidos',
            'Pekys Pet',
            'Pet Shop ',
            'Veterinaria Happy Friend',
            'Aquatic Fish Center',

            // Callao
            'Veterinaria ',

            // Surco
            'HPN ( healthy pet nutrition)',
            'Veterinaria Proceres',
            'Veterinaria Los Viñedos',
            'Veterinaria Pets and Love',

            // Redes Sociales y Páginas Web
            'Happy Guau Guau'

        ];
        var text_ayuda = [
            'Sector 1 grupo 3 mz A lt 8 Av. 1° de may<br>991401468<br>5% dscto general',
            'Sector 2 grupo 7 mz H L13 Av. Central<br>951792053<br>10% dscto baños',
            'Sector 1 grupo 20 mz K- Av. M. Bastidas<br>997336645<br>20% dscto desparacitación interna y 30% en externa',
            'Mercado Villasur psto. B67-69<br>989990739<br>10% dscto para Mimaskot',
            'Sc 1 grupo 7 mz 2F lt 18<br>992901266<br>10% dscto baños + desparacitacion gratis ',
            'Av. 1 de mayo sector 7 gp. 12 mz G lt 16<br>980099377<br>970670750<br>consulta gratis',
            'Sector 1 grupo 21 mz C lt 11<br>946521876<br>5% dscto general',
            'Av. 26 de noviembre 340 pard 7 1/2<br>965435026<br>10% dscto baños',
            'Av. 26 noviembre 2127 pard. 12<br>959758123<br>por c/baño gratis desparacitacion + corte de uñas',
            'Jr. Caraveli 148 parad, 8 1/2<br>989618747<br>10% dscto consultas',
            'Av. San Martin M. Gonzales Prada mz A lt 11<br>940289150<br>10% dscto en baño y desparacitación solo martes',
            'Av. Defensores de Lima 1228 ex. Pista nueva<br>950041575<br>consulta gratis solo martes',
            'Av. Jose Carlos Mariategui 1537 San Gabriel<br>940654229<br>20% dscto baños solo sabados',
            'Mercado Paradita psto. 89 Alto San Gabriel<br>966455244<br>10% dscto en Mimaskot solo viernes ',
            'Jr. Sanchez Carrión 204<br>963350728<br>por c/consulta antiparasitario y antigarrapatas gratis',
            'Av. Defensores del morro 2270 Huaylas<br>980089325<br>10% dscto en consulta',
            'Jr. Los Pumas 784 Matelinni<br>987537519 987173247<br>por c/baño gratis desparacitacion',
            'Av. Matellinni 467<br>962345206<br>10% dscto baño solo lunes',
            'Av. 24 de Octubre mz H4 lt 6<br>25801086<br>10% dscto. Baño / por c/baño+corte un jueguete de regalo',
            'Av. Alameda Ballestas mz D lt 32<br>930428212<br>Consulta gratis solo miercoles con DNI',
            'Av. San Martin mz F5 lt 20<br>3338793<br>Por cada baño un regalo solo con DNI',
            'Av. San Martin mz F4 lt 6<br>991352058<br>10% dscto en desparacitacion y vacuna',
            'Clinica vet. Los Portales<br>Av. Prolongación Javier Prado 9263<br>5833809	10% dscto baños',
            'Lucho Pets	Calle Berlin 302 Portales de Harold<br>10% dscto baños',
            'Av. Los Virreyes mz D lt 41<br>975471738<br>s/. 10 dscto en vacuna antirrabica',

            // Comas
            'Condominios Torres del Campo - Block 31 - Dpto 1101<br>934537928  938885312<br>por cada kilo de comida 8 soles.',
            'Pje. Simon Bolivar<br>989618004<br>10% dscto baño',
            'Av. Micaela Bastidas 835<br>10% dscto baño',
            'Jr. Lima 605 psj. La Libertad <br>994745342<br>10% dscto baños y desparacitación',
            'Av. Mexico 200<br>966296440',
            'Av. Republica del Peru 605 Urb. Huaquillay<br>994745342<br>10% dscto baños y desparacitación',
            'Unicachi I psj 4 psto 163<br>991786071<br>10% dscto baños y desparacitación',
            'Av Metropolitana  2450 int 297<br>952826241<br>10% dscto en Proplan',
            'Av. San Felipe 162<br>988982728<br>10% dscto baños',
            'Av. Tupac Amaru 399<br>976765440',
            'Unicachi psto 217 Av. Panamericana norte 2° puerto<br>927208438<br>10% dscto alimento Proplan',

            // Breña
            'Jr. Huaraz 576<br>996406262<br>10% dscto alimento balanceado',
            'Mariano Moreno 162 alt. Venezuela<br>994950376<br>50% dscto ',

            // San Juan de Miraflores
            'Av. Miguel Iglesias mz J lt 18<br>993291013<br>10% dscto consultas',
            'Av. Cesar Canevaro 479<br>957899856<br>10% dscto baños',
            'Av. Belisario Suarez 875<br>978211689<br>consultas gratis',
            'Av. Cesar Canevaro 274<br>978211689<br>consultas gratis',
            'Av. Miguel Iglesias 785 zona d<br>991014776<br>dscto en accesorios',
            'Av. Miguel Iglesias mz B lt 16<br>965435026<br>10% dscto baños',
            'Av. Miguel Iglesias cdra. 15<br>923058389<br>10% dscto accesorios',

            // Independencia
            'Jr. Los Ficus 684<br>6959908<br>10% dscto baños',
            'Av. Los Pinos 386 A<br>998999136<br>consultas gratis',

            // Puente Piedra
            'Pan. Antigua mz A1 lt 16<br>943588654<br>10% dscto baños, desparacitación y accesorios',
            'mz A lt 3 Tambo Inga<br>926148288<br>10% dscto en general',
            'Av. Rosaluz mz F lt 8<br>945512602<br>Por cada baño corte gratis',

            // San Martín de Porras
            'Av. Peru 3676<br>997352098<br>consulta gratis',
            'Av. Los Proceres 115<br>949877212 986985047<br>Por c/ 20 soles de consumo 1 cupon para sorteo tv HAIER',
            'Av. Los Proceres 317<br>988732284<br>Por cada baño desparacitación gratis',
            'Av. Los Alisos mz G1 lt 15<br>4850157<br>15% dscto baño + corte L-V/ 15% dsto rayos X+ ecografia solo lunes y mier/ Desparacitación gratis solo lunes y martes',
            'Jr. Manuel Villar 373 cdr 3 Habish<br>993306219 997602944<br>20% dscto baños',
            'Av. Santa Rosa mz B lt 13 Urb. COOPIP<br>994623241<br>10% dscto accesorios y juguetes ',
            'Av. Los Olivos mz A lt 32 Pinos del norte<br>998999136<br>10% dscto medicamentos',

            // Los Olivos
            'Coop. Vivienda Virgen de Fatima mz C lt L<br>4851311<br>por la compra de un kit de pecera de regalo plantas de acuario ',
            'Av. Canta Callao mz A lt 2 Urb. Las Begonias 2 etp<br>957203826<br>Promociones en baños',
            'Calle Olivos tda 55 Merc. Prolima<br>935042123<br>por c/4k de alimento balanceado 1/2 gratis',
            'Calle Aquia mz P lt 30 Los Jasmines de Naranjal<br>994100985<br>consultas gratis',
            'Av. Santa Rosa mz B lt 15 Urb. Av 12 de oct. c/ antunes de mayolo<br>4841162<br>2x1 baños todos los dias',
            'Av. Las Palmetas 3872<br>997674765<br>10% dscto  centro de entretenimiento de gatos',
            'Cooperativa mz B lt 7<br>971033219<br>por cada 3 baños 1 consulta gratis ',
            'Urb. Taurijia mz B lt 14 Angelica Gamarra<br>990144207<br>10% dscto vacunas',
            'Av. Tomas Valle 968<br>10% dscto vestimenta',
            'Av. Universitaria s/n td 12 CC ASCAI<br>982751517<br>RICOCRACK paquete 1x s/.10 y 2 x s/. 15',
            'Av. Central 389<br>960447810<br>10% dscto vacunas',
            'Av. Antunes de Mayolo 986<br>3978967<br>10% dscto accesorios',

            // Callao
            'Jr. Cahuide 857<br>987091352<br>10% dscto baños martes y miercoles',

            // Surco
            'Av Higuereta 496<br>934537928 938885312<br>cada k. de alimento balanceado a s/.8',
            'Av. Proceres mz B lt 2 Urb. Sanchez Carrion<br>957571516<br>10% dscto baño a partir de dos mascotas/ por c/baño restauración gratis/ desparacitación gratis',
            'Av. Proceres 1261 Urb. Los Viñedos<br>991996734<br>Desparacitación gratis y dscto. En baños a partir de 2 mascotas',
            'Av. Guardia Civil norte mz E lt 32 Urb. Villa Alegre<br>953690438<br>10% dscto baños/20% dscto sextuples/5%dscto accesorios/por baño 50%dscto en desparacitación/35%dscto cons. Dermatologica+examen( los dsctos solo seran de lunes a miercoles',

            // Redes Sociales y Páginas Web
            'ONLINE<br>15% dscto en todo pagina web'

        ];
        var element;

        for (var i = 0; i < 75; i++)
        {
            //var element = '<a class="carousel_element" ><img src="images/'+images_carousel[i]+'.png" height="100px" width="40px" style="  border-radius: 50%; "><br><p align="center" style="color: #000;"><b>'+text_carousel[i]+'</b></p></a> ';
            element = "<div class='row'><div class='card hoverable z-depth-0'><div class='card-image'><img src='images/convenios/" + images_carousel[i] + ".png' height='170px'></div><div class='card-content'><span class='card-title black-text' style='font-size: 80%;'>" + text_carousel[i] + "</span><div><div class='price cyan-text center-text'><p>" + text_ayuda[i] + "</p></div></div></div></div></div>";
            $('.space .owl-carousel.owl-theme').append(element);
        }

    };

    cli_corousel();

    $('.owl-carousel').owlCarousel({
        margin: 5,
        loop: false,
        mouseDrag: true,
        touchDrag: false,
        // stagePadding: 32,
        nav: true,
        navText: ['<a class="icon-navigate_before"></a>', '<a class="icon-navigate_next"></a>'],
        dots: false,
        responsive: {
            0: {
                items: 1,
                mouseDrag: true,
                touchDrag: true
            },
            400: {
                items: 2,
                mouseDrag: true,
                touchDrag: true
            },
            600: {
                items: 3,
                mouseDrag: true,
                touchDrag: true
            },
            950: {
                items: 4,
                mouseDrag: true,
                touchDrag: true
            },
            1050: {
                items: 5
            }
        }
    });
});