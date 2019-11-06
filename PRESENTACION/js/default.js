var _globalNotificacion;

function documentLoad() {
    var url = $(location).attr('href');

    if (url.indexOf("#!") !== -1) {
       
        var elem = url.split("#!/");
        var get = elem[elem.length - 1];
        
        get = get.split('?')[0];
        
        $(".wrapper").empty().html("Cargando...");

        $.get(get + '.aspx', function (data) {
            openLoading();
            $(".wrapper").html(data);

            if ($("#sidebar").css("position") === "absolute") $('#sidebar > ul').hide();

            $('body, html').animate({
                scrollTop: 0
            }, 1000);
        }).fail(function () {
            $(".wrapper").empty().html(GenerarAlertaWarning("No disponible."));
        });

    } else {
        $.get('page/inicio.aspx#', function (data) {
            $(".wrapper").html(data);

            $('body, html').animate({
                scrollTop: 0
            }, 1000);
        });
    }
}

$(document).ready(function () {
    $.history.init(documentLoad);
    InfoSesion();
    $("#logoutModal").click(function () {
        $.ajax({
            type: "POST",
            url: "default.aspx/CerrarSesionWM",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: true,
            success: function (data, status) {
                window.location = data.d.Resultado;
            },
            error: function (data) { }
        });
    });
});

function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            if (!data.d.Activo) {
                alert(data.d.Mensaje);
                window.location = "login.aspx";
                return;
            }
            $(".name_user").text(data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0]);
            $(".name_perfil").html('<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400 name_perfil"></i>' + MaysPrimera(data.d.Resultado.USUARIO_PERFIL.PERFIL));
            /************************MENU****************************/
            var htmlMenu = '';

            if (data.d.Resultado.USUARIO_PERFIL.ID === 1) {//Administrador                
                htmlMenu += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMascot" aria-expanded="true" aria-controls="collapseMascot">';
                htmlMenu += '   <i class="fas fa-fw fa-paw"></i><span>Mascota</span>';
                htmlMenu += '</a>';
                htmlMenu += '<div id="collapseMascot" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
                htmlMenu += '   <div class="bg-white py-2 collapse-inner rounded">';
                htmlMenu += '       <h6 class="collapse-header">Opciones Mascotas:</h6>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/mascota">Mascotas</a>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/proceso/imprimirDNI">DNI</a>';
                htmlMenu += '   </div>';
                htmlMenu += '</div >';
                htmlMenu += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser" aria-expanded="true" aria-controls="collapseUser">';
                htmlMenu += '   <i class="fas fa-fw fa-user"></i><span>Usuarios</span>';
                htmlMenu += '</a>';
                htmlMenu += '<div id="collapseUser" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
                htmlMenu += '   <div class="bg-white py-2 collapse-inner rounded">';
                htmlMenu += '       <h6 class="collapse-header">Opciones Usuarios:</h6>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/usuario">Usuarios</a>';
                htmlMenu += '   </div>';
                htmlMenu += '</div >';
            } else if (data.d.Resultado.USUARIO_PERFIL.ID === 3) {//Asesor
                htmlMenu += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMascot" aria-expanded="true" aria-controls="collapseMascot">';
                htmlMenu += '   <i class="fas fa-fw fa-paw"></i><span>Mascota</span>';
                htmlMenu += '</a>';
                htmlMenu += '<div id="collapseMascot" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
                htmlMenu += '   <div class="bg-white py-2 collapse-inner rounded">';
                htmlMenu += '       <h6 class="collapse-header">Opciones Mascotas:</h6>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/mascota">Mascotas</a>';
                htmlMenu += '   </div>';
                htmlMenu += '</div >';
                htmlMenu += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUser" aria-expanded="true" aria-controls="collapseUser">';
                htmlMenu += '   <i class="fas fa-fw fa-user"></i><span>Usuarios</span>';
                htmlMenu += '</a>';
                htmlMenu += '<div id="collapseUser" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
                htmlMenu += '   <div class="bg-white py-2 collapse-inner rounded">';
                htmlMenu += '       <h6 class="collapse-header">Opciones Usuarios:</h6>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/usuario">Usuarios</a>';
                htmlMenu += '   </div>';
                htmlMenu += '</div >';
            } else if (data.d.Resultado.USUARIO_PERFIL.ID === 4) {//Panel
                htmlMenu += '<a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseMascot" aria-expanded="true" aria-controls="collapseMascot">';
                htmlMenu += '   <i class="fas fa-fw fa-paw"></i><span>Mascota</span>';
                htmlMenu += '</a>';
                htmlMenu += '<div id="collapseMascot" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">';
                htmlMenu += '   <div class="bg-white py-2 collapse-inner rounded">';
                htmlMenu += '       <h6 class="collapse-header">Opciones Mascotas:</h6>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/mascota">Mascotas</a>';
                htmlMenu += '       <a class="collapse-item" href="#!/page/mantenimiento/citaMedica">Cita</a>';
                htmlMenu += '   </div>';
                htmlMenu += '</div >';
            }

            sessionStorage.clear();
            sessionStorage.setItem("ID", data.d.Resultado.ID);
            sessionStorage.setItem("NOMBRE", data.d.Resultado.NOMBRE);
            sessionStorage.setItem("APELLIDO", data.d.Resultado.APELLIDO);
            sessionStorage.setItem("SEXO", data.d.Resultado.SEXO);
            sessionStorage.setItem("PERFIL_ID", data.d.Resultado.USUARIO_PERFIL.ID);

            $(".menu-dinamic").html(htmlMenu);
            //closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });
}

function EnviarNotificacion(comprobante, idDoc) {
    $.ajax({
        type: "POST",
        url: "default.aspx/RegistrarNotificacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            comprobante: comprobante, idDoc: idDoc
        }),
        async: true,
        success: function (data) {
            if (data.d.error) {
                alert(data.d.error);
            }
        },
        error: function (data) { }
    });
}

function InfoNotificacionAlmacen() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoNotificacionAlmacen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.d.error) {
                return;
            }

            $("#header_notification_bar ul").empty();
            $("#header_notification_bar a span").html("0");

            if (data.d.length > 0) {
                var htmlNotif = '';
                for (var i = 0; i < data.d.length; i++) {
                    htmlNotif += '<li><a href="#!/' + data.d[i].co_comprobante_pago.trim() + '-' + data.d[i].nid_documento.toString() + '#!/page/almacen/ordenalmacen">' +
                        '<span class="label label-warning">Pendiente</span>' + data.d[i].no_comprobante_pago + ' ' + data.d[i].nu_documento + '</a>';
                }

                $("#header_notification_bar a span").html(data.d.length.toString());
                $("#header_notification_bar ul").append(htmlNotif);

                $('#audio_fca')[0].play(); //Emite sonido de alerta
            }
        },
        error: function (data) { }
    });
}

function InfoNotificacionUsuario() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoNotificacionVenta",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.d.error) {
                return;
            }

            $("#header_notification_bar ul").empty();

            var htmlNotif = '<div class="notify-arrow notify-arrow-yellow"></div><li><p class="yellow">Usted tiene ' + data.d.length.toString() + ' notificacion(es)</p></li>';

            for (var i = 0; i < data.d.length; i++) {
                htmlMenu += '<li><a href="#!/page/almacen/almacen#!/' + data.d[i].no_comprobante_pago + '-' + data.d[i].nid_documento.toString() + '">' +
                    '<span class="label label-warning">Pendiente</span>' + data.d[i].no_comprobante_pago + ' ' + data.d[i].nu_documento + '</a>';
            }

            $("#header_notification_bar a span").html(data.d.length.toString());
            $("#header_notification_bar ul").append(htmlMenu);
        },
        error: function (data) { }
    });
}

function fc_mostrar_confirmacion(contenido) {
    $("#txtContenido").html(contenido);
    $("#modalConfirm").modal('show');
}

function fc_aceptar_confirmacion() {
    aceptarConfirm();
    $("#modalConfirm").modal('hide');
}

function openNav() {
    $("#mySidenav").css("width", "350px");
    $(".backdrop-fcp").css("display", "block");
}

function closeNav() {
    $("#mySidenav").css("width", "0px");
    $(".backdrop-fcp").css("display", "none");
}

function openLoading() {
    $("#page-loader").show();
}

function closeLoading() {
    $("#page-loader").hide();
}