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
