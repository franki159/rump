<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="mascota.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.mascota" %>

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
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Sexo <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_sexo" class="form-control">
                                            <option value="0">Seleccionar</option>
                                            <option value="Macho">Macho</option>
                                            <option value="Hembra">Hembra</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <div class="form-group">
                                        <label>Código microchip</label>
                                        <input id="txt_cod_microchip" placeholder="Código de microchip" class="form-control" type="text" maxlength="100" />
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
                                    <button class="btn btn-primary btn-sm back"><i class="fas fa-angle-double-left"></i>&nbsp;Atras</button>
                                    <button class="btn btn-primary btn-sm continue"><i class="fas fa-angle-double-right"></i>&nbsp;Siguiente</button>
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
                                    <button class="btn btn-primary btn-sm back"><i class="fas fa-angle-double-left"></i>&nbsp;Atras</button>
                                    <button class="btn btn-primary btn-sm continue"><i class="fas fa-angle-double-right"></i>&nbsp;Siguiente</button>
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
                                    <button class="btn btn-primary btn-sm back"><i class="fas fa-angle-double-left"></i>&nbsp;Atras</button>
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
                <button id="btn_select_prop" type="button" class="btn btn-info btn-sm"><i class="fa fa-user-plus" aria-hidden="true"></i>&nbsp;Seleccionar</button>
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Cerrar</button>
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
<!--***********************  TIPOS DE SERVICIO  **************************-->
<div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" id="copiaModal" class="modal fade">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Seleccione una opción</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body text-center">
                <div class="row">
                    <div class="col-md-3">
                        <div class="card text-white btn-3-primary mb-3" onclick="javascript:fc_sol_servicio(2)">
                            <div class="card-header card-header-fcp">
                                <i class="far fa-images"></i>
                            </div>
                            <div class="card-body">
                                <span class="card-title"><strong>Copia DNI</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-white btn-3-warning mb-3" onclick="javascript:fc_sol_servicio(3)">
                            <div class="card-header card-header-fcp">
                                <i class="fas fa-tags"></i>
                            </div>
                            <div class="card-body">
                                <span class="card-title"><strong>Copia Chapita</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-white btn-3-danger mb-3" onclick="javascript:fc_sol_servicio(4)">
                            <div class="card-header card-header-fcp">
                                <i class="fas fa-user-tag"></i>
                            </div>
                            <div class="card-body">
                                <span class="card-title"><strong>DNI y Chapita</strong></span>
                            </div>
                        </div>
                    </div>                    
                     <div class="col-md-3">
                        <div class="card text-white btn-3-primary mb-3" onclick="javascript:fc_sol_servicio(5)">
                            <div class="card-header card-header-fcp">
                                <i class="fas fa-user-tag"></i>
                            </div>
                            <div class="card-body">
                                <span class="card-title"><strong>Renovación DNI</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card text-white btn-3-success mb-3" onclick="javascript:fc_sol_servicio(6)">
                            <div class="card-header card-header-fcp">
                                <i class="far fa-images"></i>
                            </div>
                            <div class="card-body">
                                <span class="card-title"><strong>Cerfiticado<br>dueño<br>responsable</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--***********************  CITA MEDICA  **************************-->
<div class='modal modal-scroll fade' id='pnl_cita_medica' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registrar Cita Médica</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorCita"></div>
                <div class="">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a class="nav-link active" id="datoCita-tab" data-toggle="tab" href="#datoCita" role="tab" aria-controls="datoCita" aria-selected="true">Datos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="detalle-tab" data-toggle="tab" href="#detalle" role="tab" aria-controls="detalle" aria-selected="false">Detalles</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane fade show active" id="datoCita" aria-labelledby="datoCita-tab">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="form-group" style="text-align:right">
                                        <img class="img-row-mascota" id="imgMascotaCita" src="#" onerror="this.src='img/noPets.png';" style="width:150px; height:160px;"/>
                                    </div>
                                </div>
                                <div class="col-md-10">
                                    <%--<div class="form-group">
                                        <label>DNI de Mascota</label>
                                        <input id="lbl_dni_mascota" class="form-control" type="text" maxlength="90" disabled="disabled" />
                                    </div>--%>
                                    <div class="form-group">
                                        <label>Nombre de Mascota</label>
                                        <input id="lbl_nom_mascota" class="form-control" type="text" maxlength="90" disabled="disabled" />
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
                                        <label>Tipo de Cita <strong class="text-danger">(*)</strong></label>
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
                                        <label>Temperatura °C</label>
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

                <%--<div id="push"></div>--%>
            </div>
            <div class="modal-footer">
                <button id="btn_guardar_cita" type="button" class="btn btn-info btn-sm"><i class="far fa-save" aria-hidden="true"></i> GUARDAR</button>
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
                            <select id="sel_departamento_cita" class="form-control sel_autocomplete" style="width: 100%;">
                                <option></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Provincia <strong class="text-danger">(*)</strong></label>
                            <select id="sel_provincia_cita" class="form-control sel_autocomplete" style="width: 100%;"></select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Distrito <strong class="text-danger">(*)</strong></label>
                            <select id="sel_distrito_cita" class="form-control sel_autocomplete" style="width: 100%;"></select>
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
                            <input id="txt_tel_clinica" placeholder="Escriba el telefono de la clínica veterinaria..." class="form-control" type="text" maxlength="10" />
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
