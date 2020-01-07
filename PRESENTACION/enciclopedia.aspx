<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="enciclopedia.aspx.cs" Inherits="PRESENTACION.enciclopedia" %>

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
    <!-- Select 2 filtro-->
    <link href="assets/select2/css/select2.css" rel="stylesheet" />
</head>

<body>
    <!-- Header Area Start -->
    <!--#include file="headerPage.aspx"-->
    <!-- Header Area End -->

    <!-- Title Breadcrumb Area Start -->
    <div class="breadcrumb-area2 bg-img" style="background-image: url(templatePage/img/bg-img/quienessomos-banner.jpg);">

        <div class="row">
            <!-- Section Heading -->
            <div class="col-12 section-padding-100-0">
                <div class="section-heading text-center wow fadeInUp" data-wow-delay="100ms">
                    <%--<img src="templatePage/img/core-img/quienessomos.png" alt="">--%>
                    <h1 style="color: white;">ENCICLOPEDIA DE RAZAS</h1>
                </div>
            </div>
        </div>
    </div>

    <!--  Title Breadcrumb Area End -->

    <!-- Blog Area Start -->
    <section class="roberto-blog-area">
        <div class="container">
            <div class="row mb-30">
                <div class="col-6">
                    <label style="color: black">Tipo</label>
                    <select id="sel_tipo" class="form-control sel_autocomplete" style="width: 100%;">
                        <option value="0">Todos</option>
                    </select>
                </div>
                <div class="col-6">
                    <label style="color: black">Raza</label>
                    <select id="sel_raza" class="form-control sel_autocomplete" style="width: 100%;">
                        <option value="0">Todos</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-4 mb-30">
                    <button id="btn_buscar_enciclopedia" class="btn roberto-btnO align-content-center">BUSCAR</button>
                </div>
            </div>
            <div class="row" id="list-enciclopedia">
                <!-- Single Post Area -->
                <div class="col-12 col-md-6 col-lg-6">
                    <div class="single-post-area mb-100 wow fadeInUp border" data-wow-delay="300ms">
                        <%--<a href="#" class="post-thumbnail">
                            <img src="templatePage/img/bg-img/news1.jpg" alt=""></a>--%>
                        <!-- Post Meta -->
                        <div class="post-meta">
                            <a href="#" class="post-date">PERROS</a>
                            <a href="#" class="post-catagory">Tipo: Bichones</a>
                        </div>
                        <!-- Post Title -->
                        <a href="#" class="post-title">Nombre original: Bichon Frisé</a>
                        <p>Tamaño del macho:Máximo 30 cm</p>
                        <p>Tamaño de la hembra:Máximo 30 cm</p>
                        <p>Grado de cuidado:</p>
                        <p>País de origen:Italia</p>
                        <p>General: Se suele mostrar muy alegre y tiene una gran facilidad para adaptarse a las diversas situaciones. Con el dueño es especialmente dulce y sensible, por lo que resulta un gran compañero.</p>
                        <p>Cabeza: La cabeza está en armonía con el tamaño del cuerpo y su cráneo es achatado</p>
                        <p>Cuerpo:lomo ancho, bien musculado y algo arqueado, con el pecho bien desarrollado y los flancos levantados en la zona del vientre.</p>
                        <p>Pelaje: En su mayoría ejemplares de color blanco puro</p>
                        <p>Orejas: Cuelgan hacia los lados y se giran hacia el frente cuando el perro está atento; no son muy largas.</p>
                        <p>Cola: La lleva levantada y doblada hacia la espalda pero sin llegar a tocarla.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Blog Area End -->

    <!-- Footer Area Start -->
    <!--#include file="footerPage.aspx"-->

    <!-- Enciclopedia -->
    <script src="js/enciclopedia.js?v=123456"></script>
</body>

</html>
