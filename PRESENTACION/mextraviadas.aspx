<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mextraviadas.aspx.cs" Inherits="PRESENTACION.mextraviadas" %>

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
    <!-- REPORTAR MASCOTA EXTRAVIADA -->

    <div class='modal modal-scroll fade' id='pnl_report_mascota' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Reportar Mascota Encontrada</h4>
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

    <!-- Title Breadcrumb Area Start -->
    <div class="breadcrumb-area2 bg-img" style="background-image: url(templatePage/img/bg-img/mascotasextraviadas-fondo.jpg);">
		
	    <div class="row">
            <!-- Section Heading -->
            <div class="col-12 section-padding-100-0">
                <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                    <img src="templatePage/img/core-img/mascotasextraviadas.png" alt="">
                </div>
            </div>
        </div>		
    </div>
    <!--  Title Breadcrumb Area End -->

	<!-- Breadcrumb Area Start -->
    <div class="breadcrumb-area bg-img jarallax background-repeat:repeat-x" style="background-image: url(templatePage/img/bg-img/pattern-mascotaextraviada.jpg); background-repeat: repeat">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <div class="breadcrumb-content text-center">
						<br/>
						
						 <img src="templatePage/img/core-img/encontrasteunamascota.png" alt="">
                        <nav aria-label="breadcrumb">
                             <br/>
                              <h6 class="textoadd" aria-current="page">Si has encontrado una mascota, con nuestra chapita identificadora puedes reportarla aquí como perdida, ayudando a que encuentre a su familia. Ahora puedes ayudar al cambio poniendo de tu parte para disminuir la tasa de animales en las calles. Si eres dueño de una mascota,
							  es importante que la identifiques. Con RUMP te aseguras de que tu engreído siempre volverá a casa.</h6>
                        </nav>
						<br/>
						<br/>
				
						 <a href="#" class="btn roberto-btnR reportar-msct-etv">REPORTAR</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Area End -->

    <!-- Service Area Start -->
    <section class="roberto-service-area section-padding-100-0">		
        <div class="container">
            <div class="row">
                <div class="col-12">
                    
                    <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                        
                        <h2>Ellos te siguen buscando</h2>
						<br></br>
						<h6>Encuentralas aquí</h6>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Service Area End -->
	
    <!-- Footer Area Start -->
    <!--#include file="footerPage.aspx"-->

</body>

</html>