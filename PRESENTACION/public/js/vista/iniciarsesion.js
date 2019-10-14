$(function ()
{
    $(document).ready(function () {
        $('#inicioSesionFacebook').hide();
        mostrarTotalMascota();
    });

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
    function iniciarSesion() {
        var email=$('#email').val();
        var password=$('#password').val();
        var data={email:email, password:password};
        var respuesta=peticion(data, 'iniciarSesion', '/usuario/');
        var resultado=respuesta.resultado;
        if (resultado != null) {
            alert(respuesta.mensaje);
            window.location.href = resultado;
        } else {
            alert(respuesta.mensaje);
            window.location.href = resultado;
        }
    }
    
    $('#iniciarSesion').on("click", function (){
        iniciarSesion();
    });
    
    //<editor-fold defaultstate="collapsed" desc="Funcion peticion de datos">
    function peticion(data, funcion, ruta = '/usuario/') {
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
