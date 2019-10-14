$(document).ready(function () {
    mostrarTotalMascota();
    mostrarDepartamento();
    mostrarTipoMascota();
    mostrarRazaMascota();
    mostrarTodoMascotaExtraviada();
    mostrarClickMascotaExtraviada();

    $('#cbo_departamento').change(function () {
        var departamento = $(this).val();
        if (departamento !== "") {
            $.ajax({
                type: 'POST',
                url: '/geografia/obtenerProvincias',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
                data: {
                    departamento: departamento
                },
                success: function (data) {
                    console.log(data);
                    if (data.resultado.length > 0) {
                        cmb = "<option value=''> Seleccione... </option>";
                        for (var i = 0; i < data.resultado.length; i++) {
                            cmb += "<option value='" + data.resultado[i].provincia + "'>" + data.resultado[i].provincia + "</option>";
                        }
                        //llenamos el combo
                        $('#cbo_provincia').html(cmb);
                    }
                }
            });
        } else {
            cmb = "<option value=''> Seleccione... </option>";
            $('#cbo_provincia').html(cmb);
            $('#cbo_distrito').html(cmb);
        }
    });

    $('#cbo_provincia').change(function () {
        var provincia = $(this).val();
        if (provincia !== "") {
            $.ajax({
                type: 'POST',
                url: '/geografia/obtenerDistritos',
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
                data: {
                    provincia: provincia
                },
                success: function (data) {
                    console.log(data);
                    if (data.resultado.length > 0) {
                        cmb = "<option value=''> Seleccione... </option>";
                        for (var i = 0; i < data.resultado.length; i++) {
                            cmb += "<option value='" + data.resultado[i].distrito + "'>" + data.resultado[i].distrito + "</option>";
                        }
                        //llenamos el combo
                        $('#cbo_distrito').html(cmb);
                    }
                }
            });
        } else {
            cmb = "<option value=''> Seleccione... </option>";
            $('#cbo_distrito').html(cmb);
        }
    });
});

function mostrarTotalMascota() {
    $.ajax({
        type: 'POST',
        url: '/mascota/obtenerCantidadMascotas',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        success: function (data) {
            console.log(data);
            $('#lbl_total_mascota').html(data.resultado);
        }
    });

}

function mostrarDepartamento() {
    $.ajax({
        type: 'POST',
        url: '/geografia/obtenerDepartamentos',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        success: function (data) {
            console.log(data);
            if (data.resultado.length > 0) {
                cmb = "<option value=''> Seleccione... </option>";
                for (var i = 0; i < data.resultado.length; i++) {
                    cmb += "<option value='" + data.resultado[i].departamento + "'>" + data.resultado[i].departamento + "</option>";
                }
                //llenamos el combo
                $('#cbo_departamento').html(cmb);
            }
        }
    });
}

function mostrarTipoMascota() {
    $.ajax({
        type: 'POST',
        url: '/mascotatipo/obtenerMascotaTipos',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        success: function (data) {
            console.log(data);
            if (data.resultado.length > 0) {
                cmb = "<option value=''> Seleccione... </option>";
                for (var i = 0; i < data.resultado.length; i++) {
                    cmb += "<option value='" + data.resultado[i].id + "'>" + data.resultado[i].tipo + "</option>";
                }
                //llenamos el combo
                $('#cbo_tipo').html(cmb);
            }
        }
    });
}

function mostrarRazaMascota() {
    $.ajax({
        type: 'POST',
        url: '/mascotaraza/obtenerMascotaRazas',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        success: function (data) {
            console.log(data);
            if (data.resultado.length > 0) {
                cmb = "<option value=''> Seleccione... </option>";
                for (var i = 0; i < data.resultado.length; i++) {
                    cmb += "<option value='" + data.resultado[i].id + "'>" + data.resultado[i].tipo + "</option>";
                }
                //llenamos el combo
                $('#cbo_raza').html(cmb);
            }
        }
    });
}


function mostrarTodoMascotaExtraviada() {
    $.ajax({
        type: 'POST',
        url: '/mascotaextraviada/obtenerMascotaExtraviadasRel',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        success: function (data) {
            console.log(data);

            if (data.resultado.length > 0) {
                var html = '';
                for (var i = 0; i < data.resultado.length; i++) {
                    console.log(data.resultado[i].mascota);
                    console.log(data.resultado[i].mascota.mascota_galeria[0]['foto']);
                    var foto_principal = data.resultado[i].mascota.mascota_galeria[0]['foto'];
                    html += '<div class="col-md-4" style="padding:15px">';
                    html += '<a href="/mascotaextraviada/' + data.resultado[i].mascota['dni'] + '">';
                    html += '<div>';
                    html += '<img src="/storage/mascotas/' + foto_principal + '" alt="' + foto_principal + '" style="width: 100%;height: 250px;">';
                    html += '</div>';
                    html += '<div style="background: #fff; padding:15px 5px 1px 5px">';
                    html += '<center>';
                    html += '<h5 style="font-family: \'Raleway\';color:#000"><strong>' + data.resultado[i].mascota['apellido'] + '</strong></h5>';
                    html += '<h5 style="font-family: \'Raleway\';color:#000"><strong>RUMP: ' + data.resultado[i].mascota['dni'] + '</strong></h5>';
                    html += '</center>';
                    html += '</div>';
                    html += '</a>';
                    html += '</div>';
                }
                $('#div_resultado_mascotaextraviada').html(html);
            }
        }
    });
}

function mostrarClickMascotaExtraviada() {
    var url_path = location.pathname;
    console.log(url_path);
    if (url_path.length > 18) {
        var dni_url = url_path.substr(19);
        console.log(dni_url);
        $.ajax({
            type: 'POST',
            url: '/mascotaextraviada/obtenerMascotaExtraviadaDNIRel',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
            data: {
                dni: dni_url
            },
            success: function (data) {
                console.log(data);
                console.log(data.resultado);
                if (data.resultado) {
                    //Imagenes
                    console.log(data.resultado.mascota['mascota_galeria'].length);
                    /*for(var i=0; i<data.resultado.mascota['mascota_galeria'].length;i++){
                     $('#div_img_'+i).html('<img src="/mascotas/'+data.resultado.mascota['mascota_galeria'][i]['foto']+'" alt="'+data.resultado.mascota['mascota_galeria'][i]['foto']+'" style="width: 500px;height: 350px;">');
                     }*/
                    if (typeof data.resultado.mascota['mascota_galeria'][0] != "undefined") {
                        $('#div_img_0').html('<img src="/storage/mascotas/' + data.resultado.mascota['mascota_galeria'][0]['foto'] + '" alt="' + data.resultado.mascota['mascota_galeria'][0]['foto'] + '" style="width: 100%;height: 400px;">');
                    }
                    if (typeof data.resultado.mascota['mascota_galeria'][1] != "undefined") {
                        $('#div_img_1').html('<img src="/storage/mascotas/' + data.resultado.mascota['mascota_galeria'][1]['foto'] + '" alt="' + data.resultado.mascota['mascota_galeria'][1]['foto'] + '" style="width: 100%;height: 100%;">');
                    }
                    if (typeof data.resultado.mascota['mascota_galeria'][2] != "undefined") {
                        $('#div_img_2').html('<img src="/storage/mascotas/' + data.resultado.mascota['mascota_galeria'][2]['foto'] + '" alt="' + data.resultado.mascota['mascota_galeria'][2]['foto'] + '" style="width: 100%;height: 100%;">');
                    }
                    if (typeof data.resultado.mascota['mascota_galeria'][3] != "undefined") {
                        $('#div_img_3').html('<img src="/storage/mascotas/' + data.resultado.mascota['mascota_galeria'][3]['foto'] + '" alt="' + data.resultado.mascota['mascota_galeria'][3]['foto'] + '" style="width: 100%;height: 100%;">');
                    }
                    $('#lbl_sexo').html(data.resultado.mascota['sexo']);
                    var edad = data.resultado.edad;
                    edad = edad.split('-');
                    if (edad[0] > 0) {
                        $('#lbl_edad').html(edad[0] + " Año(s) " + edad[1] + " Mes(es) ");
                    } else {
                        $('#lbl_edad').html(edad[1] + " Mes(es) ");
                    }
                    $('#lbl_ubigeo').html(data.resultado.mascota.mascota_domicilio.geografia['distrito'] + ' - ' + data.resultado.mascota.mascota_domicilio.geografia['provincia'] + ' - ' + data.resultado.mascota.mascota_domicilio.geografia['departamento']);
                    $('#lbl_direccion').html(data.resultado.mascota.mascota_domicilio['direccion']);
                    $('#lbl_raza').html(data.resultado.mascota.mascota_raza['tipo']);
                    $('#lbl_hecho').html(formato(data.resultado['fecha']));
                    $('#lbl_observacion').html(data.resultado['observacion']);
                    //DATOS DE CONTACTO
                    $('#lbl_contacto_nombre').html(data.resultado.mascota.usuario['nombre']);
                    $('#lbl_contacto_telefono').html(data.resultado.mascota.usuario['telefono']);
                    $('#lbl_contacto_correo').html(data.resultado.mascota.usuario['email']);

                }

            },
            error: function (jqXHR, exception) {
//                alert('No se puede procesar la información');
            }
        });
    }
}


function buscarMascotaExtraviada() {
    var nombre = $('#txt_nombre').val();
    var departamento = $('#cbo_departamento').val();
    var provincia = $('#cbo_provincia').val();
    var distrito = $('#cbo_distrito').val();
    var mascota_tipo_id = $('#cbo_tipo').val();
    var mascota_raza_id = $('#cbo_raza').val();
    var data = {};
    if (nombre && nombre != null)
        data['nombre'] = nombre;
    if (departamento && departamento != null)
        data['departamento'] = departamento;
    if (provincia && provincia != null)
        data['provincia'] = provincia;
    if (distrito && distrito != null)
        data['distrito'] = distrito;
    if (mascota_tipo_id && mascota_tipo_id != null)
        data['mascota_tipo_id'] = mascota_tipo_id;
    if (mascota_raza_id && mascota_raza_id != null)
        data['mascota_raza_id'] = mascota_raza_id;
    console.log(data);

    $.ajax({
        type: 'POST',
        url: '/mascotaextraviada/obtenerMascotasExtraviadasParam1',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: data,
        success: function (data) {
            if (data.resultado != null && data.resultado.length > 0) {
                $('#div_resultado_mascotaextraviada').html('');
                var html = '';
                for (var i = 0; i < data.resultado.length; i++) {
                    console.log(data.resultado[i].mascota);
                    console.log(data.resultado[i].mascota.mascota_galeria[0]['foto']);
                    var foto_principal = data.resultado[i].mascota.mascota_galeria[0]['foto'];
                    html += '<div class="col-md-4" style="padding:15px">';
                    html += '<a href="/mascotaextraviada/' + data.resultado[i].mascota['dni'] + '">';
                    html += '<div>';
                    html += '<img src="/storage/mascotas/' + foto_principal + '" alt="' + foto_principal + '" style="width: 100%;height: 250px;">';
                    html += '</div>';
                    html += '<div style="background: #fff; padding:15px 5px 1px 5px">';
                    html += '<center>';
                    html += '<h5 style="font-family: \'Raleway\';color:#000"><strong>' + data.resultado[i].mascota['apellido'] + '</strong></h5>';
                    html += '<h5 style="font-family: \'Raleway\';color:#000"><strong>RUMP: ' + data.resultado[i].mascota['dni'] + '</strong></h5>';
                    html += '</center>';
                    html += '</div>';
                    html += '</a>';
                    html += '</div>';
                }
                $('#div_resultado_mascotaextraviada').html(html);
            } else {
                alert(data.mensaje);
                $('#div_resultado_mascotaextraviada').html('');
            }
        },
        error: function (jqXHR, exception) {
//            alert('No se puede procesar la información');
        }
    });
    
}

function formato(texto){
  return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
}

