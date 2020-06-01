var valRND = Math.floor(Math.random() * 100);
$(document).ready(function () {
    $('.continue').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });
    closeLoading();
    InfoSesion();
    fc_listar_inicio();
    $("#pnl_mascota_mensaje").modal('show');
    //closeLoading();
});
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
function InfoSesion() {
    $.ajax({
        type: "POST",
        url: "index.aspx/InfoSesionWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data, status) {
            if (!data.d.Activo) {
                $("#divLoginUser").html('<a href="InicioSesion"><strong class="hidden-phone">Iniciar Sesión</br></strong> </br></a><a href="InicioSesion"><i class="fa fa-user-circle" aria-hidden="true"/></a>');
            } else {
                $("#divLoginUser").html('<a href="Sistema"><strong>' + data.d.Resultado.NOMBRE.split(" ")[0] + " " + data.d.Resultado.APELLIDO.split(" ")[0] + '<br></strong> <br></a><i class="fa fa-user - circle" aria-hidden="true"></i>');

            }
        },
        error: function (data) {
            closeLoading();
        }
    });
}
function fc_listar_inicio() {
    /************************ Listado de Tipo ****************************/
    var objE = {
        CODIGO: "TIPO"
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_tipo').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }
            
            $('#sel_tipo').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });

    /************************ Departamento ****************************/
    objE = {
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
function openLoading() {
    $("#page-loader").show();
}
function closeLoading() {
    $("#page-loader").hide();
}

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

$(".reportar-msct-etv").click(function () {
    $("#pnl_report_mascota").modal();
});

$(".send-email-contact").click(function () {
    if ($("#txt_nombre").val().trim() === "") {
        $("#errorMail").html(GenerarAlertaWarning("Nombre: Ingrese su nombre"));
        $("#txt_nombre").focus();
        return;
    } else if (isEmail($("#txt_email").val().trim()) === false) {
        $("#errorMail").html(GenerarAlertaWarning("Correo: Ingrese un correo válido"));
        $("#txt_email").focus();
        return;
    } else if (validIdInput($("#txt_celular").val())) {
        $("#errorMail").html(GenerarAlertaWarning("Celular: Ingrese un celular válido"));
        $("#txt_celular").focus();
        return;
    } else if ($("#txt_mensaje").val().trim() === "") {
        $("#errorMail").html(GenerarAlertaWarning("Mensaje: Ingrese un mensaje válido"));
        $("#txt_mensaje").focus();
        return;
    }

    var objE = {
        NOMBRE: $("#txt_nombre").val(),
        CORREO: $("#txt_correo").val(),
        CELULAR: $("#txt_celular").val(),
        TELEFONO: $("#txt_telefono").val(),
        OBSERVACION: $("#txt_mensaje").val()
    };

    $.ajax({
        type: "POST",
        url: "index.aspx/EnviarMensajeWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $("#page-loader").show();
        },
        success: function (data, status) {
            $("#page-loader").hide();
            if (!data.d.Activo) {
                $("#errorMail").html(GenerarAlertaError(data.d.Mensaje));
            } else {
                $("#pnl_report_mascota").modal('hide');
                msg_OpenDay("c", data.d.Mensaje);
            }
        },
        error: function (data) {
            $("#page-loader").hide();
            $("#errorMail").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
});

$("#btn_reportar_mascota").click(function () {
    if ($("#txt_dni_mascota").val().trim() === "") {
        $("#errorReporte").html(GenerarAlertaWarning("Codigo: Ingrese el codigo de la chapita"));
        $("#txt_dni_mascota").focus();
        return;
    } else if (isEmail($("#txt_correo").val().trim()) === false) {
        $("#errorReporte").html(GenerarAlertaWarning("Correo: Ingrese un correo válido"));
        $("#txt_correo").focus();
        return;
    } else if ($("#txt_telefono").val().trim() === "" || $("#txt_telefono").val().length < 7) {
        $("#errorReporte").html(GenerarAlertaWarning("Telefono: Ingrese un teléfono válido"));
        $("#txt_telefono").focus();
        return;
    }

    var objE = {
        DNI: $("#txt_dni_mascota").val(),
        FEC_CREA: $("#txt_fecha").val() === "" ? null : getDateFromFormat($("#txt_fecha").val(), 'yyyy-MM-dd'),
        NOMBRE: $("#txt_nombre").val(),
        CORREO: $("#txt_correo").val(),
        TELEFONO: $("#txt_telefono").val(),
        OBSERVACION: $("#txt_observacion").val()
    };
   
    $.ajax({
        type: "POST",
        url: "index.aspx/ReportarMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $("#page-loader").show();
        },
        success: function (data, status) {
            $("#page-loader").hide();
            if (!data.d.Activo) {
                $("#errorReporte").html(GenerarAlertaError(data.d.Mensaje));
            } else {
                $("#pnl_report_mascota").modal('hide');
                msg_OpenDay("c", data.d.Mensaje);
            }
        },
        error: function (data) {
            $("#page-loader").hide();
            $("#errorReporte").html(GenerarAlertaError("Inconveniente en la operación"));
        }
    });
    
    
});

/******************** PRE-REGISTRO *****************/
$("#sel_tipo").on('change', function () {
    /************************ Listado de Raza ****************************/
    var objE = {
        CODIGO: "RAZA",
        vPARAM1: $("#sel_tipo").val()
    };

    if ($("#sel_tipo").val() === '') {
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
            $('#errorMascota').html("");
            $('#sel_raza').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                closeLoading();
                return;
            }

            $('#sel_raza').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_raza').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }
            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
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
            closeLoading();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#customFile").on('change', function () {
    if (validateSize(this) === false) {
        alert("El archivo es demasiado grande");
    } else {
        var fileName = document.getElementById("customFile").files[0].name;
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    }
});
$(".btn-pre-registrar").click(function () {
    $("#pnl_pre_registro").modal();
});

function guardarImagen(evt, nameId, file) {
    var objResp = 0;
    var dataImagen = new FormData();
    dataImagen.append('file', file);
    dataImagen.append('name', nameId);

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/hh_imagenMascota.ashx",
        data: dataImagen,
        async: false,
        contentType: false,
        processData: false,
        success: function (result) {
            objResp = 0;
        },
        error: function (err) {
            objResp = 1;
        }
    });

    return objResp;
}

$("#btn_registrar").click(function (evt) {
    $("#errorRegistro").html('');
    openLoading();
    if (validIdInput($("#txt_nombre_pre").val()) || validIdInput($("#txt_apellido_pre").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Nombre: Debe Ingresar el nombre y el apellido"));
        closeLoading();
        activaTab('propietario');
        $("#txt_nombre_pre").focus();
        return; 
    } else if (isEmail($("#txt_correo_pre").val()) === false) {
        $("#errorRegistro").html(GenerarAlertaWarning("Email: Ingrese un email válido"));
        closeLoading();
        activaTab('propietario');
        $("#txt_correo_pre").focus();
        return;
    } else if (validIdInput($("#txt_password_pre").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Password: Ingrese una contraseña"));
        closeLoading();
        activaTab('propietario');
        $("#txt_password_pre").focus();
        return;
    } else if (validIdInput($("#txt_telefono_pre").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Telefono: ingresar un número teléfono"));
        closeLoading();
        activaTab('propietario');
        $("#txt_telefono_pre").focus();
        return;
    } else if (validIdInput($("#txt_nombre_masc").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Nombre: Ingresar el nombre de la mascota"));
        closeLoading();
        activaTab('mascota');
        $("#txt_nombre_masc").focus();
        return;
    } else if (validIdInput($("#txt_apellido_masc").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Apellido: Ingresar el apellido de la mascota"));
        closeLoading();
        activaTab('mascota');
        $("#txt_apellido_masc").focus();
        return;
    } else if (validIdInput($("#txt_nombre_padre").val()) && validIdInput($("#txt_nombre_madre").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Familia: Ingresar el nombre del padre o de la madre"));
        closeLoading();
        activaTab('mascota');
        $("#txt_nombre_padre").focus();
        return;
    } else if (isDate($("#txt_fecha_nac").val(), "yyyy-MM-dd")===false) {
        $("#errorRegistro").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida dd/MM/yyyy"));
        closeLoading();
        activaTab('mascota');
        $("#txt_fecha_nac").focus();
        return;
    } else if (validIdInput($("#sel_sexo").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Sexo: seleccione el sexo de su mascota"));
        closeLoading();
        activaTab('mascota');
        $("#sel_sexo").focus();
        return;
    } else if (validIdInput($("#sel_tipo").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Especie: seleccione una especie"));
        closeLoading();
        activaTab('mascota');
        $("#sel_tipo").focus();
        return;
    } else if (validIdInput($("#sel_raza").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Raza: seleccione una raza"));
        closeLoading();
        activaTab('mascota');
        $("#sel_raza").focus();
        return;
    } else if (validIdInput($("#sel_calificacion").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Raza: seleccione una calificación"));
        closeLoading();
        activaTab('mascota');
        $("#sel_calificacion").focus();
        return;
    } else if (validIdInput($("#txt_color").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Color: Ingrese un color de pelaje"));
        closeLoading();
        activaTab('mascota');
        $("#txt_color").focus();
        return;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Dirección: Ingrese la dirección de la mascota"));
        closeLoading();
        activaTab('mascota');
        $("#txt_direccion").focus();
        return;
    } else if (validIdInput($("#sel_departamento").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        closeLoading();
        activaTab('mascota');
        $("#sel_departamento").focus();
        return;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        closeLoading();
        activaTab('mascota');
        $("#sel_provincia").focus();
        return;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorRegistro").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        closeLoading();
        activaTab('mascota');
        $("#sel_distrito").focus();
        return;
    }
  
    var eMascota = {
        //Propietario*******
        NOMBRE_PRE: $("#txt_nombre_pre").val(),
        APELLIDO_PRE: $("#txt_apellido_pre").val(),
        CORREO: $("#txt_correo_pre").val(),
        TELEFONO: $("#txt_telefono_pre").val(),
        DNI: $("#txt_documento_pre").val(),
        PASSWORD: $("#txt_password_pre").val(),
        //Mascota***********
        NOMBRE: $("#txt_nombre_masc").val(),
        APELLIDO: $("#txt_apellido_masc").val(),
        FAMILIARP: $("#txt_nombre_padre").val(),
        FAMILIARM: $("#txt_nombre_madre").val(),
        FEC_NAC: $("#txt_fecha_nac").val() === "" ? null : getDateFromFormat($("#txt_fecha_nac").val(), 'yyyy-MM-dd'),
        SEXO: $("#sel_sexo").val(),
        MASCOTA_RAZA_ID: $("#sel_raza").val(),
        CALIFICACION: $("#sel_calificacion").val(),
        COLOR: $("#txt_color").val(),
        DIRECCION: $("#txt_direccion").val(),
        GEOGRAFIA_ID: $("#sel_distrito").val()
    };

    $.ajax({
        type: "POST",
        url: "index.aspx/preRegistrarMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eMascota }),
        async: true,
        beforeSend: function () {
            $("#pnl_pre_registro").css("pointer-events", "none");
        },
        success: function (data) {
            if (!data.d.Activo) {
                alert(data.d.Mensaje);
                $("#pnl_pre_registro").css("pointer-events", "visible");
                closeLoading();
                return;
            }
            //Guardando Foto
            if ($("#customFile").get(0).files.length !== 0) {
                var imgTemp = $("#customFile")[0].files[0];

                eMascota = {
                    ID_ENCRIP: data.d.Resultado,
                    EXTENSION: getExtension(imgTemp.name),
                    GALERIA_ID: 0
                };

                $.ajax({
                    type: "POST",
                    url: "page/mantenimiento/mascota.aspx/InsertarFotoMascotaWM",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify({ objE: eMascota }),
                    async: false,
                    success: function (dataImg) {
                        if (!dataImg.d.Activo) {
                            closeLoading();
                            $("#pnl_pre_registro").modal('hide');
                            msg_OpenDay("e", "No se pudo registrar imagen");
                            return;
                        }

                        guardarImagen(evt, dataImg.d.Resultado, imgTemp);

                        window.location = "Sistema";
                    },
                    error: function (data) {
                        $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
                        closeLoading();
                    }
                });
            } else {
                window.location = "Sistema";
            }
        },
        error: function (data) {
            $("#errorRegistro").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_pre_registro").css("pointer-events", "visible");
            closeLoading();
        }
    });
});
/******************** /PRE-REGISTRO *****************/
/******************** VAR DATOS POR DNI **********************/
function showDatosMascota(p_dni) {
    openLoading();
    var eMascota = {
        DNI: p_dni
    };

    $.ajax({
        type: "POST",
        url: "index.aspx/ObtenerMascotaxDNIWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eMascota }),
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                msg_OpenDay("e", "Error al consultar el DNI");
                closeLoading();
                return;
            }

            if (data.d.Resultado.ID === 0) {
                msg_OpenDay("e", "El dni es incorrecto");
                closeLoading();
                return;
            }

            $(".dni-nom-msc").html(data.d.Resultado.NOMBRE);
            $(".dni-ape-msc").html(data.d.Resultado.APELLIDO);
            $(".dni-sex-msc").html(data.d.Resultado.SEXO);

            var calificacion = data.d.Resultado.CALIFICACION;
            switch (calificacion) {
                case "Rojo":
                    calificacion = "AGRESIVO"; break;
                case "Verde":
                    calificacion = "AMISTOSO"; break;
                case "Blanco":
                    calificacion = "DISCAPACITADO"; break;
                case "Azul":
                    calificacion = "ENTRENADO"; break;
                case "Amarillo":
                    calificacion = "MIEDOSO"; break;
                case "Naranja":
                    calificacion = "PELEADOR"; break;
            }

            if (data.d.Resultado.lMASCOTA.length > 0)
                $("#imgMascotaCita").attr("src", "img/mascota/" + data.d.Resultado.lMASCOTA[0].FOTO + '?v=' + valRND);

            $(".dni-cal-msc").html(calificacion);
            $(".dni-esp-msc").html(data.d.Resultado.TIPO);
            $(".dni-raz-msc").html(data.d.Resultado.RAZA);
            $(".dni-bio-msc").html(data.d.Resultado.BIOGRAFIA);
            //Padres
            $(".dni-nom-padre").html(data.d.Resultado.FAMILIARP);
            $(".dni-tel-padre").html(data.d.Resultado.TELEFONOP);
            $(".dni-nom-madre").html(data.d.Resultado.FAMILIARM);
            $(".dni-tel-madre").html(data.d.Resultado.TELEFONOM);
            //Direccion
            $(".dni-dep-msc").html(data.d.Resultado.DEPARTAMENTO);
            $(".dni-prov-msc").html(data.d.Resultado.PROVINCIA);
            $(".dni-dist-msc").html(data.d.Resultado.DISTRITO);
            $(".dni-dir-msc").html(data.d.Resultado.DIRECCION);
            $(".dni-ref-msc").html(data.d.Resultado.REFERENCIA);

            closeLoading();
            $("#pnl_mascota_codigo").modal();
        },
        error: function (data) {
            msg_OpenDay("e", "Error al consultar el DNI");
            closeLoading();
        }
    });
}
function getMascotaRF(p_dni) {
    $("#pnl_reconoc_facial").modal('hide');
    showDatosMascota(p_dni);
}
$(".btn-dat-msc").click(function (evt) {
    if (validIdInput($("#bus_txt_dni").val())) {
        msg_OpenDay("a", "Debe ingresar el número de DNI de la mascota");
        return;
    }    
    showDatosMascota($("#bus_txt_dni").val());
});
$(".btn-recog-face").click(function (evt) {
    //$("#pnl_reconoc_facial").modal();
    window.open("WebRecognition/Recognition/Index", '_blank');
});

