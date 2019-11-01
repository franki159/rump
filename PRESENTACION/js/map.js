var _ListaTipoConvenio, _ListaConvenio, _LatitudActual, _LongitudActual;

if ($('#mapa')) {
    function showConvenio() {
        var ubicaciones = [];

        if (_LatitudActual != null && _LatitudActual != undefined) {
            ubicaciones.push({ position: [_LatitudActual, _LongitudActual], icon: '../img/map_marker.png' });
        }

        if ($('#pnlTipoConvenio input').length == $('#pnlTipoConvenio input:checked').length) {
            for (var i = 0; i < _ListaConvenio.length; i++) {
                ubicaciones.push({ position: [_ListaConvenio[i].LATITUD, _ListaConvenio[i].LONGITUD], icon: '../img/map_dog.png' });
            }
        } else {
            $('#pnlTipoConvenio input:checked').each(function (a, b) {
                for (var i = 0; i < _ListaConvenio.length; i++) {
                    if ($(b).val() == _ListaConvenio[i].TIPO_ID) {
                        ubicaciones.push({ position: [_ListaConvenio[i].LATITUD, _ListaConvenio[i].LONGITUD], icon: '../img/map_dog.png' });
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
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        $('#mapa').gmap3().marker(ubicaciones);

        //$('#mapa').gmap3().marker([
        //    { position: [_latitudActual, _longitudActual], icon: 'img/map_marker.png' },
        //    { position: [-12.0326500, -76.87728], icon: 'img/map_dog.png' },
        //    { position: [-11.79616, -76.97686], icon: 'img/map_dog.png' },
        //    { position: [-11.889027, -77.038159], icon: 'img/map_dog.png' }
        //]);
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