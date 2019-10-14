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
    
    function crearMascotaAdopcion() {
        var necesidades_calle=$('#necesidades_calle').val();
        var solo=$('#solo').val();
        var historia=$('#historia').val();
        var mascota_id=$('#mascota_id').val();
        var foto1=$("#foto1")[0].files[0];
        var foto2=$("#foto2")[0].files[0];
        var bandera1=null;
        var bandera2=null;
        if (foto1) {
            bandera1=cargarFoto(foto1); 
        }
        if (foto2) {
            bandera2=cargarFoto(foto2);
        }
        var mascotaGaleria=[];
        if (bandera1) {
            var foto1={foto: bandera1};
            mascotaGaleria.push(foto1);
        }
        if(bandera2) {
            var foto2={foto: bandera2};
            mascotaGaleria.push(foto2);
        }
        var data={necesidades_calle:necesidades_calle, solo:solo, historia:historia,mascotaGaleria:mascotaGaleria, mascota_id:mascota_id};
        console.log(data);
        var respuesta = peticion(data, 'crearMascotaAdopcion', '/mascotaadopcion/');
        var resultado = respuesta.resultado;
        if (resultado) {
            alert(respuesta.mensaje);
            window.location.href='/mipanel/mascota';
        } else {
            alert(respuesta.mensaje);
        }
    }
    
    $('#crearMascotaAdopcion').on("click", function () {
        crearMascotaAdopcion();
    });
    
    function obtenerMascota() {
        var variables=getUrlVars();
        var data={id:variables.id};
        var respuesta = peticion(data, 'obtenerMascota', '/mascota/');
        var resultado = respuesta.resultado;
        if (resultado != null) {
            $('#mascota_id').val(resultado.id);
            $('#dni_mascota').val(resultado.dni);
            $('#nombre_mascota').val(resultado.nombre);
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
    
    function cargarFoto(foto) {
        var data = new FormData();
        data.append("foto", foto);
        var respuesta = peticionArchivo(data, 'crearMascotaGaleria', '/mascotagaleria/');
        var resultado = respuesta.resultado;
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
