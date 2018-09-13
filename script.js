function xhrSuccess() { this.callback.apply(this, this.arguments); }

function loadJSON (URL, fCallback, tipo) {
        
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

        var oReq = new XMLHttpRequest();

        oReq.callback = fCallback;
      	oReq.arguments = Array.prototype.slice.call(arguments, 2);
		oReq.onload = xhrSuccess;

        oReq.open('GET', URL, true);
		oReq.send(null);

}

function getMarcasIds (tipo) {
 
 	var id = [];
 	var data = JSON.parse(this.responseText);
 	
 	for(var j in data) {
 		//sleep(1000);
 		loadJSON( 'http://fipeapi.appspot.com/api/1/' + tipo + '/veiculos/' + data[j].id + '.json', getVeiculos );

	}
 
 }

function getVeiculos () {

	var veiculos = [];
	var data = JSON.parse(this.responseText);

	for(var j in data) {

		veiculos.push(data[j]);

	}

	console.log(veiculos);


}

function processVeiculos () {

	var tipo = [ 'carros', 'motos', 'caminhao' ];

	console.log('Buscando veiculos da tabela FIPE');

	for(i in tipo) {

		var veiculos_temp = [];
		loadJSON( 'http://fipeapi.appspot.com/api/1/' + tipo[i] + '/marcas.json', getMarcasIds, tipo[i] );
	}

}