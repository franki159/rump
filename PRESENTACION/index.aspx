﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="PRESENTACION.index" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>RUMP Perú</title>

    <!-- Favicon -->
    <link rel="icon" href="templatePage/img/core-img/favicon.png">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="templatePage/style.css">

</head>

<body>
    <!-- Preloader -->
    <div id="page-loader"><img style="-webkit-user-select: none;margin: auto;" src="img/loader-pet.gif"></div> 
    <!-- /Preloader -->
    <!-- REPORTAR MASCOTA EXTRAVIADA -->

    <div class='modal modal-scroll fade' id='pnl_report_mascota' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Reportar Mascota Extraviada</h4>
                    <button aria-hidden="true" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <div id="errorReporte"></div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <h6><strong>Código de Chapa: <strong class="text-danger">(*)</strong></strong></h6>
                                <input class="form-control" id="txt_dni_mascota" name="txt_dni_mascota" placeholder="Código chapa de la mascota encontrada" required="">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <h6><strong>Fecha que Encontró la Mascota:</strong></h6>
                                <input type="date" class="form-control" id="txt_fecha" name="txt_fecha" required="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <h6><strong>Nombre Completo:</strong></h6>
                                <input class="form-control" id="txt_nombre" name="txt_nombre" placeholder="Ingrese su Nombre completo" required="">
                            </div>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <h6><strong>Correo Electrónico: <strong class="text-danger">(*)</strong></strong></h6>
                                <input class="form-control" type="email" id="txt_correo" name="txt_correo" placeholder="Ingrese su correo electrónico" required="">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <h6><strong>Número Telefónico: <strong class="text-danger">(*)</strong></strong></h6>
                                <input class="form-control integerFCP" id="txt_telefono" name="txt_telefono" placeholder="Ingrese su número teléfonico" required="">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <h6><strong>Observación:</strong></h6>
                                <textarea class="form-control" id="txt_observacion" name="txt_observacion" placeholder="Observación" required=""></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn_reportar_mascota" type="button" class="btn btn-warning"><i class="fa fa-paw" aria-hidden="true"></i> Reportar</button>
                    <button type="button" class="btn btn-info" data-dismiss="modal"> Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- /REPORTAR MASCOTA EXTRAVIADA -->

    <!-- Header Area Start -->
    <header class="header-area">
 
        <!-- Top Header Area Start -->
        <div class="top-header-area">
            <div class="container">
                <div class="row">

                    <div class="col-6">
                        <div class="top-header-content">
                            <a class="itel2"><img src="templatePage/img/core-img/whatsapp.png"></a>
							<a href="https://api.whatsapp.com/send?phone=51992975292&text=Hola,%20estoy%20interesado%20en%20el%20servicio%20*RUMP*.%20" class="baraitem">+51 992975292</a>
							<a class="itel2"><img src="templatePage/img/core-img/phone.png"></a>
							<a class="baraitem" aria-current="page"  href="tel:01 7316407">(01)7316407</a>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="top-header-content float-right" id="divLoginUser">
							
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- Top Header Area End -->

        <!-- Main Header Start -->
        <div class="main-header-area">
            <div class="classy-nav-container breakpoint-off">
                <div class="container">
                    <!-- Classy Menu -->
                    <nav class="classy-navbar justify-content-between" id="robertoNav">

                        <!-- Logo -->
                        <a class="nav-brand" href="home.html"><img src="templatePage/img/core-img/logo-orange.png" alt=""></a>
						
						     
						<div class="top-social-area ">
                                <a class="itel" href="https://www.facebook.com/worldpetsperurump/"><img src="templatePage/img/core-img/fb.png"></a>
                                <a class="itel" href="https://instagram.com/rumpworld?igshid=qlfktywcm7at"><img src="templatePage/img/core-img/ist.png"></a>
								<a class="itel" href="https://twitter.com/PeruRump?lang=es"><img src="templatePage/img/core-img/tw.png"></a>
								<a class="itel" href="https://www.youtube.com/channel/UCwFDOixpwmaCz6g0uFoaACg"><img src="templatePage/img/core-img/yt.png"></a>
                            </div>
						

                        <!-- Navbar Toggler -->
                        <div class="classy-navbar-toggler">
                            <span class="navbarToggler"><span></span><span></span><span></span></span>
                        </div>

                        <!-- Menu -->
                        <div class="classy-menu">
                            <!-- Menu Close Button -->
                            <div class="classycloseIcon">
                                <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                            </div>
                             <!-- Nav Start -->
                            <div class="classynav">
                                <ul id="nav">
                                    <li class="active"><a href="./">Inicio</a></li>
                                    <li><a href="templatePage/servicios.aspx">Servicios</a></li>
									<li><a href="mextraviadas.html">Mascotas extraviadas</a></li>
                                    <li><a href="templatePage/adoptame.aspx">Adóptame</a>
									    <ul class="dropdown">
                                            <li><a href="#">Enciclopedia de Razas</a></li><br>
									    </ul>
									</li>	
									<li><a href="templatePage/quienessomos.aspx">¿Quiénes somos?</a></li>
							       
                                    <li><a href="templatePage/contacto.aspx">Contacto</a></li>
                                </ul>

                            </div>
                            <!-- Nav End -->
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <!-- Header Area End -->

    <!-- Welcome Area Start -->
    <section class="welcome-area">
        <div class="welcome-slides owl-carousel">
            <!-- Single Welcome Slide -->
            <div class="single-welcome-slide bg-img bg-overlay" style="background-image: url(templatePage/img/bg-img/slider1.jpg);" data-img-url="templatePage/img/bg-img/16.jpg">
                <!-- Welcome Content -->
                <div class="welcome-content h-100">
                    <div class="container h-100">
					
                        <div class="row h-100 align-items-center">
								<!-- Welcome Text -->
							 <div class="welcome-text text-center">
									<h6 data-animation="fadeInUp" data-delay="200ms">Bienvenido a RUMP</h6>
									<h2 data-animation="fadeInUp" data-delay="500ms">1er Servicio profesional de registro de mascotas en el Perú</h2>
                                 
                                    <a href="templatePage/quienessomos.aspx" class="btn roberto-btn btn-2" data-animation="fadeInLeft" data-delay="900ms">Conócenos más</a>
                                </div>
						
                        </div>
                    </div>
                </div>
            </div>

            <!-- Single Welcome Slide -->
            <div class="single-welcome-slide bg-img bg-overlay" style="background-image: url(templatePage/img/bg-img/slider2.jpg);" data-img-url="templatePage/img/bg-img/17.jpg">
                <!-- Welcome Content -->
                <div class="welcome-content h-100">
                    <div class="container h-100">
						
                        <div class="row h-100 align-items-center">
                            <!-- Welcome Text -->
							<div class="welcome-text text-center">
                                    <h6 data-animation="fadeInUp" data-delay="200ms">Desde el registro único de mascotas fomentamos la tenencia responsable.</h6>
                                    <h2 data-animation="fadeInUp" data-delay="500ms">Registramos a todos los animales domesticos
										<br/>¡No esperes más y regístralo ahora!</h2>
                                    <a href="#" class="btn roberto-btn btn-2" data-animation="fadeInUp" data-delay="1200ms">Registrar</a>
                                </div>	
                        </div>
                    </div>
                </div>
            </div>

            <!-- Single Welcome Slide -->
            <div class="single-welcome-slide bg-img bg-overlay" style="background-image: url(templatePage/img/bg-img/slider3.jpg);" data-img-url="templatePage/img/bg-img/18.jpg">
                <!-- Welcome Content -->
                <div class="welcome-content h-100">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <!-- Welcome Text -->
                            <div class="col-12">
                                <div class="welcome-text text-center">
                                    <h6 data-animation="fadeInDown" data-delay="200ms">Solicita ahora tu sistema de identificación </h6>
                                    <h2 data-animation="fadeInDown" data-delay="500ms">Chapita identificadora + DNI<br/>Accederás a muchos servicios más</h2>
                                    <a href="contacto.aspx" class="btn roberto-btn btn-2" data-animation="fadeInDown" data-delay="900ms">¡SOLICITALO YA!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Welcome Area End -->

	
   
 <!-- Projects Area Start -->
    <section class="roberto-project-area section-padding-100-0">
		
		<div class="row">
                <!-- Section Heading -->
                <div class="col-12">
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                         <img src="templatePage/img/core-img/notirump.png" alt="">
						
                    </div>
                </div>
            </div>
		
        <!-- Projects Slide -->
        <div class="projects-slides owl-carousel">
            <!-- Single Project Slide -->
            <div class="single-project-slide active bg-img" style="background-image: url(templatePage/img/bg-img/noticia1.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>Gatos</h6>
                        <h5>¿Cascabel para el gato? ¡No!</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>Gatos</h6>
                        <h5>¿Cascabel para el gato? ¡No!</h5>
                        <p>¿Sabían que los gatos perciben el sonido 3 veces más que los humanos?</p>
                    </div>
                    <a href="New1.html" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia2.jpg)">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>General</h6>
                        <h5>¿Preparado para adoptar?</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>General</h6>
                        <h5>¿Preparado para adoptar?</h5>
                        <p>Responde a estas 5 preguntas antes de adoptar</p>
                    </div>
                    <a href="New2.html" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia3.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Sobrepoblación de perros y gatos</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Sobrepoblación de perros y gatos</h5>
                        <p>Nuestro problema y responsabilidad, la sobrepoblación de perros y gatos</p>
                    </div>
                    <a href="New3.html" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia4.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>Perros</h6>
                        <h5>El mejor perro para ti según tu personalidad</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>Perros</h6>
                        <h5>El mejor perro para ti según tu personalidad</h5>
                        <p>En muchas ocasiones, al buscar un perro para adoptar, nos dejamos llevar por la ternura y el cariño. También ocurre que las personas desean por estética o moda un perro u otro. Pero no debemos dejarnos llevar por esos instintos, debemos ser racionales...</p>
                    </div>
                    <a href="New4.html" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia5.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>Gatos</h6>
                        <h5>Los tipos de gato más cariñosos</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>Gatos</h6>
                        <h5>Los tipos de gato más cariñosos</h5>
                        <p>Quienes tenemos un amigo felino en casa sabemos que son animales que dan cariño
más cuando ellos quieren que cuando nosotros lo buscamos.</p>
                    </div>
                    <a href="New5.html" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </section>
    <!-- Projects Area End -->
    

   

    <!-- Blog Area Start -->
    <section class="roberto-blog-area section-padding-100-0">
        <div class="container">
            <div class="row">
                <!-- Section Heading -->
                <div class="col-12">
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        <h6>Otros artículos de interés</h6>
                        <h2>Novedades &amp; actualidad</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="300ms">
                        <a href="#" class="post-thumbnail"><img src="templatePage/img/bg-img/news1.jpg" alt=""></a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">Nov 05, 2019</a>
                            <a href="#" class="post-catagory">Gatos</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Estudios revelan nueva vacuna para acabar con la alergia a tu gato</a>
                        <p>La inyección, en lugar de administrarse en la persona, se le pone al felino.</p>
                        <a href="Newsec1.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="500ms">
                        <a href="#" class="post-thumbnail"><img src="templatePage/img/bg-img/news2.jpg" alt=""></a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">Nov 10, 2019</a>
                            <a href="#" class="post-catagory">HASMTERS</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">¿Cómo cuidar y alimentar a estos animalitos?</a>
                        <p>Tener un hámster como mascota se está volviendo más habitual entre las familias, sin embargo, la información sobre su cuidado sigue siendo muy escasa.</p>
                        <a href="Newsec2.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="700ms">
                        <a href="#" class="post-thumbnail"><img src="templatePage/img/bg-img/news3.jpg" alt=""></a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">Nov 12, 2019</a>
                            <a href="#" class="post-catagory">CONEJOS</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Conoce todo sobre los conejos enanos</a>
                        <p>¿Te gustan los conejos? esta vez hablaremos de los conejos enanos, lindos animalitos ideales para personas que viven en departamentos.</p>
                        <a href="Newsec3.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- Blog Area End -->

	   <!-- Breadcrumb Area Start -->
    <div class="breadcrumb-area bg-img jarallax" style="background-image: url(templatePage/img/bg-img/registrarmascotas.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
						 <img src="templatePage/img/core-img/porqueregistraratumascota.png" alt="">
                        <nav aria-label="breadcrumb">
                             <br/>
							   
                              <li class="regismasco" aria-current="page">En RUMP buscamos disminuir la población animal en las calles. Una forma para lograrlo es el registro nacional de mascotas, así nos aseguramos de que tu mascota siempre podrá volver a casa. Organizamos campañas de salud y concienciación para educar a la sociedad en la importancia del respeto hacia los animales. Con nuestros diversos convenios en todo el Perú, ofrecemos descuentos y servicios exclusivos que tu mascota podrá disfrutar. <br/></li>
							<br/>
							<a href="templatePage/quienessomos.aspx" class="btn roberto-btn btn-2" >Saber más</a>	
							<li class="regismasco" aria-current="page"><br/> Entonces, ¿qué esperas? Registra aquí a tu engreído, pide tu DNI y su chapita. </li>
                        </nav>
						<br/>
						 <a href="registrar.html" class="btn roberto-btnM " >REGISTRAR</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Area End -->
	
	 <!-- Breadcrumb2 Area Start -->
    <div class="breadcrumb-area3 bg-img jarallax" style="background-image: url(templatePage/img/bg-img/mascotasextraviadas.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
						<img src="templatePage/img/core-img/encontrasteunamascota.png" alt="">
   
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                             <br/>
                              <li class="textoextraviada active" aria-current="page">Ahora puedes ayudar al cambio poniendo de tu parte para disminuir la tasa de animales en las calles. Si eres dueño de una mascota, es importante que la identifiques. Con RUMP te aseguras de que tu consentido siempre volverá a casa. <strong>Si has encontrado una mascota, con nuestra chapita identificadora puedes reportarla aquí como perdida, ayudando a que encuentre a su familia.</strong> <br/></li>
							  </ol>
							<br/>
							<br/>
							 <a href="registrar.html" class="btn roberto-btnR " >REPORTAR</a>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb2 Area End -->
	
	
	<!-- Breadcrumb ADD Area Start -->
<div class="breadcrumb-area2 bg-img" style="background-image: url(templatePage/img/bg-img/add.jpg);">
		
    <div class="container h-100 align-content-center">
            <div class="row h-50 align-items-center">
                
		      
                <!-- Single Post Area -->
                  <div class="col-12 col-md-6 align-content-center">
                        <!-- Post Title -->
					    <div class="breadcrumb-content text-center">
                      <h2 class="mascotas-extraviadas">Mascotas Extraviadas</h2>
                      <h6 class="textoadd"> Ellos te
						  
						  
						  
						  
						  siguen buscando ayúdanos a encontrarlos</h6>
                     </div>
                  </div>

                <!-- Single Post Area -->
                  <div class="col-12 col-md-6 align-content-center">
					  <div class="breadcrumb-content text-center">
                   <a href="mextraviadas.html" class="btn roberto-btnR align-content-center" >Búscala aquí</a>
					</div>
                  </div>
               
	
	        </div>
      </div>
</div>
	
	 <!-- Breadcrumb3 Area Start -->
    <div class="breadcrumb-area4 bg-img jarallax" style="background-image: url(templatePage/img/bg-img/buscadordem.jpg);">
        <div class="container h-50">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
						 <br> <br> 
						<img src="templatePage/img/core-img/buscadordemascotas.png" alt="">
                   
			            <div class="row align-items-center">
                             <div class="col-12 col-lg-6 align-items-center">
                	         <img src="templatePage/img/core-img/dniychapita.png" alt="">
                             </div>

                             <div class="col-12 col-lg-6 align-items-center">
					         <h5 class="textoadd"> Buscador vía código RUMP</h5>
                                 <div class="single-footer-widget">
                                      <form action="home.html" class="nl-form">
                                      <input type="email" class="form-control" placeholder="Código RUMP de mascota">
                                      </form>
                                 </div>
					              <br>
					             <button type="email" href="#" class="btn roberto-btnO align-content-center" aria-hidden="true">Buscar</button>
                             </div>
                       </div>		
						
						 <div class="row align-items-center">
                             <div class="col-12 col-lg-6 align-items-center">
                	         <img src="templatePage/img/core-img/reconocimientofacial.png" alt="">
                             </div>

                             <div class="col-12 col-lg-6 align-items-center">
					         <h5 class="textoadd"> Buscador de reconocimieto facial</h5>
                                 <div class="single-footer-widget">
                                      <form action="home.html" class="nl-form">
                                      <input type="photo" class="form-control" placeholder="Sube una foto aquí">
                                      </form>
                                 </div>
					              <br>
					             <button type="send" href="#" class="btn roberto-btnO align-content-center" aria-hidden="true">Buscar</button>
								 
                             </div>
                       </div>	
						<br>
						<h5 class="textoadd text-center"><strong>Recomendación:</strong> Para la foto de reconocimiento facial, fotografíar el rostro de la mascota aproximadamente a 50cm de distancia. </h5> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb3 Area End -->
	
	 <!-- Breadcrumb4 Area Start -->
    <div class="breadcrumb-area5 bg-img jarallax" style="background-image: url(templatePage/img/bg-img/fondoapp.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
						 <br> <br> 

			            <div class="row align-items-center">
                             <div class="col-12 col-lg-6 align-items-center">
                	         <img src="templatePage/img/core-img/imgapp.png" >
                             </div>

                             <div class="col-12 col-lg-6 align-items-center">
                             <img src="templatePage/img/core-img/descargaapp.png" > <br><br>   
					            
					              <a href="https://play.google.com/store" class="post-thumbnail"><img src="templatePage/img/core-img/botongoogleplay.png" alt=""></a>
								 <br><br>
								 <a href="https://www.apple.com/la/ios/app-store/" class="post-thumbnail"><img src="templatePage/img/core-img/botonappstore.png" alt=""></a>
                             </div>
                       </div>		

                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb4 Area End -->
	
	
    <!-- Footer Area Start -->
    <footer class="footer-area section-padding-80-0">
        <!-- Main Footer Area -->
        <div class="main-footer-area">
            <div class="container">
                <div class="row align-items-baseline justify-content-between">
                    <!-- Single Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="single-footer-widget mb-80">
                            <!-- Footer Logo -->
                            <a href="./" class="footer-logo"><img src="templatePage/img/core-img/logo-orange&white.png" alt=""></a>
                            
							<a class="itel2"><img src="templatePage/img/core-img/whatsapp.png"></a>

							<a href="https://api.whatsapp.com/send?phone=51992975292&text=Hola,%20estoy%20interesado%20en%20el%20servicio%20*RUMP*.%20" class="baraitem">+51 992 975 292</a>
							<span></span>
                            <span>Dirección: </span>
							<span>Av. Brasil #3345  </span>
                            <span>Magdalena del Mar -  PERÚ</span>
                        </div>
                    </div>

                    <!-- Single Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="single-footer-widget mb-80">
                            <!-- Widget Title -->
                            <h5 class="widget-title">Información</h5>

                            <!-- Single Blog Area -->
                            <div class="latest-blog-area">
                                <span class="post-date"><i class="fa fa-envelope" aria-hidden="true"></i>contacto.worldpetsperu@gmail.com</span>
                            </div>

                            <!-- Single Blog Area -->
                            <div class="latest-blog-area">
                                <a class="post-title">Horario de oficina</a>
                                <span class="post-date"><i class="fa fa-clock-o" aria-hidden="true"></i>9:00-18:00hrs</span>
                            </div>
							
							<!-- Single Blog Area -->
                            <div class="latest-blog-area">
                                <a class="post-title">Horario de entrega de Chapitas/DNI</a>
                                <span class="post-date"><i class="fa fa-clock-o" aria-hidden="true"></i>10:00-17:00hrs</span>
                            </div>
							
                        </div>
                    </div>

                    <!-- Single Footer Widget Area -->
                    <div class="col-12 col-sm-4 col-lg-2">
                        <div class="single-footer-widget mb-80">
                            <!-- Widget Title -->
                            <h5 class="widget-title">Links</h5>

                            <!-- Footer Nav -->
                            <ul class="footer-nav">
                                <li><a href="./blog.html"><i class="fa fa-caret-right" aria-hidden="true"></i> Noticias</a></li>
								<li><a href="templatePage/servicios.aspx"><i class="fa fa-caret-right" aria-hidden="true"></i> Servicios</a></li>
                                <li><a href="./mextraviadas.html"><i class="fa fa-caret-right" aria-hidden="true"></i> Mascotas extraviadas</a></li>
								<li><a href="templatePage/adoptame.aspx"><i class="fa fa-caret-right" aria-hidden="true"></i> Adóptame</a></li>
                                <li><a href="templatePage/quienessomos.aspx"><i class="fa fa-caret-right" aria-hidden="true"></i> ¿Quiénes somos?</a></li>
                                <li><a href="templatePage/contacto.aspx"><i class="fa fa-caret-right" aria-hidden="true"></i> Contacto</a></li>
                            </ul>
                        </div>
                    </div>

                    <!-- Single Footer Widget Area -->
                    <div class="col-12 col-sm-8 col-lg-4">
                        <div class="single-footer-widget mb-80">
                            <!-- Widget Title -->
                            <h5 class="widget-title">¿Dudas?</h5>
                            <span>Comunicate con nosotros escribiendonos un email</span>

                            <!-- Newsletter Form -->
                            <form action="index.html" class="nl-form">
                                <input type="email" class="form-control" placeholder="Escribe tu email...">
                                <button type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Copywrite Area -->
        <div class="container">
            <div class="copywrite-content">
                <div class="row align-items-center">
                    <div class="col-12 col-md-8">
                        <!-- Copywrite Text -->
                        <div class="copywrite-text">
                            <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="fa" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <!-- Social Info -->
                        <div class="social-info">
                            <a class="itel" href="https://www.facebook.com/worldpetsperurump/"><img src="templatePage/img/core-img/fb.png"></a>
                            <a class="itel" href="https://instagram.com/rumpworld?igshid=qlfktywcm7at"><img src="templatePage/img/core-img/ist.png"></a>
							<a class="itel" href="https://twitter.com/PeruRump?lang=es"><img src="templatePage/img/core-img/tw.png"></a>
							<a class="itel" href="https://www.youtube.com/channel/UCwFDOixpwmaCz6g0uFoaACg"><img src="templatePage/img/core-img/yt.png"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer Area End -->

    <!-- **** All JS Files ***** -->
    <!-- jQuery 2.2.4 -->
    <script src="templatePage/js/jquery.min.js"></script>
    <!-- Popper -->
    <script src="templatePage/js/popper.min.js"></script>
    <!-- Bootstrap -->
    <script src="templatePage/js/bootstrap.min.js"></script>
    <!-- All Plugins -->
    <script src="templatePage/js/roberto.bundle.js"></script>
    <!-- Active -->
    <script src="templatePage/js/default-assets/active.js"></script>

    <script src="assets/select2/js/select2.full.js"></script>
    <script src="js/all/date.js"></script>
    <script type="text/javascript">
        $.getScript("js/general.js")
            .fail(function (jqxhr, settings, exception) {
                alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
            });

        $.getScript("js/index.js")
            .fail(function (jqxhr, settings, exception) {
                alert("Error: No se ha cargando un complemento del sistema (index.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
            });
    </script>
</body>

</html>