<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="pageError.aspx.cs" Inherits="PRESENTACION.page.pageError" %>

        <div class="text-center">
            <div class="error mx-auto" data-text="404">404</div>
            <p class="lead text-gray-800 mb-5">Page Not Found</p>
            <p class="text-gray-500 mb-0">Al parecer ocurrió un error...</p>
            <a href="./Sistema">← Regresar al Sistema</a>
          </div>
<script type="text/javascript">
    $.getScript("js/page/pageError.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (pageError.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>