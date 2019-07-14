(function () {
    'use strict';

    angular
        .module('buscadorApp')
        .controller('buscadorController', buscadorController)
    buscadorController.$inject = ['$scope', '$interval'];

    function buscadorController($scope, $interval) {

        init();

        function init() {

            const client = stitch.Stitch.initializeDefaultAppClient('buscadorutn-irarn');
            const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('buscador');

            var doQuery = () =>
                db.collection('examenes').find({}, {
                    limit: 100
                }).asArray()

            var thenTwo = docs => {
                console.log("Found docs", docs[0].value);
                $scope.imgData = docs[0].value;
            }

            var errFunc = err => {
                console.error(err)
            }

            $interval(miFuncion, 500);

            function miFuncion() {

                const credential = new stitch.UserApiKeyCredential("Zwnedcd9uCH4xS3UuljVNJCiXvHQKaYVtTl32tHGa8RrCpBzNiajUO3v5lly8Hcf")
                client.auth.loginWithCredential(credential).then(user =>
                    db.collection('examenes').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
                  ).then(doQuery).then(thenTwo).catch(errFunc);
            }


        }
    }
}());