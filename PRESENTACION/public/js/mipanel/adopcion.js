$(function ()
{   
    $(document).ready(function () {
        mostrarTotalMascota();
        obtenerMascotasAdopcion();
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
    
    function obtenerMascotasAdopcion() {
        var data = {};
        var respuesta = peticion(data, 'obtenerMascotasAdopcionesParam3', '/mascotaadopcion/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            for (var i = 0; i < resultado.length; i++) {
                var tr = $('<tr>');
                var td1 = $('<td>', {class: 'not_hide'});
                var td2 = $('<td>', {text: resultado[i].mascota.nombre});
                var td3 = $('<td>', {text: resultado[i].mascota.sexo});
                var td4 = $('<td>', {text: resultado[i].mascota.tamano});
                var td5 = $('<td>', {text: resultado[i].mascota.color});
                var td6 = $('<td>', {text: resultado[i].mascota.mascota_raza.mascota_tipo.tipo});
                var td7 = $('<td>', {text: resultado[i].mascota.mascota_raza.tipo});
                var td8 = $('<td>');
                var divimage=$('<div>', {class: 'image empty'});
                var aimage=$('<a>', {href: '#', id:resultado[i].mascota.id, click:verMascota});
                if (resultado[i].mascota.mascota_galeria[0].foto != null && resultado[i].mascota.mascota_galeria[0].foto !== "") {
                    var image=$('<img>', {src: '/storage/mascotas/'+resultado[i].mascota.mascota_galeria[0].foto});
                    aimage.append(image);
                } else {
                    var image=$('<img>', {src: 'front_estilos/img/rump/rump_sin_foto.png'});
                    aimage.append(image);
                }
                aimage.attr('data-toogle', 'modal');
                aimage.attr('data-target', '#modalVerMascota');
                divimage.append(aimage);
                td1.append(divimage);
                var div = $('<div>', {class: 'btn-group btn-group-justified'});
                var buttonActualizarAdopcion = $('<button>', {title: 'Editar adopcion', type: 'button', click: eventoActualizarAdopcion, class: 'btn btn-default', name: 'actualizarAdopcion', id: resultado[i].id});
                buttonActualizarAdopcion.attr('data-toogle', 'tooltip');
                buttonActualizarAdopcion.attr('data-placement', 'bottom');
                var i2 = $('<img>', {src:'/images/iconos/ico-editar.png'});
                buttonActualizarAdopcion.append(i2);
                div.append(buttonActualizarAdopcion);
                var buttonEliminarAdopcion = $('<button>', {title: 'Eliminar adopcion', type: 'button', click: eventoEliminarAdopcion, class: 'btn btn-default', name: 'eliminarAdopcion', id: resultado[i].id});
                buttonEliminarAdopcion.attr('data-toogle', 'tooltip');
                buttonEliminarAdopcion.attr('data-placement', 'bottom');
                var i2 = $('<img>', {src:'/images/iconos/ico-eliminar.png'});
                buttonEliminarAdopcion.append(i2);
                div.append(buttonEliminarAdopcion);
                td8.append(div);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                tr.append(td7);
                tr.append(td8);
                $('#tabla').append(tr);
            }
        } else {
            $('#tabla').empty();
            alert(respuesta.mensaje);
        }
    }
    
    function verMascota() {
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerMascotaRel', '/mascota/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#foto_v').attr('src','/storage/mascotas/'+resultado.mascota_galeria[0].foto);
            $('#nombre_v').val(resultado.nombre);
            $('#dni_v').val(resultado.dni);
            $('#telefono_v').val(resultado.mascota_familia[0].telefono);
            $('#domicilio_v').val(resultado.mascota_domicilio.direccion);
            $('#pais_v').val(resultado.mascota_domicilio.geografia.pais);
            $('#calificacion_v').val(resultado.calificacion);
        }
    }
    
    function eventoActualizarAdopcion() {
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerMascotaAdopcion', '/mascotaadopcion/');
        var resultado = respuesta.resultado;
        console.log(resultado);
        if (resultado != null) {
            $('#adopcion_id').val(resultado.id);
            $('#necesidades_calle_a').val(resultado.necesidades_calle);
            $('#solo_a').val(resultado.solo);
            $('#historia_a').val(resultado.sexo);
            $('#adoptado_a').val(resultado.adoptado);
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    $('#confirmarActualizarAdopcion').on("click", function ()
    {
        var id = $('#adopcion_id').val();
        var necesidades_calle=$('#necesidades_calle_a').val();
        var solo=$('#solo_a').val();
        var historia=$('#historia_a').val();
        var adoptado=$('#adoptado_a').val();
        var data = {id: id, necesidades_calle:necesidades_calle,solo:solo, historia:historia,adoptado:adoptado};
        var respuesta = peticion(data, 'actualizarMascotaAdopcion', '/mascotaadopcion/');
        var resultado=respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href = "/administradorpanel/asesor";
        } else {
            alert(respuesta.mensaje);
        }
    });
    
    function eventoEliminarAdopcion() {
        var id = $(this).attr('id');
        var opcion = confirm("Desea eliminar la mascota?");
        if (opcion) {
            var data = {id: id};
            var respuesta = peticion(data, 'eliminarMascotaAdopcion', '/mascotaadopcion/');
            alert(respuesta.mensaje);
            window.location.reload();
        }
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