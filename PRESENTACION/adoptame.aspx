<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="adoptame.aspx.cs" Inherits="PRESENTACION.adoptame" %>

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
    <!-- Header Area Start -->
    <!--#include file="headerPage.aspx"-->
    <!-- Header Area End -->

    <!-- Title Breadcrumb Area Start -->
    <div class="breadcrumb-area2 bg-img" style="background-image: url(templatePage/img/bg-img/adoptame-fondo.jpg);">
		
	<div class="row">
                <!-- Section Heading -->
                <div class="col-12 section-padding-100-0">
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                         <img src="templatePage/img/core-img/adopcion.png" alt="">
                    </div>
                </div>
            </div>		
   </div>

    <!--  Title Breadcrumb Area End -->
	
    
    <!-- About Us Area Start -->
    <section class="roberto-about-area" style="background-image: url(templatePage/img/bg-img/adopcion-fondo.jpg);">
																																	
        <!-- Hotel Search Form Area -->
         
        <div class="container ">			
			  <div class="row ">
                <!-- Section Heading -->
                <div class="col-12 mt-100">
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                         <img src="templatePage/img/core-img/TITULO-ADOPCIÓN.png" alt="">
                    </div>
                </div>
            </div>
			

			 <div class="col-12 align-content-center">
                    <!-- Post Thumbnail -->
                   
                    <!-- Blog Details Text -->
                    <div class="blog-details-text text-center">
 
                        <div class="about-us-content">
                            <h6 class="wow fadeInUp" data-wow-delay="300ms"><strong>Si estás en busca de tu nuevo mejor amigo, aquí lo encontrarás. Gracias a distintas organizaciones, refugios, asociaciones y buenas personas, miles de animales han sido rescatados de las calles. Aun así, todos necesitan una familia que les dé el amor y cuidado que necesitan.Únete a nosotros en esta causa. 
                            Gatos, perros, conejos y otras mascotas en busca de un hogar esperan a personas como tú. Encuentra a tu amigo fiel, tu mascota ideal, totalmente identificada sin pagar nada. </strong></h6>
                            <br></br>
                            <img src="templatePage/img/core-img/subtitulo-adop.png" alt="" class="wow fadeInUp" data-wow-delay="500ms">
                  
                        </div> 
                    </div>
             </div>
      </div> 
    </section>
    <!-- About Us Area End -->
    <!-- About Us Area Start -->
    <section class="roberto-about-area" style="background-image: url(templatePage/img/bg-img/adopcion-fondo.jpg);">
																																	
        <!-- Hotel Search Form Area -->
         
        <div class="container ">
			

			
			 <div class="row">
                <!-- Section Heading -->
                <div class="col-12 mt-100">
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        <h2 class="regismasco">Dales una nueva oportunidad</h2>
						<br>
						<p class="regismasco">Ingresa a los siguientes refugios, asociaciones , organizaciones y podrás encontras a tu nuevo mejor amigo </p>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="300ms">
                        <a href="https://www.facebook.com/alberguesanfrancisco/" class="post-thumbnail"><img src="templatePage/img/bg-img/albergue1.png" alt=""></a>
                        <p class="regismasco text-center">Albergue San Francisco</p>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="500ms">
                        <a href="https://www.facebook.com/ayudaentrepatas/" class="post-thumbnail"><img src="templatePage/img/bg-img/albergue2.png" alt=""></a>
                        <p class="regismasco text-center">Asociación Ayuda entre patas</p>
                    </div>
                </div>

                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="single-post-area mb-100 wow fadeInUp" data-wow-delay="700ms">
                        <a href="https://www.facebook.com/asociacionmisichaperu/" class="post-thumbnail"><img src="templatePage/img/bg-img/albergue3.png" alt=""></a>
                        <p class="regismasco text-center">Asociación Misicha Perú</p>
                    </div>
                </div>

            </div>

      </div>
 
    </section>
    <!-- About Us Area End -->

    <!-- Consulta Mascota Start -->
    <section id="sec_adoptame">
        <div class="roberto-contact-form-area">
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <label style="color: black">Tamaño</label>
                        <select id="sel_tamano" class="form-control mb-30" style="width: 100%">
                            <option value="0">Todos</option>
                            <option value="Chico">Chico</option>
                            <option value="Mediano">Mediano</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label style="color: black">Tipo</label>
                        <select id="sel_tipo" class="form-control mb-30" style="width: 100%;">
                            <option value="0">Todos</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label style="color: black">Raza</label>
                        <select id="sel_raza" class="form-control mb-30" style="width: 100%;">
                            <option value="0">Todos</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <label style="color: black">Calificación</label>
                        <select id="sel_calificacion" class="form-control mb-30" style="width: 100%">
                            <option value="0">Todos</option>
                            <option value="Rojo">Agresivo</option>
                            <option value="Verde">Amistoso</option>
                            <option value="Blanco">Discapacitado</option>
                            <option value="Azul">Entrenado</option>
                            <option value="Amarillo">Miedoso</option>
                            <option value="Naranja">Peleador</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <label style="color: black">Sexo</label>
                        <select id="sel_sexo" class="form-control mb-30" style="width: 100%">
                            <option value="0">Todos</option>
                            <option value="Macho">Macho</option>
                            <option value="Hembra">Hembra</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mb-30">
                        <button id="btn_buscar_adopcion" class="btn roberto-btnO align-content-center">BUSCAR</button>
                    </div>
                </div>
                <div class="card shadow">
                    <table id="tbl_adopcion" class="table table-striped table-hover table-adopcion">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Sexo</th>
                            <th>Tamaño</th>
                            <th>Color</th>
                            <th>Tipo</th>
                            <th>Raza</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                </div>
            </div>
        </div>

        <!--***********************  MASCOTA VISTA  **************************-->
        <div class='modal modal-scroll fade' id='pnl_adopcion_v' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Detalles de la Mascota</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorMascota_v"></div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group text-center">
                            <img src="#" id="img_Foto_adop" style="width: 150px; height: 150px; background-color: #d6d6d6; border-radius: 50%;" onerror="this.src='../img/noPets.png';" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Nombre</strong></label>
                            <input id="txt_nombre_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Sexo</strong></label>
                            <input id="txt_sexo_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Tamaño</strong></label>
                            <input id="txt_tamano_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Color</strong></label>
                            <input id="txt_color_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Tipo</strong></label>
                            <input id="txt_tipo_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label style="color:black"><strong>Raza</strong></label>
                            <input id="txt_raza_adop" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
    </section>
    <!-- Consulta Mascota End -->

    <!-- Footer Area Start -->
    <!--#include file="footerPage.aspx"-->
    
    <script src="js/adoptame.js?v=123456"></script>
</body>

</html>
