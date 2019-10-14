<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pageError.aspx.cs" Inherits="PRESENTACION.page.pageError" %>

<div id="fondoRUMP" style="text-align: right;">
    
</div>


<script type="text/javascript">
    $.getScript("js/page/pageError.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (inicio.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
