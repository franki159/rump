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


    function crearUsuario() {
        if (confirmarPassword !== "" && password === confirmarPassword) {
            var email = $('#email').val();
            var nombre = $('#nombre').val();
            var apellido = $('#apellido').val();
            var fecha_nacimiento = $('#fecha_nacimiento').val();
            var telefono = $('#telefono').val();
            var celular = $('#celular').val();
            var password = $('#password').val();
            var confirmarPassword = $('#confirmar_password').val();
            var sexo = "";
            if ($('#sexo_masculino').prop('checked')) {
                sexo = "Masculino";
            } else {
                sexo = "Femenino";
            }
            var data = {email:email,nombre: nombre, apellido: apellido, fecha_nacimiento: fecha_nacimiento, telefono: telefono, celular: celular, sexo: sexo, password: password};

            var foto = cargarFoto();
            if (foto) {
                foto = $("#foto")[0].files[0].name;
                data['foto'] = foto;
            }
            console.log(data);
            var respuesta = peticion(data, 'registrarPropietarioUsuario');
            var resultado = respuesta.resultado;
            if (resultado) {
                alert(respuesta.mensaje);
                window.location.reload();
            } else {
                alert(respuesta.mensaje);
            }
        } else {
            alert("Las contraseñas deben ser iguales");
        }
    }

    function cargarFoto() {
        var foto = $("#foto")[0].files[0];
        if (foto) {
            var data = new FormData();
            data.append("foto", foto);
            var respuesta = peticionArchivo(data, 'crearUsuarioGaleria', '/usuario/');
            var resultado = respuesta.resultado;
            return resultado;
        } else {
            return false;
        }
    }

    $('#crearUsuario').on("click", function () {
        crearUsuario();
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
    function peticionArchivo(data, funcion, ruta = '/usuario/') {
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

