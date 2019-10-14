$(function ()
{
    $(document).ready(function () {
        mostrarTotalMascota();
        obtenerUsuario();
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
    

    function obtenerUsuario() {
        var data = {};
        var respuesta = peticion(data, 'obtenerUsuarioSesion');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#id').val(resultado.id);
            $('#nombre').val(resultado.nombre);
            $('#apellido').val(resultado.apellido);
            $('#email').val(resultado.email);
            $('#fecha_nacimiento').val(resultado.fecha_nacimiento);
            $('#telefono').val(resultado.telefono);
            $('#celular').val(resultado.celular);
            var cantidad = resultado.password.length;
            var asterisco = "*".repeat(cantidad);
            $('#password').val(asterisco);
            if (resultado.sexo === "Masculino") {
                $('#sexo_masculino').attr("checked", "checked");
            } else {
                $('#sexo_femenino').attr("checked", "checked");
            }
            if (resultado.foto) {
                $('#foto_perfil').attr('src', '/storage/usuarios/' + resultado.foto);
            }
        } else {
            alert(respuesta.mensaje);
        }
    }

    function actualizarUsuario() {
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
        var data = {nombre: nombre, apellido: apellido, fecha_nacimiento: fecha_nacimiento, telefono: telefono, celular: celular, sexo: sexo};
        console.log(password);
        console.log(confirmarPassword);
        if (confirmarPassword !== "" && password === confirmarPassword) {
            data['password']=password;
            data['confirmarPassword']=confirmarPassword;
        }
        var foto=cargarFoto();
        if (foto)  {
            foto=$("#foto")[0].files[0].name;
            data['foto']=foto;
        }
        console.log(data);
        var respuesta = peticion(data, 'actualizarUsuarioSesion');
        var resultado = respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.reload();
        } else {
            alert(respuesta.mensaje);
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

    $('#actualizarUsuario').on("click", function () {
        actualizarUsuario();
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
