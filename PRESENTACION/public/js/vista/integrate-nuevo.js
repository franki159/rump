/*
var sex=1;
$(document).ready(function()
{
	$('.modal').modal();
	// DIA DE NACIMIENTO
	for(var i=1; i<32;i++){
		var opction = '<option value="'+i+'">'+i+'</option>';
		$('.dia_nacimiento').append(opction);
	}
	// MES DE NACIMIENTO
	for(var i=0; i<12;i++){
		var meses=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','obtubre','noviembre','diciembre'],
			opction = '<option value="'+meses[i]+'">'+meses[i]+'</option>';
		$('.mes_nacimiento').append(opction);
	}
	// AÑO DE NACIMIENTO
	for(var i=1970; i<2008;i++){
		var opction = '<option value="'+i+'">'+i+'</option>';
		$('.year_nacimiento').append(opction);
	}
	$('.tooltipped').tooltip();
});
*/

/*
$("#politicas").click(function(){
	alert("prueba");
	var url = "controller/IntegrateController.php";     
	var name = $('#name').val();// nombre
	var last_name = $('#last_name').val();// apellido
	var date = $('#date').val();// correo
	var mail = $('#mail').val();// fecha
	var phone = $('#phone').val();// teléfonico
	var cell = $('#cell').val();// celular
	var key = $('#key').val();// Contraseña

	if($('#femenino').is(':checked')) {  
	sex=1;
	} else if($('#masculino').is(':checked')) {  
	sex=2;
	}

		var valores = { 

			'name' : name,
			'last_name' : last_name,
			'date' : date,
			'mail' : mail,
			'phone' : phone,
			'cell' : cell,
			'key' : key,
			'sex' : sex
		}

	$.ajax({                        
		type: "POST",                 
		url: url,                    
		data: valores,// envia todo el formulario
		dataType: 'json'
	}).done( function (valor) {
	   
		

		$('.md-backdrop').removeClass('is-visible');
		$('.iniciar_sesion').removeClass('is-visible');
		$('.iniciar_sesion').removeClass('remove');
		$('.menu_expand_profile').removeClass('is-visible');
		$('.menu_expand_profile').removeClass('remove');

		$('#menu_salir').show();
		$('#menu_perfil').show();
		$('#is').hide();
		$("#integrate").hide();
		$('#dropdown2').show();
		$('#perfil').text(valor[0][1]+ " "+ valor[0][2]);
		
        $('.main').load('view/wpp/mascotas.html', function(){
          	$('li a').addClass('black-text');
          	$('footer').addClass('grey lighten-3');
          	$('#agregar_mascota').show();
			$('#solid_dni').hide();
			$('#encontradas_mas').hide();
			$('#admin_m').hide();
	 		value = 1; 
			$('#m_name').val(valor[0][1]);// nombre
			$('#m_last_name').val(valor[0][2]);// apellido
			$('#m_date').val(valor[0][3]);// correo
			$('#m_mail').val(valor[0][4]);// fecha
			$('#m_phone').val(valor[0][5]);// teléfonico
			$('#m_cell').val(valor[0][6]);// celular
			$("#code").val(valor[0][7]);
			$("#m_sex").val(valor[0][8]);
    		
	    });
	});
});
*/

//------------------------------------------------------------------------------------
function newAjax()
{
	var xmlhttp=false;
  	try 
	{
   		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
   	} 
	catch (e) 
	{
   		try 
		{
       		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
       	} 
		catch (E) 
		{
       		xmlhttp = false;
     	}
	}
   	if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
	{
   		xmlhttp = new XMLHttpRequest();
  	}
	return xmlhttp;
}
//------------------------------------------------------------------------------------
$("#btn_nt").click(function()
{
	var divResultado 	= document.getElementById('resultado');
	var name 			= $('#name').val();// nombre
	var last_name		= $('#last_name').val();// apellido
	var date 			= $('#date').val();// correo
	var mail 			= $('#mail').val();// fecha
	var phone 			= $('#phone').val();// teléfonico
	var cell 			= $('#cell').val();// celular
	var key 			= $('#key').val();// Contraseña
	var re_key 			= $('#re_key').val();// Contraseña
	var Sexo 			= $('input:radio[name=sex]:checked').val();// Sexo
	
	/*$('#nt').on('click', '#btn_nt', function(){
  	var cod_cltv = $(this).attr('id');
  	var valores = { 'cod_cltv' : cod_cltv };*/
	var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	var valor =0;

	if((name.length<2)||(last_name.length<2)||(date.length<10)||(mail.length<11)||(phone.length<1)||(cell.length<1)||(key.length<8)||(re_key.length<8)){
		if(name.length<2){ 
			$('#name').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#name').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(last_name.length<2){ 
			$('#last_name').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#last_name').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(date.length<10){ 
			$('#date').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#date').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(mail.length<11){ 
			$('#mail').css({
				"border-bottom": '2px solid red'
			});
		} else{
		    if (regex.test($('#mail').val().trim())) {
		        $('#mail').css({
					"border-bottom": '1px solid grey'
				});
		    } else {
		        $('#mail').css({
					"border-bottom": '2px solid red'
				});
		    }
		}

		if(phone.length<1){ 
			$('#phone').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#phone').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(cell.length<1){ 
			$('#cell').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#cell').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(key.length<8){ 
			$('#key').css({
				"border-bottom": '2px solid red'
			});

			$('#re_key').css({
				"border-bottom": '2px solid red'
			});
		} else{
			if(key==re_key){
				$('#key').css({
				"border-bottom": '1px solid grey'
				});

				$('#re_key').css({
				"border-bottom": '1px solid grey'
				});
			}
			else{
				$('#key').css({
					"border-bottom": '2px solid red'
				});

				$('#re_key').css({
					"border-bottom": '2px solid red'
				});

				alert("Contraseñas no coinciden");
			}
		}
	}
	else
	{	// Los datos están correctos 
		ajax = newAjax();
		ajax.open("POST", "procesos/GuardarUsuario.php",true);
		ajax.onreadystatechange=function() 
		{
			if (ajax.readyState==4) 
			{
				//mostrar resultados en esta capa
				divResultado.innerHTML = ajax.responseText
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		
		//Enviando los valores
		ajax.send("&txtEmail="+mail+"&txtPassword="+key+"&txtNombre="+name+"&txtApellido="+last_name
					+"&txtFNacimiento="+date+"&txtTelefono="+phone+"&txtCelular="+cell
					+"&txtSexo="+Sexo);
		
		// Limpiar los campos
		$("#form_i")[0].reset();
		
		// Mostrar mensajes al usuario			
		//alert("Datos enviados correctamente...");
		
		/*
		$('#name, #last_name, #date, #phone, #cell, #key, #re_key').css({
			"border-bottom": '1px solid grey'
		});		

	      if (regex.test($('#mail').val().trim())) {
	    	var mail = $('#mail').val();
	    	var valores = { 
				'mail' : mail
			}
			var url = "controller/MailController.php";                                      
			$.ajax({                        
			type: "POST",                 
			url: url,                    
			data: valores,
			dataType: 'json'
			}).done(function(respuesta){
				
				if(respuesta[0][0]== 0){
			        $('#mail').css({
						"border-bottom": '1px solid grey'
					});
				
			        if($('#femenino').is(':checked')) {  
						sex=1;
					} else if($('#masculino').is(':checked')) {  
						sex=2;
					}

					if(key==re_key){ 
						$('#key, #re_key').css({
								"border-bottom": '1px solid grey'
						});

						$('.modal').modal('open'); 	
					} else{
						$('#key, #re_key').css({
							"border-bottom": '2px solid red'
						});
					}
		    	}else if(respuesta[0][0]>0){
		    		Materialize.toast('Correo Electronico inválido', 2000, '', function(){ alert('Verifique su Correo Electronico'); });	

			        $('#mail').css({
						"border-bottom": '2px solid red'
					});
			    }
		    });

	    }else {
	        $('#mail').css({
				"border-bottom": '2px solid red'
			});
	    }
		*/
			
	}
});

//------------------------------------------------------------------------------------
$("#btnModificarUsuario").click(function()
{	
	var divResultado 	= document.getElementById('resultado');
	var name 			= $('#name').val();// nombre
	var last_name		= $('#last_name').val();// apellido
	var date 			= $('#date').val();// correo
	var mail 			= $('#mail').val();// fecha
	var phone 			= $('#phone').val();// teléfonico
	var cell 			= $('#cell').val();// celular
	var key 			= $('#key').val();// Contraseña
	var re_key 			= $('#re_key').val();// Contraseña
	var Sexo 			= $('input:radio[name=sex]:checked').val();// Sexo
	
	/*$('#nt').on('click', '#btn_nt', function(){
  	var cod_cltv = $(this).attr('id');
  	var valores = { 'cod_cltv' : cod_cltv };*/
	var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
	var valor =0;

	if((name.length<2)||(last_name.length<2)||(date.length<10)||(mail.length<11)||(phone.length<1)||(cell.length<1)||(key.length<8)||(re_key.length<8)){
		if(name.length<2){ 
			$('#name').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#name').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(last_name.length<2){ 
			$('#last_name').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#last_name').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(date.length<10){ 
			$('#date').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#date').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(mail.length<11){ 
			$('#mail').css({
				"border-bottom": '2px solid red'
			});
		} else{
		    if (regex.test($('#mail').val().trim())) {
		        $('#mail').css({
					"border-bottom": '1px solid grey'
				});
		    } else {
		        $('#mail').css({
					"border-bottom": '2px solid red'
				});
		    }
		}

		if(phone.length<1){ 
			$('#phone').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#phone').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(cell.length<1){ 
			$('#cell').css({
				"border-bottom": '2px solid red'
			});
		} else{
			$('#cell').css({
				"border-bottom": '1px solid grey'
			});
		}

		if(key.length<8){ 
			$('#key').css({
				"border-bottom": '2px solid red'
			});

			$('#re_key').css({
				"border-bottom": '2px solid red'
			});
		} else{
			if(key==re_key){
				$('#key').css({
				"border-bottom": '1px solid grey'
				});

				$('#re_key').css({
				"border-bottom": '1px solid grey'
				});
			}
			else{
				$('#key').css({
					"border-bottom": '2px solid red'
				});

				$('#re_key').css({
					"border-bottom": '2px solid red'
				});

				alert("Contraseñas no coinciden");
			}
		}
	}
	else
	{	// Los datos están correctos 
		ajax = newAjax();
		ajax.open("POST", "../procesos/EditarUsuario.php",true);
		ajax.onreadystatechange=function() 
		{
			if (ajax.readyState==4) 
			{
				//mostrar resultados en esta capa
				divResultado.innerHTML = ajax.responseText
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		
		//Enviando los valores
		ajax.send("&txtEmail="+mail+"&txtPassword="+key+"&txtNombre="+name+"&txtApellido="+last_name
					+"&txtFNacimiento="+date+"&txtTelefono="+phone+"&txtCelular="+cell
					+"&txtSexo="+Sexo);
		
		// Limpiar los campos
		//$("#form_i")[0].reset();
		
		// Mostrar mensajes al usuario			
		//alert("Datos enviados correctamente...");
		
		/*
		$('#name, #last_name, #date, #phone, #cell, #key, #re_key').css({
			"border-bottom": '1px solid grey'
		});		

	      if (regex.test($('#mail').val().trim())) {
	    	var mail = $('#mail').val();
	    	var valores = { 
				'mail' : mail
			}
			var url = "controller/MailController.php";                                      
			$.ajax({                        
			type: "POST",                 
			url: url,                    
			data: valores,
			dataType: 'json'
			}).done(function(respuesta){
				
				if(respuesta[0][0]== 0){
			        $('#mail').css({
						"border-bottom": '1px solid grey'
					});
				
			        if($('#femenino').is(':checked')) {  
						sex=1;
					} else if($('#masculino').is(':checked')) {  
						sex=2;
					}

					if(key==re_key){ 
						$('#key, #re_key').css({
								"border-bottom": '1px solid grey'
						});

						$('.modal').modal('open'); 	
					} else{
						$('#key, #re_key').css({
							"border-bottom": '2px solid red'
						});
					}
		    	}else if(respuesta[0][0]>0){
		    		Materialize.toast('Correo Electronico inválido', 2000, '', function(){ alert('Verifique su Correo Electronico'); });	

			        $('#mail').css({
						"border-bottom": '2px solid red'
					});
			    }
		    });

	    }else {
	        $('#mail').css({
				"border-bottom": '2px solid red'
			});
	    }
		*/
			
	}
});
//------------------------------------------------------------------------------------
$("#iniciar_sesion").click(function()
{
	var divResultado 	= document.getElementById('ResultadoLogin');
	var Email 			= $('#user_is').val();
	var Password		= $('#key_is').val();
	
	// Los datos están correctos 
	ajax = newAjax();
	ajax.open("POST", "procesos/LoginUsuario.php",true);
	ajax.onreadystatechange=function() 
	{
		if (ajax.readyState==4) 
		{
			//mostrar resultados en esta capa
			divResultado.innerHTML = ajax.responseText
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	//Enviando los valores
	ajax.send("&txtEmail="+Email+"&txtPassword="+Password);

});
//------------------------------------------------------------------------------------
$("#BuscarMascota").click(function()
{

	var divResultado 	= document.getElementById('ResultadoBusqueda');
	var IdMascota 		= $('#IdMascota').val();
	
	// Los datos están correctos 
	ajax = newAjax();
	ajax.open("POST", "procesos/BuscarMascota.php",true);
	ajax.onreadystatechange=function() 
	{
		if (ajax.readyState==4) 
		{
			//mostrar resultados en esta capa
			divResultado.innerHTML = ajax.responseText
		}
	}
	ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	
	//Enviando los valores
	ajax.send("&IdMascota="+IdMascota);
});

//------------------------------------------------------------------------------------
$("#btnVerAdoptame").click(function()
{
	window.location.href = "https://worldpetsperu.com/adoptame/galeria/galeria.php";
});
//------------------------------------------------------------------------------------
$("#btnBuscarAdopcion").click(function()
{
	var divResultado = document.getElementById('resultado');

	var formData = new FormData(document.getElementById("frmBuscarAdopcion"));
	
	$.ajax({
    	url: "procesos/BuscarMascotaParaAdopcion.php",
       	type: "post",
      	dataType: "html",
       	data: formData,
     	cache: false,
   		contentType: false,
	 	processData: false
   		})
  		.done(function(res)
		{
       		$("#resultado").html(res);
       	});
	
	// Mostrar mensajes al usuario			
	// alert("Los datos fueron enviados...");		
});
//------------------------------------------------------------------------------------
$("#btnReportarMascota").click(function()
{
	var divResultado = document.getElementById('resultado');

	var formData = new FormData(document.getElementById("frmReportarMascota"));
	
	$.ajax({
    	url: "procesos/BuscarMascotaReportada.php",
       	type: "post",
      	dataType: "html",
       	data: formData,
     	cache: false,
   		contentType: false,
	 	processData: false
   		})
  		.done(function(res)
		{
       		$("#resultado").html(res);
       	});
	
	// Mostrar mensajes al usuario			
	alert("La macota extraviada fue reportada correctamente...");		
});
//------------------------------------------------------------------------------------