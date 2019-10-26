<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="servicios.aspx.cs" Inherits="PRESENTACION.templatePage.servicios" %>

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
    <link rel="icon" href="./img/core-img/favicon.png">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css">

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
                        <a class="nav-brand" href="home.html"><img src="./img/core-img/logo-orange.png" alt=""></a>

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
                                    <li class="active"><a href="./home.html">Inicio</a></li>
                                    <li><a href="./servicios.html">Servicios</a></li>
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
                                <div class="book-now-btn ml-3 ml-lg-5">
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

    <!-- Breadcrumb Area Start -->
    <div class="breadcrumb-area6 bg-img jarallax" style="background-image: url(img/bg-img/servicios-fondo.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
			
              <div class="breadcrumb-content text-center">
                      <h1 class="mascotas-extraviadas"ta-animation="fadeInUp" data-delay="100ms">SERVICIOS</h1>
                      <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
 
                                <li class="textoextraviada active" aria-current="page">Con RUMP, al efectuar tu registro no sólo le otorgarás una identidad a tu mascota, accederás a multitud de servicios gratuitos y a una comunidad de tenencia responsable. Sé parte del movimiento. </li>
                            </ol>
                      </nav>
                  </div>
                
            </div>
        </div>
    </div>
    <!-- Breadcrumb Area End -->

    <!-- About Us Area Start -->
    <section class="roberto-about-us-area section-padding-100-0">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-12 col-lg-6">
                    <div class="about-thumbnail pr-lg-5 mb-100 wow fadeInUp" data-wow-delay="100ms">
                        <img src="img/bg-img/dni+chapita.jpg" alt="">
                    </div>
                </div>
                <div class="col-12 col-lg-6">
                    <!-- Section Heading -->
                    <div class="section-heading wow fadeInUp" data-wow-delay="300ms">
                        <h6>Sistema de identificación</h6>
                        <h2>Chapita +DNI</h2>
                    </div>
                    <div class="about-content mb-100 wow fadeInUp" data-wow-delay="500ms">
                        <p>Al registrar a tu mascota, esta contará con un número de RUMP que llevará también colgado en una chapita identificadora. </p>
                        <p>En esta chapita se indican el nombre de la mascota, página web y su número de DNI.</p>
                        <img src="img/core-img/idplaca.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- About Us Area End -->

    <!-- Video Area Start -->
    <div class="breadcrumb-area3 bg-img bg-overlay jarallax section-padding-0-100" style="background-image: url(img/bg-img/lostdog.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center">
               
				 <div class="section-heading text-center white wow fadeInUp" data-wow-delay="100ms">
					    <h2>En caso de que tu mascota se pierda, </h2>
					    <br/>
                        <h6>quien la encuentre podrá acceder a nuestra web, como indica en la chapita. Subiendo fotos de la mascota encontrada nuestra base de datos con reconocimiento facial le indicará los datos del dueño para así poder retornarlo. </h6>
                        
                 </div>
				
            </div>
        </div>
    </div>
    <!-- Video Area End -->

    <!-- Service Area Start -->
    <section class="roberto-service-area section-padding-100-0">
		
        <div class="container">
            <div class="row">
                <div class="col-12">
                    
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        <h6>Tambien puedes gozar de </h6>
                        <h2>Más servicios</h2>
                    </div>
                </div>
            </div>
        </div>
		
		<!-- Our Room Area Start -->
    <section class="roberto-rooms-area">
        <div class="rooms-slides owl-carousel">
            <!-- Single Room Slide -->
            <div class="single-room-slide d-flex align-items-center">
                <!-- Thumbnail -->
                <div class="room-thumbnail h-100 bg-img" style="background-image: url(img/bg-img/descuentos.jpg);"></div>

                <!-- Content -->
                <div class="room-content">
                    <h2 data-animation="fadeInUp" data-delay="100ms">Descuentos </h2>
              
                    <ul class="room-feature" data-animation="fadeInUp" data-delay="500ms">
                        <li>Contamos con más de 100 convenios en Lima y Perú,todos los</li>
                        <li>registrados cuentan con descuentos y servicios especiales.</li>
                        <li>En nuestro mapa interactivo puedes encontrar aquellos </li>
                        <li>centros que ofrecen beneficios más cerca de ti. </li>
                    </ul>
                    <a href="#" class="btn roberto-btn mt-30" data-animation="fadeInUp" data-delay="700ms">Ver detalle</a>
                </div>
            </div>

            <!-- Single Room Slide -->
            <div class="single-room-slide d-flex align-items-center">
                <!-- Thumbnail -->
                <div class="room-thumbnail h-100 bg-img" style="background-image: url(img/bg-img/imgapp.jpg);"></div>

                <!-- Content -->
                <div class="room-content">
                    <h2 data-animation="fadeInUp" data-delay="100ms">APP móvil </h2>
                 
                    <ul class="room-feature" data-animation="fadeInUp" data-delay="500ms">
                        <li>Los dueños responsables tienen a su disposición una aplicación gratis</li>
                        <li>donde podrán encontrar un historial médico online,control de vacunas,</li>
                        <li>cronogramas, y muchas cosas más. Para estar al día en el cuidado de</li>
                        <li>tu mascota y que esté en las mejores condiciones. </li>
                    </ul>
                    <a href="#" class="btn roberto-btn mt-30" data-animation="fadeInUp" data-delay="700ms">Descargar app</a>
                </div>
            </div>
			
			 <div class="single-room-slide d-flex align-items-center">
                <!-- Thumbnail -->
                <div class="room-thumbnail h-100 bg-img" style="background-image: url(img/bg-img/imgadopcion.jpg);"></div>

                <!-- Content -->
                <div class="room-content">
                    <h2 data-animation="fadeInUp" data-delay="100ms">Cupo de adopción gratuita</h2>
               
                    <ul class="room-feature" data-animation="fadeInUp" data-delay="500ms">
                        <li>Todos los registrados con RUMP contarán con un cupo virtual de adopción</li>
                        <li>gratuita, fomentemos la adopción y luchemos contra en abandono. </li>
           
                    </ul>
                    <a href="#" class="btn roberto-btn mt-30" data-animation="fadeInUp" data-delay="700ms">Adopta aquí</a>
                </div>
            </div>

			
        </div>
    </section>
    <!-- Our Room Area End -->
		
    </section>
    <!-- Service Area End -->

<br>
	<br>
		
		
	<!-- Google Maps & Contact Info Area Start -->
    <br><section class="google-maps-contact-info">
	<br>
        <div class="container-fluid">
            <div class="google-maps-contact-content">
                <div class="row">
					
					
				<div class="col-12">
                    
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        <h6>MAPA INTERACTIVO</h6>
                        <h2>¡Encuentra los beneficios RUMP más cerca de ti!</h2>
						
                    </div>
                </div>
					

                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3"> </div>

                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3"> </div>
                </div>

                <!-- Google Maps -->
                <div class="google-maps">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3285344405226!2d-77.06629622651859!3d-12.090633718626314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9a8f3ea81c1%3A0x671bcbb91388f042!2sAv%20Brasil%203345%2C%20Magdalena%20del%20Mar%2015086%2C%20Per%C3%BA!5e0!3m2!1ses!2sbd!4v1571928961192!5m2!1ses!2sbd" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
            </div>
        </div>
    </section>
    <!-- Google Maps & Contact Info Area End -->

		
		
		
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
                            <a href="home.html" class="footer-logo"><img src="img/core-img/logo-orange.png" alt=""></a>

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
    <script src="js/jquery.min.js"></script>
    <!-- Popper -->
    <script src="js/popper.min.js"></script>
    <!-- Bootstrap -->
    <script src="js/bootstrap.min.js"></script>
    <!-- All Plugins -->
    <script src="js/roberto.bundle.js"></script>
    <!-- Active -->
    <script src="js/default-assets/active.js"></script>

</body>

</html>