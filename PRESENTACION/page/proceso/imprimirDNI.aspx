<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="imprimirDNI.aspx.cs" Inherits="PRESENTACION.page.proceso.imprimirDNI" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Imprimir DNI de Mascota</h6>
            </div>
            <div class="card-body" id="dato" aria-labelledby="dato-tab">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>DNI</label>
                            <input id="txt_dni" placeholder="Escriba el DNI de la mascota..." class="form-control" type="text" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <button id="btn_print" class="btn btn-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-print"></i>
                            </span>
                            <span class="text">Imprimir</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $.getScript("js/page/proceso/imprimirDNI.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (imprimirDNI.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
