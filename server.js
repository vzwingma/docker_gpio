var express = require('express');
var app = express();
var extapp = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );  
var exec = require('child_process').exec;

var MODULE = process.env.APP_NAME || "Domotique";

//**********************************
//  Commandes
//**********************************
function executeCommande(commande, response){
	
	var callToProcess = commande.commande + commande.params
	console.log("Execution de [%s]", callToProcess);
	exec('/data/bin/'+callToProcess, 
		function(error, stdout, stderr) {
			// Gestion des erreurs
			if (error !== null) {
				console.info('Erreur lors de l exécution : %s', error);
				response.writeHead(500);
				response.end('{"erreur":"' + stderr + '"}');
			}
			else{
				console.info(stdout);
				response.setHeader('Content-Type', 'application/json');
				response.writeHead(200); // return 200 HTTP OK status
				response.end(stdout);
			  }
		});
}


// Object Commandes
var Commande = function (commande, params) {
    this.commande = commande;
	this.params = params;
};

//**********************************
//  Parsing du body
//**********************************
function getCommandeFromParam(body){
	console.dir(body);
	
	var cmd_params = "";
	var cmd_nbiterations = 1;
	if(body.commande == null){
		console.error("La commande est nulle");
		return null;
	}
	else{
		cmd_commande = body.commande;
		console.info("La commande est %s");
	}
	if(body.params == null || !(body.params instanceof Array)){
		console.info("Les paramètres sont vides")
	}
	else{
		body.params.forEach(function(value){
		  cmd_params += " " + value;
		});
		console.info("Les paramètres sont [" + cmd_params + "]");
	}
	return new Commande(body.commande, cmd_params);
}

//**********************************
//  Mapping HTTP
//**********************************
// Info
app.get('/_info', function (request, response) {
   response.send('Le moteur de commande GPIO [ ' + MODULE + ' ] est opérationnel');
})
extapp.get('/_info', function (request, response) {
   response.send('Le moteur de commande GPIO [ ' + MODULE + ' ] est opérationnel');
})

// Réception de commande POST
app.post('/cmd', function (request, response) {
	console.info("Appel de l'API [/cmd]");	
	var commandeToExec = getCommandeFromParam(request.body)
	if(commandeToExec != null){
		executeCommande(commandeToExec, response);
	}
	else{
		response.set('Content-Type', 'application/json');
		response.writeHead(500);
		response.end('{"erreur":"Les données en entrée sont incorrectes"}');
	}
})
 

// Réception de commande GET
app.get('/cmd/:commande', function (request, response) {
	console.info("Appel de l'API [/cmd/%s]", request.params.commande);
	// Réception commande
	executeCommande(new Commande(request.params.commande, ""), response);
})


// Lancement du serveur HTTP interne
var server = app.listen(9000, function () {
   console.info("Service Interne GPIO [" + MODULE + "] démarré");
})
// Lancement du serveur HTTP externe
var extserver = extapp.listen(9100, function () {
	console.info("Service Externe GPIO [" + MODULE + "] démarré");
})
