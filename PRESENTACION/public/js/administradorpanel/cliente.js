/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function ()
{
    $(document).ready(function (){
        mostrarTotalMascota();
        obtenerClientes();
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
    
    function obtenerClientes() {
        var data = {};
        var respuesta=peticion(data,'obtenerClientes','/usuario/');
        var resultado=respuesta.resultado;
        if (resultado != null) {
            for (var i=0; i<resultado.length; i++) {
                var tr=$('<tr>');
                var td1=$('<td>', {text:resultado[i].email});
                var td2=$('<td>', {text:resultado[i].password});
                var td3=$('<td>', {text:resultado[i].nombre});
                var td4=$('<td>');
                var div=$('<div>', {class: 'btn-group btn-group-justified'});
                var buttonActualizar=$('<button>', {click:eventoActualizarUsuario, class: 'btn btn-default', name: 'actualizarUsuario', id:resultado[i].id});
                var i1=$('<i>', {class: 'fa fa-pencil'});
                buttonActualizar.append(i1);
                var buttonEliminar=$('<button>', {click: eventoEliminarUsuario, class: 'btn btn-default', name: 'eliminarUsuario', id:resultado[i].id});
                buttonEliminar.attr('data-toogle', 'modal');
                buttonEliminar.attr('data-target', '#modalEliminarUsuario');
                var i2=$('<i>', {class: 'fa fa-trash-o'});
                buttonEliminar.append(i2);
                div.append(buttonActualizar);
                div.append(buttonEliminar);
                td4.append(div);
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                $('#tabla').append(tr);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    $('#confirmarCrearCliente').on("click", function ()
    {
        var email=$('#email_c').val();
        var password=$('#password_c').val();
        var nombre=$('#nombre_c').val();
        var data = {email:email, password:password, nombre:nombre};
        var respuesta = peticion(data, 'crearUsuarioCliente');
        var resultado=respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href = "/administradorpanel/cliente";
        } else {
            alert(respuesta.mensaje);
        }
    });
    
    //<editor-fold defaultstate="collapsed" desc="Evento para eliminar un usuario">
    function eventoActualizarUsuario(){
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerUsuario');
        var resultado=respuesta.resultado;
        if (resultado != null) {
            $('#id_a').val(resultado.id);
            $('#email_a').val(resultado.email);
            $('#password_a').val(resultado.password);
            $('#nombre_a').val(resultado.nombre);
            $('#modalActualizarUsuario').modal('show');
        } else {
            alert(respuesta.mensaje);
        }
    }

    $('#confirmarActualizarUsuario').on("click", function ()
    {
        var id = $('#id_a').val();
        var password=$('#password_a').val();
        var nombre=$('#nombre_a').val();
        var data = {id:id, password:password, nombre:nombre};
        console.log(id);
        var confirmar_password=$('#confirmar_password_a').val();
        if (confirmar_password) {
            data['confirmar_password']=confirmar_password;
        }
        var respuesta = peticion(data, 'actualizarUsuario', '/usuario/');
        var resultado=respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href = "/administradorpanel/cliente";
        } else {
            alert(respuesta.mensaje);
        }
    });
    
    //<editor-fold defaultstate="collapsed" desc="Evento para eliminar un usuario">
    function eventoEliminarUsuario()
    {
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerUsuario');
        var resultado=respuesta.resultado;
        if (resultado != null) {
            $('#id_e').val(resultado.id);
            $('#email_e').val(resultado.email);
            $('#password_e').val(resultado.password);
            $('#nombre_e').val(resultado.nombre);
            $('#modalEliminarUsuario').modal('show');
        } else {
            alert('ERROR AL OBTENER EL USUARIO');
        }
    }

    $('#confirmarEliminarUsuario').on("click", function ()
    {
        var id = $('#id_e').val();
        var data = {id: id};
        var respuesta = peticion(data, 'eliminarUsuario');
        var resultado=respuesta.resultado;
        if (resultado) {
            window.location.href = "/administradorpanel/cliente";
        } else {
            alert(respuesta.mensaje);
        }
    });
    
    $('#cerrarSesion').on("click", function (){
        var data={};
        var respuesta = peticion(data, 'cerrarSesion', '/usuario/');
        var resultado=respuesta.resultado;
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
                $('#alerta').addClass('alert alert-danger');
                $('#alerta').text('Error en la peticion');
                respuesta = null;
            }
        });
        return respuesta;
    }
    // </editor-fold>
});

