function Final(fecha, link, imagenLink, tema) {
    this.materia = 'Arquitectura de C.';
    this.fecha = fecha;
    this.tema = tema;
    this.link = link;
    this.imagen = imagenLink;
}

//
var app = angular.module('app', []);


var listadoFinales = [
    new Final(' 01/12/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arquitectura-de-computadores-01-12-16-resuelto', 'http://www.utnianos.com.ar/foro/attachment.php?aid=14265'),
    new Final('12/07/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-12-07-16', 'http://www.utnianos.com.ar/foro/attachment.php?aid=14257'),
    new Final('26/07/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-arquitectura-de-computadoras-final-26-07-2016', 'http://www.utnianos.com.ar/foro/attachment.php?aid=13708'),
    new Final('06/10/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-de-arquitectura-06-10-16', ''),
    new Final('01/03/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadores-01-03-16', ''),
    new Final('23/02/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadores-23-02-2016', 'http://i65.tinypic.com/hx6olu.jpg'),
    new Final('16/02/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-de-arquitectura-16-02-16-resuelto', 'http://www.utnianos.com.ar/foro/attachment.php?aid=12507')

];

app.controller('MainCtrl', function($scope) {
    $scope.finales = listadoFinales;
    $scope.buscar = function(criterio) {
        return function(final) {
            if (criterio != undefined && criterio != null && criterio != "") {
                return final.fecha.includes(criterio);
            }
            else {
                return true;
            }
        };
    }
});
