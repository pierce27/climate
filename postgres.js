var pg = require('pg'); 
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://postgres:uhbijnm@localhost/mydb";

var name = 'task from node js'

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

});


exports.findLocal= function(User, done){  
  console.log(User)
  client.query("SELECT * FROM users WHERE uid='" + User.email + "' AND password='" + User.password + "'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }


      if(result.rows.length < 1){
        console.log('no user')
        return 0

      } else{
        console.log('here they are')
        console.log(result.rows[0]);
        theUser = result.rows[0];
        return done(null, theUser);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
      }

  //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    // client.end();
  });
}

exports.findUser= function(uid, done){ 

  client.query("SELECT * FROM users WHERE uid='" + uid +"'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      if(result.rows.length < 1){
        console.log('no user')
        return 0

      } else{

        console.log(result.rows[0]);
        theUser = result.rows[0];
        return done(null, theUser);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
      }
  });

}





client.query("CREATE TABLE IF NOT EXISTS users(uid varchar(64), firstname varchar(64), lastname varchar(64), password varchar(64))");

// client.query("INSERT INTO users (uid, firstname, lastname, password) values($1, $2, $3, $4)", ['aspierce27@gmail.com', 'Ronald', 'McDonald', 'password']);
