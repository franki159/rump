<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="solicitud.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.solicitud" %>

<div id="errorDiv"></div>
<input id="txh_idConfirm" type="hidden" />
<input id="txh_idmovimiento" type="hidden" />
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Solicitudes y Trámites</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>E-mail</label>
                            <input type="text" id="txt_bus_email" class="form-control" placeholder="Correo de Usuario">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Dni </label>
                            <input type="text" id="txt_bus_dni" class="form-control" placeholder="Dni de la mascota">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Estado </label>
                            <select id="sel_estado" class="form-control">
                                <option value="0">TODOS</option>
                                <option value="1">PENDIENTES</option>
                                <option value="2">ATENDIDOS</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <button id="btn_buscar" class="btn btn-3-info btn-icon-split">
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
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="panel pre-scrollable">
                <table id="tbl_solicitud" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Tipo</th>
                            <th>DNI</th>
                            <th>Mascota</th>
                            <th>Propietario</th>
                            <th>Email</th>
                            <th>Telefono</th>
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
    $.getScript("js/page/mantenimiento/solicitud.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (servicio.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
