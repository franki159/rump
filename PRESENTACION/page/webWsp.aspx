<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="webWsp.aspx.cs" Inherits="PRESENTACION.page.webWsp" %>

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<link href="templateSoft/css/sb-admin-2.css?v=<%:DateTime.Now.ToString("yyyyMMddHHmm")%>" rel="stylesheet">
<link href="templateSoft/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">

<div class="row">
    <div class="col-md-12">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Enviar mensaje</h6>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Telefono</label>
                        <input id="txt_telefono" placeholder="Escriba el telefono..." class="form-control" type="text" maxlength="100" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 text-center">
                    <button id="btn_enviar" type="button" class="btn" style="border-radius: 20% !important; background: linear-gradient(#5ffb7a, #2bb827) !important; color: #fff; font-size: 40px; box-shadow: 2px 2px 5px #242424;">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="templateSoft/vendor/jquery/jquery.min.js"></script>
<script type="text/javascript">
    $.getScript("js/page/webWsp.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (webWsp.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
