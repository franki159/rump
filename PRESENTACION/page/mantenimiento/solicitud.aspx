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
                                <option value="3">OCUPADOS</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Tipo de Servicio </label>
                            <select id="sel_tipo" class="form-control">
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Inicio</label>
                            <input id="txt_ini" class="form-control" type="date">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Fin</label>
                            <input id="txt_fin" class="form-control" type="date">
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
                        <button id="btn_exportar" class="btn btn-3-success btn-icon-split">
                            <span class="icon text-white-50">
                                <i class="fas fa-download"></i>
                            </span>
                            <span class="text">Exportar</span>
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
                            <th>Fecha</th>
                            <th>DNI RUMP</th>
                            <th>Mascota</th>
                            <th>Propietario</th>
                            <th>Email</th>
                            <th>Telefono</th>

                            <th>Recibe</th>
                            <th>Envio</th>
                            <%--<th>Tel. Recibe</th>
                            <th>DEP|PROV|DIST</th>
                            <th>Dir. Entrega</th>
                            <th>Referencia</th>--%>
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

<div class='modal modal-scroll fade' id='pnl_editar' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header" style="background: #084e65;color: white;">
                <h4 class="modal-title">Atender Solicitud</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body" style="background: linear-gradient(#0c637e, #084e65); color: white;">
                <div id="errorSolicitud"></div>
                <div class="">
                    <%--datos de la solicitud--%>
                    <%--datos de la mascota--%>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group" style="text-align: center">
                                <img class="img-row-mascota" id="imgMascotaCita" src="img/mascota/EA66C06C1E1C05FA9F1AA39D98DC5BC1.jpeg?v=80" onerror="this.src='img/noPets.png';" style="width: 150px; height: 160px;">
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Fecha Solicitud
                                        <h6><strong><span id="srv-fec"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Precio Solicitud
                                        <h6><strong><span id="srv-pre"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <h6><strong><span id="srv-est" class="fcp-lbl-resalt"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Nombres de la mascota
                                        <h6><strong><span id="dni-nom-msc"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        DNI RUMP
                                        <h6><strong><span id="dni-dni-msc"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Propietario
                                        <h6><strong><span id="dni-prop-msc"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Email
                                        <h6><strong><span id="dni-email-msc"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        Telefono
                                        <h6><strong><span id="dni-tel-msc"></span></strong></h6>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        Comentarios
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label style="white-space: pre-line" id="lbl-com-sol" ></label>
                                        <textarea id="txt_comentario" placeholder="Comentarios..." maxlength="5000" class="form-control" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a class="nav-link active" id="dato-tab" data-toggle="tab" href="#dato" role="tab" aria-controls="dato" aria-selected="true">Recibe</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="domicilio-tab" data-toggle="tab" href="#domicilio" role="tab" aria-controls="domicilio" aria-selected="false">Domicilio</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active" id="dato" aria-labelledby="dato-tab">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Nombres</label>
                                        <input id="txt-nom" placeholder="Nombres" class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Apellidos</label>
                                        <input id="txt-ape" placeholder="Apellidos" class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Telefono</label>
                                        <input id="txt-tel" placeholder="Telefono" class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>DNI</label>
                                        <input id="txt-dni" placeholder="DNI" class="form-control" type="text" maxlength="100" />
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
                                        <label>Departamento</label>
                                        <select id="sel_departamento" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Provincia</label>
                                        <select id="sel_provincia" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Distrito</label>
                                        <select id="sel_distrito" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Dirección</label>
                                        <input id="txt_direccion" placeholder="Dirección/Departamento/Interior" class="form-control" type="text" maxlength="200" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Referencia (avenidas o calles principales)</label>
                                        <textarea id="txt_referencia" placeholder="Avenidas o calles principales..." maxlength="500" class="form-control" rows="3"></textarea>
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
            <div class="modal-footer" style="background: #084e65;">
                <button id="btn_atender" type="button" class="btn btn-3-success btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Atendiendo"><i class="far fa-thumbs-up"></i> Atender</button>
                <button id="btn_anular" type="button" class="btn btn-danger btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Anulando"><i class="far fa-thumbs-down"></i> Anular</button>
                <button id="btn_guardar" type="button" class="btn btn-3-info btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Guardando"><i class="fa fa-floppy-o" aria-hidden="true"></i>Guardar</button>
                <button id="btn_liberar" type="button" class="btn btn-3-primary btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Liberando"><i class="fa fa-floppy-o" aria-hidden="true"></i>Liberar</button>
            </div>
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
