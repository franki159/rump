$(document).ready(function () {
    mostrarTotalMascota();

});
autoPlayYouTubeModal();

function mostrarTotalMascota(){
    //$.ajax({
    //   type:'POST',
    //   url:'/mascota/obtenerCantidadMascotas',
    //   headers: {'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')},
    //   success:function(data){
    //      $('#lbl_total_mascota').html(data.resultado);
    //   }
    //});

}

//FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
function autoPlayYouTubeModal() {
  var trigger = $("body").find('[data-toggle="modal"]');
  trigger.click(function () {
      var theModal = $(this).data("target"),
          videoSRC = $(this).attr("data-theVideo"),
          videoSRCauto = videoSRC + "?autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function () {
          $(theModal + ' iframe').attr('src', videoSRC);
      });
  });
}