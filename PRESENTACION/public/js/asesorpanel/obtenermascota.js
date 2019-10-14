/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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

    function obtenerMascotas() {
        var email = $('#email').val();
        if (email !== "") {
            var data = {email: email};
            var respuesta = peticion(data, 'obtenerMascotasParam2', '/mascota/');
            var resultado = respuesta.resultado;
            if (resultado != null) {
                $('#tabla').empty();
                for (var i = 0; i < resultado.length; i++) {
                    var tr = $('<tr>');
                    var td1 = $('<td>', {text: resultado[i].usuario.nombre + ' ' + resultado[i].usuario.apellido});
                    var td2 = $('<td>', {text: resultado[i].dni});
                    var td3 = $('<td>', {text: resultado[i].nombre});
                    var td4 = $('<td>', {text: resultado[i].mascota_raza.mascota_tipo.tipo});
                    var td5 = $('<td>', {text: resultado[i].mascota_domicilio.geografia.departamento});
                    var td6 = $('<td>', {text: resultado[i].mascota_domicilio.geografia.provincia});
                    var td7 = $('<td>', {text: resultado[i].mascota_domicilio.geografia.distrito});
                    var td8 = $('<td>', {text: resultado[i].usuario.celular});
                    var td9 = $('<td>', {text: resultado[i].usuario.telefono});
                    tr.append(td1);
                    tr.append(td2);
                    tr.append(td3);
                    tr.append(td4);
                    tr.append(td5);
                    tr.append(td6);
                    tr.append(td7);
                    tr.append(td8);
                    tr.append(td9);
                    $('#tabla').append(tr);
                }
            } else {
                $('#tabla').empty();
                alert(respuesta.mensaje);
            }
        } else {
            $('#tabla').empty();
            alert('No se encontraron mascotas');
        }
    }

    $('#obtenerMascotas').on("click", function () {
        obtenerMascotas();
    });

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
    function peticion(data, funcion, ruta = '/clientes/') {
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


