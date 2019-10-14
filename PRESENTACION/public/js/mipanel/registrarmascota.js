/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var stepper1 = null;
document.addEventListener('DOMContentLoaded', function () {
    stepper1 = new Stepper(document.querySelector('#stepper1'));
});

$(function ()
{
    var departamento = null;
    var provincia = null;
    var distrito = null;

    $(document).ready(function () {
        mostrarTotalMascota();
        obtenerUsuarioSesion();
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

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener el usuario de sesion">
    function obtenerUsuarioSesion() {
        var data = {};
        var respuesta = peticion(data, 'obtenerUsuarioSesion');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#usuario_id').val(resultado.id);
        } else {
            alert(respuesta.mensaje);
        }
    }
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener los tipos de mascota">
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
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener la razas de las mascotas">
    function obtenerRazasMascota() {
        var data = {};
        var respuesta = peticion(data, 'obtenerMascotaRazas', '/mascotaraza/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            for (var i = 0; i < resultado.length; i++) {
                var opcion = $('<option>', {text: resultado[i].tipo, val: resultado[i].id})
                $('#mascota_raza_id').append(opcion);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite el evento de cambio del departamento">
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
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite el evento de cambio de provincia">
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
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener la geografia ">
    function obtenerGeografia(departamento, provincia, distrito) {
        var data = {departamento: departamento, provincia: provincia, distrito: distrito};
        var respuesta = peticion(data, 'obtenerGeografiaParam1', '/geografia/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            return resultado.id;
        } else {
            return null;
        }
    }
    // </editor-fold>

    $("#registrarMascota").on("click", function () {
        registrarMascota();
    });

    function registrarMascota() {
        var usuario_id = $('#usuario_id').val();
        var nombre = $('#nombre').val();
        var apellido = $('#apellido').val();
        var sexo = $('#sexo').val();
        var tamano = $('#tamano').val();
        var mascota_raza_id = $('#mascota_raza_id').val();
        var color = $('#color').val();
        var fecha_nacimiento = $('#fecha_nacimiento').val();
        var nombre_padre = $('#nombre_padre').val();
        var dni_padre = $('#dni_padre').val();
        var telefono_padre = $('#telefono_padre').val();
        var nombre_madre = $('#nombre_madre').val();
        var dni_madre = $('#dni_madre').val();
        var telefono_madre = $('#telefono_madre').val();
        var biografia = $('#biografia').val();
        var calificacion = $('#calificacion').val();
        var geografia_id = obtenerGeografia(departamento, provincia, distrito);
        var direccion = $('#direccion').val();
        var piso = $('#piso').val();
        var referencia = $('#referencia').val();
        var castrado = $('#castrado').val();
        var visita = $('#visita').val();
        var alergia_medicamento = $('#alergia_medicamento').val();
        var vacunacion = $('#vacunacion').val();
        var antirrabica = $('#antirrabica').val();
        var alergia = $('#alergia').val();
        var enfermedad = $('#enfermedad').val();
        var enfermedad_descripcion = $('#enfermedad_descripcion').val();
        var fecha_desparacitacion = $('#fecha_desparacitacion').val();
        
        var foto = cargarFoto();
        if (foto) {
            var mascotaFamilia = [{familiar: nombre_padre, dni: dni_padre, telefono: telefono_padre, tipo: "padre"},
                {familiar: nombre_madre, dni: dni_madre, telefono: telefono_madre, tipo: "madre"}];
            var mascotaDomicilio = {direccion: direccion, piso: piso, referencia: referencia, geografia_id: geografia_id};
            var mascotaSalud = {visita: visita, alergia_medicamento: alergia_medicamento, vacunacion: vacunacion, antirrabica: antirrabica,
                alergia: alergia, enfermedad: enfermedad, enfermedad_descripcion: enfermedad_descripcion,fecha_desparacitacion:fecha_desparacitacion};
            var mascotaGaleria = [{foto: foto}];
            var data = {nombre: nombre, apellido: apellido, sexo: sexo, tamano: tamano, color: color,
                fecha_nacimiento: fecha_nacimiento, biografia: biografia, calificacion: calificacion,
                castrado: castrado, usuario_id: usuario_id, mascota_raza_id: mascota_raza_id, mascotaDomicilio: mascotaDomicilio,
                mascotaSalud: mascotaSalud, mascotaFamilia: mascotaFamilia, mascotaGaleria: mascotaGaleria
            };
            console.log(data);
            var respuesta = peticion(data, 'crearMascota', '/mascota/');
            var resultado = respuesta.resultado;
            if (resultado != null) {
                alert(respuesta.mensaje);
            } else {
                alert(respuesta.mensaje);
            }
        } else {
            alert("Es obligatorio cargar una foto");
        }
    }
    
    $("#mascota_tipo_id").change(function () {
        var mascota_tipo_id=$('#mascota_tipo_id').val();
        var data = {mascota_tipo_id:mascota_tipo_id};
        var respuesta = peticion(data, 'obtenerMascotaRazasParam1', '/mascotaraza/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#mascota_raza_id').empty();
            var opcion = $('<option>', {val: '', text: 'Seleccionar'});
            $('#mascota_raza_id').append(opcion);
            for (var i=0; i<resultado.length; i++) {
                var opcion=$('<option>', {val:resultado[i].id, text:resultado[i].tipo});
                $('#mascota_raza_id').append(opcion);
            }
        } else {
            $('#mascota_raza_id').empty();
            alert(respuesta.mensaje);
        }
    });

    function cargarFoto() {
        var foto = $("#foto")[0].files[0];
        var data = new FormData();
        data.append("foto", foto);
        var respuesta = peticionArchivo(data, 'crearMascotaGaleria', '/mascotagaleria/');
        var resultado = respuesta.foto;
        return resultado;
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
    
    //<editor-fold defaultstate="collapsed" desc="Funcion peticion de datos con FormData">
    function peticionArchivo(data, funcion, ruta = '/mascotagaleria/') {
        var respuesta;
        $.ajax({
            type: "POST",
            url: ruta + funcion,
            data: data,
            async: false,
            processData: false,
            contentType: false,
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


