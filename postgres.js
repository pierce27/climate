var pg = require('pg'); 
//or native libpq bindings
//var pg = require('pg').native
var bcrypt = require('bcrypt');

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
  client.query("SELECT * FROM users WHERE username='" + User.email + "'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }


      if(result.rows.length < 1){
        console.log('no user')
        return false

      } else{
        if(bcrypt.compareSync(User.password, result.rows[0].password)){
          console.log('here they are')
          console.log(result.rows[0]);
          theUser = result.rows[0];
          return done(null, theUser);
        } else {
          console.log('wrong password')
          return 0;
        }
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
      }

  //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    // client.end();
  });
}



exports.createLocal= function(User, done){  
  console.log(User)
  client.query("SELECT * FROM users WHERE username='" + User.email + "' AND password='" + User.password + "'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }


      if(result.rows.length < 1){
        // bcrypt.hash(User.password, 8, function(err, hash) {hash_password = hash; console.log(hash)});
        var hash_password = bcrypt.hashSync(User.password, 8);
        console.log(hash_password)

        client.query("INSERT INTO users VALUES($1, $2, $3, $4)", [User.email, User.name.firstName, User.name.lastName, hash_password], function(err, result){
          console.log('new user created')
          console.log(result.rows[0]);
          theUser = result.rows[0];
          return done(null, theUser);
        })




      } else{

    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
        console.log('user exists')
        return 0
      }

  //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    // client.end();
  });
}






exports.findUser= function(uid, done){ 

  client.query("SELECT * FROM users WHERE username='" + uid +"'", function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }

      if(result.rows.length < 1){
        console.log('no user')
        return done(null, false)

      } else{

        console.log(result.rows[0]);
        theUser = result.rows[0];
        return done(null, theUser);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
      }
  });

}





// client.query("CREATE TABLE IF NOT EXISTS users(username varchar(64), firstname varchar(64), lastname varchar(64), password varchar(100))");

// client.query("INSERT INTO users (uid, firstname, lastname, password) values($1, $2, $3, $4)", ['aspierce27@gmail.com', 'Ronald', 'McDonald', 'password']);
