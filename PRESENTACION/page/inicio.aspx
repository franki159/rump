<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="inicio.aspx.cs" Inherits="PRESENTACION.page.inicio" %>

<link href="../../assets/upGalleryFCP/upGalleryFCP.css" rel="stylesheet" />
<script src="../../assets/upGalleryFCP/upGalleryFCP.js"></script>

<div class="row">
    <div class="col-md-12">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">MI CUENTA</h6>
            </div>
            <div class="card-body">
                <div id="errorUsuario"></div>
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
                    <div class="col-md-12">
                        <div class="container container-file">
                            <div class="row">
                                <div class="col-sm-2 imgUp">
                                    <div class="imagePreview"></div>
                                    <label class="btn btn-primary btn-upload">
                                        Subir<input type="file" class="uploadFile img" value="Upload Photo" style="width: 0px; height: 0px; overflow: hidden;">
                                    </label>
                                </div>
                                <!-- col-2 -->
                            </div>
                            <!-- row -->
                        </div>
                        <!-- container -->
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <button id="btn_actualizar_cuenta" type="button" class="btn btn-info btn-sm" data-loading-text="<i class='icon-spinner icon-spin icon-large'></i> Actualizando"><i class="fa fa-floppy-o" aria-hidden="true"></i>ACTUALIZAR MIS DATOS</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    $.getScript("js/page/inicio.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (inicio.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
    //SCRIPT GENERAL
    $.getScript("js/general.js")
        .fail(function (jqxhr, settings, exception) {
            alert("Error: No se ha cargando un complemento del sistema (general.js), porfavor actualize la pagina para poder cargar el complemento. " + exception);
        });
</script>
