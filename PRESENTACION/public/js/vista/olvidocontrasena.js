$(function ()
{
    $(document).ready(function () {
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

    function recuperarPassword() {
        if ($('#chk_otrometodo').prop("checked")) {
            var totalMascotas = $('#txt_pregunta1').val();
            var nombre = $('#txt_pregunta2').val();
            var dni = $('#txt_pregunta3').val();
            var data = {totalMascotas: totalMascotas, nombre: nombre, dni: dni};
            console.log(data);
            var respuesta = peticion(data, 'recuperarPasswordUsuario2');
            if (respuesta != null) {
                var resultado = respuesta.resultado;
                if (resultado) {
                    alert(respuesta.mensaje);
                    window.location.href = '/usuario/activarpasswordusuario?token_password=' + respuesta.token_password;
                } else {
                    alert(respuesta.mensaje);
                }
            } else {
                alert("Error no se encontro el usuario");
            }
        } else {
            var email = $('#email').val();
            var data = {email: email};
            var respuesta = peticion(data, 'recuperarPasswordUsuario');
            var resultado = respuesta.resultado;
            if (resultado) {
                alert(respuesta.mensaje);
            } else {
                alert(respuesta.mensaje);
            }
        }

    }

    $('#recuperarPassword').on("click", function () {
        recuperarPassword();
    });


    $("#chk_otrometodo").change(function () {
        if (this.checked) {
            $("#correo").prop("disabled", true);
            $("#correo").val('');
            var html = '';
            html += '<br>';
            html += '<div class="form-group">';
            html += '<input class="form-control" id="txt_pregunta1" name="txt_pregunta1" style="background: transparent" required="" placeholder="¿Cuántas mascotas tienes registradas?"/>'
            html += '<div>';
            html += '<br>';
            html += '<div class="form-group">';
            html += '<input class="form-control" id="txt_pregunta2" name="txt_pregunta2" style="background: transparent" required="" placeholder="Escribe el nombre de una de tus mascotas"/>'
            html += '<div>';
            html += '<br>';
            html += '<div class="form-group">';
            html += '<input class="form-control" id="txt_pregunta3" name="txt_pregunta3" style="background: transparent" required="" placeholder="¿Cuál es el número de DNI de una de tus mascotas?"/>'
            html += '<div>';
            $('#div_otrometodo').html(html);
        } else {
            $("#correo").prop("disabled", false);
            $("#correo").val('');
            $('#div_otrometodo').html('');
        }
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