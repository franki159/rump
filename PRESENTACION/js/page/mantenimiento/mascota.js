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

    $("#pnl_mascota").modal({show: false, backdrop: 'static' });
    
    $('.continue').click(function () {
        $('.nav-tabs .active').parent().next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs .active').parent().prev('li').find('a').trigger('click');
    });

    fc_listar_inicio();

    $("#txt_bus_dni").focus();
});
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}
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
            formatButton += '        <div class="mr-3">';
            formatButton += '            <div class="icon-circle {1}">';
            formatButton += '                <i class="{2} text-white"></i>';
            formatButton += '            </div>';
            formatButton += '        </div>';
            formatButton += '        <div>';
            formatButton += '            <span class="font-weight-bold">{3}</span>';
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
                switch (data.d.Resultado[i].ESTADO) {
                    case 1:
                        html += '<td><span class="btn btn-success btn-sm"><i class="far fa-credit-card"></i>&nbsp;CON DNI</span></td>';
                        break;
                    case 2:
                        html += '<td><span class="btn btn-danger btn-sm"><i class="far fa-credit-card"></i>&nbsp;SIN DNI</span></td>';
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
                                $("#txt_fecha_nac").val(formatDate(parseDateServer(data.d.Resultado.FEC_NAC), "dd/MM/yyyy")).change();
                                $("#txt_fecha_nac").parent().datepicker("update", $("#txt_fecha_nac").val());
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
                    limpiarCita();
                    id_mascota = $(this).parent().parent().parent().parent().parent().find("td").eq(0).html();
                    $("#imgMascotaCita").attr("src", $(this).parent().parent().parent().parent().parent().find("td").eq(2).children().children().children(0)[0].src + '?v=' + valRND);
                    $("#lbl_nom_mascota").val($(this).parent().parent().parent().parent().parent().find("td").eq(4).html());
                    activaTab('datoCita');
                    $('#pnl_cita_medica .modal-title').html('Registrar Cita médica');
                    $("#pnl_cita_medica").modal('show');
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
function fc_sol_servicio(opcion) {
    var objE = {
        ID_ENCRIP: id_mascota,
        OPCION: opcion
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/SolicitarServicioWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            $("#errorDiv").html('');
            $("#tbl_mascota button").attr("disabled", true);
            openLoading();
        },
        success: function (data) {
            $("#tbl_mascota button").removeAttr("disabled");
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                $("#copiaModal").modal('hide');
                return;
            }

            $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
            $("#copiaModal").modal('hide');
            fc_listar_mascota();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#tbl_mascota button").removeAttr("disabled");
            closeLoading();
            $("#copiaModal").modal('hide');
        }
    });
    event.preventDefault();
}
function aceptarConfirm() {
    switch (txh_idConfirm) {
        case "ANULAR":
            var objE = {
                ID_ENCRIP : id_mascota
            };
   
            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/AnularMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "SOLICITAR":
            fc_sol_servicio(1);

            break;
        case "ADOPCION":
            objE = {
                ID_ENCRIP: id_mascota
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/AdopcionMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "NOADOPCION":
            objE = {
                ID_ENCRIP: id_mascota
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/NoAdopcionMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "PERDIDA":
            if (validIdInput($("#txt_fecha_perdida").val())) {
                $("#errorPerdida").html(GenerarAlertaWarning("Ingrese la fecha en la que se perdio su mascota"));                
                $("#txt_fecha_perdida").focus();
                return false;
            } else if (validIdInput($("#txt_obs_perdida").val())) {
                $("#errorPerdida").html(GenerarAlertaWarning("Ingrese una descripción"));                
                $("#txt_obs_perdida").focus();
                return false;
            }

            objE = {
                ID_ENCRIP: id_mascota,
                FEC_NAC: $("#txt_fecha_perdida").val() === "" ? null : getDateFromFormat($("#txt_fecha_perdida").val(), 'dd/MM/yyyy'),
                OBSERVACION: $("#txt_obs_perdida").val()
            };
            
            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/PerdidaMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "ENCONTRADA":
            objE = {
                ID_ENCRIP: id_mascota
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/EncontradaMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        case "FALLECIMIENTO":
            if (validIdInput($("#txt_fecha_muerte").val())) {
                $("#errorMuerte").html(GenerarAlertaWarning("Ingrese la fecha en la que falleció su mascota"));
                $("#txt_fecha_muerte").focus();
                return false;
            } else if (validIdInput($("#txt_obs_muerte").val())) {
                $("#errorMuerte").html(GenerarAlertaWarning("Ingrese una descripción"));
                $("#txt_obs_muerte").focus();
                return false;
            }

            objE = {
                ID_ENCRIP: id_mascota,
                FEC_NAC: $("#txt_fecha_muerte").val() === "" ? null : getDateFromFormat($("#txt_fecha_muerte").val(), 'dd/MM/yyyy'),
                OBSERVACION: $("#txt_obs_muerte").val()
            };

            $.ajax({
                type: "POST",
                url: "page/mantenimiento/mascota.aspx/MuerteMascotaWM",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify({ objE: objE }),
                async: true,
                beforeSend: function () {
                    $("#errorDiv").html('');
                    $("#tbl_mascota button").attr("disabled", true);
                    openLoading();
                },
                success: function (data) {
                    $("#tbl_mascota button").removeAttr("disabled");
                    if (!data.d.Activo) {
                        $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                        closeLoading();
                        return;
                    }

                    $("#errorDiv").html(GenerarAlertaSuccess(data.d.Mensaje));
                    fc_listar_mascota();
                },
                error: function (data) {
                    $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
                    $("#tbl_mascota button").removeAttr("disabled");
                    closeLoading();
                }
            });
            event.preventDefault();
            break;
        default:
            break;
    }
}
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

$("#sel_sexo").on('change', function () {
    if ($(this).val() == 'Macho') {
        $("#lbl_masc_castrada").html('¿La mascota está castrada?');
    } else {
        $("#lbl_masc_castrada").html('¿La mascota está esterilizada?');
    }
});
$("#chkMicrochip").change(function () {
    if (this.checked) {
        $("#txt_cod_microchip").css("display", "block");
    } else {
        $("#txt_cod_microchip").css("display", "none");
    }
});
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
        data: JSON.stringify({ objE: objE}),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#errorMascota').html("");
            $('#sel_raza').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_raza').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_raza').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (raza_id !== 0) {
                $("#sel_raza").val(raza_id);
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
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_provincia').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_provincia').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (prov_id !== 0) {
                $("#sel_provincia").val(prov_id).change();
                prov_id = 0;
            }
            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
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
            openLoading();
            $('#sel_distrito').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_distrito').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (dis_id !== 0) {
                $("#sel_distrito").val(dis_id).change();
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_vac_quintuple").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_sext").val('');
        $("#divQuintuple").hide();
    } else if ($(this).val() === "1") {
        $("#divQuintuple").show();
    }
});
$("#sel_vac_sextuple").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_sext").val('');
        $("#divSextuple").hide();
    } else if ($(this).val() === "1") {
        $("#divSextuple").show();
    }
});
$("#sel_vac_triple").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_triple").val('');
        $("#divTriple").hide();
    } else if ($(this).val() === "1") {
        $("#divTriple").show();
    }
});
$("#sel_vac_leucemia").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_leucemia").val('');
        $("#divLeucemia").hide();
    } else if ($(this).val() === "1") {
        $("#divLeucemia").show();
    }
});
$("#sel_vac_antirrabica").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_fec_vac_antirrabica").val('');
        $("#divAntirrabica").hide();
    } else if ($(this).val() === "1") {
        $("#divAntirrabica").show();
    }
});
$("#sel_alergia").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_alergia").val('');
        $("#divAlergia").hide();
    } else if ($(this).val() === "1") {
        $("#divAlergia").show();
    }
});
$("#sel_enfermedad").on('change', function () {
    if ($(this).val() === "0") {
        //$("#txt_enfermedad").val('');
        $("#divEnfermedad").hide();
    } else if ($(this).val() === "1") {
        $("#divEnfermedad").show();
    }
});
$("#imgMascota").change(function () {
    readURLImage(this, "img_Foto");
});
$("#btn_buscar").click(function () {
    $("#btn_buscar").button('loading');
    $("#errorDiv").html('');
    if (validIdInput($("#txt_bus_dni").val())) {
        $("#errorDiv").html(GenerarAlertaWarning("DNI: ingrese un dni válido"));
        $("#btn_buscar").button('reset');
        $("#txt_bus_dni").focus();
        return;
    }
    fc_listar_mascota();
});
$("#btn_nuevo").click(function () {
    //Si es un asesor o un administrador
    $("#txt_bus_dni").val("");
    if (sessionStorage.getItem('PERFIL_ID') === "1" || sessionStorage.getItem('PERFIL_ID') === "3") {
        $("#errorPropietario").html('');
        $("#txt_correo").val('');
        $("#pnl_mascota_prop").modal('show');
    } else if (sessionStorage.getItem('PERFIL_ID') === "4") {//Propietario
        limpiarMascota();
        activaTab('dato');
        $('#pnl_mascota .modal-title').html('Registrar Mascota');
        $("#pnl_mascota").modal('show');

        if (sessionStorage.getItem('SEXO') === "Masculino") {
            $("#txt_nom_padre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
        } else if (sessionStorage.getItem('SEXO') === "Femenino") {
            $("#txt_nom_madre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
        }
        $("#txt_apellido").val(sessionStorage.getItem('APELLIDO'));
        $("#txt_nombre").focus();
    }
});
$("#btn_guardar").click(function (evt) {
    openLoading();
    $("#errorMascota").html('');
    if (id_mascota === "") {//Nuevo
        //Validando las fotos seleccionadas
        var error_img = 0;
        $(".container-file").find($("input")).each(function () {
            if ($(this).get(0).files.length === 0) {                    
                error_img++;
             }
        });

        if (validIdInput($("#txt_nombre").val()) || validIdInput($("#txt_apellido").val())) {
            $("#errorMascota").html(GenerarAlertaWarning("Nombre: Debe ingresar el nombre y el apellido"));
            closeLoading();
            activaTab('dato');
            $("#txt_nombre").focus();
            return;
        } else if (validIdInput($("#txt_fecha_nac").val())) {
            $("#errorMascota").html(GenerarAlertaWarning("Fecha Nacimiento: ingresar una fecha de nacimiento válida"));
            closeLoading();
            activaTab('dato');
            $("#txt_fecha_nac").focus();
            return;
        } else if (validIdInput($("#sel_sexo").val())) {
            $("#errorMascota").html(GenerarAlertaWarning("Sexo: ingresar el sexo de su mascota"));
            closeLoading();
            activaTab('dato');
            $("#sel_sexo").focus();
            return;
        } else if (error_img > 0) {
            $("#errorMascota").html(GenerarAlertaWarning("Imagen: seleccione una foto de su mascota"));
            closeLoading();
            activaTab('foto');
            return;
        }
    }
    
    if (validIdInput($("#sel_tipo").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Tipo: seleccione un Tipo de mascota"));
        closeLoading();
        activaTab('dato');
        $("#sel_tipo").focus();
        return;
    } else if (validIdInput($("#sel_raza").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Raza: seleccione una Raza"));
        closeLoading();
        activaTab('dato');
        $("#sel_raza").focus();
        return;
    } else if (validIdInput($("#sel_calificacion").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Calificación: seleccione una Calificación"));
        closeLoading();
        activaTab('dato');
        $("#sel_calificacion").focus();
        return;
    } else if (validIdInput($("#sel_departamento").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Departamento: seleccione un Departamento"));
        closeLoading();
        activaTab('domicilio');
        $("#sel_departamento").focus();
        return;
    } else if (validIdInput($("#sel_provincia").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Provincia: seleccione una Provincia"));
        closeLoading();
        activaTab('domicilio');
        $("#sel_provincia").focus();
        return;
    } else if (validIdInput($("#sel_distrito").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Distrito: seleccione un Distrito"));
        closeLoading();
        activaTab('domicilio');
        $("#sel_distrito").focus();
        return;
    } else if (validIdInput($("#txt_direccion").val())) {
        $("#errorMascota").html(GenerarAlertaWarning("Dirección: seleccione una Dirección"));
        closeLoading();
        activaTab('domicilio');
        $("#txt_direccion").focus();
        return;
    }
    
    var eMascota = {
        ID_ENCRIP: id_mascota,
        //Nuevo*******
        USUARIO_ID: sessionStorage.getItem('PERFIL_ID') === "4" ? sessionStorage.getItem('ID') : _user_email,
        NOMBRE: $("#txt_nombre").val(),
        APELLIDO: $("#txt_apellido").val(),
        SEXO: $("#sel_sexo").val(),
        FEC_NAC: getDateFromFormat($("#txt_fecha_nac").val(), 'dd/MM/yyyy'),
        //************
        COD_MICROCHIP: $("#txt_cod_microchip").val(),
        TAMANO: $("#sel_tamano").val(),
        MASCOTA_RAZA_ID: $("#sel_raza").val(),
        CALIFICACION: $("#sel_calificacion").val(),
        COLOR: $("#txt_color").val(),
        BIOGRAFIA: $("#txt_biografia").val(),
        EXTENSION: foto_dsc,
        GALERIA_ID: foto_id,
        //Familia
        FAMILIARP: $("#txt_nom_padre").val(),
        DNIP: $("#txt_dni_padre").val(),
        TELEFONOP: $("#txt_tel_padre").val(),
        FAMILIARM: $("#txt_nom_madre").val(),
        DNIM: $("#txt_dni_madre").val(),
        TELEFONOM: $("#txt_tel_madre").val(),
        //Domicilio
        DISTRITO: $("#sel_distrito").val(),
        DIRECCION: $("#txt_direccion").val(),
        PISO: $("#txt_piso").val(),
        REFERENCIA: $("#txt_referencia").val(),
        //Salud
        CASTRADO: $("#sel_castrada").val(),
        VISITA: $("#sel_visita").val(),
        ALERGIA_MEDICAMENTO: $("#sel_alergia_med").val(),
        VACUNACION: $("#sel_calendario").val(),
        QUINTUPLE: $("#sel_vac_quintuple").val(),
        FEC_QUINTUPLE: $("#txt_fec_vac_quint").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_quint").val(), 'dd/MM/yyyy'),
        SEXTUPLE: $("#sel_vac_sextuple").val(),
        FEC_SEXTUPLE: $("#txt_fec_vac_sext").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_sext").val(), 'dd/MM/yyyy'),
        TRIPLEFEL: $("#sel_vac_triple").val(),
        FEC_TRIPLEFEL: $("#txt_fec_vac_triple").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_triple").val(), 'dd/MM/yyyy'),
        LEUCEMIA: $("#sel_vac_leucemia").val(),
        FEC_LEUCEMIA: $("#txt_fec_vac_leucemia").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_leucemia").val(), 'dd/MM/yyyy'),
        ANTIRRABICA: $("#sel_vac_antirrabica").val(),
        FEC_ANTIRRABICA: $("#txt_fec_vac_antirrabica").val() === "" ? null : getDateFromFormat($("#txt_fec_vac_antirrabica").val(), 'dd/MM/yyyy'),
        LIMP_DENTAL: $("#sel_dental").val(),
        FEC_DESPARACITACION: $("#txt_fec_desparacitacion").val() === "" ? null : getDateFromFormat($("#txt_fec_desparacitacion").val(), 'dd/MM/yyyy'),
        ALERGIA: $("#sel_alergia").val(),
        ALERGIA_DSC: $("#txt_alergia").val(),
        ENFERMEDAD: $("#sel_enfermedad").val(),
        ENFERMEDAD_DSC: $("#txt_enfermedad").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ActualizarMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eMascota }),
        async: true,
        beforeSend: function () {
            $("#pnl_mascota").css("pointer-events", "none");
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMascota").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_mascota").css("pointer-events", "visible");
                closeLoading();
                return;
            }

            valRND = Math.floor(Math.random() * 1000);
            
            if (id_mascota === "") {//Solo para nuevos
                //Guardando todas las imagenes BD
                var error_img = 0;

                $(".container-file").find($("input")).each(function () {
                    if ($(this).get(0).files.length !== 0) {
                        var imgTemp = $(this)[0].files[0];

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
                                    $("#errorMascota").html(GenerarAlertaError(dataImg.d.Mensaje));
                                    closeLoading();
                                    return;
                                }
                                
                                error_img += guardarImagen(evt, dataImg.d.Resultado, imgTemp);
                            },
                            error: function (data) {
                                $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
                                closeLoading();
                            }
                        });

                        event.preventDefault();
                    }
                });

                if (error_img > 0) {
                    msg_OpenDay("e", "Error al guardar imagen");
                } else {
                    msg_OpenDay("c", "Mascota guardada correctamente");
                }

                fc_listar_mascota();
                $("#pnl_mascota").modal('hide');
            } else if (id_mascota !== "") {//Modificar
                //Guardando todas las imagenes BD
                error_img = 0;

                //Las imagenes cambiadas (solo actualiza las imagenes en el servidor no BD)
                $(".container-file").find($("input")).each(function () {
                    if ($(this).get(0).files.length !== 0) {
                        if ($(this).parent().parent().children(0)[0].id !== "") {//Solo los que tiene id
                            var imgTemp = $(this)[0].files[0];
                            var nameAct = $(this).parent().parent().children(0).attr("img-fcp-url");
                            
                            error_img += guardarImagen(evt, nameAct, imgTemp);
                        }                        
                    }
                });
                //Si agrego mas imagenes (los que no tienen id, insertan en la bd)
                $(".container-file").find($("input")).each(function () {
                    if ($(this).get(0).files.length !== 0) {
                        if ($(this).parent().parent().children(0)[0].id === "") {//Solo los que no tiene id
                            var imgTemp = $(this)[0].files[0];
                            eMascota = {
                                ID_ENCRIP: id_mascota,
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
                                        $("#errorMascota").html(GenerarAlertaError(dataImg.d.Mensaje));
                                        closeLoading();
                                        error_img ++;
                                        return;
                                    }

                                    error_img += guardarImagen(evt, dataImg.d.Resultado, imgTemp);
                                },
                                error: function (data) {
                                    $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
                                    closeLoading();
                                }
                            });
                        }                        
                    }
                });

                if (error_img > 0) {
                    msg_OpenDay("e", "Error al guardar imagen");
                } else {
                    msg_OpenDay("c", "Mascota guardada correctamente");
                }

                fc_listar_mascota();
                $("#pnl_mascota").modal('hide');
            }
        },
        error: function (data) {
            $("#errorMascota").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_mascota").css("pointer-events", "visible");
            closeLoading();
        }
    });
    event.preventDefault();
});
$("#btn_select_prop").click(function (evt) {
    openLoading();
    $("#errorPropietario").html('');
    
    if (validIdInput($("#txt_correo").val())) {
        $("#errorPropietario").html(GenerarAlertaWarning("Correo: Ingrese un correo válido"));
        closeLoading();
        $("#txt_correo").focus();
        return;
    }

    var eUsuario = {
        EMAIL: $("#txt_correo").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/ObtenerPropitarioMascotaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eUsuario }),
        async: true,
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorPropietario").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $("#pnl_mascota_prop").modal('hide');
            limpiarMascota();
            _user_email = data.d.Resultado.ID;
            activaTab('dato');

            if (sessionStorage.getItem('SEXO') === "Masculino") {
                $("#txt_nom_padre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
            } else if (sessionStorage.getItem('SEXO') === "Femenino") {
                $("#txt_nom_madre").val(sessionStorage.getItem('NOMBRE') + " " + sessionStorage.getItem('APELLIDO'));
            }
            $("#txt_apellido").val(sessionStorage.getItem('APELLIDO'));

            $('#pnl_mascota .modal-title').html('Registrar Mascota');
            $("#pnl_mascota").modal('show');
            closeLoading();
            $("#txt_nombre").focus();
        },
        error: function (data) {
            $("#errorPropietario").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
    event.preventDefault();
});
/******************** CITA MEDICA *****************/
function limpiarCita() {
    $("#errorDiv").html('');
    $("#errorCita").html('');

    $("#pnl_cita_medica").css("pointer-events", "visible");
    $("#pnl_cita_medica select").val('0');
    $("#pnl_cita_medica input").val('');
    $("#pnl_cita_medica textarea").val('');
    $("#pnl_cita_medica select").attr("disabled", false);

    $('#sel_tipo_cita').val(null).change();
    $('#sel_departamento_cita').val(null).change();
    $("#sel_provincia_cita").empty();
    $("#sel_distrito_cita").empty();
}
function listarTipoCita() {
    var objE = {
        GRUPO: 'tipo_cita'
    };

    $.ajax({
        type: "POST",
        url: "default.aspx/listarParametroGrupo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: true,
        beforeSend: function () {
            openLoading();
            $('#sel_tipo_cita').empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_tipo_cita').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_tipo_cita').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function listarClinicas() {
    objE = {
        CODIGO: "CLINICA"
    };
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_clinica').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            $('#sel_clinica').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_clinica').append("<option dir-cli='" + data.d.Resultado[i].DESCRIPCION.split("|")[1] + "' value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION.split("|")[0] + "</option>");
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}
function listarMedicos() {
    objE = {
        CODIGO: "MEDICO"
    };
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/mascota.aspx/listarParametro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: objE }),
        async: false,
        beforeSend: function () {
            $('#sel_veterinario').empty();
            openLoading();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorDiv").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }
            $('#sel_veterinario').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_veterinario').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            closeLoading();
        },
        error: function (data) {
            $("#errorDiv").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
}

$("#sel_mascota").on('change', function () {
    $("#lbl_dni").val($('option:selected', this).attr('dni-msct'));
});
$("#sel_clinica").on('change', function () {
    $("#lbl_direccion_cli").val($('option:selected', this).attr('dir-cli'));
});
$(".add-cli").click(function () {
    $("#pnl_clinica").modal('show');
    $("#sel_departamento_cita").focus();
});
$(".add-med").click(function () {
    $("#pnl_medico").modal('show');
    $("#txt_nombre_med").focus();
});

$("#sel_departamento_cita").on('change', function () {
    /************************ Listado de Provincia ****************************/
    var objE = {
        CODIGO: "PROVINCIA",
        vPARAM1: $("#sel_departamento_cita").val()
    };

    if ($("#sel_departamento_cita").val() === '') {
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
            $('#sel_provincia_cita').empty();
            $("#sel_distrito_cita").empty();
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorClinica").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_provincia_cita').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_provincia_cita').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (prov_id !== 0) {
                $("#sel_provincia_cita").val(prov_id).change();
                prov_id = 0;
            }
        },
        error: function (data) {
            $("#errorClinica_cita").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});
$("#sel_provincia_cita").on('change', function () {
    /************************ Listado de Distrito ****************************/
    var objE = {
        CODIGO: "DISTRITO",
        vPARAM1: $("#sel_departamento_cita").val(),
        vPARAM2: $("#sel_provincia_cita").val()
    };

    if ($("#sel_provincia_cita").val() === '') {
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
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorClinica").html(GenerarAlertaError(data.d.Mensaje));
                closeLoading();
                return;
            }

            $('#sel_distrito_cita').append("<option></option>");
            for (var i = 0; i < data.d.Resultado.length; i++) {
                $('#sel_distrito_cita').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
            }

            if (dis_id !== 0) {
                $("#sel_distrito_cita").val(dis_id).change();
            }
        },
        error: function (data) {
            $("#errorClinica_cita").html(GenerarAlertaError("Inconveniente en la operación"));
            closeLoading();
        }
    });
});

$("#btn_save_cli").click(function (evt) {
    $("#errorClinica").html('');

    if (validIdInput($("#sel_distrito_cita").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Ubigeo: Seleccione correctamente Departamento, Provincia y Distrito"));
        return;
    } else if (validIdInput($("#txt_direccion_cli").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Dirección: Ingrese una dirección"));
        $("#txt_direccion_cli").focus();
        return;
    } else if (validIdInput($("#txt_nom_clinica").val())) {
        $("#errorClinica").html(GenerarAlertaWarning("Nombre: Ingrese el nombre de la clínica"));
        $("#txt_nom_clinica").focus();
        return;
    }

    var eClinica = {
        NOMBRE: $("#txt_nom_clinica").val(),
        TELEFONO: $("#txt_tel_clinica").val(),
        DIRECCION: $("#txt_direccion_cli").val(),
        GEOGRAFIA_ID: $("#sel_distrito_cita").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/citaMedica.aspx/ActualizarClinicaCitaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eClinica }),
        async: true,
        beforeSend: function () {
            openLoading();
            $("#pnl_clinica button").attr("disabled", true);
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorClinica").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_clinica button").attr("disabled", false);
                closeLoading();
                return;
            }
            listarClinicas();
            closeLoading();
            $("#pnl_clinica button").attr("disabled", false);
            $('#sel_departamento_cita').val(null).change();
            $("#sel_provincia_cita").empty();
            $("#sel_distrito_cita").empty();
            $("#pnl_clinica input").val("");
            $("#pnl_clinica").modal("hide");
            $('#sel_clinica').val(data.d.Resultado).change();
        },
        error: function (data) {
            $("#errorClinica").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_clinica button").attr("disabled", false);
            closeLoading();
        }
    });
    event.preventDefault();
});
$("#btn_save_med").click(function (evt) {
    $("#errorMedico").html('');

    if (validIdInput($("#txt_nombre_med").val())) {
        $("#errorMedico").html(GenerarAlertaWarning("Nombre: Ingrese un nombre del medico"));
        $("#txt_nombre_med").focus();
        return;
    } else if (validIdInput($("#txt_apellido_med").val())) {
        $("#errorMedico").html(GenerarAlertaWarning("Apellido: Ingrese el apellido del doctor"));
        $("#txt_apellido_med").focus();
        return;
    }

    var eMedico = {
        NOMBRE: $("#txt_nombre_med").val(),
        APELLIDO: $("#txt_apellido_med").val(),
        TELEFONO: $("#txt_telefono_med").val(),
        COD_MEDICO: $("#txt_cod_med").val()
    };

    $.ajax({
        type: "POST",
        url: "page/mantenimiento/citaMedica.aspx/ActualizarMedicoCitaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eMedico }),
        async: true,
        beforeSend: function () {
            openLoading();
            $("#pnl_medico button").attr("disabled", true);
        },
        success: function (data) {
            if (!data.d.Activo) {
                $("#errorMedico").html(GenerarAlertaError(data.d.Mensaje));
                $("#pnl_medico button").attr("disabled", false);
                closeLoading();
                return;
            }
            listarMedicos();
            closeLoading();
            $("#pnl_medico button").attr("disabled", false);
            $("#pnl_medico input").val("");
            $("#pnl_medico").modal("hide");
            $('#sel_veterinario').val(data.d.Resultado).change();
        },
        error: function (data) {
            $("#errorMedico").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_medico button").attr("disabled", false);
            closeLoading();
        }
    });
    event.preventDefault();
});
$("#btn_guardar_cita").click(function (event) {
    $("#errorCita").html('');

    if (validIdInput($("#sel_clinica").val())) {
        $("#errorCita").html(GenerarAlertaWarning("Clinica: Seleccione una clinica"));
        activaTab('datoCita');
        $("#sel_clinica").focus();
        return;
    } else if (validIdInput($("#sel_veterinario").val())) {
        $("#errorCita").html(GenerarAlertaWarning("Veterinario: Seleccione un Doctor Veterinario"));
        activaTab('datoCita');
        $("#sel_veterinario").focus();
        return;
    } else if (validIdInput($("#sel_tipo_cita").val())) {
        $("#errorCita").html(GenerarAlertaWarning("Tipo: Seleccione un tipo de cita"));
        activaTab('datoCita');
        $("#sel_tipo_cita").focus();
        return;
    } else if (validIdInput($("#txt_motivo").val())) {
        $("#errorCita").html(GenerarAlertaWarning("Motivo: ingresar el motivo de la cita"));
        activaTab('datoCita');
        $("#errorCita").focus();
        return;
    } else if (validIdInput($("#txt_fecha_cita").val())) {
        $("#errorCita").html(GenerarAlertaWarning("Fecha: Ingrese la fecha de la cita"));
        activaTab('detalle');
        $("#txt_fecha_cita").focus();
        return;
    } 

    var eCita = {
        FECHA_ATENCION_MEDICA: getDateFromFormat($("#txt_fecha_cita").val(), 'dd/MM/yyyy'),
        ID_ENCRIP: id_mascota,
        CLINICA_ID: $("#sel_clinica").val(),
        MEDICO_ID: $("#sel_veterinario").val(),
        TIPO: $("#sel_tipo_cita").val(),
        MOTIVO: $("#txt_motivo").val(),
        PESO: $("#txt_peso").val(),
        TEMPERATURA: $("#txt_temperatura").val(),
        SINTOMAS: $("#txt_sintomas").val(),
        DIAGNOSTICO: $("#txt_diagnostico").val(),
        TRATAMIENTO: $("#txt_tratamiento").val(),
        OBSERVACIONES: $("#txt_observacion").val(),
        ANTECEDENTES: $("#txt_antecedentes").val(),
        FORMULA: $("#txt_formula").val()
    };
    
    $.ajax({
        type: "POST",
        url: "page/mantenimiento/citaMedica.aspx/ActualizarCitaWM",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ objE: eCita }),
        async: true,
        beforeSend: function () {
            openLoading();
            $("#pnl_cita_medica button").attr("disabled", true);
        },
        success: function (data) {
            if (!data.d.Activo) {
                msg_OpenDay("e", data.d.Mensaje);
                $("#pnl_cita_medica button").attr("disabled", false);
                closeLoading();
                return;
            }
            $("#pnl_cita_medica button").attr("disabled", false);
            closeLoading();
            $("#pnl_cita_medica").modal("hide");
            msg_OpenDay("c", data.d.Mensaje);
        },
        error: function (data) {
            $("#errorCita").html(GenerarAlertaError("Inconveniente en la operación"));
            $("#pnl_cita_medica button").attr("disabled", false);
            closeLoading();
        }
    });
    event.preventDefault();
});
/******************** /CITA MEDICA *****************/