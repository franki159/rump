<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="active.aspx.cs" Inherits="PRESENTACION.active" %>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Title -->
    <title>RUMP Perú::Activar Usuario</title>

    <!-- Favicon -->
    <link rel="icon" href="templatePage/img/core-img/favicon.png">
    <!-- Custom fonts for this template-->
    <link href="templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
    <link href="css/stylePropio.css" rel="stylesheet" />
    <!-- Custom styles for this template-->
    <link href="templateSoft/css/sb-admin-2.css" rel="stylesheet">
</head>

<body class="bg-gradient-primary" style="background-image: url(img/fondo_rump.jpg); background-repeat: no-repeat; background-position: top center;">
    <div id="page-loader" style="display: none"><span class="preloader-interior"></span></div>
    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">

            <div class="col-xl-10 col-lg-12 col-md-9">

                <div class="card o-hidden border-0 shadow-lg my-5" style="background: #eeeeee;">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 mb-4" style="color: #ffa101; font-weight: bold;">¡Bienvenido a RUMP!</h1>
                                    </div>
                                    <form class="user">
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div id="lblMensaje" runat="server" class="text-center">
                                            Su cuenta se activo satisfactoriamente!
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="templateSoft/vendor/jquery/jquery.min.js"></script>
    <script src="templateSoft/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="templateSoft/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="templateSoft/js/sb-admin-2.min.js"></script>

    <!-- Facebook -->
    <script src="templateSoft/vendor/facebook/all.js"></script>
    <!-- Select 2 filtro-->
    <script src="assets/select2/js/select2.full.js"></script>
    <script src="js/general.js?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>"></script>
</body>

</html>
