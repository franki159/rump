<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="PRESENTACION._default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" type="image/png" href="img/icons/favicon.ico" />
    <!-- Bootstrap core CSS -->
    <%--<link href="css/components.css?v=20180828" rel="stylesheet" />--%>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <%--<link href="css/bootstrap-reset.css" rel="stylesheet" />--%>
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/font-awesome/css/font-awesome4.6.css" rel="stylesheet" />
    <link href="assets/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <%--<link href="assets/font-awesome/css/style.css" rel="stylesheet" />--%>
    <link href="assets/font-awesome/css/style-responsive.css" rel="stylesheet" />
    <!-- Estilos personalizados para esta plantilla -->
    <!-- Select 2 filtro-->
    <link href="assets/select2/css/select2.css" rel="stylesheet" />
    <link href="css/style.css?v=300420191812" rel="stylesheet" />
    <link href="css/style-responsive.css?v=300420191812" rel="stylesheet" />
    <!-- Estilos personalizado -->
    <link href="css/stylePropio.css?v=300420191812" rel="stylesheet" />
    <!-- Estilos de animación -->
    <link href="css/vendor-72d47c3353.css" rel="stylesheet" />
</head>
<body>
    <div id="mySidenav" class="sidenav">
        <div class="modal-header-sidebar">
            <button type="button" class="close" onclick="closeNav()">&times;</button>
            <h4 class="modal-title">Opciones</h4>
        </div>
        <div class="modal-body">
            <div class="form-group">
                <label><strong>Comprobante</strong></label>
                <select class="form-control" id="cmbComprobante">
                </select>
            </div>
        </div>
    </div>
    <section id="container" class="">
        <header class="header white-bg">
            <div class="sidebar-toggle-box">
                <div data-original-title="Mostrar o Esconder Menu" data-placement="right" class="icon-reorder tooltips"></div>
            </div>

            <a href="#" class="logo">H<span class="nom-empresa-small"></span></a>

            <div class="top-nav">
                <ul class="nav pull-right top-menu">


                    <li class="hidden-phone" style="border: 1px solid #fff; padding: 5px; display: none;">
                        <strong style="font-size: 18px; color: #fff;">Fecha: <span id="horaSistema">12:45 PM</span></strong>
                    </li>

                    <!-- user login dropdown start-->
                    <li class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <img alt="" src="img/av-hombre.png" style="width: 35px;"/>
                            <span class="username hidden-phone"></span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu pull-right">
                            <div class="log-arrow-up"></div>
                            <li class="logoutLastChild"><a href="https://worldpetsperu.com/usuario/cerrarSesion" id="cerrarSesion"><i class="icon-key"></i> Cerrar Sesión</a></li>
                        </ul>
                    </li>
                    <!-- user login dropdown end -->
                </ul>
            </div>

            <div class="nav notify-row pull-right hide">
                <!--  notification start -->
                <ul class="nav top-menu  ">
                    <!-- notification dropdown start-->
                    <li id="header_notification_bar" class="dropdown">
                        <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <i class="icon-bell"></i>
                            <span class="badge bg-warning">1</span>
                        </a>
                        <ul class="dropdown-menu extended notification pull-right">
                            <div class="log-arrow-up"></div>
                            <li class="headerNotific">Notificaciones</li>
                            <li>
                                <a href="#!/page/operacion/alerta">
                                    <i class="icon-briefcase h4"></i> Reservas y Atenciones por vencer (<span class="cantidadNotificaciones">0</span>)
                                </a>
                            </li>
                            <li><a href="#" class="footerNotific">Ver Todas</a></li>
                        </ul>
                    </li>
                    <!-- notification dropdown end -->
                    <li class="dropdown">
                        <a class='btn blue-sharp btn-circle btn-outline btn-sm' onclick="openNav()" style="margin-right: 5px;">
                            <i class="icon-cog"></i>
                        </a>
                    </li>
                    <li class="hidden-phone hidden-xs" style="padding: 5px; display: none;">
                        <strong style="font-size: 15px; color: #fff"><span id="companyLogged">12:45 PM</span></strong>
                    </li>
                </ul>
                <!--  notification end -->
            </div>
        </header>
        <!--sidebar star-->
        <aside>
            <div id="sidebar" class="nav-collapse">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion">
                    <li>
                        <a href="https://worldpetsperu.com">
                            <i class="icon-home"></i>
                            <span>Inicio</span>
                        </a>
                    </li>
                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <!--main content start-->
        <section id="main-content">
            <!-- Modal para Carga inicio-->
            <%--<div id="pleaseWaitDialog" style="z-index: 6000;" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog modal-second-level" style='width: 90%;'>
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header" style='padding-bottom: 0px;'>
                            <h1 id="tituloCargaBar">Procesando...</h1>
                        </div>
                        <div class="modal-body">
                            <div class="progress">
                                <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>--%>
            <div id="pleaseWaitDialog" style="z-index: 6000;" class="modal fade" data-backdrop="static" data-keyboard="false"  role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header" style="border-bottom: 0px;">
                            <div style="float: left; padding: 10px;">
                                <h4 class="modal-title">Por favor espere ...</h4>
                            </div>
                            <div style="float: right;">
                                <div class="loadersmall"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal para Carga fin-->
            <!-- Modal para confirmaciones inicio-->
            <div class="modal fade" style="z-index: 1051;" id="modalConfirm" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-confirm">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title"><i class="icon-question-sign"></i> Confirmar</h4>
                        </div>
                        <div class="modal-body">
                            <p id="txtContenido">Seguro que desea?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btnAceptar" onclick="fc_aceptar_confirmacion();" class="btn btn-primary btn-sm">Aceptar</button>
                            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Modal para confirmaciones fin-->
            <!-- page start-->
            <section class="wrapper site-min-height">
                Page content goes here
                
            </section>
            <!-- page end-->
        </section>
        <!--main content end-->
        <!--footer start-->
        <footer class="site-footer" tabindex="4999">
            <div class="text-center">
                2019 &copy; World Pets Perú by <a href="http://charpe.somee.com/"><strong>Charpe</strong>
                    <img src="img/charpe.png" alt="Logo Charpe Enterprise" /></a>.
                <a href="#" class="go-top">
                    <i class="icon-angle-up"></i>
                </a>
            </div>
        </footer>
    </section>

    <!-- js placed at the end of the document so the pages load faster -->
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/jquery-migrate-1.2.1.js" type="text/javascript"></script>
    <script src="js/all/jquery.history.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/all/jquery.dcjqaccordion.2.7.js" type="text/javascript"></script>
    <script src="js/all/jquery.scrollTo.min.js" type="text/javascript"></script>
    <script src="js/all/jquery.nicescroll.js" type="text/javascript"></script>
    <script src="js/all/jquery.base64.min.js" type="text/javascript"></script>
    <script src="assets/bootstrap-fileupload/bootstrap-fileupload.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js" type="text/javascript"></script>
    <script src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" type="text/javascript"></script>
    <script src="assets/bootstrap-inputmask/bootstrap-inputmask.min.js" type="text/javascript"></script>
    <!--common script for all pages-->

    <script src="js/default.js?v=300420191812" type="text/javascript"></script>
    <script src="js/all/date.js" type="text/javascript"></script>
    <!-- Select 2 filtro-->
    <script src="assets/select2/js/select2.full.js"></script>
    <!-- Graficos -->
    <%--<script src="page/reporte/amcharts/amcharts.js"></script>
    <script src="page/reporte/amcharts/serial.js" type="text/javascript"></script>
    <script src="page/reporte/amcharts/themes/dark.js" type="text/javascript"></script>--%>
    <div class="modal-backdrop fade in backdrop-fcp" style="display: none;"></div>

    <script src="js/general.js"></script>
</body>
</html>
