(function () {
    'use strict';

    angular
        .module('buscadorApp')
        .service('buscadorService', buscadorService)

    buscadorService.$inject = ['$http'];


    const client = stitch.Stitch.initializeDefaultAppClient('buscadorutn-irarn');
    const db = client.getServiceClient(stitch.RemoteMongoClient.factory, 'mongodb-atlas').db('buscador');

    function buscadorService($http) {

        this.getListadoFinales = _getListadoFinales;
        this.getListadoFinalesMongo = _getListadoFinalesMongo;
        this.postNuevoFinalMongo = _postNuevoFinalMongo;
    }

    function _postNuevoFinalMongo(_nuevoFinal) {
        return client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
            db.collection('examenes').insertOne(angular.merge(_nuevoFinal, {
                owner_id: client.auth.user.id
            }))
        );
    }

    function _getListadoFinalesMongo() {
        return client.auth.loginWithCredential(new stitch.AnonymousCredential()).then(user =>
            db.collection('examenes').find({
               // owner_id: client.auth.user.id
            }, {
                limit: 100
            }).asArray()
        );
    }

    function _getListadoFinales() {

        function Final(fecha, link, imagenLink, tema) {
            this.materia = 'Arquitectura de C.';
            this.fecha = fecha;
            this.tema = tema;
            this.link = link;
            this.imagen = imagenLink;
        }

        return [
            new Final(' 01/12/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arquitectura-de-computadores-01-12-16-resuelto', 'http://www.utnianos.com.ar/foro/attachment.php?aid=14265'),
            new Final('12/07/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-12-07-16', 'http://www.utnianos.com.ar/foro/attachment.php?aid=14257'),
            new Final('26/07/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-arquitectura-de-computadoras-final-26-07-2016', 'http://www.utnianos.com.ar/foro/attachment.php?aid=13708'),
            new Final('06/10/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-de-arquitectura-06-10-16', ''),
            new Final('01/03/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadores-01-03-16', ''),
            new Final('23/02/2016', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadores-23-02-2016', 'http://i65.tinypic.com/hx6olu.jpg'),
            new Final('16/02/2016', 'http://www.utnianos.com.ar/foro/tema-aporte-final-de-arquitectura-16-02-16-resuelto', 'http://www.utnianos.com.ar/foro/attachment.php?aid=12507'),
            new Final('09/11/2015', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arq-de-computadores-09-11-15', 'https://k33.kn3.net/1/A/5/7/F/7/DD4.jpg'),
            new Final('02/12/2015', 'http://www.utnianos.com.ar/foro/tema-aporte-final-02-12-2015-arquitectura-de-computadoras', ''),
            new Final('28/07/2015', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arquitectura-de-computadore-28-07-2015', 'http://www.utnianos.com.ar/foro/attachment.php?aid=12742'),
            new Final('16/02/2015', 'http://www.utnianos.com.ar/foro/tema-pedido-final-de-arquitectura-de-computadoras-16-12-2015', 'http://www.utnianos.com.ar/foro/attachment.php?aid=12084'),
            new Final('24/02/2015', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arquitectura-de-computadoras-24-02-2015-resuelto', 'https://fbcdn-sphotos-h-a.akamaihd.net/hphotos-ak-xfp1/t31.0-8/10997303_10152784352256936_6083044882150380806_o.jpg'),
            new Final('10/02/2015', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadoras-10-02-2015', 'http://i.imgur.com/LDZ3mfA.jpg'),
            new Final('14/07/2015', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadoras-14-07-2015', 'http://www.utnianos.com.ar/foro/attachment.php?aid=11327'),
            new Final('03/03/2015', 'http://www.utnianos.com.ar/foro/tema-final-de-arquitectura-del-3-3-2015-tema-2', ''),
            new Final('16/07/2014', 'http://www.utnianos.com.ar/foro/tema-final-16-07-14-arquitectura-de-computadoras', ''),
            new Final('30/07/2014', 'http://www.utnianos.com.ar/foro/tema-pedido-final-arquitectura-de-computadores-30-07-14', 'http://www.utnianos.com.ar/foro/attachment.php?aid=9331'),
            new Final('10/12/2014', 'http://www.utnianos.com.ar/foro/tema-aporte-arquitectura-final-10-12-2014-resuelto-y-explicado', 'http://www.utnianos.com.ar/foro/attachment.php?aid=9988'),
            new Final('20/02/2014', 'http://www.utnianos.com.ar/foro/tema-aporte-final-arquitectura-20-02-2014', 'http://www.utnianos.com.ar/foro/attachment.php?aid=8266'),
            new Final('04/12/2013', 'http://www.utnianos.com.ar/foro/tema-aporte-finales-no-resueltos-de-arquitectura-de-computadores-2013-2014', 'http://www.utnianos.com.ar/foro/attachment.php?aid=9892'),
            new Final('27/02/2013', 'http://www.utnianos.com.ar/foro/tema-aporte-finales-no-resueltos-de-arquitectura-de-computadores-2013-2014', 'http://www.utnianos.com.ar/foro/attachment.php?aid=9893'),
            new Final('30/07/2013', 'http://www.utnianos.com.ar/foro/tema-aporte-finales-no-resueltos-de-arquitectura-de-computadores-2013-2014', 'http://www.utnianos.com.ar/foro/attachment.php?aid=9894'),
            new Final('01/10/2014', 'http://www.utnianos.com.ar/foro/tema-final-arquitectura-de-computadoras-1-10-2014', 'http://www.utnianos.com.ar/foro/attachment.php?aid=7451'),
            new Final('26/02/2014', 'http://www.utnianos.com.ar/foro/tema-26-02-2014-final-2-temas-resueltos-por-catedra', 'http://www.utnianos.com.ar/foro/attachment.php?aid=8364'),
            new Final('26/02/2014', 'http://www.utnianos.com.ar/foro/tema-26-02-2014-final-2-temas-resueltos-por-catedra', 'http://www.utnianos.com.ar/foro/attachment.php?aid=8365'),

        ]
    }

}());