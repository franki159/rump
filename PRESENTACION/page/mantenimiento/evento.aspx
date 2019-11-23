<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="evento.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.evento" %>

<div id="errorDiv"></div>
<input id="txh_idConfirm" type="hidden" />
<input id="txh_idmovimiento" type="hidden" />
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Evento de Mascota</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row mb-3" id="divBusqueda">
                    <div class="col-md-3">
                        <div class="input-group">
                            <label class="col-form-label">Tipo: </label>
                            <select id="sel_bus_tipo" class="form-control bg-light border-0 small">
                                <option value="0">TODOS</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group">
                            <label class="col-form-label">Mascota: </label>
                            <select id="sel_bus_mascota" class="form-control bg-light border-0 small">
                                <option value="0">TODOS</option>
                            </select>
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
            <div class="panel pre-scrollable">
                <table id="tbl_evento" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>TIPO</th>
                            <th>MASCOTA</th>
                            <th>TITULO</th>
                            <th>INICIO</th>
                            <th>FIN</th>
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
<!--***********************  EVENTO  **************************-->
<div class='modal modal-scroll fade' id='pnl_evento' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de Evento</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorEvento"></div>
                <div class="">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Tipo <strong class="text-danger">(*)</strong></label>
                                <select id="sel_tipo" class="form-control">
                                    <option value="0">Seleccionar</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Mascota <strong class="text-danger">(*)</strong></label>
                                <select id="sel_mascota" class="form-control">
                                    <option value="0">Seleccionar</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Titulo <strong class="text-danger">(*)</strong></label>
                                <input id="txt_titulo" placeholder="Escriba el titulo..." class="form-control" type="text" maxlength="100" />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Detalle </label>
                                <textarea id="txt_detalle" placeholder="Escriba una referencia del evento..." maxlength="500" class="form-control" rows="3"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Fecha Inicio <strong class="text-danger">(*)</strong></label>
                                <div data-date-format="dd/mm/yyyy" class="input-group">
                                    <input id="txt_fecha_inicio" type="text" class="form-control date dtOp" placeholder="dd/MM/yyyy" data-mask="99/99/9999" size="16">
                                    <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                    <input id="txt_hora_inicio" type="text" class="form-control" placeholder="HH:mm" data-mask="99:99" size="16">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>Fecha Fin <strong class="text-danger">(*)</strong></label>
                                <div data-date-format="dd/mm/yyyy" class="input-group">
                                    <input id="txt_fecha_fin" type="text" class="form-control date dtOp" placeholder="dd/MM/yyyy" data-mask="99/99/9999" size="16">
                                    <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                    <input id="txt_hora_fin" type="text" class="form-control" placeholder="HH:mm" data-mask="99/99/9999" size="16">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="push"></div>
            </div>
            <div class="modal-footer">
                <button id="btn_guardar" type="button" class="btn btn-info btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Guardando"><i class="fa fa-floppy-o" aria-hidden="true"></i>GUARDAR</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/evento.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (evento.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
