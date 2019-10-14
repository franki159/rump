<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexPage.aspx.cs" Inherits="PRESENTACION.indexPage" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>World Pets Perú</title>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta content="" name="keywords">
  <meta content="" name="description">
  <%--<meta name="csrf_token" content="{{ csrf_token() }}" />--%>

  <!-- Favicons -->
  <link href="public/front_estilos/img/favicon.png" rel="icon">

  <!-- Bootstrap CSS File -->
    <link href="public/front_estilos/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Libraries CSS Files -->
    <link href="public/front_estilos/lib/font-awesome/css/font-awesome.min.css" rel="stylesheet" />
    <link href="public/front_estilos/lib/animate/animate.min.css" rel="stylesheet" />
    <link href="public/front_estilos/lib/ionicons/css/ionicons.min.css" rel="stylesheet" />
    <link href="public/front_estilos/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
    <link href="public/front_estilos/lib/magnific-popup/magnific-popup.css" rel="stylesheet" />


  <!-- Main Stylesheet File -->
    <link href="public/front_estilos/css/style.css" rel="stylesheet" />
  <style rel="stylesheet" media="only screen" type="text/css">
  
  #principal{
        height: 420px; width: 100%;margin-top:10px;
    }

    #map{
      height:400px;
      width:700px;
    }
    
    #mapa{
        height: 100%; width: 65%;float: left;
    }
    
    #menu_buscar{
        height: 100%; width: 35%;  margin-top: 5px;float: left;
    }
  
  @media only screen and (max-width: 768px) {
      
      #principal{
        height: 630px; width: 100%;margin-top:10px;
    }
    
    #menu_buscar{
        height: 50%; width: 100%;  margin-top: 5px;
    }
    
    #search{
        margin-left: 5px;
    }
    
    #mapa{
        height: 200px; width: 100%;margin-top: 90px;
    }

    #map{
      height:200px;
      width:100%;
    }
    
   
    
      
  }

    
    
    
  </style>

</head>

<body id="body" >

  <!--==========================
    Header
  ============================-->
  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
         <a href="/"><img src="public/front_estilos/img/worldpetsperu_logo.png" alt="World Pets Perú" title="World Pets Perú" /></a>
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li class="menu-active" style="padding: 0px 15px;"><a href="/" id="inicio">Inicio</a></li>
          <li  style="padding: 0px 15px;"><a href="#" id="beneficios">Beneficios</a></li>
          <li style="padding: 0px 15px;"><a href="#" id="rump">RUMP</a></li>
          <li style="padding: 0px 15px;"><a href="#" id="encontraste">Mascotas Extraviadas</a></li>
          <li style="padding: 0px 15px;"><a href="#" id="adoptame">Adóptame</a></li>
          <li style="padding: 0px 15px;"><a href="https://worldpetsperu.com/novedades" id="novedades">Novedades</a></li>
          <li style="padding: 0px 15px;"><a href="#" id="enciclopedia">Enciclopedia de Razas</a></li>
          <li style="padding: 0px 15px;"><a href="#" id="iniciarsesion">Iniciar Sesión</a></li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
  </header><!-- #header -->

  <!--==========================
    Intro Section
  ============================-->
  <section>

   <!--  <div class="intro-content">
      <h4>INSTALACIÓN Y MANTENIMIENTO DE</h4>
      <h2>PARRONES y MALLAS</h2>
    </div>

    <div id="intro-carousel" class="owl-carousel" >
      <div class="item" style="background-image: url('img/intro-carousel/1.png');"></div>
      <div class="item" style="background-image: url('img/intro-carousel/2.png');"></div>
    </div> -->
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
       <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
        <li data-target="#carousel-example-generic" data-slide-to="4"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="public/front_estilos/img/intro-carousel/banner-1.jpg" alt="banner-1.jpg">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="public/front_estilos/img/intro-carousel/banner-2.jpg" alt="banner-2.jpg">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="public/front_estilos/img/intro-carousel/banner-3.jpg" alt="banner-3.jpg">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="public/front_estilos/img/intro-carousel/banner-4.jpg" alt="banner-4.jpg">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="public/front_estilos/img/intro-carousel/banner-5.jpg" alt="banner-5.jpg">
        </div>
      </div>
    </div>
  </section><!-- #intro -->

  <main id="main">


    <!--==========================
      Section
    ============================-->
    <section style="background: #EAEAEA">
      <div class="container" >
        <div class="row">
          <div class="col-md-6">
            <img src="public/front_estilos/img/wpp/imagen-wpp1.png" alt="imagen-wpp1.png" style="width: 100%;height: auto;">
          </div>

          <div class="col-md-6 overlay d-none d-sm-block d-sm-none d-md-block" style="margin-top: 75px;">
            <center>
              <h1 style="font-family: 'Raleway'">
                <strong>
                  <font style="color:#00B3BA;font-weight: 900">¿Quiénes</font>
                  <font style="color:#00667E;font-weight: 900"> somos?</font>
                </strong>
              </h1>
              <h5 style="color:gray;font-family: 'Raleway'">
                World Pets Peru es un servicio profesional de registro de mascotas, el cual permite conocer el estado actual de la poblacion canina, felina u otros engreídos de casa, pudiendo de esta manera trabajar sobre bases sólidas en su control. Proporcionamos servicios a todo el Perú gracias a nuestros más de 100 convenios. Además ofrecemos el registro de mascotas individuales como los documentos de mascotas para toda su camada.
              </h5>
              <a class="btn" style="width: 200px;padding: 10px;background: #00B3BA;color:#fff;border-radius: 30px;" 
                data-toggle="modal" data-target="#videoModal" data-theVideo="https://www.youtube-nocookie.com/embed/xuYTeSjPzi4"
              ><strong>Ver video</strong></a>
            </center>
          </div>
          <div class="d-block d-sm-none" style="padding: 10px;">
             <center>
              <h1 style="font-family: 'Raleway'">
                <strong>
                  <font style="color:#00B3BA">¿Quiénes</font>
                  <font style="color:#00667E"> somos?</font>
                </strong>
              </h1>
              <h5 style="color:gray;font-family: 'Raleway'">
                World Pets Peru es un servicio profesional de registro de mascotas, el cual permite conocer el estado actual de la poblacion canina, felina u otros engreídos de casa, pudiendo de esta manera trabajar sobre bases sólidas en su control. Proporcionamos servicios a todo el Perú gracias a nuestros más de 100 convenios. Además ofrecemos el registro de mascotas individuales como los documentos de mascotas para toda su camada.
              </h5>
               <a class="btn" style="width: 200px;padding: 10px;background: #00B3BA;color:#fff;border-radius: 30px;"><strong>Ver video</strong></a>
            </center>
          </div>
        </div>
      </div>
    </section><!-- #Section -->

    <!--==========================
      Section
    ============================-->
    <section style="background: url(public/front_estilos/img/wpp/banner-solicite.jpg) center no-repeat ; height: auto;background-size: 100% 100%;">
      <!--<img src="front_estilos/img/wpp/banner-solicite.jpg" alt="banner-solicite.jpg" style="width: 100%;height: 100%;">-->
      <div class="container" style="padding: 40px">
        <center>
          <h1 style="color:#fff;font-family: 'Raleway'">
            <strong>Solicite</strong>
          </h1>
          <h6 style="color:#fff;font-family: 'Raleway'">
            El sistema de identificación RUMP <br>
            (DNI + Chapita identificadora personalizada)
          </h6>
          <h6 style="color:#fff;font-family: 'Raleway'">
            <strong>
              Registramos todo tipo de animales domésticos; <br>
              pensamos en su tranquilidad y resguardo.
            </strong>
          </h6>
           <a class="btn" href="#" style="width: 200px;padding: 10px;background: #00B3BA;color:#fff;border-radius: 30px;font-family: 'Raleway'"><strong>Únete al equipo</strong></a>
        </center>
        
      </div>
    </section><!-- #Section -->

    <!--==========================
      Section
    ============================-->
    <section style="background: #EAEAEA">
      <div class="container" >
        <div class="row">
          <div class="col-md-6 overlay d-none d-sm-block d-sm-none d-md-block" style="margin-top: 120px;">
            <center>
              <h1 style="font-family: 'Raleway';font-size: 3.8rem !important;font-weight: 1000;">
                <strong>
                  <font style="color:#00B3BA">Dale la</font> 
                  <font style="color:#00667E">identidad </font>
                  <br>
                  <font style="color:#FBBA33">que se merece</font>
                </strong>
              </h1>
              <h5 style="color:gray;font-family: 'Raleway'" ALIGN="center">
                Solicite los documentos para toda <br>
                su camada desde cualquier dispositivo.
              </h5>
            </center>
          </div>
          <div class="col-md-6">
            <img src="public/front_estilos/img/wpp/imagen-wpp2.png" alt="imagen-wpp2.png" style="width: 100%;height: auto;">
          </div>

          <div class="d-block d-sm-none" style="padding: 10px;">
             <center>
              <h1 style="font-family: 'Raleway';font-size: 4.0rem !important;font-weight: 1000;">
                <strong>
                  <font style="color:#00B3BA">Dale la</font> 
                  <font style="color:#00667E">identidad </font>
                  <br>
                  <font style="color:#FBBA33">que se merece</font>
                </strong>
              </h1>
              <h5 style="color:gray;font-family: 'Raleway'" ALIGN="center">
                Solicite los documentos para toda <br>
                su camada desde cualquier dispositivo.
              </h5>
            </center>
          </div>
        </div>
      </div>
    </section><!-- #Section -->

     
    <!--==========================
      Section
    ============================-->
    <section style="background: #00B3BA">
      <div class="container" >
        <br>
        <br>
        <center>
          <h1 style="color:#fff;font-family: 'Raleway'">
            <strong>Obtén el sistema de identificación RUMP</strong>
          </h1>
          <h2 style="color:#fff;font-family: 'Raleway'">
            (Tu Chapita Identificadora + Tu DNI)
          </h2>
         
        </center>
        <img src="public/front_estilos/img/index/30-soles.png" alt="35-soles.png" style="width: 100%;height: auto;">
        
      </div>
    </section><!-- #Section -->
    <sextion style="margin-top:30px; margin-bottom:10px;">
        @include('layouts.map')
    </sextion>
    
    
    <!--==========================
      Section
    ============================-->
    <section style="background: #00667E">
      <div class="container" style="padding: 50px;">
        <center>
          <a class="btn" href="#" style="width: 200px;padding: 10px;background: #FBBA33;color:#5F1A0B;border-radius: 30px;font-family: 'Raleway'">
           <strong>Registra a tu mascota</strong>
          </a>
        </center>
      </div>
    </section><!-- #Section -->


  </main>

  <!-- Modal -->
  <div class="modal fade" id="videoModal" tabindex="-1" role="dialog" aria-labelledby="videoModal" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content" style="background-color: transparent;background-clip: none;border: none">
              <div class="modal-body">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <div>
                      <iframe width="100%" height="350" src=""></iframe>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!--==========================
    Footer
  ============================-->
  <footer id="footer"  style="background: url(public/front_estilos/img/footer/fondo-footer.png) center no-repeat ;background-size: 100% 100%;">
    <div class="container" style="margin-top: 40px; ">
      <div class="row">
        <div class="col-md-4">
          <center>
            <h3 style="color: #fff;font-family: 'Raleway'"><strong>Contáctenos</strong></h3>
            <h6 style="color: #5F1A0B;font-family: 'Raleway'">
              <strong>
                World Pets Perú SAC / Av. Universitaria 6116 <br>
                3er Piso - Los Olivos. <br> <br>
                worldpetsperú.2210@gmail.com <br>
                992975292 / (01)7316407<br>
              </strong>
            </h6>
          </center>
        </div>
        <div class="col-md-4" style="border-right: 2px solid #fff;border-left: 2px solid #fff">
          <center>
            <h3 style="color: #fff;font-family: 'Raleway'"><strong>Mascotas<br>Registradas</strong></h3>
            <h6 style="color: #5F1A0B;font-family: 'Raleway'">
              <strong>
                <label id="lbl_total_mascota"></label>
              </strong>
            </h6>
          </center>
        </div>
        <div class="col-md-4">
          <div class="row">
            <div class="col-md-8">
              <center>
                <h3 style="color: #fff;font-family: 'Raleway'"><strong>Descárgate la<br>app gratis</strong></h3>
              </center>
              <img src="public/front_estilos/img/footer/appstore.png" alt="appstore.png" style="padding: 3px;"> 
              <img src="public/front_estilos/img/footer/googleplay.png" alt="googleplay.png" style="padding: 3px;">
            </div>
            <div class="col-md-4">
              <img src="public/front_estilos/img/footer/phone.png" alt="phone.png">
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="padding: 10px;">
        <a href="https://www.facebook.com/worldpetsperurump/" target="_blank">
          <img src="public/front_estilos/img/footer/facebook.png" alt="facebook.png" style="padding: 7px;">
        </a>
        <a href="https://www.instagram.com/worldpetsperu/" target="_blank">
          <img src="public/front_estilos/img/footer/instagram.png" alt="instagram.png" style="padding: 7px;">
        </a>
        <a href="https://www.youtube.com/channel/UCwFDOixpwmaCz6g0uFoaACg" target="_blank">
          <img src="public/front_estilos/img/footer/youtube.png" alt="youtube.png" style="padding: 7px;">
        </a>
        <h6 style="margin-top: 30px; color: #5F1A0B;font-family: 'Raleway'">
          <strong>
            &copy; 2019. Todos los Derechos Reservados.
          </strong>
        </h6>
      </div>
    </div>
  </footer><!-- #footer -->

  <!-- JavaScript Libraries -->
    <script src="public/front_estilos/lib/jquery/jquery.min.js"></script>
    <script src="public/front_estilos/lib/jquery/jquery-migrate.min.js"></script>
    <script src="public/front_estilos/lib/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="public/front_estilos/lib/easing/easing.min.js"></script>
    <script src="public/front_estilos/lib/superfish/hoverIntent.js"></script>
    <script src="public/front_estilos/lib/superfish/superfish.min.js"></script>
    <script src="public/front_estilos/lib/wow/wow.min.js"></script>
    <script src="public/front_estilos/lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="public/front_estilos/lib/magnific-popup/magnific-popup.min.js"></script>
    <script src="public/front_estilos/lib/sticky/sticky.js"></script>
    <script src="public/front_estilos/js/main.js"></script>
    <script src="public/js/vista/index.js"></script>
</body>
</html>
