$(function ()
{
    $(document).ready(function () {
        mostrarTotalMascota();
        mostrarTipoMascota();
    });

    function mostrarTipoMascota() {
        $.ajax({
            type: 'POST',
            url: '/mascotatipo/obtenerMascotaTipos',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                console.log(data);
                if (data.resultado.length > 0) {
                    //cmb = "<option value=''> Seleccione... </option>";
                    cmb = "";
                    cmb += "<option value='0'>Seleccione</option>";
                    for (var i = 0; i < data.resultado.length; i++) {
                        cmb += "<option value='" + data.resultado[i].id + "'>" + data.resultado[i].tipo + "</option>";
                    }
                    //llenamos el combo
                    $('#cbo_tipo').html(cmb);
                }
            }
        });
    }

    function mostrarTotalMascota() {
        $.ajax({
            type: 'POST',
            url: '/mascota/obtenerCantidadMascotas',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (data) {
                $('#lbl_total_mascota').html(data.resultado);
            }
        });
    }

    $("#btn_buscar_mascotaadoptame").click(function () {
        obtenerMascotaAdoptada();
    });

    function obtenerMascotaAdoptada() {
        var sexo = $('#cbo_sexo').val();
        var edad = $('#cbo_edad').val();
        var solo = $('#cbo_estasolo').val();
        var tamano = $('#cbo_tamano').val();
        var castrado = $('#cbo_castrado').val();
        var mascota_tipo_id = $('#cbo_tipo').val();
        window.location.href="/mascotaadoptada?sexo="+sexo+"&"+"edad="+edad+"&"+"solo="+solo+"&"+"tamano="+tamano+
                "&"+"castrado="+castrado+"&"+"mascota_tipo_id="+mascota_tipo_id;
    }

    //<editor-fold defaultstate="collapsed" desc="Funcion peticion de datos">
    function peticion(data, funcion, ruta = '/mascotaadopcion/') {
        var respuesta;
        $.ajax({
            type: "POST",
            url: ruta + funcion,
            data: data,
            async: false,
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            success: function (data)
            {
                var resultado = data;
                respuesta = resultado;
            },
            error: function ()
            {
                $('#alerta').addClass('alert alert-danger');
                $('#alerta').text('Error en la peticion');
                respuesta = null;
            }
        });
        return respuesta;
    }
    // </editor-fold>
});