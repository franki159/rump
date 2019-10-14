<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="inicio.aspx.cs" Inherits="PRESENTACION.page.inicio" %>

<div id="fondoRUMP" style="text-align: right;">
    <img src="../img/logoRUMP.png" />
</div>


<script type="text/javascript">
    $.getScript("js/page/inicio.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (inicio.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
