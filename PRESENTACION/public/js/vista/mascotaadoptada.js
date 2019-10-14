$(document).ready(function () {
    mostrarTotalMascota();
    mostrarClickMascotaAdoptada();
    mostrarTodoMascotaAdoptada();
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

function mostrarClickMascotaAdoptada() {
    var url_path = location.pathname;
    if (url_path.length > 17) {
        var id_mascota = url_path.substr(17)
        $.ajax({
            type: 'POST',
            url: '/mascotaadopcion/obtenerMascotaAdopcionRel',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            data: {
                id: id_mascota
            },
            success: function (data) {
                if (data.resultado) {
                    for (var i = 0; i < data.resultado.mascota['mascota_galeria'].length; i++) {
                        $('#div_img_' + i).html('<img src="../storage/mascotas/' + data.resultado.mascota['mascota_galeria'][i]['foto'] + '" alt="' + data.resultado.mascota['mascota_galeria'][i]['foto'] + '" style="width: 100%;height: 100%;">');
                    }
                    $('#txt_nombre').val(data.resultado.mascota['nombre']);
                    $('#txt_dni').val(data.resultado.mascota['dni']);
                    $('#txt_direccion').val(data.resultado.mascota['mascota_domicilio']['direccion']);
                    $('#txt_distrito').val(data.resultado.mascota['mascota_domicilio']['geografia']['distrito']);
                    $('#txt_departamento').val(data.resultado.mascota['mascota_domicilio']['geografia']['departamento']);
                    $('#txt_fechanacimiento').val(data.resultado.mascota['fecha_nacimiento']);
                    $('#txt_sexo').val(data.resultado.mascota['sexo']);
                    $('#txt_tamano').val(data.resultado.mascota['tamano']);
                    $('#txt_tipo').val(data.resultado.mascota.mascota_raza.mascota_tipo.tipo);
                    $('#txt_vacuna').val(conversion1(data.resultado.mascota['mascota_salud']['vacunacion']));
                    $('#txt_castrada').val(conversion1(data.resultado.mascota['castrado']));
                    $('#txt_alergia').val(conversion1(data.resultado.mascota['mascota_salud']['alergia_medicamento']));
                    $('#txt_antirrabica').val(conversion1(data.resultado.mascota['mascota_salud']['antirrabica']));
                    $('#txt_calificacion').val(data.resultado.mascota['calificacion']);
                    $('#txt_historia').val(data.resultado['historia']);
                    $('#txt_necesidadcalle').val(conversion1(data.resultado['necesidades_calle']));
                    $('#txt_solo').val(data.resultado['solo'] + " Horas");
                    $('#txt_idmascota_adopta').val(data.resultado.id);
                }
            },
            error: function (jqXHR, exception) {
                alert('No se puede procesar la información');
            }
        });
    }
}


$("#btn_quiero_adoptar").click(function () {
    var txt_idmascota = $("#txt_idmascota_adopta").val();
    var txt_nombre = $("#txt_nombre_adopta").val();
    var txt_correo = $("#txt_correo_adopta").val();
    var txt_telefono = $("#txt_telefono_adopta").val();
    if (
            txt_idmascota != '' &&
            txt_nombre != '' &&
            txt_correo != '' &&
            txt_telefono != ''
            )
    {
        adoptarMascota(txt_idmascota, txt_nombre, txt_correo, txt_telefono);
    }
});

$("#btn_conoceme_mejor").click(function () {
    var txt_idmascota = $("#txt_idmascota").val();
    if (txt_idmascota != ''){
        location.href = "mascotaadoptada/" + txt_idmascota;
        verMascotaAdoptada(txt_idmascota);
    }
});

function adoptarMascota(txt_idmascota, txt_nombre, txt_correo, txt_telefono) {
    $.ajax({
        type: 'POST',
        url: '/solicitudadopcion/crearSolicitudAdopcion', //AGREGAR EN API
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: {
            nombre: txt_nombre,
            email: txt_correo,
            celular: txt_telefono,
            mascota_adopcion_id: txt_idmascota
        },
        success: function (data) {
            if (data.resultado) {
                alert(data.mensaje);
            } else {
                alert('Ups! Error al adoptar la Mascota');
            }
        }
    });
}

function mostrarTodoMascotaAdoptada() {
    var variables = getUrlVars();
    var sexo = variables.sexo;
    var edad = variables.edad;
    var solo = variables.solo;
    var tamano = variables.tamano;
    var castrado = variables.castrado;
    var mascota_tipo_id = variables.mascota_tipo_id;
    var data = {};
    if (sexo !== "0")
        data['sexo'] = sexo;
    if (edad !== "0")
        data['edad'] = edad;
    if (solo !== "0")
        data['solo'] = solo;
    if (tamano !== "0")
        data['tamano'] = tamano;
    if (castrado !== "0")
        data['castrado'] = castrado;
    if (mascota_tipo_id !== "0")
        data['mascota_tipo_id'] = mascota_tipo_id;
    $.ajax({
        type: 'POST',
        url: '/mascotaadopcion/obtenerMascotasAdopcionesParam1',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: data,
        success: function (data) {
            if (data.resultado.length > 0) {
                var html = '';
                $('#txt_idmascota').val(data.resultado[0].id);
                var foto_principal="";
                if(data.resultado[0].mascota.mascota_galeria[0]['foto'] != null && data.resultado[0].mascota.mascota_galeria[0]['foto'] !== "") {
                    foto_principal = "/storage/mascotas/" + data.resultado[0].mascota['mascota_galeria'][0]['foto'];
                } else {
                    foto_principal = "front_estilos/img/rump/rump_sin_foto.png";
                }
                
                var ruta_imagen = '<img src="' + foto_principal + '" style="width: 100%;height: 100%;">';
                $('#div_imagen_principal').html(ruta_imagen);
                $('#txt_rump').html(data.resultado[0].mascota['dni']);
                $('#txt_sexo').html(data.resultado[0].mascota['sexo']);
                var edad = data.resultado[0].mascota.edad;
                edad = edad.split('-');
                if (edad[0] > 0) {
                    $('#txt_edad').html(edad[0] + " Año(s) " + edad[1] + " Mes(es) ");
                } else {
                    $('#txt_edad').html(edad[1] + " Mes(es) ");
                }
                for (var i = 0; i < data.resultado.length; i++) {
                    var foto_vista = "";
                    if(data.resultado[i].mascota.mascota_galeria[0]['foto'] != null && data.resultado[i].mascota.mascota_galeria[0]['foto'] !== "") {
                        foto_vista="storage/mascotas/"+data.resultado[i].mascota.mascota_galeria[0]['foto'];
                    } else {
                        foto_vista="front_estilos/img/rump/rump_sin_foto.png";
                    }
                    
                    html += '<br>';
                    html += '<a href="#" onclick="verMascotaAdoptada(' + data.resultado[i].id + ')">';
                    html += '<div style="border-color: gray;border-style: solid;border-width: 2px;width: 100%;height: 100px;background: #fff" >';

                    html += '<div class="row">';
                    html += '<div class="col-md-4 col-xs-4 col-sm-4">';
                    html += '<img class="img-fluid" src="'+ foto_vista + '" style="width: 115px;height: 96px;">';
                    html += '</div>';

                    html += '<div class="col-md-8 col-xs-8 col-sm-8">';
                    html += '<br>';
                    html += '<font style="color: #00667E;font-family: \'Raleway\';font-size: 1.0rem !important;font-weight: 900"><strong>' + data.resultado[i].mascota['nombre'] + '</strong></font>';
                    html += '<br>';
                    html += '<font size="2" style="color: gray;font-family: \'Raleway\'"><strong>Necesidad de calle:</strong></font>';
                    html += '<font size="2" id="txt_necesidad" style="color: gray;font-family: \'Raleway\'">' + data.resultado[i].necesidades_calle + '</font>';
                    html += '<br>';
                    html += '<font size="2" style="color: gray;font-family: \'Raleway\'"><strong>Solo:</strong></font>';
                    html += '<font size="2" id="txt_necesidad" style="color: gray;font-family: \'Raleway\'">' + data.resultado[i].solo + ' hora(s)</font>';
                    html += '</div>';

                    html += '</div>';

                    html += '</div>';
                    html += '</a>';
                }
                $('#div_mostrar_resultado_mascadop').html(html);
            } else {
                alert('No se puede procesar la información');
            }
        }
    });
}

function verMascotaAdoptada(id_mascota) {
    $.ajax({
        type: 'POST',
        url: '/mascotaadopcion/obtenerMascotaAdopcionRel',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: {
            id: id_mascota
        },
        success: function (data) {
            if (data.resultado) {
                $('#txt_idmascota').val('');
                $('#div_imagen_principal').html('');
                $('#txt_rump').html('');
                $('#txt_sexo').html('');
                $('#txt_edad').html('');
                var foto_principal = "storage/mascotas/" + data.resultado.mascota['mascota_galeria'][0]['foto'];
                var ruta_imagen = '<img src="' + foto_principal + '" style="width: 100%;height: 100%;">';
                $('#txt_idmascota').val(data.resultado.id);
                $('#div_imagen_principal').html(ruta_imagen);
                $('#txt_rump').html(data.resultado.mascota['dni']);
                $('#txt_sexo').html(data.resultado.mascota['sexo']);
                var edad = data.resultado.edad;
                edad = edad.split('-');
                if (edad[0] > 0) {
                    $('#txt_edad').html(edad[0] + "Año(s) " + edad[1] + " Mes(es) ");
                } else {
                    $('#txt_edad').html(edad[1] + "Mes(es) ");
                }
            }

        },
        error: function (jqXHR, exception) {
            alert('No se puede procesar la información');
        }
    });
}

function conversion1(valor) {
    if (valor == 1) {
        return "SI"
    } else {
        return "NO";
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