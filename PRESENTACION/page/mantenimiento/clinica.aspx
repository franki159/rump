<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="clinica.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.clinica" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Mantenimiento de Convenios</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Tipo </label>
                            <select id="bus_sel_tipo" class="form-control sel_autocomplete_bus">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" id="bus_txt_nombre" class="form-control">
                        </div>
                    </div>
                </div>
                <%--<div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Departamento </label>
                            <select id="bus_sel_departamento" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Provincia</label>
                            <select id="bus_sel_provincia" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Distrito</label>
                            <select id="bus_sel_distrito" class="form-control">
                            </select>
                        </div>
                    </div>
                </div>--%>
                <div class="row">
                    <div class="col-md-4">
                        <button id="btn_buscar" class="btn btn-3-info btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-search"></i>
                            </span>
                            <span class="text">Buscar</span>
                        </button>
                        <button id="btn_nuevo" class="btn btn-3-default btn-icon-split">
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
            <div class="panel pre-scrollable">
                <table id="tbl_clinica" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th style="width:90px;"></th>
                            <th>Pto. Autor.</th>
                            <th>NOMBRE</th>
                            <th>TELEFONO</th>
                            <th>BENEFICIO</th>
                            <th>DIRECCION</th>
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
<!--***********************  CLINICA  **************************-->
<div class='modal modal-scroll fade' id='pnl_clinica' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de Convenios</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorClinica"></div>
                <div class="">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a class="nav-link active" id="dato-tab" data-toggle="tab" href="#dato" role="tab" aria-controls="dato" aria-selected="true">Datos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="domicilio-tab" data-toggle="tab" href="#domicilio" role="tab" aria-controls="domicilio" aria-selected="false">Domicilio</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active" id="dato" aria-labelledby="dato-tab">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Tipo <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_tipo" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option value="0">Seleccionar</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Nombre<strong class="text-danger">(*)</strong></label>
                                        <input id="txt_nombre" placeholder="Nombe de la clinica" class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Telefono <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_telefono" placeholder="Telefono de la clinica" class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Punto autorizado</label>
                                        <input id="chk_pto_autorizado" class="form-control" type="checkbox"/>
                                    </div>
                                </div>
                                <div class="col-md-10">
                                    <div class="form-group">
                                        <label>Beneficio</label>
                                        <textarea id="txt_beneficio" placeholder="Escriba el beneficio del convenio" maxlength="1000" class="form-control" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm continue"><i class="fas fa-angle-double-right"></i>&nbsp;Siguiente</button>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane fade panel-body" id="domicilio" aria-labelledby="domicilio-tab">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Departamento <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_departamento" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Provincia <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_provincia" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Distrito <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_distrito" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Dirección <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_direccion" placeholder="Dirección/Departamento/Interior" class="form-control" type="text" maxlength="200" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Latitud</label>
                                        <input id="txt_latitud" placeholder="Latitud en google maps" class="form-control" type="text"/>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Longitud</label>
                                        <input id="txt_longitud" placeholder="Longitud en google maps" class="form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm back"><i class="fas fa-angle-double-left"></i>&nbsp;Atras</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="push"></div>
            </div>
            <div class="modal-footer">
                <button id="btn_guardar" type="button" class="btn btn-info btn-sm">&nbsp;Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/clinica.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (clinica.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
