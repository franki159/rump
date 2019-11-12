var _ListaTipoConvenio, _ListaConvenio, _LatitudActual, _LongitudActual;

if ($('#mapa')) {
    function showConvenio() {
        $.ajax({
            type: "POST",
            url: "servicios.aspx/ActualizaMapa",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                if ($('#mapa').gmap3()) {
                    $('#mapa').gmap3({
                        action: 'destroy'
                    });

                    var container = $('#mapa').parent();
                    $('#mapa').remove();
                    container.append('<div id="mapa"></div>');
                }
            },
            success: function (data) {
                var etiqueta = '';
                var ubicaciones = [];

                if (_LatitudActual != null && _LatitudActual != undefined) {

                    etiqueta = '<div class="etiquetaMapa"><h3> Ubicacion actual </h3></div>';

                    ubicaciones.push({ position: [_LatitudActual, _LongitudActual], icon: '../img/map_marker.png', data: etiqueta });
                }

                if ($('#pnlTipoConvenio input').length == $('#pnlTipoConvenio input:checked').length) {
                    for (var i = 0; i < _ListaConvenio.length; i++) {
                        etiqueta = '<div class="etiquetaMapa"><h3>Nombre: ' + _ListaConvenio[i].NOMBRE + ' </h3>' +
                            '<p>Descripcion: ' + _ListaConvenio[i].BENEFICIO + ' </p>' +
                            '<p>Telefono: ' + _ListaConvenio[i].TELEFONO + ' </p>' +
                            '<p>Punto Autorizado: ' + (_ListaConvenio[i].PUNTO_AUTORIZADO == 0 ? 'SI' : 'NO') + ' </p></div>';

                        ubicaciones.push({ position: [_ListaConvenio[i].LATITUD, _ListaConvenio[i].LONGITUD], icon: '../img/map_dog.png', data: etiqueta });
                    }
                } else {
                    $('#pnlTipoConvenio input:checked').each(function (a, b) {
                        for (var i = 0; i < _ListaConvenio.length; i++) {
                            if ($(b).val() == _ListaConvenio[i].TIPO_ID) {
                                etiqueta = '<div class="etiquetaMapa"><h3>Nombre: ' + _ListaConvenio[i].NOMBRE + ' </h3>' +
                                    '<p>Descripcion: ' + _ListaConvenio[i].BENEFICIO + ' </p>' +
                                    '<p>Telefono: ' + _ListaConvenio[i].TELEFONO + ' </p>' +
                                    '<p>Punto Autorizado: ' + (_ListaConvenio[i].PUNTO_AUTORIZADO == 0 ? 'SI' : 'NO') + ' </p></div>';

                                ubicaciones.push({ position: [_ListaConvenio[i].LATITUD, _ListaConvenio[i].LONGITUD], icon: '../img/map_dog.png', data: etiqueta });
                            }
                        }
                    });
                }

                $('#mapa').gmap3({
                    action: 'init',
                    center: [
                        (_LatitudActual != null || _LatitudActual != undefined ? _LatitudActual : -11.9637802),
                        (_LongitudActual != null || _LongitudActual != undefined ? _LongitudActual : -77.072734)
                    ],
                    zoom: 10,
                    mapTypeId: 'roadmap'
                })
                    .marker(ubicaciones)
                    .infowindow({ content: "Hello from Uluru" })
                    .then(function (infowindow) {
                        var map = this.get(0);
                        var marker = this.get(1);
                        $(marker).each(function () {
                            this.addListener('click', function () {
                                infowindow.setContent(this.data);
                                infowindow.open(map, this);
                            });
                        });

                        //marker.addListener('click', function () {
                        //    infowindow.open(map, marker);
                        //});
                    });

                //$('#mapa').gmap3().marker([
                //    { position: [_latitudActual, _longitudActual], icon: 'img/map_marker.png' },
                //    { position: [-12.0326500, -76.87728], icon: 'img/map_dog.png' },
                //    { position: [-11.79616, -76.97686], icon: 'img/map_dog.png' },
                //    { position: [-11.889027, -77.038159], icon: 'img/map_dog.png' }
                //]);
            },
            error: function (data) { }
        });
    }

    function showPosition(position) {
        if (_ListaTipoConvenio != null && _ListaTipoConvenio != undefined) return false;

        if (position != undefined) {
            _LatitudActual = position.coords.latitude;
            _LongitudActual = position.coords.longitude;
        }

        $.ajax({
            type: "POST",
            url: "servicios.aspx/ListaMapa",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                $("#pnlTipoConvenio").empty();
            },
            success: function (data) {
                _ListaTipoConvenio = data.d.Resultado.TIPOS;
                _ListaConvenio = data.d.Resultado.CONVENIOS;

                var html = '';
                for (var i = 0; i < _ListaTipoConvenio.length; i++) {
                    html += '<label><input type="checkbox" checked="checked" value="' + _ListaTipoConvenio[i].ID + '" /> ' +
                        _ListaTipoConvenio[i].TIPO + '</label><br />';
                }

                $("#pnlTipoConvenio").append(html);

                //$('#mapa').gmap3({
                //    center: [
                //        (_LatitudActual != null || _LatitudActual != undefined ? _LatitudActual : -11.9637802),
                //        (_LongitudActual != null || _LongitudActual != undefined ? _LongitudActual : -77.072734)
                //    ],
                //    zoom: 10,
                //    mapTypeId: google.maps.MapTypeId.ROADMAP
                //});

                showConvenio();
            },
            error: function (data) { }
        });


        $('#pnlTipoConvenio input').click(function () {
            showConvenio();
        });
    }

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        showPosition();
    }
}