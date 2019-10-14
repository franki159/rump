$(function ()
{
    $(document).ready(function () {
    });
    
    function cambiarPassword() {
        var id=$('#usuario_id').val();
        var password=$('#password').val();
        var confirmar_password=$('#confirmar_password').val();
        if (password===confirmar_password) {
            var data={id:id, password:password};
            var respuesta=peticion(data, 'cambiarPasswordUsuario');
            var resultado=respuesta.resultado;
            if (resultado) {
                alert(respuesta.mensaje);
                window.location.href = "/iniciarsesion";
            } else {
                alert(respuesta.mensaje);
            }
        } else {
            alert("LAS CONTRASEÑAS NO SON IGUALES");
        }     
    }
    
    $('#cambiarPassword').on("click", function (){
        cambiarPassword();
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

