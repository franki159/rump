var _globalNotificacion;

function documentLoad() {
    var url = $(location).attr('href');

    if (url.indexOf("#!") !== -1) {
       
        var elem = url.split("#!/");
        var get = elem[elem.length - 1];
        
        get = get.split('?')[0];
        
        $(".wrapper").empty().html("Cargando...");

        $.get(get + '.aspx', function (data) {
            $(".wrapper").html(data);

            if ($("#sidebar").css("position") === "absolute") $('#sidebar > ul').hide();

            $('body, html').animate({
                scrollTop: 0
            }, 1000);
        }).fail(function () {
            $(".wrapper").empty().html(GenerarAlertaWarning("No disponible."));
        });

    } else {
        //$.get('page/operacion/RUMPmovimiento.aspx#', function (data) {
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

    //InfoSesion();
    //fc_listar_total_alertas();

    $("#cerrarSesion").click(function () {
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
    //Listar Configuracion
    //$.ajax({
    //    type: "POST",
    //    url: "default.aspx/GetParametros",
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    data: JSON.stringify({ opcion: "COMPROBANTE" }),
    //    async: true,
    //    success: function (data) {
    //        if (!data.d.Activo) {
    //            $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
    //            $("#pleaseWaitDialog").modal('hide');
    //            return;
    //        }

    //        for (var i = 0; i < data.d.Resultado.ListaParametro.length; i++) {
    //            $('#cmbComprobante').append("<option value='" + data.d.Resultado.ListaParametro[i].CODIGO + "'>" + data.d.Resultado.ListaParametro[i].DESCRIPCION + "</option>");
    //        }
    //    },
    //    error: function (data) {
    //        $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
    //        $("#pleaseWaitDialog").modal('hide');
    //    }
    //});
});

function InfoSesion() {
    var objE = {
        ID: getUrlParameter('token')
    };
    
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        success: function (data, status) {
            if (!data.d.Activo) {
                alert(data.d.Mensaje);
                window.location = "https://worldpetsperu.com";
                return;
            }
            $(".username").text(data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0]);
            /************************MENU****************************/
            var htmlMenu = '';

            htmlMenu += '<li class="sub-menu">' +
                '<a href="javascript:;" >' +
                '<i class="fa fa-paw"></i>' +
                '<span>Mascota</span>' +
                '</a><ul class="sub">';

            if (data.d.Resultado.PERFIL_ID === 1) {//Administrador                
                htmlMenu += '<li><a  href="https://worldpetsperu.com/asesorpanel/dni">Imprimir DNI</a></li>';
                htmlMenu += '<li><a  href="#!/page/mantenimiento/mascota">Editar Mascota</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/administradorpanel/cliente">Administrar Clientes</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/administradorpanel/asesor">Administrar Asesores</a></li>';
            } else if (data.d.Resultado.PERFIL_ID === 3) {//Asesor
                htmlMenu += '<li><a  href="#!/page/mantenimiento/mascota">Registrar Mascota</a></li>';
                htmlMenu += '<li><a  href="#!/page/mantenimiento/mascota">Editar Mascota</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/asesorpanel/dni">Imprimir DNI</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/asesorpanel/obtenermascota">Listar Mascotas</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/asesorpanel/registrarpropietario">Dueño de Mascota</a></li>';
            } else if (data.d.Resultado.PERFIL_ID === 4) {//Panel
                htmlMenu += '<li><a  href="#!/page/mantenimiento/mascota">Registrar Mascotas</a></li>';
                htmlMenu += '<li><a  href="https://worldpetsperu.com/mipanel/adopcion">En adopción</a></li>';
            } 

            htmlMenu += '</ul></li>';
            $(".sidebar-menu").html('<li><a href = "https://worldpetsperu.com" ><i class="icon-home"></i><span>Inicio</span></a></li>');
            $(".sidebar-menu").append(htmlMenu);
            sessionStorage.clear();
            sessionStorage.setItem("ID", data.d.Resultado.ID);
            sessionStorage.setItem("NOMBRE", data.d.Resultado.NOMBRE);
            sessionStorage.setItem("APELLIDO", data.d.Resultado.APELLIDO);
            sessionStorage.setItem("SEXO", data.d.Resultado.SEXO);
            sessionStorage.setItem("PERFIL_ID", data.d.Resultado.PERFIL_ID);
            
        },
        error: function (data) { }
    });
    $.getScript("js/all/common-scripts.js")
            .fail(function (jqxhr, settings, exception) {
                alert("Error: No se ha cargando un complemento del sistema (common-scripts.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
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

function fc_listar_total_alertas() {
    $.ajax({
        type: "POST",
        url: "default.aspx/ListaTotalAlertaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.d.error) {
                return;
            }
            //alert(data.d.Resultado.toString());
            var pNotif = data.d.Resultado;
            if (pNotif > 0) {
                $("#header_notification_bar").show();
            } else {
                $("#header_notification_bar").hide();
            }

            $(".cantidadNotificaciones").html(pNotif);
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
        }
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