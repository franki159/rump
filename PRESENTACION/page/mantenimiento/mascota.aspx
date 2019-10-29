<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mascota.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.mascota" %>

<%--<link href="../../assets/dropzone/dropzone.css" rel="stylesheet" type="text/css" />
<script src="../../assets/dropzone/dropzone.js" type="text/javascript"></script>--%>
<link href="../../assets/upGalleryFCP/upGalleryFCP.css" rel="stylesheet" />
<script src="../../assets/upGalleryFCP/upGalleryFCP.js"></script>

<div id="errorDiv"></div>
<input id="txh_idConfirm" type="hidden" />
<input id="txh_idmovimiento" type="hidden" />
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
<!--***********************  MASCOTA  **************************-->
<div class='modal modal-scroll fade' id='pnl_mascota' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de Mascotas</h4>
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
                            <a class="nav-link" id="domicilio-tab" data-toggle="tab" href="#domicilio" role="tab" aria-controls="domicilio" aria-selected="false">Domicilio</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="salud-tab" data-toggle="tab" href="#salud" role="tab" aria-controls="salud" aria-selected="false">Salud</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="foto-tab" data-toggle="tab" href="#foto" role="tab" aria-controls="foto" aria-selected="false">Foto</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active" id="dato" aria-labelledby="dato-tab">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Nombres <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_nombre" placeholder="Escriba el nombre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Apellidos <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_apellido" placeholder="Escriba el apellido..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Sexo <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_sexo" class="form-control">
                                            <option value="0">Seleccionar</option>
                                            <option value="Macho">Macho</option>
                                            <option value="Hembra">Hembra</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Tamaño</label>
                                        <select id="sel_tamano" class="form-control">
                                            <option value="0">Seleccionar</option>
                                            <option value="Chico">Chico</option>
                                            <option value="Mediano">Mediano</option>
                                            <option value="Grande">Grande</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Tipo <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_tipo" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option style="width: 100%;"></option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Raza <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_raza" class="form-control sel_autocomplete" style="width: 100%;"></select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Calificación <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_calificacion" class="form-control">
                                            <option value="0">Seleccionar</option>
                                            <option value="Rojo">Agresivo</option>
                                            <option value="Verde">Amistoso</option>
                                            <option value="Blanco">Discapacitado</option>
                                            <option value="Azul">Entrenado</option>
                                            <option value="Amarillo">Miedoso</option>
                                            <option value="Naranja">Peleador</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Color</label>
                                        <input id="txt_color" placeholder="Escriba el color del pelaje..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Fecha de Nacimiento <strong class="text-danger">(*)</strong></label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fecha_nac" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Nombre del Padre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_nom_padre" placeholder="Escriba el nombre del padre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>DNI del padre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_dni_padre" placeholder="Escriba el DNI del padre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Teléfono del padre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_tel_padre" placeholder="Escriba el teléfono del padre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Nombre de la madre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_nom_madre" placeholder="Escriba el nombre de la madre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>DNI de la madre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_dni_madre" placeholder="Escriba el DNI de la madre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Teléfono de la madre <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_tel_madre" placeholder="Escriba el teléfono de la madre..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Biografía </label>
                                        <textarea id="txt_biografia" placeholder="Escriba una referencia de la dirección..." maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm continue">Siguiente</button>
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
                                <div class="col-md-8">
                                    <div class="form-group">
                                        <label>Dirección <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_direccion" placeholder="Escriba la dirección..." class="form-control" type="text" maxlength="200" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Piso</label>
                                        <input id="txt_piso" placeholder="Escriba el piso..." class="form-control integerFCP" type="text" maxlength="3" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Referencia</label>
                                        <textarea id="txt_referencia" placeholder="Escriba una referencia de la dirección..." maxlength="500" class="form-control" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm back">Atras</button>
                                    <button class="btn btn-primary btn-sm continue">Siguiente</button>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane fade panel-body" id="salud" aria-labelledby="salud-tab">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿La mascota está castrada?</label>
                                        <select id="sel_castrada" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿Visita periodicamente al veterinario? </label>
                                        <select id="sel_visita" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿La mascota tiene alergia a medicamentos?</label>
                                        <select id="sel_alergia_med" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿Posee calendario de vacunación? </label>
                                        <select id="sel_calendario" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>¿Cuenta con vacunación séxtuple?</label>
                                        <select id="sel_vac_sextuple" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3" id="divSextuple">
                                    <div class="form-group">
                                        <label>Fecha de vacuna séxtuple </label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fec_vac_sext" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>¿Cuenta con vacunación triple felina?</label>
                                        <select id="sel_vac_triple" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3" id="divTriple">
                                    <div class="form-group">
                                        <label>Fecha de vacuna triple felina </label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fec_vac_triple" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>¿Cuenta con vacunación contra la leucemia?</label>
                                        <select id="sel_vac_leucemia" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3" id="divLeucemia">
                                    <div class="form-group">
                                        <label>Fecha de vacuna contra la leucemia </label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fec_vac_leucemia" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label>¿Cuenta con vacunación antirrábica?</label>
                                        <select id="sel_vac_antirrabica" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-3" id="divAntirrabica">
                                    <div class="form-group">
                                        <label>Fecha de vacuna antirrábica </label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fec_vac_antirrabica" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿Cuenta con limpieza dental?</label>
                                        <select id="sel_dental" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Fecha de última desparacitación </label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fec_desparacitacion" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿Posee alguna alergia?</label>
                                        <select id="sel_alergia" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" id="divAlergia">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <label>¿Cuál?</label>
                                            <input id="txt_alergia" placeholder="Describa la alergia..." class="form-control" type="text" maxlength="100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>¿Posee alguna enfermedad?</label>
                                        <select id="sel_enfermedad" class="form-control">
                                            <option value="0">No</option>
                                            <option value="1">Si</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6" id="divEnfermedad">
                                    <div class="form-group">
                                        <div class="form-group">
                                            <label>¿Cuál?</label>
                                            <input id="txt_enfermedad" placeholder="Describa la enfermedad..." class="form-control" type="text" maxlength="100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm back">Atras</button>
                                    <button class="btn btn-primary btn-sm continue">Siguiente</button>
                                </div>
                            </div>

                        </div>

                        <div role="tabpanel" class="tab-pane fade panel-body" id="foto" aria-labelledby="foto-tab">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="container container-file">
                                        <div class="row">
                                            <div class="col-sm-2 imgUp">
                                                <div class="imagePreview"></div>
                                                <label class="btn btn-primary btn-upload">
										            Subir<input type="file" class="uploadFile img" value="Upload Photo" style="width: 0px;height: 0px;overflow: hidden;">
				                                </label>
                                            </div><!-- col-2 -->
                                            <i class="fa fa-plus imgAdd"></i>
                                        </div><!-- row -->
                                    </div><!-- container -->
                                </div>
                                <%--<div class="col-md-6">
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1">Seleccione una foto de la mascota</label>
                                        <input type="file" class="form-control" id="imgMascota">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img src="#" id="img_Foto" style="width: 150px; height: 180px; background-color: #d6d6d6;" />
                                </div>--%>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm back">Atras</button>
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
<!--************************ MASCOTA PROPIETARIO *****************************-->
<div class='modal modal-scroll fade' id='pnl_mascota_prop' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Seleccionar propietario</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <div id="errorPropietario"></div>
                <form>
                  <div class="form-group">
                    <label for="correo-name" class="col-form-label">Correo:</label>
                    <input id="txt_correo" name="tipo" placeholder="Ingrese el correo del propietario" class="form-control" />
                  </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="btn_select_prop" type="button" class="btn btn-info btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Guardando"><i class="fa fa-user-plus" aria-hidden="true"></i>GUARDAR</button>
                <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
<!--***********************  MASCOTA VISTA  **************************-->
<div class='modal modal-scroll fade' id='pnl_mascota_v' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Detalles de la Mascota</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorMascota_v"></div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group text-center">
                            <img src="#" id="img_Foto_v" style="width: 150px; height: 150px; background-color: #d6d6d6; border-radius: 50%;" onerror="this.src='img/noPets.png';" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label><strong>Nombre</strong></label>
                            <input id="txt_nombre_v" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label><strong>DNI</strong></label>
                            <input id="txt_dni_v" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label><strong>Teléfono</strong></label>
                            <input id="txt_tel_v" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label><strong>Dirección</strong></label>
                            <input id="txt_dir_v" class="form-control" type="text" disabled="disabled" maxlength="100" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label><strong>Calificación</strong></label>
                            <select id="sel_calificacion_v" disabled="disabled" class="form-control">
                                <option value="0">Seleccionar</option>
                                <option value="Rojo">Agresivo</option>
                                <option value="Verde">Amistoso</option>
                                <option value="Blanco">Discapacitado</option>
                                <option value="Azul">Entrenado</option>
                                <option value="Amarillo">Miedoso</option>
                                <option value="Naranja">Peleador</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/mascota.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (mascota.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
