
//****************************************************//
//**************** INITIALISATION ********************//
//****************************************************//

// Déclaration des require et du port serveur.
var express 	= require('express'),
	app			= express(),
    server  	= require('http').createServer(app),
    io      	= require('socket.io').listen(server),
    mongoose 	= require('mongoose');


server.listen(process.env.VCAP_APP_PORT || 3000);

//****************************************************//
//******************* DATABASE ***********************//
//****************************************************//

// Connection a Mongoose
mongoose.connect('mongodb://root:05967824@kahana.mongohq.com:10048/sympathy-private');

// Initialisation des Schemas Mongoose
var SchemaPrivate = mongoose.Schema;

var privateSchema = new mongoose.Schema({
	usersID: { type: String },
	created: {type: Date, default: Date.now}
});

var privateMessageModelSchema = new mongoose.Schema({
	room:    {type: String},
	user:    {type: String},
	avatar:  {type: String},
	message: {type: String},
	created: {type: Date, default: Date.now}
});

var salonsMessageSchema = new mongoose.Schema({
	user:    { type: String },
	avatar:  { type: String},
	message: { type: String },
	room:    {type: String},
	created: {type: Date, default: Date.now}
});

var Private = mongoose.model('private', privateSchema),
	MessagePrivate = mongoose.model('privatemsg', privateMessageModelSchema),
	MessageSalons = mongoose.model('roommessage', salonsMessageSchema);


//***************************************************************//
//******************* COMMUNICATON SOCKET ***********************//
//***************************************************************//



io.on('connection', function(socket){


  socket.on('message', function(msg){
   
  	socket.emit('receive',msg);

  });



});



