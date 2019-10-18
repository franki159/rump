<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="PRESENTACION._default" %>

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>SB Admin 2 - Dashboard</title>
  <link rel="shortcut icon" type="image/png" href="img/worldpetsperu_logo.png" />
    <!-- Datetimepicker-->
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />

    <link href="css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />

  <!-- Custom fonts for this template-->
  <link href="templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="templateSoft/css/sb-admin-2.css" rel="stylesheet">
</head>

<body id="page-top">



    <div id="pleaseWaitDialog" style="z-index: 6000;" class="modal fade" data-backdrop="static" data-keyboard="false"  role="dialog">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header" style="border-bottom: 0px;">
                            <div style="float: left; padding: 10px;">
                                <h4 class="modal-title">Por favor espere...</h4>
                            </div>
                            <div style="float: right;">
                                <div class="loadersmall"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    




  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <img src="img/worldpetsperu_logo.png" style="width:100px;"/>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="www.worldpetsperu.com">
          <i class="fas fa-fw fa-home"></i>
          <span>Inicio</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item menu-dinamic">
       
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">

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

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small name_user">Propietario</span>
                <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
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
        <div class="wrapper container-fluid">
            Page content goes here
        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; World Pets Perú <%: DateTime.Now.Year %> by <a href="http://charpe.somee.com/"><strong>Charpe</strong>
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

  <!-- Datetimepicker-->
    <script src="assets/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
    <script src="assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="templateSoft/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="templateSoft/js/sb-admin-2.min.js"></script>

  <script src="js/general.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>
  <script src="js/default.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" type="text/javascript"></script>
</body>
</html>
