<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pago_exitoso.aspx.cs" Inherits="PRESENTACION.pago_exitoso" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Title -->
    <title>RUMP Perú::Pago</title>

    <!-- Favicon -->
    <link rel="icon" href="templatePage/img/core-img/favicon.png">
    <!-- Custom fonts for this template-->
    <link href="templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

    <link href="css/stylePropio.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet" />
    <!-- Custom styles for this template-->
    <link href="templateSoft/css/sb-admin-2.css" rel="stylesheet">
</head>
<body class="bg-gradient-primary" style="background-image: url(img/fondo_rump.jpg); background-repeat: no-repeat; background-position: top center;">
<div style="padding-left: 1.5rem;padding-right: 1.5rem;">

        <!-- Outer Row -->
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="o-hidden border-0 my-5">
                    <div class="card-body p-0">
                        <div class="wrapper text-center"><h1>¡FELICIDADES!</h1></div> 
                        <p>&nbsp;</p>
                        <div runat="server" id="sub_wrapper" class="sub-wrapper">??</div>
                        <p>&nbsp;</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="templateSoft/vendor/jquery/jquery.min.js"></script>
</body>
</html>
