<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="raza.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.raza" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Especies y Razas</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Especie </label>
                            <select id="bus_sel_especie" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Descripción</label>
                            <input type="text" id="bus_txt_raza" class="form-control" placeholder="Raza">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
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
                <table id="tbl_raza" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Especie</th>
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

<!--************************ Raza *****************************-->
<div class='modal modal-scroll fade' id='pnl_raza' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar nueva Raza</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="errorRaza"></div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Especie</label>
                            <select id="sel_especie" class="form-control sel_autocomplete" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input id="txt_raza" placeholder="Escriba el nombre de la raza..." class="form-control" type="text" maxlength="255" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_guardar" type="button" class="btn btn-info btn-sm">&nbsp;Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $.getScript("js/page/mantenimiento/raza.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (servicio.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
