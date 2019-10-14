/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function ()
{
    var departamento = null;
    var provincia = null;
    var distrito = null;

    $(document).ready(function () {
        mostrarTotalMascota();
        obtenerTiposMascota();
        obtenerDepartamentos();

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


    $('#departamento').autocomplete({
        source: [],
        select: function (event, ui) {
            departamento = ui.item.val;
            cambioDepartamento(departamento);
        },
        change: function (event, ui) {
            $(this).val((ui.item ? ui.item.label : ""));
            departamento = (ui.item ? ui.item.val : null);
            $('#provincia').val("");
            provincia = null;
            $('#distrito').val("");
            distrito = null;
        }
    });
    $('#provincia').autocomplete({
        source: [],
        select: function (event, ui) {
            provincia = ui.item.val;
            cambioProvincia(provincia);
        },
        change: function (event, ui) {
            $(this).val((ui.item ? ui.item.label : ""));
            provincia = (ui.item ? ui.item.val : null);
            $('#distrito').val("");
            distrito = null;
        }
    });

    $('#distrito').autocomplete({
        source: [],
        select: function (event, ui) {
            distrito = ui.item.val;
        },
        change: function (event, ui) {
            $(this).val((ui.item ? ui.item.label : ""));
            distrito = (ui.item ? ui.item.label : null);
        }
    });

    function obtenerTiposMascota() {
        var data = {};
        var respuesta = peticion(data, 'obtenerMascotaTipos', '/mascotatipo/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            for (var i = 0; i < resultado.length; i++) {
                var opcion = $('<option>', {text: resultado[i].tipo, val: resultado[i].id})
                $('#mascota_tipo_id').append(opcion);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener los departamentos">
    function obtenerDepartamentos() {
        var data = {};
        var respuesta = peticion(data, 'obtenerDepartamentos', '/geografia/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            var departamentos = [];
            for (var i = 0; i < resultado.length; i++) {
                var opcion = {val: resultado[i].departamento, label: resultado[i].departamento};
                departamentos.push(opcion);
            }
            $('#departamento').autocomplete('option', 'source', departamentos);
        } else {
            alert(respuesta.mensaje);
        }
    }
    // </editor-fold>

    function cambioDepartamento(departamento) {
        var data = {departamento: departamento};
        var respuesta = peticion(data, 'obtenerProvincias', '/geografia/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            var provincias = [];
            for (var i = 0; i < resultado.length; i++) {
                var opcion = {val: resultado[i].provincia, label: resultado[i].provincia};
                provincias.push(opcion);
            }
            $('#provincia').autocomplete('option', 'source', provincias);
        } else {
            alert(respuesta.mensaje);
        }
    }

    function cambioProvincia(provincia) {
        var data = {provincia: provincia};
        var respuesta = peticion(data, 'obtenerDistritos', '/geografia/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            var distritos = [];
            for (var i = 0; i < resultado.length; i++) {
                var opcion = {val: resultado[i].distrito, label: resultado[i].distrito};
                distritos.push(opcion);
            }
            $('#distrito').autocomplete('option', 'source', distritos);
        } else {
            alert(respuesta.mensaje);
        }
    }

    function obtenerMascotas(pagina) {
        var cantidad_datos_pagina=$('#cantidad_datos_pagina').val();
        var mascota_tipo_id = $('#mascota_tipo_id').val();
        var data = {pagina:pagina, cantidad_datos_pagina:cantidad_datos_pagina};
        if (mascota_tipo_id != null && mascota_tipo_id !== "")
            data['mascota_tipo_id'] = mascota_tipo_id;
        if (departamento != null && departamento !== "")
            data['departamento'] = departamento;
        if (provincia != null && provincia !== "")
            data['provincia'] = provincia;
        if (distrito != null && distrito !== "")
            data['distrito'] = distrito;
        var tabla=$('#tabla');
        tabla.empty();
        var respuesta = peticion(data, 'obtenerMascotasParam1', '/mascota/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            console.log(resultado);
            for (var i = 0; i < resultado.mascotas.length; i++) {
                var propietarioRespuesta = resultado.mascotas[i].usuario.nombre + ' ' + resultado.mascotas[i].usuario.apellido;
                var nombreRespuesta = resultado.mascotas[i].nombre;
                var tipoRespuesta = resultado.mascotas[i].mascota_raza.mascota_tipo.tipo;
                var departamentoRespuesta = resultado.mascotas[i].mascota_domicilio.geografia.departamento;
                var provinciaRespuesta = resultado.mascotas[i].mascota_domicilio.geografia.provincia;
                var distritoRespuesta = resultado.mascotas[i].mascota_domicilio.geografia.distrito;
                var celularRespuesta = resultado.mascotas[i].usuario.celular;
                var telefonoRespuesta = resultado.mascotas[i].usuario.telefono;
                var tr=$('<tr>');
                var td1=$('<td>', {text:propietarioRespuesta});
                var td2=$('<td>', {text:nombreRespuesta});
                var td3=$('<td>', {text:tipoRespuesta});
                var td4=$('<td>', {text:departamentoRespuesta});
                var td5=$('<td>', {text:provinciaRespuesta});
                var td6=$('<td>', {text:distritoRespuesta});
                var td7=$('<td>', {text:celularRespuesta});
                var td8=$('<td>', {text:telefonoRespuesta});
                tr.append(td1);
                tr.append(td2);
                tr.append(td3);
                tr.append(td4);
                tr.append(td5);
                tr.append(td6);
                tr.append(td7);
                tr.append(td8);
                tabla.append(tr);
            }   
            var script="";
            script=script+'<ul class="pagination">';
            if (resultado.totalPaginas>1) {
                if(resultado.pagina !== 1) {
                    script=script+'<li class="page-item"><a class="page-link" name="pagina" href="#" id="'+parseInt(resultado.pagina)-1+'"><span aria-hidden="true">'+parseInt(resultado.pagina)-1+'</span></a></li>';
                }
                for(var i=1; i<resultado.totalPaginas; i++) {
                    if (resultado.pagina == i) {
                        script= script+ '<li class="page-item active"><a class="page-link" name="pagina" href="#">'+resultado.pagina+'</a></li>';
                    } else {
                        script= script+ '<li class="page-item"><a class="page-link" name="pagina" href="#" id="'+i+'">'+i+'</a></li>';
                    }
                }
//                if (resultado.pagina != resultado.totalPaginas) {
//                    script= script+ '<li class="page-item"><a class="page-link" name="pagina" id="'+parseInt(resultado.pagina)+1+'" href="#"><span aria-hidden="true">'+parseInt(resultado.pagina)+1+'</span></a></li>';
//                }
            }
            script=script+'</ul>';
            $('#paginacion').html(script);
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    $('[name=pagina]').on("click", function ()
    {
        var pagina = $(this).attr('id');
        obtenerMascotas(pagina);
    });
    

    $('#obtenerMascotas').on("click", function () {
        var pagina=1;
        obtenerMascotas(pagina);
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

//    function paginacion() {
//        tablaPaginacion = $('#paginacion').DataTable({
//            "pagingType": "numbers",
//            "lengthMenu": [20, 40, 60, 80, 100],
//            "searching": false,
//            "info": false,
//            "ordering": false,
//            "language": {
//                "emptyTable": "Registros No Disponibles",
//                "lengthMenu": "Mostrar _MENU_ Datos"
//            }
//        });
//    }

//    $('#paginacion').on('page.dt', function () {
//        var info = tablaPaginacion.page.info();
//        var datos=info.length;
//        var pagina=info.page;
//        obtenerMascotas(datos, pagina);
//    });

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

