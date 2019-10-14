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

function filtar(){
	var tipo_mascota=$('#cbo_tipo_mascota').val();
	if(tipo_mascota=='perro'){
		window.location = "enciclopedia_perro"
	}else if(tipo_mascota=='gato'){
		window.location.href = "enciclopedia_gato";
	}else if(tipo_mascota=='conejo'){
		window.location.href = "enciclopedia_conejo";
	}else{
		alert('Seleccionar datos');
	}
}
