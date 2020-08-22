<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="PRESENTACION._default" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>World Pets Perú</title>
    <link rel="shortcut icon" type="image/png" href="img/favicon.png" />
    <!-- Datetimepicker-->
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />
    <!-- Select 2 filtro-->
    <link href="assets/select2/css/select2.css" rel="stylesheet" />
    
    <!-- Custom fonts for this template-->
    <link href="templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="templateSoft/css/sb-admin-2.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet">

    <link href="css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
</head>

<body id="page-top">

    <!-- Div carga -->
    <div id="page-loader">
        <img style="-webkit-user-select: none; margin: auto;" src="img/loader-pet.gif"></div>
    <%--<div id="preloader">
        <div class="loader"></div>
    </div>--%>

    <!-- Modal para confirmaciones inicio-->
    <div class="modal fade" style="z-index: 1051;" id="modalConfirm" role="dialog">
        <div class="modal-dialog" role="document">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-confirm">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"><i class="icon-question-sign"></i>Confirmar</h4>
                </div>
                <div class="modal-body">
                    <p id="txtContenido">Seguro que desea?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnAceptar" onclick="fc_aceptar_confirmacion();" class="btn btn-primary btn-sm">Aceptar</button>
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cancelar</button>
                </div>
            </div>

        </div>
    </div>
    <!-- Modal para confirmaciones fin-->


    <!-- Modal para notificaciones de eventos inicio-->
    <div class="modal fade" style="z-index: 1052;" id="modalEventoNotifica" role="dialog">
        <div class="modal-dialog" role="document">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-confirm">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"><i class="icon-question-sign"></i>Eventos en el día</h4>
                </div>
                <div class="modal-body">
                    <div class="alert alert-info">
                        <strong>Blanquita [BAÑO]</strong> Baño semanal<br />
                        <div class="btn-group">
                            <button class="btn btn-danger btn-xs">Cancelado</button>
                            <button class="btn btn-success btn-xs">Culminado</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal para notificaciones de eventos fin-->

    <!-- Modal para seleccion de pagos inicio-->
    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" id="modalPagoGen" class="modal fade">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Seleccione una opción</h4>
                    <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
                </div>
                <div class="modal-body text-center">
                    <div class="row serv-msc">
                        <div class="col-md-12">   
                            <ul class="nav nav-tabs" role="tablist">       
                                <li role="presentation" class="nav-item">           
                                    <a class="nav-link active" id="lima-tab" data-toggle="tab" href="#lima" role="tab" aria-controls="dato" aria-selected="true">Lima</a>     
                                </li>       
                                <li class="nav-item">           
                                    <a class="nav-link" id="limprov-tab" data-toggle="tab" href="#limprov" role="tab" aria-controls="dato" aria-selected="true">Lima provincia</a>       
                                </li>       
                                <li class="nav-item">           
                                    <a class="nav-link" id="prov-tab" data-toggle="tab" href="#prov" role="tab" aria-controls="dato" aria-selected="true">Provincias</a>
                                </li>
                            </ul>   
                            <div class="tab-content">       
                                <div role="tabpanel" class="tab-pane fade active show" id="lima">           
                                    <div class="div-leyenda-fcp leyend-lim-txt">               
                                        <b class="text-danger">Envío a todo lima metropolitana y la Provincia constitucional del Callao. Costo S/. 5.50</b>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 1</h4>
                                            <img src="img/mercadopago/mercadopago-qr.png" style="margin: 0px;">
                                        </div>
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 2</h4>
                                            <br>
                                            <img src="img/mercadopago/tarjetas_pago.png" style="margin: 0px;">
                                            <img src="img/mercadopago/pago-efectivo.png" style="margin: 0px;">
                                            <br>                                            
                                            <div class="btn-lim-1">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-4c834873-7417-4530-99b1-5b324bed501d"></script>
                                            </div>
                                            <div class="btn-lim-2">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-2ea90f4a-91c5-42b6-96c0-bb0f501b17ee"></script>
                                            </div>
                                            <div class="btn-lim-3">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-2ea90f4a-91c5-42b6-96c0-bb0f501b17ee"></script>
                                            </div>
                                            <div class="btn-lim-5">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-3d15a9f4-0a9d-490c-a5a7-e6043c4aacc4"></script>
                                            </div>
                                            <div class="btn-lim-6">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-2ea90f4a-91c5-42b6-96c0-bb0f501b17ee"></script>
                                            </div>
                                            <img alt="Mercado Pago" class="n3VNCb" src="https://marketplace.magento.com/media/catalog/product/cache/603f9e977a3dc35468ba3ae89ddfbb29/m/e/mercadopago_3.png" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd,gvK6lb;" style="width: 100px; height: 100px; margin: 0px;">
                                        </div>
                                    </div>
                                </div>       
                                <div class="tab-pane fade panel-body" id="limprov">           
                                    <div class="div-leyenda-fcp leyend-lprov-txt">               
                                        <b class="text-danger">Envio a Ica, Pisco, Huaral y Huacho. Costo S/. 10.00</b>           
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 1</h4>
                                            <img src="img/mercadopago/mercadopago-qr.png" style="margin: 0px;">
                                        </div>
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 2</h4>
                                            <br>
                                            <img src="img/mercadopago/tarjetas_pago.png" style="margin: 0px;">
                                            <img src="img/mercadopago/pago-efectivo.png" style="margin: 0px;">
                                            <br>
                                            <div class="btn-lprov-1">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-9f3c0d22-19c5-4dda-836e-d4518e46b75b"></script>       
                                            </div>
                                            <div class="btn-lprov-2">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-355f1616-7a7a-45e1-9948-3d474f35ae63"></script>       
                                            </div>
                                            <div class="btn-lprov-3">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-355f1616-7a7a-45e1-9948-3d474f35ae63"></script>       
                                            </div>
                                            <div class="btn-lprov-5">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-71d8d983-cf68-4c42-b487-737f6ca73e61"></script>       
                                            </div>
                                            <div class="btn-lprov-6">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-355f1616-7a7a-45e1-9948-3d474f35ae63"></script>       
                                            </div>
                                            <img alt="Mercado Pago" class="n3VNCb" src="https://marketplace.magento.com/media/catalog/product/cache/603f9e977a3dc35468ba3ae89ddfbb29/m/e/mercadopago_3.png" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd,gvK6lb;" style="width: 100px; height: 100px; margin: 0px;">
                                        </div>
                                    </div>
                                </div>       
                                <div class="tab-pane fade panel-body" id="prov">  
                                    <div class="div-leyenda-fcp leyend-prov-txt">               
                                        <b class="text-danger">Envio a todo Provincias. Costo S/. 12.00</b>       
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 1</h4>
                                            <img src="img/mercadopago/mercadopago-qr.png" style="margin: 0px;">
                                        </div>
                                        <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                            <h4>Opcion 2</h4>
                                            <br>
                                            <img src="img/mercadopago/tarjetas_pago.png" style="margin: 0px;">
                                            <img src="img/mercadopago/pago-efectivo.png" style="margin: 0px;">
                                            <br>
                                            <div class="btn-prov-1">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-36c907bc-8dd7-4717-9504-c2d264df81e5"></script>       
                                            </div>
                                            <div class="btn-prov-2">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-af83c099-126c-4bfb-abfa-328571928365"></script>
                                            </div>
                                            <div class="btn-prov-3">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-af83c099-126c-4bfb-abfa-328571928365"></script>
                                            </div>
                                            <div class="btn-prov-5">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-292987e5-be5e-490e-83c0-7915906d6651"></script>
                                            </div>
                                            <div class="btn-prov-6">
                                                <script src="https://www.mercadopago.com.pe/integrations/v1/web-payment-checkout.js" data-preference-id="334567666-af83c099-126c-4bfb-abfa-328571928365"></script>
                                            </div>
                                            <img alt="Mercado Pago" class="n3VNCb" src="https://marketplace.magento.com/media/catalog/product/cache/603f9e977a3dc35468ba3ae89ddfbb29/m/e/mercadopago_3.png" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd,gvK6lb;" style="width: 100px; height: 100px; margin: 0px;">
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal para seleccion de pagos fin-->

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="./">
                <img src="img/worldpetsperu_logo.png" style="width: 100px;" />
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <i class="fas fa-user-circle" style="font-size: 18px;"></i>
                    <span>Mi cuenta</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item menu-dinamic"></li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Cerrar) -->
            <div class="text-center d-block d-md-none">
                <button class="rounded-circle border-0" id="sidebarCerrar"></button>
            </div>
            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>            
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Nav Item - Carrito -->
                        <li class="nav-item dropdown no-arrow mx-1" id="bodyCarbuy" style="font-size: 16px;">
                          <a class="nav-link dropdown-toggle" href="./carritoRUMP" role="button">
                            <i class="fas fa-shopping-cart"></i>
                            <span class="badge badge-danger badge-counter">0</span>
                          </a>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 name_user">Propietario</span>
                                <img class="img-profile rounded-circle img-user-rump" src="#" onerror="this.src='img/avatarUser.png';">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item name_perfil" href="#">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400 name_perfil"></i>
                                    Profile
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-toggle="modal" id="logoutModal">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Cerrar Sesión
                                </a>
                            </div>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="wrapper container-fluid" style="overflow-x: auto;">
                    Page content goes here
                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; World Pets Perú <%: DateTime.Now.Year %> by <a href="http://charpetechnology.com/"><strong>Charpe</strong>
                            <img src="img/charpe.png" alt="Logo Charpe Enterprise" /></a>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Bootstrap core JavaScript-->
    <script src="templateSoft/vendor/jquery/jquery.min.js"></script>
    <%--<script src="js/all/jquery.js" type="text/javascript"></script>--%>
    <script src="js/all/jquery-migrate-1.2.1.js" type="text/javascript"></script>
    <script src="js/all/jquery.history.js"></script>
    <script src="templateSoft/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="js/all/jquery.base64.min.js"></script>
    <!-- Datetimepicker-->
    <script src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
    <script src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="templateSoft/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="templateSoft/js/sb-admin-2.js"></script>

    <script src="js/general.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>
    <script src="js/default.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" type="text/javascript"></script>
    <script src="js/all/date.js" type="text/javascript"></script>
    <!-- Select 2 filtro-->
    <script src="assets/select2/js/select2.full.js"></script>
</body>
</html>
