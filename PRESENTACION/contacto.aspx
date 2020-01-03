<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="contacto.aspx.cs" Inherits="PRESENTACION.contacto" %>

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
    <link rel="stylesheet" href="templatePage/style.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>">

</head>

<body>
    <!--#include file="headerPage.aspx"-->

    <!-- Breadcrumb Area Start -->
    <div class="breadcrumb-area contact-breadcrumb bg-img jarallax" style="background-image: url(templatePage/img/bg-img/contact.jpg);">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcrumb-content text-center mt-100">
                        <h2 class="mascotas-extraviadas">Contáctanos</h2>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb justify-content-center">
                               
                            </ol> 
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Area End -->
    <br>
    <br>
    <br>
    <br>

    <!-- Google Maps & Contact Info Area Start -->
    <section class="google-maps-contact-info">
        <div class="container-fluid">
            <div class="google-maps-contact-content">
                <div class="row">
                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3">
                        <div class="single-contact-info">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            <h5>Teléfonos</h5>
							<a href="tel:+517316407">(01)7316407</a>
							<br>
							<a href="https://api.whatsapp.com/send?phone=51992975292&text=Hola,%20estoy%20interesado%20en%20el%20servicio%20*RUMP*.%20" >+51 992975292</a>
                        </div>
                    </div>
                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3">
                        <div class="single-contact-info">
                            <i class="fa fa-map-marker" aria-hidden="true"></i>
                            <h5>Dirección</h5>
                            <p>Av. Brasil 3345</p>
							<p>Magdalena del Mar Perú</p>
                        </div>
                    </div>
                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3">
                        <div class="single-contact-info">
                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                            <h5>Horario de atención</h5>
                            <p>09:00 to 18:00 hrs</p>
							<h5>Horario de entregas</h5>
							<p>10:00 to 17:00 hrs</p>
                        </div>
                    </div>
                    <!-- Single Contact Info -->
                    <div class="col-6 col-lg-3">
                        <div class="single-contact-info">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                            <h5>Email</h5>
							<a href="mailto:worldpetsperu.2210@gmail.com">worldpetsperu .2210@gmail. com</a>
                        </div>
                    </div>
                </div>

                <!-- Google Maps -->
                <div class="google-maps">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d975.3285344405226!2d-77.06629622651859!3d-12.090633718626314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c9a8f3ea81c1%3A0x671bcbb91388f042!2sAv%20Brasil%203345%2C%20Magdalena%20del%20Mar%2015086%2C%20Per%C3%BA!5e0!3m2!1ses!2sbd!4v1571928961192!5m2!1ses!2sbd" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
                </div>
            </div>
        </div>
    </section>
    <!-- Google Maps & Contact Info Area End -->
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <!-- Contact Form Area Start -->
    <div class="roberto-contact-form-area section-padding-100">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Section Heading -->
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        <h6>Contactate con nosotros</h6>
                        <h2>Escríbenos</h2>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <!-- Form -->
                    <div class="roberto-contact-form">
                        <form action="#" method="post">
                            <div id="errorMail"></div>
                            <div class="row">
                                <div class="col-12 col-lg-6 wow fadeInUp" data-wow-delay="100ms">
                                    <input type="text" id="txt_nombre" name="message-name" class="form-control mb-30" placeholder="Tu nombre">
                                </div>
                                <div class="col-12 col-lg-6 wow fadeInUp" data-wow-delay="100ms">
                                    <input type="email" id="txt_email" name="message-email" class="form-control mb-30" placeholder="Email">
                                </div>
                                <div class="col-12 col-lg-6 wow fadeInUp" data-wow-delay="100ms">
                                    <input type="numbers" id="txt_celular" name="message-email" class="form-control mb-30" placeholder="Celular">
                                </div>
								
								<div class="col-12 col-lg-6 wow fadeInUp" data-wow-delay="100ms">
                                    <input type="numbers" id="txt_telefono" name="message-email" class="form-control mb-30" placeholder="Teléfono opcional">
                                </div>
                                <div class="col-12 wow fadeInUp" data-wow-delay="100ms">
                                    <textarea name="message" id="txt_mensaje" class="form-control mb-30" placeholder="Tu mensaje"></textarea>
                                </div>
                                <div class="col-12 text-center wow fadeInUp" data-wow-delay="100ms">
                                    <button type="button" class="btn roberto-btn mt-15 send-email-contact">Enviar mensaje</button>
                                </div>
                            </div>
                        </form><
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Form Area End -->

    <!-- Footer Area Start -->
    <!--#include file="footerPage.aspx"-->

</body>

</html>