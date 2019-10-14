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

    function registrarPropietario() {
        var email = $('#email').val();
        var password = $('#password').val();
        if ($('#chk_termino').prop("checked")) {
            var data = {email: email, password: password};
            var respuesta = peticion(data, 'registrarPropietarioUsuario');
            var resultado = respuesta.resultado;
            if (resultado) {
                alert('Se creo correctamente el usuario');
                //alert(respuesta.mensaje);
            } else {
                alert(respuesta.mensaje);
            }
        } else {
            alert("POR FAVOR ACEPTA LOS TERMINOS Y CONDICIONES");
        }

    }

    $('#registrarPropietario').on("click", function () {
        registrarPropietario();
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
