<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="PRESENTACION.login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <form id="frmLogin">
            <div class="login-wrap" style="max-width:500px;" >
                <h2 class="form-signin-heading text-center"><i class="icon-user"></i> Iniciar Sesión</h2>

                <div id="msgError"></div>
                <div class="form-group">
                    <label class="control-label">Usuario</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="icon-user"></i></span>
                        <input id="usuario" name="usuario" type="text" class="form-control input-sm" placeholder="Usuario" autofocus="autofocus" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="control-label">Contraseña</label>
                    <div class="input-group">
                        <span class="input-group-addon"><i class="icon-lock"></i></span>
                        <input id="clave" name="clave" type="password" class="form-control input-sm" placeholder="Contraseña" />
                    </div>
                </div>
                <button id="btnAcceder" type="button" class="btn btn-lg btn-login btn-block botonPropio">Ingresar</button>
               <div class="text-center" style="margin-top: 15px;">
                   <a href="http://charpe.somee.com/"><img src="img/charpe.png" alt="Logo Charpe Enterprise"> Charpe Techonology</a>
               </div>
            </div>
        </form>
    </div>
    <script src="js/all/jquery.js" type="text/javascript"></script>
    <script src="js/all/bootstrap.min.js" type="text/javascript"></script>
    <script src="js/general.js" type="text/javascript"></script>
    <script src="js/login.js" type="text/javascript"></script>
</body>
</html>
