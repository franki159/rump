<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="listaMascota.aspx.cs" Inherits="PRESENTACION.page.consulta.listaMascota" %>

<%--<link href="../../assets/dropzone/dropzone.css" rel="stylesheet" type="text/css" />
<script src="../../assets/dropzone/dropzone.js" type="text/javascript"></script>--%>
<link href="../../assets/upGalleryFCP/upGalleryFCP.css" rel="stylesheet" />
<script src="../../assets/upGalleryFCP/upGalleryFCP.js"></script>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Mantenimiento de Mascota</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row mb-3" id="divBusqueda" style="display: none;">
                    <div class="col-md-4">
                        <div class="input-group">
                            <input type="text" id="txt_bus_dni" class="form-control bg-light border-0 small" placeholder="Ingrese DNI mascota..." aria-label="Search" aria-describedby="basic-addon2">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="panel">
                <table id="tbl_mascota" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>FOTO</th>
                            <th>DNI</th>
                            <th>ESTADO</th>
                            <th>Nombre</th>
                            <th>Sexo</th>
                            <th>Tamaño</th>
                            <th>Color</th>
                            <th>Tipo</th>
                            <th>Raza</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div id="lblTotalReg" class="footer-table-fcp"></div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/consulta/listaMascota.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (listaMascota.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
