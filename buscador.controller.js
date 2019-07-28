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


            var updateData = () => {

                const query = {
                    "owner_id": "5d2b68d90bee4f2bbdd35386"
                };

                const update = {
                    "$set": {
                        "match": true
                    }
                };
                const options = {
                    "upsert": false
                };

                db.collection('examenes').updateOne(query, update, options)
            }



            var thenTwo = docs => {
                console.log("Found docs", docs[0]);

                var data = docs[0];
                $scope.imgData = data.value;

                var image = document.getElementsByTagName('img')[0];
                //console.log(image)
                QrScanner.scanImage(image).then(result => {
                    $scope.result = result
                    if (result == data.value_bluetooth) {
                        alert("Match!");
                        const credential = new stitch.UserApiKeyCredential("Zwnedcd9uCH4xS3UuljVNJCiXvHQKaYVtTl32tHGa8RrCpBzNiajUO3v5lly8Hcf")
                        client.auth.loginWithCredential(credential).then(updateData)
                        console.log("updated!")
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