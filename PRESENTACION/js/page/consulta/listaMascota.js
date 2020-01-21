var raza_id, prov_id, dis_id, foto_dsc;
var id_mascota, foto_id;
var _user_email;
var txh_idConfirm = "";
var valRND = Math.floor(Math.random() * 100);
/*Inicializar Script*/
$(function () {
    $(document).unbind("keydown");
    openLoading();
    $('.dtOp').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        orientation: "top left"
    });

    fc_listar_inicio();

    $("#txt_bus_dni").focus();
});
function fc_listar_inicio() {
    /************************ Listado de Tipo ****************************/
    if (sessionStorage.getItem('PERFIL_ID') === "4") {
        $("#divBusqueda").remove();
        fc_listar_mascota();
    } else {
        $("#divBusqueda").show();
    }
  
    var objE = {
        CODIGO: "TIPO"
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE}),
        async: false,
        beforeSend: function () {
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            ;
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
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
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

    listarClinicas();
    listarMedicos();
    listarTipoCita();
}
/*Funciones*/
function fc_listar_mascota() {
    if (sessionStorage.getItem('PERFIL_ID') !== "4" && $("#txt_bus_dni").val() === "") {
        closeLoading();
        return;
    }
    openLoading();

    var eMascota = {
        DNI: $("#txt_bus_dni").val(),
        USUARIO_ID: 0
    };

    if (sessionStorage.getItem('PERFIL_ID') === "4") {
        eMascota = {
            DNI: "",
            USUARIO_ID: sessionStorage.getItem('ID')
        };
    }

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ListaMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            objE: eMascota
        }),
        async: true,
        beforeSend: function () {
            $("#btn_buscar").attr("disabled", true);
            $('#tbl_mascota tbody').empty();
        },
        success: function (data) {
            $("#btn_buscar").removeAttr("disabled");

            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            
            var html = '';

            var formatButton = '<a class="dropdown-item d-flex align-items-center" style="cursor: pointer; color: #3a3b45;" {0}>';
            formatButton += '        <i class="{2}"></i>';
            formatButton += '        <div>';
            formatButton += '            <span class="font-weight-bold">&nbsp;&nbsp;{3}</span>';
            formatButton += '        </div>';
            formatButton += '    </a>';

            for (var i = 0; i < data.d.Resultado.length; i++) {
                var htmlBotones = '';
                htmlBotones += '<div class="dropdown-list dropdown-menu dropdown-menu-right shadow" aria-labelledby="row_' + i*100 +'">';
                htmlBotones += '    <h6 class="dropdown-header">';
                htmlBotones += '        Opciones de mascota';
                htmlBotones += '    </h6>';
                htmlBotones += formatButton.format('href="#" name="edit-mascota"', 'bg-primary', 'fas fa-pencil-alt', 'Editar');

                if (data.d.Resultado[i].ESTADO === 2) {//Sin DNI
                    htmlBotones += formatButton.format('name="soli-dni"', 'bg-success', 'fas fa-address-card', 'Solicitar DNI');
                } else if (data.d.Resultado[i].ESTADO === 3) {//En Adopcion
                    htmlBotones += formatButton.format('name="quit-adop"', 'bg-success', 'fas fa-tags', 'Quitar de adopción');
                } else if (data.d.Resultado[i].ESTADO === 1) {//Con DNI (no adopcion)
                    $('#sel_mascota').append("<option dni-msct='" + data.d.Resultado[i].DNI + "' value='" + data.d.Resultado[i].ID_ENCRIP + "'>" + data.d.Resultado[i].NOMBRE + "</option>");

                    htmlBotones += formatButton.format('name="rep-per"', 'bg-warning', 'far fa-sad-cry', 'Reportar perdida');
                    htmlBotones += formatButton.format('name="pon-adop"', 'bg-success', 'fas fa-tags', 'Poner en adopción');
                    htmlBotones += formatButton.format('name="sol-dup"', 'bg-success', 'fas fa-copy', 'Solicitudes y trámites');
                    htmlBotones += formatButton.format('name="cit-med"', 'bg-success', 'fas fa-clinic-medical', 'Nueva Cita Médica');
                    htmlBotones += formatButton.format('name="his-med"', 'bg-success', 'fas fa-notes-medical', 'Ver historial Médico');
                    htmlBotones += formatButton.format('name="mst-dead"', 'bg-danger', 'fas fa-radiation', 'Mascota falleció');
                } else if (data.d.Resultado[i].ESTADO === 4) {//Extraviada
                    htmlBotones += formatButton.format('name="rep-enc"', 'bg-success', 'fas fa-tags', 'Reportar mascota encontrada');
                }

                htmlBotones += formatButton.format('name="delete-mascota"', 'bg-danger', 'fas fa-trash-alt', 'Eliminar');

                htmlBotones += '</div>';
                   
                html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                html += '<td>';
                html += '   <ul class="navbar-nav ml-auto">';
                //html += '   <div class="dropdown">';
                html += '       <li class="nav-item dropdown no-arrow mx-1">';
                html += '           <a class="nav-link dropdown-toggle" href="#" id="row_' + i * 100 + '" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
                //html += '           <a class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="row_' + + i * 100 + '">';
                html += '               <i class="fas fa-bars" style="font-size: 30px;"></i>';
                html += '           </a>';
                html += '       ' + htmlBotones;
                //html += '           <div class="dropdown-menu" aria-labelledby="row_' + + i * 100 + '">';
                //html += '               <button class="dropdown-item" type = "button" > Action</button >';
                //html += '               <button class="dropdown-item" type="button">Another action</button>';
                //html += '               <button class="dropdown-item" type="button">Something else here</button>';
                //html += '           </div>';
                html += '       </li>';
                //html += '   </div>';
                html += '   </ul>';
                html += '</td> ';
                
                html += '<td>' +
                            '<div>' +
                                '<a href="#" name="detalles" id="' + data.d.Resultado[i].ID_ENCRIP + '" data-toggle="modal" data-target="#modalVerMascota">' +
                    '<img class="img-row-mascota" src="img/mascota/' + encodeURIComponent(data.d.Resultado[i].FOTO) + '?v=' + valRND +'" onerror="this.src=\'img/noPets.png\';">' +
                                '</a>' +
                            '</div>'+
                    '</td>'; 

                html += '<td>' + data.d.Resultado[i].DNI + '</td>';
                switch (data.d.Resultado[i].ESTADO) {
                    case 1:
                        html += '<td><i class="fas fa-check-circle text-success" style="font-size: 25px;"></i></td>';
                        break;
                    case 2:
                        html += '<td><span class="btn btn-danger btn-sm"><i class="far fa-credit-card"></i>&nbsp;NO PAGO</span></td>';
                        break;
                    case 3:
                        html += '<td><span class="btn btn-info btn-sm"><i class="fas fa-tags"></i>&nbsp;EN ADOPCION</span></td>';
                        break;
                    case 4:
                        html += '<td><span class="btn btn-warning btn-sm"><i class="far fa-sad-cry"></i>&nbsp;EXTRAVIADA</span></td>';
                        break;
                    case 5:
                        html += '<td><span class="btn btn-danger btn-sm"><i class="fas fa-radiation"></i>&nbsp;FALLECIDO</span></td>';
                        break;
                    default:
                        html += '<td><span class="btn btn-danger btn-sm"><i class="fas fa-radiation"></i>&nbsp;--</span></td>';
                        break;                    
                }

                html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                html += '<td>' + data.d.Resultado[i].SEXO + '</td>';
                html += '<td>' + data.d.Resultado[i].TAMANO + '</td>';
                html += '<td>' + data.d.Resultado[i].COLOR + '</td>';
                html += '<td>' + data.d.Resultado[i].TIPO_DSC + '</td>';
                html += '<td>' + data.d.Resultado[i].RAZA_DSC + '</td></tr>';
            }

            $("#tbl_mascota tbody").append(html);
            $("#lblTotalReg").html("Total Registros: " + data.d.Resultado.length);

            $("#tbl_mascota a").click(function () {
                if ($(this).attr("name") === "detalles") {
                    var objE = {
                        ID_ENCRIP: $(this).attr("id")
                    };

                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/mascota.aspx/ObtenerMascotaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            $("#errorMascota_v").html('');
                            $("#tbl_mascota button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_mascota button").removeAttr("disabled");

                            if (data.d.error) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.error));
                                return;
                            }

                            if (data.d.Resultado.lMASCOTA.length > 0)
                                $("#img_Foto_v").attr("src", "img/mascota/" + data.d.Resultado.lMASCOTA[0].FOTO + "?v=" + valRND);
                            $("#txt_nombre_v").val(data.d.Resultado.NOMBRE + ' ' + data.d.Resultado.APELLIDO);
                            $("#txt_dni_v").val(data.d.Resultado.DNI);
                            $("#txt_tel_v").val(data.d.Resultado.TELEFONOP);
                            $("#txt_dir_v").val(data.d.Resultado.DIRECCION);
                            $("#sel_calificacion_v").val(data.d.Resultado.CALIFICACION);

                            $("#pnl_mascota_v").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_mascota button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "edit-mascota") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    $('#pnl_mascota .modal-title').html('Editar Mascota');
                    objE = {
                        ID_ENCRIP: id_mascota
                    };
                    
                    $.ajax({
                        type: "POST",
                        url: "page/mantenimiento/mascota.aspx/ObtenerMascotaWM",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify({ objE: objE }),
                        async: true,
                        beforeSend: function () {
                            openLoading();
                            $("#tbl_mascota button").attr("disabled", true);
                        },
                        success: function (data) {
                            $("#tbl_mascota button").removeAttr("disabled");

                            if (!data.d.Activo) {
                                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                                closeLoading();
                                return;
                            }
                         
                            //$("#txt_nombre").attr("disabled", true);
                            //$("#txt_apellido").attr("disabled", true);
                            //$("#sel_sexo").attr("disabled", true);
                            //$("#txt_fecha_nac").attr("disabled", true);
                            $("#txt_nombre").val(data.d.Resultado.NOMBRE);
                            $("#txt_apellido").val(data.d.Resultado.APELLIDO);
                            $("#sel_sexo").val(data.d.Resultado.SEXO).change();
                    
                            if (data.d.Resultado.COD_MICROCHIP !== "") {
                                $("#txt_cod_microchip").val(data.d.Resultado.COD_MICROCHIP);
                                $("#chkMicrochip").prop('checked', true);
                                $("#txt_cod_microchip").css('display', 'block');
                            } else {
                                $("#chkMicrochip").attr('checked', false);
                                $("#txt_cod_microchip").css('display', 'none');
                            }
                            $("#sel_tamano").val(data.d.Resultado.TAMANO).change();
                            $("#sel_tipo").val(data.d.Resultado.MASCOTA_TIPO_ID).change();
                            raza_id = data.d.Resultado.MASCOTA_RAZA_ID;//$("#sel_raza").val(data.d.Resultado.MASCOTA_RAZA_ID).change();
                            $("#sel_calificacion").val(data.d.Resultado.CALIFICACION).change();
                            $("#txt_color").val(data.d.Resultado.COLOR);
                            if (data.d.Resultado.FEC_NAC !== null) {
                                $("#txt_fecha_nac").val(formatDate(parseDateServer(data.d.Resultado.FEC_NAC), "yyyy-MM-dd"));//.change();
                                //$("#txt_fecha_nac").parent().datepicker("update", $("#txt_fecha_nac").val());
                            }
                            //Familia
                            $("#txt_nom_padre").val(data.d.Resultado.FAMILIARP);
                            $("#txt_dni_padre").val(data.d.Resultado.DNIP);
                            $("#txt_tel_padre").val(data.d.Resultado.TELEFONOP);
                            $("#txt_nom_madre").val(data.d.Resultado.FAMILIARM);
                            $("#txt_dni_madre").val(data.d.Resultado.DNIM);
                            $("#txt_tel_madre").val(data.d.Resultado.TELEFONOM);
                            $("#txt_biografia").val(data.d.Resultado.BIOGRAFIA);
                            //Domicilio
                            $("#sel_departamento").val(data.d.Resultado.DEPARTAMENTO).change();
                            prov_id = data.d.Resultado.PROVINCIA;//$("#sel_provincia").val(data.d.Resultado.PROVINCIA).change();
                            dis_id = data.d.Resultado.GEOGRAFIA_ID;//$("#sel_distrito").val(data.d.Resultado.DISTRITO).change();
                            $("#txt_direccion").val(data.d.Resultado.DIRECCION);
                            $("#txt_piso").val(data.d.Resultado.PISO);
                            $("#txt_referencia").val(data.d.Resultado.REFERENCIA);
                            //Salud
                            $("#sel_castrada").val(data.d.Resultado.CASTRADO).change();
                            $("#sel_visita").val(data.d.Resultado.VISITA).change();
                            $("#sel_alergia_med").val(data.d.Resultado.ALERGIA_MEDICAMENTO).change();
                            $("#sel_calendario").val(data.d.Resultado.VACUNACION).change();
                            $("#sel_vac_quintuple").val(data.d.Resultado.QUINTUPLE).change();
                            if (data.d.Resultado.FEC_QUINTUPLE !== null) {
                                $("#txt_fec_vac_quint").val(formatDate(parseDateServer(data.d.Resultado.FEC_QUINTUPLE), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_quint").parent().datepicker("update", $("#txt_fec_vac_quint").val());
                            }  
                            $("#sel_vac_sextuple").val(data.d.Resultado.SEXTUPLE).change();
                            if (data.d.Resultado.FEC_SEXTUPLE !== null) {
                                $("#txt_fec_vac_sext").val(formatDate(parseDateServer(data.d.Resultado.FEC_SEXTUPLE), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_sext").parent().datepicker("update", $("#txt_fec_vac_sext").val());
                            }                            
                            $("#sel_vac_triple").val(data.d.Resultado.TRIPLEFEL).change();
                            if (data.d.Resultado.FEC_TRIPLEFEL !== null) {
                                $("#txt_fec_vac_triple").val(formatDate(parseDateServer(data.d.Resultado.FEC_TRIPLEFEL), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_triple").parent().datepicker("update", $("#txt_fec_vac_triple").val());
                            }
                            $("#sel_vac_leucemia").val(data.d.Resultado.LEUCEMIA).change();
                            if (data.d.Resultado.FEC_LEUCEMIA !== null) {
                                $("#txt_fec_vac_leucemia").val(formatDate(parseDateServer(data.d.Resultado.FEC_LEUCEMIA), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_leucemia").parent().datepicker("update", $("#txt_fec_vac_leucemia").val());
                            }                            
                            $("#sel_vac_antirrabica").val(data.d.Resultado.ANTIRRABICA).change();
                            if (data.d.Resultado.FEC_ANTIRRABICA !== null) {
                                $("#txt_fec_vac_antirrabica").val(formatDate(parseDateServer(data.d.Resultado.FEC_ANTIRRABICA), "dd/MM/yyyy")).change();
                                $("#txt_fec_vac_antirrabica").parent().datepicker("update", $("#txt_fec_vac_antirrabica").val());
                            }                            
                            $("#sel_dental").val(data.d.Resultado.LIMP_DENTAL).change();
                            if (data.d.Resultado.FEC_DESPARACITACION !== null) {
                                $("#txt_fec_desparacitacion").val(formatDate(parseDateServer(data.d.Resultado.FEC_DESPARACITACION), "dd/MM/yyyy")).change();
                                $("#txt_fec_desparacitacion").parent().datepicker("update", $("#txt_fec_desparacitacion").val());
                            }                            
                            $("#sel_alergia").val(data.d.Resultado.ALERGIA).change();
                            $("#txt_alergia").val(data.d.Resultado.ALERGIA_DSC);
                            $("#sel_enfermedad").val(data.d.Resultado.ENFERMEDAD).change();
                            $("#txt_enfermedad").val(data.d.Resultado.ENFERMEDAD_DSC);
                            
                            //Fotos de Mascota
                            for (var masc = 0; masc < data.d.Resultado.lMASCOTA.length; masc++) {
                                if (masc === 0) {
                                    $('.imagePreview').css("background-image", "url(../../img/mascota/" + data.d.Resultado.lMASCOTA[0].FOTO + "?v=" + valRND+")");
                                    $('.imagePreview').attr('img-fcp-url', data.d.Resultado.lMASCOTA[0].FOTO);
                                    $('.imagePreview').attr('id', 'imgGal_' + + data.d.Resultado.lMASCOTA[0].GALERIA_ID);
                                }else {
                                    $(".container-file").closest(".row").find('.imgAdd').before('<div class="col-sm-2 imgUp imgSecond"><div class="imagePreview" id="imgGal_' + data.d.Resultado.lMASCOTA[masc].GALERIA_ID + '"></div><label class="btn btn-primary btn-upload">Subir<input type="file" class="uploadFile img" value="Upload Photo" style="width:0px;height:0px;overflow:hidden;"></label><i class="fa fa-times del"></i></div>');
                                    $("#imgGal_" + data.d.Resultado.lMASCOTA[masc].GALERIA_ID).css("background-image", "url(img/mascota/" + data.d.Resultado.lMASCOTA[masc].FOTO + "?v=" + valRND +")");
                                    $("#imgGal_" + data.d.Resultado.lMASCOTA[masc].GALERIA_ID).attr('img-fcp-url', data.d.Resultado.lMASCOTA[masc].FOTO);
                                }
                            }

                            //foto_id = data.d.Resultado.GALERIA_ID;
                            //foto_dsc = data.d.Resultado.FOTO;
                            //$("#img_Foto").attr("src", "img/mascota/" + data.d.Resultado.FOTO + "?v=" + Date().toString());
                            activaTab('dato');
                            $("#pnl_mascota").modal('show');
                        },
                        error: function (data) {
                            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                            $("#tbl_mascota button").removeAttr("disabled");
                        }
                    });
                    event.preventDefault();
                } else if ($(this).attr("name") === "delete-mascota") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'ANULAR';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>Eliminar</strong> la mascota?");
                } else if ($(this).attr("name") === "soli-dni") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'SOLICITAR';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>SOLICITAR EL DNI</strong> para su mascota?");
                } else if ($(this).attr("name") === "pon-adop") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'ADOPCION';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>PONER EN ADOPCION</strong> la mascota?");
                } else if ($(this).attr("name") === "quit-adop") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'NOADOPCION';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>SACAR DE ADOPCION</strong> la mascota?");
                } else if ($(this).attr("name") === "rep-per") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'PERDIDA';
                    var contenido_html = "<div id='errorPerdida'></div><h4>¡Saludos desde RUMP!</h4>";
                    contenido_html += "Lamentamos oír que su mascota se ha extraviado."+
                        "<p>Nos gustaría saber específicamente las circunstancias en la que su mascota se " +
                        "perdió, de este modo podremos aconsejarle para que esta situación no se vuelva a dar.</p>" +
                        '   <div class="form-group">'+
                        '       <label> Fecha que se perdió <strong class="text-danger"> (*)</strong ></label>'+
                        '       <div data-date-format="dd/mm/yyyy" class="input-group date dtOp" id="div_fecha_perdida"> '+
                        '           <input id="txt_fecha_perdida" type = "text" class="form-control" data-mask="99/99/9999" size="16">'+
                        '           <span class="input-group-addon btn-danger"> <i class="icon-calendar"></i></span> '+
                        '       </div>' +
                        '   </div>' +
                        '        <div class="form-group">' +
                        '            <label>Referencia</label>' +
                        '            <textarea id="txt_obs_perdida" placeholder="Escriba las circunstancias de la perdida" maxlength="500" class="form-control" rows="3"></textarea>' +
                        '        </div>';

                    window.parent.fc_mostrar_confirmacion(contenido_html);

                    $('#div_fecha_perdida').datepicker({
                        format: 'dd/mm/yyyy',
                        autoclose: true,
                        orientation: "top left"
                    });
                } else if ($(this).attr("name") === "rep-enc") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'ENCONTRADA';
                    window.parent.fc_mostrar_confirmacion("¿Esta seguro de <strong>REPORTAR MASCOSTA COMO ENCONTRADA?</strong>");
                } else if ($(this).attr("name") === "sol-dup") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    $("#copiaModal").modal();
                } else if ($(this).attr("name") === "mst-dead") {
                    limpiarMascota();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    txh_idConfirm = 'FALLECIMIENTO';
                    contenido_html = "<div id='errorMuerte'></div><h4>¡Saludos desde RUMP!</h4>";
                    contenido_html += "Lamentamos oír que su mascota ha fallecido." +
                        "<p>Sabemos que es un momento díficil y compartimos su dolor. Nos gustaría saber las circunstancias en la que su mascota falleció.</p>" +
                        '   <div class="form-group">' +
                        '       <label>Fecha que falleció <strong class="text-danger"> (*)</strong ></label>' +
                        '       <div data-date-format="dd/mm/yyyy" class="input-group date dtOp" id="div_fecha_muerte"> ' +
                        '           <input id="txt_fecha_muerte" type = "text" class="form-control" data-mask="99/99/9999" size="16">' +
                        '           <span class="input-group-addon btn-danger"> <i class="icon-calendar"></i></span> ' +
                        '       </div>' +
                        '   </div>' +
                        '        <div class="form-group">' +
                        '            <label>Observación</label>' +
                        '            <textarea id="txt_obs_muerte" placeholder="Escriba las circunstancias en que falleció" maxlength="500" class="form-control" rows="3"></textarea>' +
                        '        </div>';

                    window.parent.fc_mostrar_confirmacion(contenido_html);

                    $('#div_fecha_muerte').datepicker({
                        format: 'dd/mm/yyyy',
                        autoclose: true,
                        orientation: "top left"
                    });
                } else if ($(this).attr("name") === "cit-med") {
                    //Ocultando los botones
                    $(".add-cli").show();
                    $(".add-med").show();
                    $("#btn_guardar_cita").show();
                    $("#pnl_cita_medica input").attr("disabled", false);
                    $("#pnl_cita_medica textarea").attr("disabled", false);
                    limpiarCita();

                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    $("#imgMascotaCita").attr("src", $(this).parent().parent().parent().parent().parent().find("td").eq(2).children().children().children(0)[0].src + '?v=' + valRND);
                    $("#lbl_nom_mascota").val($(this).parent().parent().parent().parent().parent().find("td").eq(5).html());
                    activaTab('datoCita');
                    $('#pnl_cita_medica .modal-title').html('Registrar Cita médica');
                    $("#pnl_cita_medica").modal('show');
                } else if ($(this).attr("name") === "his-med") {
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    fc_ver_historial();
                }
            });
            
            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#btn_buscar").removeAttr("disabled");
            closeLoading();
        }
    });
}
function limpiarMascota() {
    $("#errorDiv").html('');
    $("#errorMascota").html('');

    $("#divQuintuple").hide();
    $("#divSextuple").hide();
    $("#divTriple").hide();
    $("#divLeucemia").hide();
    $("#divAntirrabica").hide();
    $("#divAlergia").hide();
    $("#divEnfermedad").hide();

    _user_email = 0;
    id_mascota = "";
    foto_id = 0;
    foto_dsc = "";
    raza_id = 0;
    prov_id = 0;
    dis_id = 0;
    txh_idConfirm = '';
    $("#pnl_mascota").css("pointer-events", "visible");
    $("#pnl_mascota select").val('0');
    $("#pnl_mascota input").val('');
    $("#pnl_mascota textarea").val('');
    $("#pnl_mascota select").attr("disabled", false);
    $("#pnl_mascota input").attr("disabled", false);
    
    //$('#sel_tipo').val(null).trigger('change');
    $('#sel_tipo').val(null).change();
    $("#sel_raza").empty();
    $('#sel_departamento').val(null).change();
    $("#sel_provincia").empty();
    $("#sel_distrito").empty();
    $("#chkMicrochip").prop('checked', false);
    $("#txt_cod_microchip").css('display', 'none');

    $(".container-file").find($(".imgSecond")).each(function () {
        $(this).remove();
    });
    
    $(".container-file").find($(".imagePreview")).css("background-image", "url(../../img/noPets.png)");
}
/*Eventos por Control*/
$(document).keydown(function (evt) {
    switch (evt ? evt.which : event.keyCode) {
        case 8: //BLOQUEA RETROCESO DE PAGINA
            var valor = document.activeElement.value;
            if (valor === undefined) { return false; } break;
        case 13: //BLOQUEA ENTER
            return false;
        case 66: //BUSCAR
            if (evt ? evt.altKey : event.altKey) $("#btn_buscar").click();
            break;
        case 78: //NUEVO
            if (evt ? evt.altKey : event.altKey) $("#btn_nuevo").click();
            break;
        case 71: //GUARDAR
            if (evt ? evt.altKey : event.altKey) {
                if ($("#pnl_mascota").css('display') === 'block') {
                    $("#btn_guardar").click();
                }
            }
            break;
    }
});