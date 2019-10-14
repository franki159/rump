$(document).ready(function () {
    mostrarTotalMascota();
});

function mostrarTotalMascota(){
    $.ajax({
       type:'POST',
       url:'/mascota/obtenerCantidadMascotas',
       headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
       success:function(data){
          $('#lbl_total_mascota').html(data.resultado);
       }
    });

}

$("#btn_reportar_mascota").click(function(){
	var txt_codigo=$("#txt_codigo").val();
	var txt_fecha=$("#txt_fecha").val();
	var txt_nombre=$("#txt_nombre").val();
	var txt_correo=$("#txt_correo").val();
	var txt_telefono=$("#txt_telefono").val();
	var txt_observacion=$("#txt_observacion").val();
  if(
      txt_codigo != '' && 
      txt_fecha != '' && 
      txt_nombre != '' && 
      txt_correo != '' && 
      txt_telefono != '' && 
      txt_observacion != ''
      )
  {
    reportarMascota(txt_codigo,txt_fecha,txt_nombre,txt_correo,txt_telefono,txt_observacion);
  }
});

function reportarMascota(codigo,fecha, nombre, correo, telefono, observacion){
    $.ajax({
        type:'POST',
        url:'/mascotaencontrada/crearMascotaEncontradaParam1',
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
        data: {
                dni:codigo,
                fecha: fecha,
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                observacion: observacion
              },
        success:function(data){
          if(data.resultado){
          	alert(data.mensaje);
          }else{
          	alert('Ups! Error al reportar Mascota');
          }
       }
    });
}

function justNumbers(e)
{
var keynum = window.event ? window.event.keyCode : e.which;
if ((keynum == 8) || (keynum == 46))
return true;
 
return /\d/.test(String.fromCharCode(keynum));
}