	// PERFIL DE USUARIO
	/*$('.profile_open').click(function(){
		$('.menu_expand_profile').addClass('is-visible');
		$('.md-backdrop').addClass('is-visible');
	});*/

	// INICIAR SESION
	$('.btn-login').click(function(){
		$('#movill').addClass('is-visible');
		$('.md-backdrop').addClass('is-visible');
	});



	// CLOSE MD-BACKDROP1
	$('.md-backdrop').click(function(){
		/* Detecta navegador */

		var isAndroid = navigator.userAgent.match(/Android/i) !== null;
		var isiOS = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) !== null;
		var isMobile = (isiOS || isAndroid);



		if ( isMobile ) {
			$('.menu_expand').removeAttr('style');
			$('.menu_principal').removeAttr('style');
			
			$('.menu_expand_profile').addClass('remove');
			setTimeout(function(){
				$('.menu_expand_profile').removeClass('is-visible');
				$('.menu_expand_profile').removeClass('remove');
			},400);
			$('.md-backdrop').removeClass('is-visible');
			

		} else {
			$('.menu_expand').removeAttr('style');
			$('.menu_principal').removeAttr('style');
			$('.iniciar_sesion').addClass('remove');
			$('.menu_expand_profile').addClass('remove');
			setTimeout(function(){
				$('.iniciar_sesion').removeClass('is-visible');
				$('.iniciar_sesion').removeClass('remove');

				$('.menu_expand_profile').removeClass('is-visible');
				$('.menu_expand_profile').removeClass('remove');
			},400);
			$('.md-backdrop').removeClass('is-visible');

		}
		
	});

	$('.open_menu').click(function(){
		$('.menu_principal').slideToggle();
		$('.md-backdrop').addClass('is-visible');
		$('html,body').css({
			'height' : '100%',
			'overflow-y' :'scroll',
			'overflow-x' :'hidden'
		});
	});

	$('.close_menu').click(function(){
		$('.menu_principal').slideToggle();
		$('.md-backdrop').removeClass('is-visible');
		$('.menu_expand').removeAttr('style');
		$('html,body').removeAttr('style');
	});

	// SUBMENU DEVICES
	$('.withSub').click(function(){
		if ($(document).width() <= 992) {
			$('.menu_expand').slideToggle();	
		}
	});





	

