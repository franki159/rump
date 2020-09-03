var valRND = Math.floor(Math.random() * 100);
var g_id_mascota = 0;
var g_id_sol = 0;
/*Inicializar Script*/
//Variacion de la zona horaria
$(document).ready(function () {
    fc_listar_inicio();
    InfoSesion();
    closeLoading();
    $(document).prop("title", "::Pago");
    $(document).unbind("keydown"); 
});

function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "default.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (data, status) {
            if (!data.d.Activo) {
                alert(data.d.Mensaje);
                window.location = "InicioSesion";
                return;
            }

            $(".name_user").text(data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0]);
            $(".img-user-rump").attr("src", "img/usuario/" + data.d.Resultado.FOTO);
            $(".name_perfil").html('<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400 name_perfil"></i>' + MaysPrimera(data.d.Resultado.USUARIO_PERFIL.PERFIL));
            
            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });
}
function fc_listar_inicio() {
    //get session solicitud
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/getCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR" || data.d.Mensaje === "NS") {
                    window.location = "Sistema";
                    return;
                } else {
                    msg_OpenDay('e', data.d.Mensaje);
                    closeLoading();
                    return;
                }
            }

            fc_listar_item_carrito(data.d.Resultado);

            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });

    /************************ Departamento ****************************/
    var objE = {
        CODIGO: "DEPARTAMENTO"
    };
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            $('#sel_departamento').append("<option></option>");
            $('#sel_departamento_cita').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_departamento').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                $('#sel_departamento_cita').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function fc_listar_item_carrito(listaCarrito) {
    //listando los items del carrito
    var html_cont = '';
    var acu_total = 0;
    for (var i = 0; i < listaCarrito.length; i++) {
        html_cont += ' <div class="alert alert-dismissible alert-primary bg-white">' +
            '      <div class="row">' +
            '          <div class="col-md-1 mw-100">' +
            '              <img onerror="this.src=\'img/noPets.png\';" src="img/productos/' + listaCarrito[i].FOTO + '" alt="" border="0">' +
            '          </div>' +
            '          <div class="col-md-7 font-weight-bold my-auto">' + listaCarrito[i].DESCRIPCION + '</div>' +
            '          <div class="col-md-4 my-auto">' +
            '              <div class="row">' +
            '                  <div class="col-md-12 mb-2">' +
            '                      <span>Cantidad</span>' +
            '                      <div class="float-right">' +
            '                       <button class="btn btn-3-default" onclick="javascript:fc_del_carrito(\'' + listaCarrito[i].ID_ENCRIP + '\', \'' + listaCarrito[i].ID_MSC_ENCRIP + '\', 1)">-</button>' +
            '                       <span class="btn btn-default"> ' + listaCarrito[i].CANTIDAD + ' </span>' +
            '                       <button class="btn btn-3-default" onclick="javascript:fc_add_carrito(\'' + listaCarrito[i].ID_ENCRIP + '\', \'' + listaCarrito[i].ID_MSC_ENCRIP + '\')">+</button></div > ' +
            '                  </div>' +
            '                  <div class="col-md-12 mb-2">' +
            '                      <span>Precio Unidad</span><div class="float-right">S/ ' + nwformatNumber(listaCarrito[i].PRECIO, 2) + '</div>' +
            '                  </div>' +
            '                  <div class="col-md-12 mb-2">' +
            '                      <span class="font-weight-bold">Precio Total</span><div class="float-right text-danger font-weight-bold">S/ ' + nwformatNumber(listaCarrito[i].PRECIO * listaCarrito[i].CANTIDAD, 2) + '</div>' +
            '                  </div>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <button class="close" onclick="javascript:fc_del_carrito(\'' + listaCarrito[i].ID_ENCRIP + '\', \'' + listaCarrito[i].ID_MSC_ENCRIP + '\', 2)" aria-label="Close" type="button"><span aria-hidden="true"><i class="fas fa-trash-alt"></i></span></button>' +
            '  </div>';
        acu_total += listaCarrito[i].PRECIO * listaCarrito[i].CANTIDAD;
    }

    $(".multisteps-form__form .body-items").html(html_cont);
    $(".multisteps-form__form").css("height", $(".multisteps-form__form .js-active").css("height"));

    $(".dsc-pre-pag").html("S/. " + nwformatNumber(acu_total, 2));
    $(".dsc-tot-pag").html("S/. " + nwformatNumber(acu_total, 2));
}
function fc_del_carrito(idSolicitud, idMascota, pOpcion) {
    var objE = {
        ID_ENCRIP: idSolicitud,
        ID_MSC_ENCRIP: idMascota,
        OPCION: pOpcion
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/delCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR") {
                    window.location = "Sistema";
                    return;
                } else {
                    msg_OpenDay('e', data.d.Mensaje);
                    closeLoading();
                    return;
                }
            }
            $("#copiaModal").modal("hide");
            fc_listar_item_carrito(data.d.Resultado);

            closeLoading();

        },
        error: function (data) {
            $("#copiaModal").modal("hide");
            closeLoading();
        }
    });
}
function fc_add_carrito(idSolicitud, idMascota) {
    var objE = {
        ID_ENCRIP: idSolicitud,
        ID_MSC_ENCRIP: idMascota
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/addCarritoItemWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR") {
                    window.location = "Sistema";
                    return;
                } else {
                    msg_OpenDay('e', data.d.Mensaje);
                    closeLoading();
                    return;
                }
            }
            $("#copiaModal").modal("hide");
            fc_listar_item_carrito(data.d.Resultado);

            closeLoading();
        },
        error: function (data) {
            $("#copiaModal").modal("hide");
            closeLoading();
        }
    });
}
function fc_sav_carrito(p_sync, p_tipo, p_url) {
    var objE = {
        NOM_REP: $("#txt-nom").val(),
        APE_REP: $("#txt-ape").val(),
        TEL_REP: $("#txt-tel").val(),
        DNI_REP: $("#txt-dni").val(),
        DIRECCION: $("#txt_direccion").val(),
        REFERENCIA: $("#txt_referencia").val(),
        GEOGRAFIA_ID: $("#sel_distrito").val()
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/guardarPedidoWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: p_sync,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaWarning(data.d.Mensaje));
                closeLoading();
                return false;
            }            
            
            if (p_tipo === "card") {
                closeLoading();
                window.location = p_url;
            } else if (p_tipo === "money" || p_tipo ==="bank") {
                //pagando con pago efectivo
                $.ajax({
                    type: "POST",
                    url: "page/paymentGen.aspx/response_pagoefectivo_mp",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: true,
                    success: function (dataPay) {
                        if (!data.d.Activo) {
                            if (data.d.Mensaje === "SR") {
                                window.location = "Sistema";
                                return;
                            } else {
                                msg_OpenDay('e', data.d.Mensaje);
                                closeLoading();
                                return;
                            }
                        }

                        window.location = dataPay.d.Resultado.TransactionDetails.ExternalResourceUrl;
                    },
                    error: function (dataPay) {
                        $("#errorDiv").html(GenerarAlertaWarning(dataPay.d.Mensaje));
                        closeLoading();
                        return false;
                    }
                });
            }
            
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaWarning(data.d.Mensaje));
            closeLoading();
            return false;
        }
    });
}

$("#sel_departamento").on('change', function () {
    /************************ Listado de Provincia ****************************/
    var objE = {
        CODIGO: "PROVINCIA",
        vPARAM1: $("#sel_departamento").val()
    };

    if ($("#sel_departamento").val() === '') {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#sel_provincia').empty();
            $("#sel_distrito").empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            $('#sel_provincia').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_provincia').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $(".dsc-env-pag").html("S/. -");
            $(".dsc-tot-pag").html($(".dsc-pre-pag").html());

            closeLoading();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_provincia").on('change', function () {
    /************************ Listado de Distrito ****************************/
    var objE = {
        CODIGO: "DISTRITO",
        vPARAM1: $("#sel_departamento").val(),
        vPARAM2: $("#sel_provincia").val()
    };

    if ($("#sel_provincia").val() === '') {
        return false;
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $('#sel_distrito').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            $('#sel_distrito').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            $(".dsc-env-pag").html("S/. -");
            $(".dsc-tot-pag").html($(".dsc-pre-pag").html());

            closeLoading();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_distrito").on('change', function () {
    //get delivery
    var objE = {
        GEOGRAFIA_ID: $("#sel_distrito").val()
    };
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/solicitud.aspx/getDeliveryWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                if (data.d.Mensaje === "SR") {
                    window.location = "Sistema";
                    return;
                } else {
                    msg_OpenDay('e', data.d.Mensaje);
                    closeLoading();
                    return;
                }
            }
            
            var acu_total = 0;
            for (var i = 0; i < data.d.Resultado.Carrito.length; i++) {
                acu_total += data.d.Resultado.Carrito[i].PRECIO * data.d.Resultado.Carrito[i].CANTIDAD;
            }
            
            $(".dsc-pre-pag").html("S/. " + nwformatNumber(acu_total, 2));
            $(".dsc-env-pag").html("S/. " + nwformatNumber(data.d.Resultado.Envio, 2));
            $(".dsc-tot-pag").html("S/. " + nwformatNumber(acu_total + data.d.Resultado.Envio, 2));

            closeLoading();
        },
        error: function (data) {
            closeLoading();
        }
    });    
});

$("#btn-domicilio").click(function () {
    //Validar Recibe
    $("#errorDiv").html("");
    if (validIdInput($("#txt-nom").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Nombre: Ingrese nombre"));
        $("#txt-nom").focus();
        return false;
    } else if (validIdInput($("#txt-ape").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Apellido: Ingrese apellido"));
        $("#txt-ape").focus();
        return false;
    } else if (validIdInput($("#txt-tel").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Telefono: Ingrese telefono"));
        $("#txt-tel").focus();
        return false;
    } else if (validIdInput($("#txt-dni").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("DNI: Ingrese DNI"));
        $("#txt-dni").focus();
        return false;
    } else if (validIdInput($("#sel_departamento").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        $("#sel_departamento").focus();
        return false;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        $("#sel_provincia").focus();
        return false;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        $("#sel_distrito").focus();
        return false;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Dirección: ingrese una Dirección"));
        $("#txt_direccion").focus();
        return false;
    } else if (validIdInput($("#txt_referencia").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("Referencia: ingrese una referencia"));
        $("#txt_referencia").focus();
        return false;
    }
});
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
$(".multisteps-form__content .btn-card-payment").click(function () {
    fc_sav_carrito(true, "card", "payment-mercadopago");
});

$(".multisteps-form__content .btn-money-payment").click(function () {
    fc_sav_carrito(true, "money", "payment-pending");
});

$(".multisteps-form__content .btn-bank-payment").click(function () {
    fc_sav_carrito(true, "bank", "payment-pending");
});

function openLoading() {
    $("#page-loader").show();
}

function closeLoading() {
    $("#page-loader").hide();
}
