function Final(fecha, link, imagenLink, tema) {
    this.materia = 'Arquitectura de C.';
    this.fecha = fecha;
    this.tema = tema;
    this.link = link;
    this.imagen = imagenLink;
}

var app = angular.module('app', []);


var listadoFinales = getListadoFinales();

app.controller('MainCtrl', function($scope, $window) {
    $scope.finales = listadoFinales;
    $scope.buscar = buscarFinal;
    $scope.irAlForo = function(final) {
        $window.open(final.link, '_blank');
    }
});

function buscarFinal(criterio) {
    return function(final) {
        if (criterio != undefined && criterio != null && criterio != "") {
            return final.fecha.includes(criterio);
        }
        else {
            return true;
        }
    };
}
