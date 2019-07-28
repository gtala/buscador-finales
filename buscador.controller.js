(function () {
    'use strict';

    angular
        .module('buscadorApp')
        .controller('buscadorController', buscadorController)
    buscadorController.$inject = ['$scope', '$interval', 'QrScanner'];

    function buscadorController($scope, $interval, QrScanner) {
        //console.log(QrScanner)
        init();

        function init() {

            const client = stitch.Stitch.initializeDefaultAppClient('buscadorutn-irarn');
            const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('buscador');

            var doQuery = () =>
                db.collection('examenes').find({}, {
                    limit: 100
                }).asArray()

            var thenTwo = docs => {
                console.log("Found docs", docs[0]);
                $scope.imgData = docs[0].value;

                var image = document.getElementsByTagName('img')[0];
                //console.log(image)
                QrScanner.scanImage(image).then(result => {
                    $scope.result = result
                    if (result == $scope.imgData.value_bluetooth) {
                        alert("Match!");
                    }
                }).catch(error => console.log(error || 'No QR code found.'));

            }

            var errFunc = err => {
                console.error(err)
            }

            $interval(miFuncion, 500);

            function miFuncion() {
                const credential = new stitch.UserApiKeyCredential("Zwnedcd9uCH4xS3UuljVNJCiXvHQKaYVtTl32tHGa8RrCpBzNiajUO3v5lly8Hcf")
                client.auth.loginWithCredential(credential).then(doQuery).then(thenTwo).catch(errFunc);
            }


        }
    }
}());