<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="adoptame.aspx.cs" Inherits="PRESENTACION.templatePage.adoptame" %>

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
    <!-- Header Area Start -->
    <!--#include file="headerPage.aspx"-->
    <!-- Header Area End -->

    <!-- Breadcrumb Area Start -->
    <div class="breadcrumb-area3 bg-img jarallax" style="background-image: url(img/bg-img/adoptame-fondo.jpg);">
        <div class="container h-100">
            <div class="row h-100 align-items-center">
                <div class="col-12">
                    <br />
                    <br />
                    <br />
                    <h2 class="mascotas-extraviadas text-center">ADOPCIÓN</h2>

                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Area End -->

    <!-- About Us Area Start -->
    <section class="roberto-about-area section-padding-100-0">
        <!-- Hotel Search Form Area -->
        <div class="hotel-search-form-area">
            <div class="container-fluid"></div>
        </div>

        <div class="container mt-100">
            <div class="row align-items-center">
                <div class="col-12 col-lg-6">
                    <!-- Section Heading -->
                    <div class="section-heading wow fadeInUp" data-wow-delay="100ms">
                        <h6>únete a la comunidad </h6>
                        <h2>¡Fomentemos la adopción!</h2>
                    </div>
                    <div class="about-us-content mb-100">
                        <h5 class="wow fadeInUp" data-wow-delay="300ms">Si estás en busca de tu nuevo mejor amigo, aquí lo encontrarás. Gracias a distintas organizaciones, refugios, asociaciones y buenas personas, miles de animales han sido rescatados de las calles. Aun así, todos necesitan una familia que les dé el amor y cuidado que necesitan.Únete a nosotros en esta causa. 
                        Gatos, perros, conejos y otras mascotas en busca de un hogar esperan a personas como tú. Encuentra a tu amigo fiel, tu mascota ideal, totalmente identificada sin pagar nada. 
                        </h5>

                        <img src="img/core-img/nocompresadopta.png" alt="" class="wow fadeInUp" data-wow-delay="500ms">
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="about-us-thumbnail mb-100 wow fadeInUp" data-wow-delay="700ms">
                        <div class="row no-gutters">
                            <div class="col-6">
                                <div class="single-thumb">
                                    <img src="img/bg-img/adoptamefotogato.jpg" alt="">
                                </div>
                                <div class="single-thumb">
                                    <img src="img/bg-img/adoptamefotoconejo.jpg" alt="">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="single-thumb">
                                    <img src="img/bg-img/adoptamefotoperro.jpg" alt="">
                                </div>
                            </div>
                        </div>
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


    </section>

    <!-- Service Area End -->



    <!-- Footer Area Start -->
    <!--#include file="footerPage.aspx"-->

</body>
<script src="../js/adoptame.js"></script>
</html>
