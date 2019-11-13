<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="citaMedica.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.citaMedica" %>

<div id="errorDiv"></div>
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Cita Médica de Mascota</h6>
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
                            <th>MASCOTA</th>
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
<!--***********************  CITA MEDICA  **************************-->
<div class='modal modal-scroll fade' id='pnl_mascota' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Cita Médica</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorMascota"></div>
                <div class="">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a class="nav-link active" id="dato-tab" data-toggle="tab" href="#dato" role="tab" aria-controls="dato" aria-selected="true">Datos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false">Detalles</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active" id="dato" aria-labelledby="dato-tab">
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Mascota <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_mascota" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option style="width: 100%;"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>DNI de Mascota</label>
                                        <input id="lbl_dni" class="form-control" type="text" maxlength="90" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Clinica <strong class="text-danger">(*)</strong>
                                            <button class="btn btn-success btn-sm add-cli"><i class="fas fa-clinic-medical"></i>&nbsp;Agregar</button></label>
                                        <select id="sel_clinica" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option style="width: 100%;"></option>
                                        </select>

                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Direccion</label>
                                        <input id="lbl_direccion_cli" class="form-control" type="text" maxlength="90" disabled="disabled" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Doctor Veterinario <strong class="text-danger">(*)</strong>
                                        <button class="btn btn-success btn-sm add-med"><i class="fas fa-user-md"></i>&nbsp;Agregar</button></label>
                                        <select id="sel_veterinario" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option style="width: 100%;"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Tipo de Cita</label>
                                        <select id="sel_tipo_cita" class="form-control sel_autocomplete"  style="width: 100%;">
                                            <option value="0">Seleccionar</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Motivo <strong class="text-danger">(*)</strong></label>
                                        <textarea id="txt_motivo" placeholder="Escriba el motivo de la cita..." maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm continue"><i class="fas fa-angle-double-right"></i>&nbsp;Siguiente</button>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane fade panel-body" id="detalle" aria-labelledby="detalle-tab">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Peso</label>
                                        <input id="txt_peso" placeholder="Escriba el peso de la mascota" class="form-control decimalFCP" type="text" maxlength="200" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Temperatura</label>
                                        <input id="txt_temperatura" placeholder="Escriba la temperatura de la mascota" class="form-control decimalFCP" type="text" maxlength="200" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Fecha de Cita <strong class="text-danger">(*)</strong></label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fecha_cita" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Sintomas</label>
                                        <textarea id="txt_sintomas" placeholder="Escriba los síntomas" maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Diagnostico</label>
                                        <textarea id="txt_diagnostico" placeholder="Escriba el diagnstico" maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Tratamiento</label>
                                        <textarea id="txt_tratamiento" placeholder="Escriba el tratamiento" maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Observación</label>
                                        <textarea id="txt_observacion" placeholder="Escriba la observación" maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Antecedentes</label>
                                        <textarea id="txt_antecedentes" placeholder="Escriba los antecedentes" maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Fórmula médica</label>
                                        <textarea id="txt_formula" placeholder="Escriba la fórmula médica" maxlength="500" class="form-control" rows="3"></textarea>
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
                <button id="btn_guardar" type="button" class="btn btn-info btn-sm"><i class="far fa-save" aria-hidden="true"></i> GUARDAR</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!--************************ CLINICA *****************************-->
<div class='modal modal-scroll fade' id='pnl_clinica' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Clíinica Veterinaria</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="errorClinica"></div>
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
                            <input id="txt_direccion_cli" placeholder="Escriba la dirección..." class="form-control" type="text" maxlength="200" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group">
                            <label>Nombre <strong class="text-danger">(*)</strong></label>
                            <input id="txt_nom_clinica" placeholder="Escriba el nombre de la clínica veterinaria..." class="form-control" type="text" maxlength="255" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Telefono</label>
                            <input id="txt_tel_clinica" placeholder="Escriba el telefono de la clínica veterinaria..." class="form-control" type="text" maxlength="3" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_save_cli" type="button" class="btn btn-info btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Guardando"><i class="fas fa-clinic-medical" aria-hidden="true"></i>&nbsp;Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!--***********************  MEDICO  **************************-->
<div class='modal modal-scroll fade' id='pnl_medico' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Medico</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorMedico"></div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Nombre <strong class="text-danger">(*)</strong></label>
                            <input id="txt_nombre_med" class="form-control" type="text" maxlength="250" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Apellido <strong class="text-danger">(*)</strong></label>
                            <input id="txt_apellido_med" class="form-control" type="text" maxlength="250" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Telefono</label>
                            <input id="txt_telefono_med" class="form-control" type="text" maxlength="250" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Código C.M.V.P.</label>
                            <input id="txt_cod_med" class="form-control" type="text" maxlength="100" />
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn_save_med" type="button" class="btn btn-info btn-sm"><i class="fas fa-user-md" aria-hidden="true"></i>&nbsp;Guardar</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/citaMedica.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (mascota.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
