<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="imprimirDNI.aspx.cs" Inherits="PRESENTACION.page.proceso.imprimirDNI" %>

<div id="errorDiv"></div>
<input id="txh_idConfirm" type="hidden" />
<input id="txh_idmovimiento" type="hidden" />
<body>
    <form id="form1" runat="server">
        <div class="row">
            <div class="col-md-12">
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Imprimir DNI de Mascota</h6>
                    </div>
                    <div class="card-body" id="pnl_busqueda">
                        <div class="row mb-3" id="divBusqueda">
                            <div class="col-md-4">
                                <div class="input-group">
                                    <label class="col-form-label">DNI: </label>
                                    <input type="text" id="txt_bus_dni" class="form-control bg-light border-0 small" placeholder="Buscar mascota..." aria-label="Search" aria-describedby="basic-addon2">
                                    <div class="input-group-append">
                                        <button id="btn_buscar" class="btn btn-primary" type="button">
                                            <i class="fas fa-search fa-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <button id="btn_nuevo" class="btn btn-secondary btn-icon-split">
                                    <span class="icon text-white-50">
                                        <i class="fas fa-file"></i>
                                    </span>
                                    <span class="text">Nuevo</span>
                                </button>
                                <asp:Button ID="btnImprimir"  class="btn btn-secondary btn-icon-split" runat="server" Text="Imprimir" OnClick="Button1_Click"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</body>
<script type="text/javascript">
    $.getScript("js/page/proceso/imprimirDNI.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (usuario.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
