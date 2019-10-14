/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function ()
{
    $(document).ready(function () {
        mostrarTotalMascota();
        obtenerMascota();
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
    
    
    function crearMascotaExtraviada() {
        var fecha=$('#fecha').val();
        var observacion=$('#observacion').val();
        var mascota_id=$('#mascota_id').val();
        var data={fecha:fecha, observacion:observacion, mascota_id:mascota_id};
        var respuesta = peticion(data, 'crearMascotaExtraviada', '/mascotaextraviada/');
        var resultado = respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href='/mipanel/mascota';
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    $('#crearMascotaExtraviada').on("click", function () {
        crearMascotaExtraviada();
    });
    
    function obtenerMascota() {
        var variables=getUrlVars();
        var data={id:variables.id};
        var respuesta = peticion(data, 'obtenerMascotaRel', '/mascota/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#mascota_id').val(resultado.id);
            $('#dni_mascota').val(resultado.dni);
            $('#nombre_usuario').val(resultado.usuario.nombre+' '+resultado.usuario.apellido);
            $('#email_usuario').val(resultado.usuario.email);
            $('#telefono_usuario').val(resultado.usuario.telefono);
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    
    $('#cerrarSesion').on("click", function () {
        var data = {};
        var respuesta = peticion(data, 'cerrarSesion', '/usuario/');
        var resultado = respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href = resultado;
        } else {
            alert(respuesta.mensaje);
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
                respuesta = null;
            }
        });
        return respuesta;
    }
    // </editor-fold>
});

