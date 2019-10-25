<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="usuario.aspx.cs" Inherits="PRESENTACION.page.mantenimiento.usuario" %>

<link href="../../assets/dropzone/dropzone.css" rel="stylesheet" type="text/css" />
<script src="../../assets/dropzone/dropzone.js" type="text/javascript"></script>

<div id="errorDiv"></div>
<input id="txh_idConfirm" type="hidden" />
<input id="txh_idmovimiento" type="hidden" />
<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">Mantenimiento de Usuario</h6>
            </div>
            <div class="card-body" id="pnl_busqueda">
                <div class="row mb-3" id="divBusqueda">
                    <div class="col-md-4">
                        <div class="input-group">
                            <label class="col-form-label">E-mail: </label>
                            <input type="text" id="txt_bus_email" class="form-control bg-light border-0 small" placeholder="Buscar usuario..." aria-label="Search" aria-describedby="basic-addon2">
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
            <div class="panel pre-scrollable">
                <table id="tbl_usuario" class="table table-striped table-hover table-fcp">
                    <thead>
                        <tr>
                            <th style="display: none"></th>
                            <th></th>
                            <th>Foto</th>
                            <th>Activo</th>
                            <th>Perfil</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
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
<!--***********************  USUARIO  **************************-->
<div class='modal modal-scroll fade' id='pnl_usuario' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>
    <div class="modal-dialog modal-extend-fgp">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de Usuarios</h4>
                <button aria-hidden="true" data-dismiss="modal" class="close" type="button">&times;</button>
            </div>
            <div class="modal-body">
                <div id="errorUsuario"></div>
                <div class="">
                    <ul class="nav nav-tabs" role="tablist">
                        <li role="presentation" class="nav-item">
                            <a class="nav-link active" id="dato-tab" data-toggle="tab" href="#dato" role="tab" aria-controls="dato" aria-selected="true">Datos</a>
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
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Fecha de Nacimiento <strong class="text-danger">(*)</strong></label>
                                        <div data-date-format="dd/mm/yyyy" class="input-group date dtOp">
                                            <input id="txt_fecha_nac" type="text" class="form-control" placeholder="" data-mask="99/99/9999" size="16">
                                            <span class="input-group-addon btn-danger"><i class="icon-calendar"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Telefono</label>
                                        <input id="txt_telefono" placeholder="Escriba el telefono..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Celular</label>
                                        <input id="txt_celular" placeholder="Escriba el celular..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Perfil <strong class="text-danger">(*)</strong></label>
                                        <select id="sel_perfil" class="form-control sel_autocomplete" style="width: 100%;">
                                            <option style="width: 100%;"></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>E-mail<strong class="text-danger">(*)</strong></label>
                                        <input id="txt_email" placeholder="Escriba el e-mail..." class="form-control" type="text" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Contraseña <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_clave" placeholder="Escriba la contraseña..." class="form-control" type="password" maxlength="100" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label>Confirmación de contraseña <strong class="text-danger">(*)</strong></label>
                                        <input id="txt_clave_rep" placeholder="Confirma la contraseña..." class="form-control" type="password" maxlength="100" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4">
                                    <button class="btn btn-primary btn-sm continue">Siguiente</button>
                                </div>
                            </div>
                        </div>

                        <div role="tabpanel" class="tab-pane fade panel-body" id="foto" aria-labelledby="foto-tab">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1">Seleccione una foto de perfil</label>
                                        <input type="file" class="form-control" id="imgUsuario">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <img src="#" id="img_Foto" style="width: 150px; height: 180px; background-color: #d6d6d6;" />
                                </div>
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

<script type="text/javascript">
    $.getScript("js/page/mantenimiento/usuario.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (usuario.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
