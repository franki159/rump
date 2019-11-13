var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
//Variacion de la zona horaria
$(function () {
    closeLoading();
    $(document).prop("title", "::Inicio");
    $(document).unbind("keydown");   

    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    $.ajax({
        type: "POST",
        url: "page/inicio.aspx/ObtenerCuentaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        beforeSend: function () { },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorUsuario").html(GenerarAlertaError(data.d.Mensaje));
                return;
            }

            $("#txt_nombre").val(data.d.Resultado.NOMBRE);
            $("#txt_apellido").val(data.d.Resultado.APELLIDO);
            $("#sel_sexo").val(data.d.Resultado.SEXO).change();
            $("#txt_telefono").val(data.d.Resultado.TELEFONO);
            $("#txt_celular").val(data.d.Resultado.CELULAR);

            if (data.d.Resultado.FECHA_NAC !== null) {
                $("#txt_fecha_nac").val(formatDate(parseDateServer(data.d.Resultado.FECHA_NAC), "dd/MM/yyyy")).change();
                $("#txt_fecha_nac").parent().datepicker("update", $("#txt_fecha_nac").val());
            }

            if (data.d.Resultado.FOTO != '' && data.d.Resultado.FOTO != null) {
                $('.imagePreview').css("background-image", "url(../../img/usuario/" + data.d.Resultado.FOTO + "?v=" + valRND + ")");
            }
        },
        error: function (data) {
            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) {
                return false;
            }
            break;
        case 13: //BLOQUEA ENTER
            if ($("#modalConfirm").css('display') === 'block') 
                $("#btnAceptar").click();
            if ($("#pnl_reserva").css('display') === 'block') 
                $("#btn_guardar").click();
            if ($("#pnl_atencion_a").css('display') === 'block')
                $("#btn_guardar_a").click();
            if ($("#pnl_atencion_h").css('display') === 'block')
                $("#btn_guardar_h").click();
            break;
    }
});

function guardarImagen(evt, nameId, file) {
    var objResp = 0;
    var dataImagen = new FormData();
    dataImagen.append('file', file);
    dataImagen.append('name', nameId);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenUsuario.ashx",
        data: dataImagen,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            //msg_OpenDay("c", "Mascota guardada correctamente");
            objResp = 0;
        },
        error: function (err) {
            //msg_OpenDay("e", "Error al guardar imagen");
            objResp = 1;
        }
    });

    return objResp;
}

$("#btn_actualizar_cuenta").click(function (evt) {
    $("#btn_actualizar_cuenta").button('loading');

    $("#errorUsuario").html('');

    if (validIdInput($("#txt_nombre").val()) || validIdInput($("#txt_apellido").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Nombre: Debe ingresar el nombre y el apellido"));
        closeLoading();
        activaTab('dato');
        $("#txt_nombre").focus();
        return;
    } else if (validIdInput($("#sel_sexo").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Sexo: ingresar el sexo"));
        closeLoading();
        activaTab('dato');
        $("#txt_fecha_nac").focus();
        return;
    } else if (validIdInput($("#txt_fecha_nac").val())) {
        $("#errorUsuario").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida"));
        closeLoading();
        activaTab('dato');
        $("#txt_fecha_nac").focus();
        return;
    }

    var eUsuario = {
        NOMBRE: $("#txt_nombre").val(),
        APELLIDO: $("#txt_apellido").val(),
        FECHA_NAC: getDateFromFormat($("#txt_fecha_nac").val(), 'dd/MM/yyyy'),
        TELEFONO: $("#txt_telefono").val(),
        CELULAR: $("#txt_celular").val(),
        SEXO: $("#sel_sexo").val()
    };

    $.ajax({
        type: "POST",
        url: "page/inicio.aspx/ActualizarCuentaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eUsuario }),
        async: true,
        beforeSend: function () { },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorUsuario").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $("#errorUsuario").html(GenerarAlertaSuccess(data.d.Mensaje));

            valRND = Math.floor(Math.random() * 1000);

            $(".container-file").find($("input")).each(function () {
                if ($(this).get(0).files.length !== 0) {
                    var imgTemp = $(this)[0].files[0];

                    eUsuario = {
                        ID_ENCRIP: data.d.Resultado,
                        EXTENSION: getExtension(imgTemp.name)
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/inicio.aspx/InsertarFotoCuentaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: eUsuario }),
                        async: false,
                        success: function (dataImg) {
                            if (!dataImg.d.Activo) {
                                $("#errorUsuario").html(GenerarAlertaError(dataImg.d.Mensaje));
                                closeLoading();
                                return;
                            }

                            guardarImagen(evt, dataImg.d.Resultado, imgTemp);

                            $("#errorUsuario").html(GenerarAlertaSuccess(dataImg.d.Mensaje));
                        },
                        error: function (data) {
                            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
                            closeLoading();
                        }
                    });

                    event.preventDefault();
                }
            });
            closeLoading();
        },
        error: function (data) {
            $("#errorUsuario").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_actualizar_cuenta").button('reset');
        }
    });
    event.preventDefault();
});