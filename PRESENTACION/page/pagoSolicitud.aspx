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
    <link href="../assets/multisteps/style.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
    <link href="../templateSoft/css/sb-admin-2.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet">

    <link href="../css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
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
        <div id="errorDiv"></div>
        
        <div class="row">
        <div class="col-md-12">
          <div  style="padding: 10px 0px 40px;min-height: 400px;">
              <!--multisteps-form-->
              <div class="multisteps-form">
                <!--progress bar-->
                <div class="row">
                  <div class="col-12 col-lg-8 ml-auto mr-auto mb-4">
                    <div class="multisteps-form__progress">
                      <button class="multisteps-form__progress-btn js-active" type="button" title="User Info">BOLSA DE COMPRA</button>
                      <button class="multisteps-form__progress-btn" type="button" title="Address">DESPACHO</button>
                      <button class="multisteps-form__progress-btn" type="button" title="Order Info">PAGO</button>
                    </div>
                  </div>
                </div>
                <!--form panels-->
                <div class="row">
                  <div class="col-md-8">
                    <div class="multisteps-form__form">
                      <!--single form panel-->
                      <div class="multisteps-form__panel p-4 bg-white js-active card shadow position-absolute" data-animation="scaleIn">
                          <div class="body-items">

                          </div>
                          <div class="button-row d-flex">
                            <button class="btn btn-primary ml-auto js-btn-next" type="button" title="Next" id="btn-carrito">
                                Ir a comprar
                            </button>
                          </div>
                      </div>
                      <!--single form panel-->
                      <div class="multisteps-form__panel p-4 bg-white card shadow position-absolute" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">¿Quién recibe?</h3>
                        <div class="multisteps-form__content">
                          <div class="form-row mt-4">
                            <div class="col-12 col-sm-6">
                                <label>Nombres</label>
                              <input class="multisteps-form__input form-control" id="txt-nom" type="text" placeholder="Nombres"/>
                            </div>
                            <div class="col-12 col-sm-6 mt-4 mt-sm-0">
                                <label>Apellidos</label>
                              <input class="multisteps-form__input form-control" id="txt-ape" type="text" placeholder="Apellidos"/>
                            </div>
                          </div>
                          <div class="form-row mt-4">
                            <div class="col-12 col-sm-6">
                                <label>Telefono</label>
                              <input class="multisteps-form__input form-control integerFCP" maxlength="15" id="txt-tel" type="text" placeholder="Telefono"/>
                            </div>
                            <div class="col-12 col-sm-6 mt-4 mt-sm-0">
                                <label>DNI</label>
                              <input class="multisteps-form__input form-control integerFCP" maxlength="15" id="txt-dni" type="text" placeholder="DNI"/>
                            </div>
                          </div>
                        </div>
                          <br />
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
                      <div class="multisteps-form__panel p-4 bg-white card shadow position-absolute" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">Elige tu medio de pago</h3>
                        <div class="multisteps-form__content">
                            <div class="">
                              <div class="px-4 py-4 border btn-light btn-card-payment">
                                  <div class="row">
                                       <div class="col-0">
                                          <i class="fas fa-credit-card text-primary h2"></i>
                                      </div>
                                      <div class="col-10  my-auto">
                                          <div class="col-12">
                                              <span>Tarjeta</span>
                                          </div>
                                          <div class="col-12 col-12 py-1">
                                              <span class="text-gray-500 h5">Débito o crédito</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="px-4 py-4 border border-top-0  btn-light btn-money-payment">
                                  <div class="row">
                                       <div class="col-0">
                                          <i class="far fa-money-bill-alt text-primary h2"></i>
                                      </div>
                                      <div class="col-10  my-auto">
                                          <div class="col-12">
                                              <span>Efectivo en agentes</span>
                                          </div>
                                          <div class="col-12 col-12 py-1">
                                              <span class="text-gray-500 h5">El pago se acreditará en 1 día.</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              <div class="px-4 py-4 border border-top-0 btn-light btn-bank-payment">
                                  <div class="row">
                                       <div class="col-0 text-primary">
                                          <i class="fas fa-university" style="font-size: 30px;"></i>
                                      </div>
                                      <div class="col-10  my-auto">
                                          <div class="col-12">
                                              <span>Banca por internet</span>
                                          </div>
                                          <div class="col-12 col-12 py-1">
                                              <span class="text-gray-500 h5">El pago se acreditará en 1 día.</span>
                                          </div>
                                      </div>
                                  </div>
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
                      <div class="p-4 bg-white js-active card shadow" data-animation="scaleIn">
                        <h3 class="multisteps-form__title">Resumen de Orden</h3>
                        <div class="multisteps-form__content">
                          <div class="form-row mt-4">
                            <div class="col-12">
                                <p><span class="dsc-prod-pag text-primary"></span></p>
                                <p>Costo de servicio:<span class="dsc-pre-pag" style="float:right"></span></p>
                                <p>Costo de envío:<span class="dsc-env-pag" style="float:right">-</span></p>
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
