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

$("#btn_buscar_rump").click(function () {
    var codigo_rump = $("#txt_codigo_rump").val();
    buscarRUMP(codigo_rump);
});

function buscarRUMP(codigo_rump) {
    $('#div_resultado_buscar_rump').html('');
    $.ajax({
        type: 'POST',
        url: '/mascota/obtenerMascotaDNI',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: {
            dni: codigo_rump
        },
        success: function (data) {
            var html = '';
            console.log(data);
            if (data.resultado == null) {

                html += '<div class="col-md-6">';
                html += '</div>';

                html += '<div class="col-md-6" style="margin-top:-50px;">';
                html += '<center>';
                html += '<img src="front_estilos/img/rump/icono_mascota.png" alt="icono_mascota.png" style="width: 100%;height: 100%">';
                html += '</center';
                html += '</div>';

                $('#div_resultado_buscar_rump').html(html);

            } else {
                foto = '';
                if (data.resultado.mascota_galeria[0]['foto'] != null && data.resultado.mascota_galeria[0]['foto'] !== "") {
                    foto = '<img src="/storage/mascotas/' + data.resultado.mascota_galeria[0]['foto'] + '" alt="' + data.resultado.mascota_galeria[0]['foto'] + '" style="width: 300px;height: 300px;border-radius: 50%;">';
                } else {
                    foto='<img src="front_estilos/img/rump/rump_sin_foto.png" alt="icono_mascota.png" style="width: 100%;height: 100%">';
                }
                var madre="";
                var padre="";
                for (var i=0; i<data.resultado.mascota_familia.length; i++) {
                    if (data.resultado.mascota_familia[i].tipo==="madre") {
                        madre=data.resultado.mascota_familia[i].familiar;
                    }
                    if (data.resultado.mascota_familia[i].tipo==="padre") {
                        padre=data.resultado.mascota_familia[i].familiar;
                    }
                }

                html += '<div class="col-md-4" style="padding: 20px;">';
                html += '<center>';
                html += foto;
                html += '</center>';
                html += '</div>';

                html += '<div class="col-md-4">';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Nombre: </strong>' + data.resultado.nombre + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Apellido: </strong>' + data.resultado.apellido + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Fecha de Nacimiento: </strong>' + data.resultado.fecha_nacimiento + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Sexo: </strong>' + data.resultado.sexo + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Tipo: </strong>' + data.resultado.mascota_raza.mascota_tipo.tipo + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Madre: </strong>' + madre + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Padre: </strong>' + padre + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Raza: </strong>' + data.resultado.mascota_raza.tipo + '</h6>';
                html += '</div>';

                html += '<div class="col-md-4">';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Color: </strong>' + data.resultado.color + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Calificación: </strong>' + data.resultado.calificacion + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Distrito: </strong>' + data.resultado.mascota_domicilio.geografia.distrito + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Provincia: </strong>' + data.resultado.mascota_domicilio.geografia.provincia + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Departamento: </strong>' + data.resultado.mascota_domicilio.geografia.departamento + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Vacunación: </strong>' + data.resultado.mascota_salud.vacunacion + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Tel. Padre: </strong>' + data.resultado.mascota_familia[0].telefono + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Tel. Madre: </strong>' + data.resultado.mascota_familia[1].telefono + '</h6>';
                html += '<h6 style="color: #fff;font-family: \'Raleway\'"><strong>Dirección: </strong>' + data.resultado.mascota_domicilio.direccion + '</h6>';
                html += '</div>';
                $('#div_resultado_buscar_rump').html(html);
            }
        }
    });

}