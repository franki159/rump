if ($('#sec_adoptame')) {
    function cargarTipo() {
        var objE = {
            CODIGO: "TIPO"
        };
        
        $.ajax({
            type: "POST",
            url: "adoptame.aspx/listarParametro",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ objE: objE }),
            async: false,
            beforeSend: function () {
                $('#sel_tipo').empty();
                //openLoading();
            },
            success: function (data) {
                $('#sel_tipo').append("<option value='0'>Todos</option>");
                for (var i = 0; i < data.d.Resultado.length; i++) {
                    $('#sel_tipo').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                }
            },
            error: function (data) {
                //closeLoading();
            }
        });
    }

    $("#sel_tipo").on('change', function () {
        /************************ Listado de Raza ****************************/
        var objE = {
            CODIGO: "RAZA",
            vPARAM1: $("#sel_tipo").val()
        };

        if ($("#sel_tipo").val() === '0') {
            $('#sel_raza').empty();
            $('#sel_raza').append("<option value='0'>Seleccionar</option>");
            return false;
        }

        $.ajax({
            type: "POST",
            url: "adoptame.aspx/listarParametro",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ objE: objE }),
            async: true,
            beforeSend: function () {
                $('#sel_raza').empty();
            },
            success: function (data) {
                $('#sel_raza').append("<option value='0'>Seleccionar</option>");
                for (var i = 0; i < data.d.Resultado.length; i++) {
                    $('#sel_raza').append("<option value='" + data.d.Resultado[i].CODIGO + "'>" + data.d.Resultado[i].DESCRIPCION + "</option>");
                }
            },
            error: function (data) {
                //closeLoading();
            }
        });
    });

    $("#btn_buscar_adopcion").on('click', function () {
        var eMascota = {
            TAMANO: ($("#sel_tamano").val() == '0' ? null : $("#sel_tamano").val()),
            TIPO: ($("#sel_tipo").val() == '0' ? 0 : $("#sel_tipo").val()),
            RAZA: ($("#sel_raza").val() == '0' ? 0 : $("#sel_raza").val()),
            CALIFICACION: ($("#sel_calificacion").val() == '0' ? null : $("#sel_calificacion").val()),
            SEXO: ($("#sel_sexo").val() == '0' ? null : $("#sel_sexo").val())
        };

        $.ajax({
            type: "POST",
            url: "adoptame.aspx/listarAdopcion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ objE: eMascota }),
            async: false,
            beforeSend: function () {
                $("#btn_buscar_adopcion").attr("disabled", true);
                $('#tbl_adopcion tbody').empty();
            },
            success: function (data) {
                $("#btn_buscar_adopcion").removeAttr("disabled");

                var valRND = Math.floor(Math.random() * 100);

                var html = '';
                for (var i = 0; i < data.d.Resultado.length; i++) {

                    html += '<tr><td style="display:none">' + data.d.Resultado[i].ID_ENCRIP + '</td>';
                    html += '<td>' +
                        '<div>' +
                        '<a href="#" name="detalles" id="' + data.d.Resultado[i].ID_ENCRIP + '" data-toggle="modal" data-target="#modalVerMascota">' +
                        '<img class="img-row-mascota" src="../img/mascota/' + encodeURIComponent(data.d.Resultado[i].FOTO) + '?v=' + valRND + '" onerror="this.src=\'../img/noPets.png\';">' +
                        '</a>' +
                        '</div>' +
                        '</td>';
                    html += '<td>' + data.d.Resultado[i].NOMBRE + '</td>';
                    html += '<td>' + data.d.Resultado[i].SEXO + '</td>';
                    html += '<td>' + data.d.Resultado[i].TAMANO + '</td>';
                    html += '<td>' + data.d.Resultado[i].COLOR + '</td>';
                    html += '<td>' + data.d.Resultado[i].TIPO_DSC + '</td>';
                    html += '<td>' + data.d.Resultado[i].RAZA_DSC + '</td></tr>';
                }

                $("#tbl_adopcion tbody").append(html);

                $("#tbl_adopcion tbody a").click(function () {
                    if ($(this).attr("name") === "detalles") {
                        var objE = {
                            ID_ENCRIP: $(this).attr("id")
                        };

                        $.ajax({
                            type: "POST",
                            url: "adoptame.aspx/obtenerAdopcion",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify({ objE: objE }),
                            async: false,
                            beforeSend: function () { },
                            success: function (data) {
                                if (data.d.error) {
                                    return;
                                }

                                $("#img_Foto_adop").attr("src", "../img/mascota/" + data.d.Resultado.FOTO + "?v=" + valRND);
                                $("#txt_nombre_adop").val(data.d.Resultado.NOMBRE);
                                $("#txt_sexo_adop").val(data.d.Resultado.SEXO);
                                $("#txt_tamano_adop").val(data.d.Resultado.TAMANO);
                                $("#txt_color_adop").val(data.d.Resultado.COLOR);
                                $("#txt_tipo_adop").val(data.d.Resultado.TIPO_DSC);
                                $("#txt_raza_adop").val(data.d.Resultado.RAZA_DSC);

                                $("#pnl_adopcion_v").modal('show');
                            },
                            error: function (data) { }
                        });
                        event.preventDefault();
                    }
                });
            },
            error: function (data) {
                $("#btn_buscar_adopcion").removeAttr("disabled");
            }
        });
    });

    cargarTipo();
}