<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="PRESENTACION.index" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Title -->
    <title>RUMP &amp; World Pets Perú</title>

    <!-- Favicon -->
    <link rel="icon" href="templatePage/img/core-img/favicon.png">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="templatePage/style.css">

</head>

<body>
    <!-- Preloader -->
    <div id="preloader">
        <div class="loader"></div>
    </div>
    <!-- /Preloader -->

    <!-- Header Area Start -->
    <header class="header-area">
        <!-- Search Form -->
        <div class="search-form d-flex align-items-center">
            <div class="container">
                <form action="index.html" method="get">
                    <input type="search" name="search-form-input" id="searchFormInput" placeholder="Type your keyword ...">
                    <button type="submit"><i class="icon_search"></i></button>
                </form>
            </div>
        </div>

        <!-- Top Header Area Start -->
        <div class="top-header-area">
            <div class="container">
                <div class="row">

                    <div class="col-6">
                        <div class="top-header-content">
                            <a href="#"><i class="icon_phone"></i> <span>(01) 7316407</span></a>
                            <a href="#"><i class="icon_mail"></i> <span>worldpetsperú.2210@gmail.com</span></a>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="top-header-content">
                            <!-- Top Social Area -->
                            <div class="top-social-area ml-auto">
                                <a href="https://www.facebook.com/worldpetsperurump/"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="https://twitter.com/PeruRump?lang=es"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="https://www.youtube.com/channel/UCwFDOixpwmaCz6g0uFoaACg"><i class="fa fa-play-circle" aria-hidden="true"></i></a>
                                <a href="https://instagram.com/rumpworld?igshid=qlfktywcm7at"><i class="fa fa-instagram" aria-hidden="true"></i></a>
							
                            </div>
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
									<li><a href="#">Mascotas extraviadas</a></li>
                                    <li><a href="./adoptame.html">Adóptame</a>
									    <ul class="dropdown">
                                            <li><a href="#">Enciclopedia de Razas</a></li><br>
									    </ul>
									</li>	
									<li><a href="#">¿Quiénes somos?</a></li>
							       
                                    <li><a href="./contacto.html">Contacto</a></li>
                                </ul>

                                <!-- Search -->
                                <div class="search-btn ml-4">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </div>

                                <!-- Book Now -->
                                <div class="book-now-btn ml-3 ml-lg-5" id="divLoginUser">
                                    <a href="#">Iniciar Sesión <i class="fa fa-user-circle-o" aria-hidden="true"></i></a>
                                </div>
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
                                 
                                    <a href="#" class="btn roberto-btn btn-2" data-animation="fadeInLeft" data-delay="900ms">Conocenos más</a>
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
                                    <a href="#" class="btn roberto-btn btn-2" data-animation="fadeInDown" data-delay="900ms">¡SOLICITALO YA!</a>
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
                        <h6>General</h6>
                        <h5>No compres, adopta</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>Perros</h6>
                        <h5>No compres, adopta</h5>
                        <p>Si quieres vivir con un perro o un gato, adóptalo, no lo compres.</p>
                    </div>
                    <a href="#" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia2.jpg)">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Esterilización es prevención</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Esterilización es prevención</h5>
                        <p>La esterilización ayuda a prevenir las infecciones uterinas y el cáncer de mama, el cual es fatal en alrededor del 50 por ciento de los perros y 90 por ciento de los gatos.</p>
                    </div>
                    <a href="#" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia3.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Vacaciones con mascotas</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Vacaciones con mascotas</h5>
                        <p>El alquiler de un apartamento de vacaciones es la solución ideal para disfrutar de tus vacaciones con mascotas, además no te supondrá un coste adicional.</p>
                    </div>
                    <a href="#" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia4.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Disfrazes de halloween</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>General</h6>
                        <h5>Disfrazes de halloween</h5>
                        <p>No podemos resistirnos a Halloween, y es que ya no sólo caemos en la tentación de disfrazarnos, sino que arrastramos con nosotras a nuestras queridas mascotas</p>
                    </div>
                    <a href="#" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                </div>
            </div>

            <!-- Single Project Slide -->
            <div class="single-project-slide bg-img" style="background-image: url(templatePage/img/bg-img/noticia5.jpg);">
                <!-- Project Text -->
                <div class="project-content">
                    <div class="text">
                        <h6>Hamsters</h6>
                        <h5>Crea accesorios para ellos</h5>
                    </div>
                </div>
                <!-- Hover Effects -->
                <div class="hover-effects">
                    <div class="text">
                        <h6>Hamsters</h6>
                        <h5>Crea accesorios para ellos</h5>
                        <p>Tú mismo puedes hacer juguetes a un bajo costo (o hasta sin costo) si utilizas artículos que tienes en casa. Al finalizar, no solo te habrás divertido haciendo los juguetes, sino que tu hámster también se divertirá jugando con ellos.</p>
                    </div>
                    <a href="#" class="btn project-btn">Ingresar<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
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
                            <a href="#" class="post-date">Oct 02, 2019</a>
                            <a href="#" class="post-catagory">Gatos</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Una vacuna para acabar con la alergia de tu gato</a>
                        <p>La inyección, en lugar de administrarse en la persona, se le pone al felino</p>
                        <a href="index.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="500ms">
                        <a href="#" class="post-thumbnail"><img src="templatePage/img/bg-img/news2.jpg" alt=""></a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">Oct 06, 2019</a>
                            <a href="#" class="post-catagory">AVES</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Los mejores lugares del país para el avistamiento de aves</a>
                        <p>El Perú es uno de los pocos países donde se puede apreciar gran cantidad de aves en su hábitat natural, una actividad que atrae a diversos turistas del mundo y genera divisas.</p>
                        <a href="index.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="700ms">
                        <a href="#" class="post-thumbnail"><img src="templatePage/img/bg-img/news3.jpg" alt=""></a>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">Oct 12, 2019</a>
                            <a href="#" class="post-catagory">CONEJOS</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Conoce todo sobre los conejos enanos</a>
                        <p>¿Te gustan los conejos? esta vez hablaremos de los conejos enanos, lindos animalitos ideales para personas que viven en departamentos.</p>
                        <a href="index.html" class="btn continue-btn"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
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
							<li class="regismasco" aria-current="page"><br/> Saber más</li>
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
<div class="breadcrumb-area2 bg-img jarallax" style="background-image: url(templatePage/img/bg-img/add-dog.jpg);">
		
    <div class="container h-100 align-content-center">
            <div class="row h-50 align-items-center">
                
		      
                <!-- Single Post Area -->
                  <div class="col-12 col-md-6 align-content-center">
                        <!-- Post Title -->
					    <div class="breadcrumb-content text-center">
                      <h2 class="mascotas-extraviadas">Mascotas Extraviadas</h2>
                      <h6 class="textoadd"> Ellos te siguen buscando ayúdanos a encontrarlos</h6>
                     </div>
                  </div>

                <!-- Single Post Area -->
                  <div class="col-12 col-md-6 align-content-center">
					  <div class="breadcrumb-content text-center">
                   <a href="#" class="btn roberto-btnR align-content-center" >Buscala aquí</a>
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
                            <a href="./" class="footer-logo"><img src="templatePage/img/core-img/logo-orange.png" alt=""></a>

                            <h4>(01) 7316407</h4>
                            <span>contacto.worldpetsperu@gmail.com</span>
                            <span>Av. Brasil 3345 - Magdalena del Mar Perú</span>
                        </div>
                    </div>

                    <!-- Single Footer Widget Area -->
                    <div class="col-12 col-sm-6 col-lg-3">
                        <div class="single-footer-widget mb-80">
                            <!-- Widget Title -->
                            <h5 class="widget-title">Información</h5>

                            <!-- Single Blog Area -->
                            <div class="latest-blog-area">
                                <a class="post-title">Contacto Comercial:
									contacto.worldpetsperu@gmail.com</a>
                                <span class="post-date"><i class="fa fa-phone" aria-hidden="true"></i> 992 975 292</span>
                            </div>

                            <!-- Single Blog Area -->
                            <div class="latest-blog-area">
                                <a class="post-title">Horario</a>
                                <span class="post-date"><i class="fa fa-clock-o" aria-hidden="true"></i>9:00-18:00hrs</span>
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
								<li><a href="./servicios.html"><i class="fa fa-caret-right" aria-hidden="true"></i> Servicios</a></li>
                                <li><a href="#"><i class="fa fa-caret-right" aria-hidden="true"></i> Mascotas extraviadas</a></li>
								<li><a href="./adoptame.html"><i class="fa fa-caret-right" aria-hidden="true"></i> Adóptame</a></li>
                                <li><a href="#"><i class="fa fa-caret-right" aria-hidden="true"></i> ¿Quiénes somos?</a></li>
                                <li><a href="./contacto.html"><i class="fa fa-caret-right" aria-hidden="true"></i> Contacto</a></li>
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
                            <a href="https://www.facebook.com/worldpetsperurump/"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="https://twitter.com/PeruRump?lang=es"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="https://instagram.com/rumpworld?igshid=qlfktywcm7at"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                            <a href="https://www.youtube.com/channel/UCwFDOixpwmaCz6g0uFoaACg"><i class="fa fa-play" aria-hidden="true"></i></a>
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
    <script type="text/javascript">
    $.getScript("js/index.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (index.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
</body>

</html>