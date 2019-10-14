<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="permiso.aspx.cs" Inherits="PRESENTACION.permiso" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LV::Permiso</title>
    <link rel="shortcut icon" type="image/png" href="img/icons/favicon.ico" />
     <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.css" rel="stylesheet" />
    <%--<link href="css/bootstrap-reset.css" rel="stylesheet" />--%>
    <!--external css-->
    <link href="assets/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/bootstrap-fileupload/bootstrap-fileupload.css" rel="stylesheet" />
    <link href="assets/bootstrap-datepicker/css/datepicker.css" rel="stylesheet" />
    <link href="assets/bootstrap-datetimepicker/css/datetimepicker.css" rel="stylesheet" />
    <!-- Custom styles for this template -->
    <link href="assets/font-awesome/css/style.css" rel="stylesheet" />
    <link href="assets/font-awesome/css/style-responsive.css" rel="stylesheet" />
    <!-- Estilos personalizados para esta plantilla -->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/style-responsive.css" rel="stylesheet" />
    <!-- Estilos personalizado -->
    <link href="css/stylePropio.css" rel="stylesheet" />
</head>
<body class="login-body">
    <div class="container" style="max-width:500px;">
        <form id="frmPermiso">
            <h2 class="form-signin-heading text-center"><img src="../img/logoRUMP.png" /></h2>
            <div class="login-wrap">
                <div id="msg"></div>
                <label class="control-label">Local</label>
                <select id="local" name="local" class="form-control input-sm m-bot15"></select>
                <button id="btnAceptar" type="button" class="btn btn-lg btn-login btn-block botonPropio">Aceptar</button>
            </div>
        </form>
    </div>
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/general.js" type="text/javascript"></script>    
    <script src="js/permiso.js" type="text/javascript"></script>
</body>
</html>
