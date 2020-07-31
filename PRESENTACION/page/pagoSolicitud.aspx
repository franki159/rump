<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pagoSolicitud.aspx.cs" Inherits="PRESENTACION.page.pagoSolicitud" %>

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
    <link href="../assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="../assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />
    <!-- Select 2 filtro-->
    <link href="../assets/select2/css/select2.css" rel="stylesheet" />
    
    <!-- Custom fonts for this template-->
    <link href="../templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="../templateSoft/css/sb-admin-2.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet">

    <link href="../css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />

    <link href="../assets/multisteps/style.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
    <style>
        html, body, #wrapper {
            height:100%;
        }
    </style>
</head>

<body id="page-top">
    <div id="page-loader">
        <img style="-webkit-user-select: none; margin: auto;" src="../img/loader-pet.gif">
    </div>
    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="./">
                        <img src="../img/worldpetsperu_logo.png" style="width: 80px;">
                    </a>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600 name_user">Propietario</span>
                                <img class="img-profile rounded-circle img-user-rump" src="#" onerror="this.src='../img/avatarUser.png';">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                <a class="dropdown-item name_perfil" href="./Sistema">
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
                <div class="container-fluid" style="overflow-x: auto;">
                    <div class="row">
    <div class="col-md-12">    
        <div class="div-leyenda-fcp leyend-lim-txt">               
            <b class='text-danger'><p>(*) Recuerde enviar el comprobante al whatsapp 992975292 para poder verificar el pago.</p></b>
        </div>
        <div id="errorDiv"></div>
        
        <div class="row">
        <div class="col-md-12">
          <div class="overflow-hidden" style="padding: 10px 0px 40px;min-height: 400px;">
              <!--multisteps-form-->
              <div class="multisteps-form">
                <!--progress bar-->
                <div class="row">
                  <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
                    <div class="multisteps-form__progress">
                      <button class="multisteps-form__progress-btn js-active" type="button" title="User Info">Recibe</button>
                      <button class="multisteps-form__progress-btn" type="button" title="Address">Despacho</button>
                      <button class="multisteps-form__progress-btn" type="button" title="Order Info">Pago</button>
                    </div>
                  </div>
                </div>
                <!--form panels-->
                <div class="row">
                  <div class="col-md-8">
                    <div class="multisteps-form__form">
                      <!--single form panel-->
                      <div class="multisteps-form__panel shadow p-4 rounded bg-white js-active" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">¿Quién recibe?</h3>
                        <div class="multisteps-form__content">
                          <div class="form-row mt-4">
                            <div class="col-12 col-sm-6">
                                <label>Nombres <strong class="text-danger">(*)</strong></label>
                              <input class="multisteps-form__input form-control" id="txt-nom" type="text" placeholder="Nombres"/>
                            </div>
                            <div class="col-12 col-sm-6 mt-4 mt-sm-0">
                                <label>Apellidos <strong class="text-danger">(*)</strong></label>
                              <input class="multisteps-form__input form-control" id="txt-ape" type="text" placeholder="Apellidos"/>
                            </div>
                          </div>
                          <div class="form-row mt-4">
                            <div class="col-12 col-sm-6">
                                <label>Telefono <strong class="text-danger">(*)</strong></label>
                              <input class="multisteps-form__input form-control" id="txt-tel" type="text" placeholder="Telefono"/>
                            </div>
                            <div class="col-12 col-sm-6 mt-4 mt-sm-0">
                                <label>Email</label>
                              <input class="multisteps-form__input form-control" id="txt-email" type="email" placeholder="Email"/>
                            </div>
                          </div>
                          <div class="button-row d-flex mt-4">
                            <button class="btn btn-primary ml-auto js-btn-next" type="button" title="Next" id="btn-recibe">Siguiente >></button>
                          </div>
                        </div>
                      </div>
                      <!--single form panel-->
                      <div class="multisteps-form__panel shadow p-4 rounded bg-white" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">¿A dónde lo llevamos?</h3>
                        <div class="multisteps-form__content">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Departamento</label>
                                                <select id="sel_departamento" class="form-control sel_autocomplete" style="width: 100%;">
                                                    <option></option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Provincia</label>
                                                <select id="sel_provincia" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label>Distrito</label>
                                                <select id="sel_distrito" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Dirección</label>
                                                <input id="txt_direccion" placeholder="Dirección/Departamento/Interior" class="form-control" type="text" maxlength="200" />
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Referencia (avenidas o calles principales)</label>
                                                <textarea id="txt_referencia" placeholder="Avenidas o calles principales..." maxlength="500" class="form-control" rows="3"></textarea>
                                            </div>
                                        </div>
                                    </div>
                          <div class="button-row d-flex mt-4">
                            <button class="btn btn-primary js-btn-prev" type="button" title="Prev"><< Atras</button>
                            <button class="btn btn-primary ml-auto js-btn-next" type="button" title="Next" id="btn-domicilio">Siguiente >></button>
                          </div>
                        </div>
                      </div>
                      <!--single form panel-->
                      <div class="multisteps-form__panel shadow p-4 rounded bg-white" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">Elige tu medio de pago</h3>
                        <div class="multisteps-form__content">
                                            <div class="row text-center">
                                                <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                                    <h4><br>Opcion 1</h4>
                                                    <img src="img/mercadopago/mercadopago-qr.png" style="margin: 0px;">
                                                </div>
                                                <div class="col-md-6" style="border: 1px solid #9b9da9;border-radius: 20px;">
                                                    <h4><br>Opcion 2</h4>
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


                          <div class="button-row d-flex mt-4">
                            <button class="btn btn-primary js-btn-prev" type="button" title="Prev"><< Atras</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <form class="multisteps-form__form">
                      <!--single form panel-->
                      <div class="shadow p-4 rounded bg-white js-active" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">Resumen de Orden</h3>
                        <div class="multisteps-form__content">
                          <div class="form-row mt-4">
                            <div class="col-12">
                                <p><span class="dsc-prod-pag text-primary"></span></p>
                                <p><b>Costo de servicio:</b><span class="dsc-pre-pag" style="float:right"></span></p>
                                <p><b>Costo de envío:</b><span class="dsc-env-pag" style="float:right">-</span></p>
                                <p><b>Total:<span class="dsc-tot-pag" style="float:right"></span></b></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </div>


    </div>
</div>


                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->
        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->

    <!-- Bootstrap core JavaScript-->
    <script src="../templateSoft/vendor/jquery/jquery.min.js"></script>
    <%--<script src="js/all/jquery.js" type="text/javascript"></script>--%>
    <script src="../js/all/jquery-migrate-1.2.1.js" type="text/javascript"></script>
    <script src="../js/all/jquery.history.js"></script>
    <script src="../templateSoft/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Datetimepicker-->
    <script src="../assets/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
    <script src="../assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="../templateSoft/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="../templateSoft/js/sb-admin-2.js"></script>

    <script src="../js/general.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>
    
    <script src="../js/all/date.js" type="text/javascript"></script>
    <!-- Select 2 filtro-->
    <script src="../assets/select2/js/select2.full.js"></script>
    <script src="../assets/multisteps/script.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>

<script type="text/javascript">
    $.getScript("../js/page/pagoSolicitud.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (pagoSolicitud.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>

    </body>
</html>
