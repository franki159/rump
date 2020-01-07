if ($('#list-enciclopedia')) {
    function fc_listar_enciclopedia() {
        var eMascota = {
            TIPO_MASCOTA_ID: ($("#sel_tipo").val() == '0' || $("#sel_tipo").val() == '' || $("#sel_tipo").val() == 'TODOS' ? 0 : $("#sel_tipo").val()),
            TIPO_RAZA_ID: ($("#sel_raza").val() == '0' || $("#sel_raza").val() == '' || $("#sel_raza").val() == 'TODOS' ? 0 : $("#sel_raza").val()),
        };

        $.ajax({
            type: "POST",
            url: "enciclopedia.aspx/Lista",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({ objE: eMascota }),
            async: false,
            beforeSend: function () {
                $("#list-enciclopedia").empty();
            },
            success: function (data) {
                var html = '';
                for (var i = 0; i < data.d.Resultado.length; i++) {
                    html += '<div class="col-12 col-md-6 col-lg-6">' +
                        '<div class="single-post-area mb-100 wow fadeInUp border" data - wow - delay="300ms">' +
                        '<div class="post-meta">' +
                        '<a href="#" class="post-date">' + data.d.Resultado[i].TIPO_MASCOTA + '</a>' +
                        '<a href="#" class="post-catagory">Tipo: ' + data.d.Resultado[i].TIPO_RAZA + '</a>' +
                        '</div>' +
                        '<a href="#" class="post-title">Nombre original: ' + data.d.Resultado[i].NOMBRE + '</a>' +
                        '<p>Tamaño del macho: ' + data.d.Resultado[i].TAMANO_MACHO + '</p>' +
                        '<p>Tamaño de la hembra: ' + data.d.Resultado[i].TAMANO_HEMBRA + '</p>' +
                        '<p>Grado de cuidado: ' + data.d.Resultado[i].GRADO_CUIDADO + '</p>' +
                        '<p>País de origen: ' + data.d.Resultado[i].PAIS_ORIGEN + '</p>' +
                        '<p>General: ' + data.d.Resultado[i].GENERAL + '</p>' +
                        '<p>Cabeza: ' + data.d.Resultado[i].CABEZA + '</p>' +
                        '<p>Cuerpo: ' + data.d.Resultado[i].CUERPO + '</p>' +
                        '<p>Pelaje: ' + data.d.Resultado[i].PELAJE + '</p>' +
                        '<p>Pelaje: ' + data.d.Resultado[i].PELAJE + '</p>' +
                        '<p>Orejas: ' + data.d.Resultado[i].OREJA + '</p>' +
                        '<p>Cola: ' + data.d.Resultado[i].COLA + '</p>' +
                        '</div >' +
                        '</div >';
                }
                $("#list-enciclopedia").append(html);
            },
            error: function (data) { }
        });
    }

    $("#btn_buscar_enciclopedia").on('click', function () {
        fc_listar_enciclopedia();
    });

    fc_listar_enciclopedia();
}