(function () {
    'use strict';

    angular
        .module('buscadorApp')
        .controller('buscadorController', buscadorController)
    buscadorController.$inject = ['$scope', '$window', 'buscadorService'];

    function buscadorController($scope, $window, buscadorService) {

        init();

        function init() {

            $scope.finales = {};
            $scope.buscar = _buscarFinal;
            $scope.irAlForo = _irAlForo;
            $scope.agregarFinalClick = _agregarFinalClick;

            _listarFinales();

            function _agregarFinalClick() {
                $scope.isInCallback = true;
                _agregarFinal();
            }

            function _agregarFinal() {

                buscadorService.postNuevoFinalMongo($scope.nuevoFinal).then(() => {
                    _listarFinales();
                }).catch(err => {
                    console.error(err)
                });
            }

            function _listarFinales() {
                buscadorService.getListadoFinalesMongo().then(docs => {
                        $scope.finales.datos = docs;
                        console.table(docs);
                        $scope.isInCallback = false;
                    }).catch(err => {
                        console.error(err)
                    })
                    .finally(function () {
                        $scope.$apply();
                    });
            }

            function _irAlForo(final) {
                $window.open(final.urlForo, '_blank');
            }

            function _buscarFinal(filter) {
                return function (final) {
                    if (filter) {
                        return final.materia.includes(filter.criterioMateria);
                    }
                    return true;
                }
            }
        }
    }
}());