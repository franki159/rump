<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="listaMascota.aspx.cs" Inherits="PRESENTACION.page.consulta.listaMascota" %>

<%--<link href="../../assets/dropzone/dropzone.css" rel="stylesheet" type="text/css" />
<script src="../../assets/dropzone/dropzone.js" type="text/javascript"></script>--%>
<link href="../../assets/upGalleryFCP/upGalleryFCP.css" rel="stylesheet" />
<script src="../../assets/upGalleryFCP/upGalleryFCP.js"></script>

<div id="errorDiv"></div>
<div class="card shadow mb-4">
    <!-- Card Header - Accordion -->
    <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExample">
        <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-filter"></i>&nbsp;Filtros de Búsqueda</h6>
    </a>
    <!-- Card Content - Collapse -->
    <div class="collapse show" id="collapseCardExample">
        <div class="card-body">
            <div role="tabpanel" class="tab-pane fade show active" id="dato" aria-labelledby="dato-tab">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>DNI mascota&nbsp;/&nbsp;Correo propietario</label>
                            <input id="txt_dni_msc" placeholder="DNI o correo..." class="form-control" type="text" maxlength="100">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Nombre mascota&nbsp;/&nbsp;propietario</label>
                            <input id="txt_nom_msc" placeholder="Nombre de mascota o propietario..." class="form-control" type="text" maxlength="100">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Sexo</label>
                            <select id="sel_sexo" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;">
                                <option value="0">Seleccionar</option>
                                <option value="Macho">Macho</option>
                                <option value="Hembra">Hembra</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Especie <strong class="text-danger">(*)</strong></label>
                            <select id="sel_tipo" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;">
                                <option style="width: 100%;"></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Raza <strong class="text-danger">(*)</strong></label>
                            <select id="sel_raza" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;"></select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Mes cumpleaños mascota</label>
                            <select id="sel_mes" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;">
                                <option value="0">Seleccionar</option>
                                <option value="1">ENERO</option>
                                <option value="2">FEBRERO</option>
                                <option value="3">MARZO</option>
                                <option value="4">ABRIL</option>
                                <option value="5">MAYO</option>
                                <option value="6">JUNIO</option>
                                <option value="7">JULIO</option>
                                <option value="8">AGOSTO</option>
                                <option value="9">SETIEMBRE</option>
                                <option value="10">OCTUBRE</option>
                                <option value="11">NOVIEMBRE</option>
                                <option value="12">DICIEMBRE</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Departamento <strong class="text-danger">(*)</strong></label>
                            <select id="sel_departamento" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Provincia</label>
                            <select id="sel_provincia" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;"></select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Distrito</label>
                            <select id="sel_distrito" class="form-control sel_autocomplete_bus" data-minimum-results-for-search="5" style="width: 100%;"></select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Fecha registro Inicio</label>
                            <input id="txt_ini_reg" class="form-control" type="date">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Fecha registro fin</label>
                            <input id="txt_fin_reg" class="form-control" type="date">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <button id="btn_buscar" class="btn btn-primary btn-icon-split">
                        <span class="icon text-white-50">
                            <i class="fas fa-search"></i>
                        </span>
                        <span class="text">Buscar</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>


<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="panel pre-scrollable">
                <table id="tbl_mascota" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th>DNI</th>
                            <th>Mascota</th>
                            <th>Dueño</th>
                            <th>Telefono</th>
                            <th>Fecha Nacimiento</th>
                            <th>Fecha Registro</th>
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
