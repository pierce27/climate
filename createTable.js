var pg = require('pg'); 

var name = 'task from node js'
var conString = "postgres://postgres:bigb00bs@localhost/mydb";
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

});

 
client.query("CREATE TABLE IF NOT EXISTS users(username varchar(64), firstname varchar(64), lastname varchar(64), password varchar(100))");
console.log('boobs')

client.query("CREATE TABLE IF NOT EXISTS contacts(id serial PRIMARY KEY, firstName varchar(64), lastName varchar(64), company varchar(64), email varchar(64), temp varchar(64))");

