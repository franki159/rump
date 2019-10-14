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
        $('#actualizarMascota').hide();
        mostrarTotalMascota();
        obtenerMascotas();
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

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener las razas de mascota">
    function obtenerRazasMascota() {
        var mascota_tipo_id=$('#mascota_tipo_id').val();
        var data = {mascota_tipo_id:mascota_tipo_id};
        var respuesta = peticion(data, 'obtenerMascotaRazasParam1', '/mascotaraza/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#mascota_raza_id').empty();
            var opcion = $('<option>', {val: '', text: 'Seleccionar'});
            $('#mascota_raza_id').append(opcion);
            console.log(resultado);
            for (var i = 0; i < resultado.length; i++) {
                var opcion = $('<option>', {text: resultado[i].tipo, val: resultado[i].id});
                $('#mascota_raza_id').append(opcion);
            }
        } else {
            $('#mascota_raza_id').empty();
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
            $('#mascota_tipo_id').empty();
            for (var i = 0; i < resultado.length; i++) {
                var opcion = $('<option>', {text: resultado[i].tipo, val: resultado[i].id})
                $('#mascota_tipo_id').append(opcion);
            }
        } else {
            $('#mascota_tipo_id').empty();
            alert(respuesta.mensaje);
        }
    }
    // </editor-fold>

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

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite el cambio de los departamentos">
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

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite el cambio de las provincias">
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

    //<editor-fold defaultstate="collapsed" desc="Funcion que permite obtener una geografia">
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

    function obtenerMascotas() {
        var data = {};
        var respuesta = peticion(data, 'obtenerMascotasParam4', '/mascota/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            for (var i = 0; i < resultado.length; i++) {
                var tr = $('<tr>');
                var td1 = $('<td>', {class: 'not_hide'});
                var td2 = $('<td>', {text: resultado[i].nombre});
                var td3 = $('<td>', {text: resultado[i].sexo});
                var td4 = $('<td>', {text: resultado[i].tamano});
                var td5 = $('<td>', {text: resultado[i].color});
                var td6 = $('<td>', {text: resultado[i].mascota_raza.mascota_tipo.tipo});
                var td7 = $('<td>', {text: resultado[i].mascota_raza.tipo});
                var td8 = $('<td>');
                var divimage = $('<div>', {class: 'image empty'});
                var aimage = $('<a>', {href: '#', id: resultado[i].id, click: verMascota});
                if (resultado[i].mascota_galeria[resultado[i].mascota_galeria.length-1].foto != null && resultado[i].mascota_galeria[resultado[i].mascota_galeria.length-1].foto !== "") {
                    var image = $('<img>', {src: '/storage/mascotas/' + resultado[i].mascota_galeria[resultado[i].mascota_galeria.length-1].foto});
                    aimage.append(image);
                } else {
                    var image = $('<img>', {src: 'front_estilos/img/rump/rump_sin_foto.png'});
                    aimage.append(image);
                }
                aimage.attr('data-toggle', 'modal');
                aimage.attr('data-target', '#modalVerMascota');
                divimage.append(aimage);
                td1.append(divimage);
                var div = $('<div>', {class: 'btn-group btn-group-justified'});
                var buttonActualizarMascota = $('<button>', {title: 'Actualizar mascota', type: 'button', click: eventoActualizarMascota, class: 'btn btn-default', name: 'actualizarUsuario', id: resultado[i].id});
                buttonActualizarMascota.attr('data-toogle', 'tooltip');
                buttonActualizarMascota.attr('data-placement', 'bottom');
                var i1 = $('<img>', {src: '/images/iconos/ico-editar.png'});
                buttonActualizarMascota.append(i1);
                var buttonEliminarMascota = $('<button>', {title: 'Eliminar mascota', type: 'button', click: eventoEliminarMascota, class: 'btn btn-default', name: 'eliminarUsuario', id: resultado[i].id});
                buttonEliminarMascota.attr('data-toogle', 'tooltip');
                buttonEliminarMascota.attr('data-placement', 'bottom');
                var i2 = $('<img>', {src: '/images/iconos/ico-eliminar.png'});
                buttonEliminarMascota.append(i2);
                var buttonSolicitarDNIMascota = $('<button>', {title: 'Solicitar DNI de mascota', type: 'button', click: eventoSolicitarDNIMascota, class: 'btn btn-default', name: 'actualizarUsuario', id: resultado[i].id});
                buttonSolicitarDNIMascota.attr('data-toogle', 'tooltip');
                buttonSolicitarDNIMascota.attr('data-placement', 'bottom');
                var i3 = $('<img>', {src: '/images/iconos/ico-tarjeta.png'});
                buttonSolicitarDNIMascota.append(i3);
                var buttonReportarMascotaExtraviada = $('<button>', {title: 'Reportar mascota como extraviada', type: 'button', click: eventoReportarMascotaExtraviada, class: 'btn btn-default', name: 'actualizarUsuario', id: resultado[i].id});
                buttonReportarMascotaExtraviada.attr('data-toogle', 'tooltip');
                buttonReportarMascotaExtraviada.attr('data-placement', 'bottom');
                var i4 = $('<img>', {src: '/images/iconos/ico-extraviada.png'});
                buttonReportarMascotaExtraviada.append(i4);
                var buttonReportarMascotaAdopcion = $('<button>', {title: 'Poner mascota en adopcion', type: 'button', click: eventoReportarMascotaAdopcion, class: 'btn btn-default', name: 'actualizarUsuario', id: resultado[i].id});
                buttonReportarMascotaAdopcion.attr('data-toogle', 'tooltip');
                buttonReportarMascotaAdopcion.attr('data-placement', 'bottom');
                var i5 = $('<img>', {src: '/images/iconos/ico-adoptar.png'});
                buttonReportarMascotaAdopcion.append(i5);
                div.append(buttonActualizarMascota);
                div.append(buttonEliminarMascota);
                div.append(buttonSolicitarDNIMascota);
                div.append(buttonReportarMascotaExtraviada);
                div.append(buttonReportarMascotaAdopcion);
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

    $("#mascota_tipo_id").change(function () {
        var mascota_tipo_id = $('#mascota_tipo_id').val();
        var data = {mascota_tipo_id: mascota_tipo_id};
        var respuesta = peticion(data, 'obtenerMascotaRazasParam1', '/mascotaraza/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#mascota_raza_id').empty();
            var opcion = $('<option>', {val: '', text: 'Seleccionar'});
            $('#mascota_raza_id').append(opcion);
            for (var i = 0; i < resultado.length; i++) {
                var opcion = $('<option>', {val: resultado[i].id, text: resultado[i].tipo});
                $('#mascota_raza_id').append(opcion);
            }
        } else {
            $('#mascota_raza_id').empty();
            alert(respuesta.mensaje);
        }
    });

    function verMascota() {
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerMascotaRel', '/mascota/');
        var resultado = respuesta.resultado;
        console.log(resultado);
        if (resultado != null) {
            $('#foto_v').attr('src', '/storage/mascotas/' + resultado.mascota_galeria[0].foto);
            $('#nombre_v').val(resultado.nombre);
            $('#dni_v').val(resultado.dni);
            $('#telefono_v').val(resultado.mascota_familia[0].telefono);
            $('#domicilio_v').val(resultado.mascota_domicilio.direccion);
            $('#pais_v').val(resultado.mascota_domicilio.geografia.pais);
            $('#calificacion_v').val(resultado.calificacion);
        }
    }


    function eventoActualizarMascota() {
        var id = $(this).attr('id');
        var data = {id: id};
        var respuesta = peticion(data, 'obtenerMascotaRel', '/mascota/');
        var resultado = respuesta.resultado;
        console.log(resultado);
        if (resultado != null) {
            $('#id').val(resultado.id);
            $('#nombre').val(resultado.nombre);
            $('#apellido').val(resultado.apellido);
            $('#sexo').val(resultado.sexo);
            $('#tamano').val(resultado.tamano);
            $('#mascota_tipo_id').val(resultado.mascota_raza.mascota_tipo.id);
            obtenerRazasMascota();
            $('#mascota_raza_id').val(resultado.mascota_raza.id);
            $('#color').val(resultado.color);
            $('#fecha_nacimiento').val(resultado.fecha_nacimiento);
            for (var i = 0; i < resultado.mascota_familia.length; i++) {
                if (resultado.mascota_familia[i].tipo === "padre") {
                    $('#mascota_familia_padre_id').val(resultado.mascota_familia[i].id);
                    $('#nombre_padre').val(resultado.mascota_familia[i].familiar);
                    $('#dni_padre').val(resultado.mascota_familia[i].dni);
                    $('#telefono_padre').val(resultado.mascota_familia[i].telefono);
                }
                if (resultado.mascota_familia[i].tipo === "madre") {
                    $('#mascota_familia_madre_id').val(resultado.mascota_familia[i].id);
                    $('#nombre_madre').val(resultado.mascota_familia[i].familiar);
                    $('#dni_madre').val(resultado.mascota_familia[i].dni);
                    $('#telefono_madre').val(resultado.mascota_familia[i].telefono);
                }
            }
            $('#biografia').val(resultado.biografia);
            $('#calificacion').val(resultado.calificacion);
            $('#castrado').val(resultado.castrado);

            $('#mascota_domicilio_id').val(resultado.mascota_domicilio.id);
            $('#departamento').val(resultado.mascota_domicilio.geografia.departamento);
            departamento = resultado.mascota_domicilio.geografia.departamento;
            $('#provincia').val(resultado.mascota_domicilio.geografia.provincia);
            provincia = resultado.mascota_domicilio.geografia.provincia;
            $('#distrito').val(resultado.mascota_domicilio.geografia.distrito);
            distrito = resultado.mascota_domicilio.geografia.distrito;
            $('#direccion').val(resultado.mascota_domicilio.direccion);
            $('#piso').val(resultado.mascota_domicilio.piso);
            $('#referencia').val(resultado.mascota_domicilio.referencia);

            $('#mascota_salud_id').val(resultado.mascota_salud.id);
            $('#visita').val(resultado.mascota_salud.visita);
            $('#alergia_medicamento').val(resultado.mascota_salud.alergia_medicamento);
            $('#vacunacion').val(resultado.mascota_salud.vacunacion);
            $('#antirrabica').val(resultado.mascota_salud.antirrabica);
            $('#alergia').val(resultado.mascota_salud.alergia);
            $('#enfermedad').val(resultado.mascota_salud.enfermedad);
            $('#enfermedad_descripcion').val(resultado.mascota_salud.enfermedad_descripcion);
            $('#fecha_desparacitacion').val(resultado.mascota_salud.fecha_desparacitacion);
            if (resultado.mascota_galeria[resultado.mascota_galeria.length-1].foto) {
                $('#foto_perfil').attr('src', '/storage/mascotas/' + resultado.mascota_galeria[resultado.mascota_galeria.length-1].foto);
            } else {
                $('#foto_perfil').attr('src', 'front_estilos/img/rump/rump_sin_foto.png');
            }
            $('#actualizarMascota').show();
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    function actualizarMascota() {
        var id = $('#id').val();
        var mascota_domicilio_id = $('#id').val();
        var mascota_familia_madre_id = $('#mascota_familia_madre_id').val();
        var mascota_familia_padre_id = $('#mascota_familia_padre_id').val();
        var mascota_salud_id = $('#mascota_salud_id').val();
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
        //SEGUN ORM
        if (foto) {
            var mascotaFamilia = [{id: mascota_familia_madre_id, familiar: nombre_padre, dni: dni_padre, telefono: telefono_padre, tipo: "padre"},
                {id: mascota_familia_padre_id, familiar: nombre_madre, dni: dni_madre, telefono: telefono_madre, tipo: "madre"}];
            var mascotaDomicilio = {id:mascota_domicilio_id,direccion: direccion, piso: piso, referencia: referencia, geografia_id: geografia_id};
            var mascotaSalud = {id:mascota_salud_id, visita: visita, alergia_medicamento: alergia_medicamento, vacunacion: vacunacion, antirrabica: antirrabica,
                alergia: alergia, enfermedad: enfermedad, enfermedad_descripcion: enfermedad_descripcion,fecha_desparacitacion:fecha_desparacitacion};
            var mascotaGaleria = [{foto: foto}];
            var data = {id:id, nombre: nombre, apellido: apellido, sexo: sexo, tamano: tamano, color: color,
                fecha_nacimiento: fecha_nacimiento, biografia: biografia, calificacion: calificacion,
                castrado: castrado, mascota_raza_id:mascota_raza_id, mascotaDomicilio: mascotaDomicilio,
                mascotaSalud: mascotaSalud, mascotaFamilia: mascotaFamilia, mascotaGaleria: mascotaGaleria};
            console.log(data);
            var respuesta = peticion(data, 'actualizarMascota', '/mascota/');
            var resultado = respuesta.resultado;
            if (resultado != null) {
                alert(respuesta.mensaje);
                window.location.href='/mipanel/mascota'; 
            } else {
                alert(respuesta.mensaje);
            }
        }
    }
    
    function cargarFoto() {
        var foto = $("#foto")[0].files[0];
        var data = new FormData();
        data.append("foto", foto);
        var respuesta = peticionArchivo(data, 'crearMascotaGaleria', '/mascotagaleria/');
        var resultado = respuesta.foto;
        return resultado;
    }
    
    
    $('#actualizarMascota').on("click", function () {
        actualizarMascota();
    });

    function eventoEliminarMascota() {
        var id = $(this).attr('id');
        var opcion = confirm("Desea eliminar la mascota?");
        if (opcion) {
            var data = {id: id};
            var respuesta = peticion(data, 'eliminarMascota', '/mascota/');
            alert(respuesta.mensaje);
            window.location.reload();
        }
    }

    function eventoSolicitarDNIMascota() {
        var id = $(this).attr('id');
        var opcion = confirm("Desea generar el DNI de la mascota?");
        if (opcion) {
            window.location.href = '/mascota/descargarDNI?id=' + id;
        }
    }

    function eventoReportarMascotaExtraviada() {
        var id = $(this).attr('id');
        window.location.href = '/mipanel/mascotaextraviada?id=' + id;
    }

    function eventoReportarMascotaAdopcion() {
        var id = $(this).attr('id');
        window.location.href = '/mipanel/mascotaadopcion?id=' + id;
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
});