var pg = require('pg'); 
//or native libpq bindings
//var pg = require('pg').native
var bcrypt = require('bcrypt');

var conString = "postgres://postgres:uhbijnm@localhost/mydb";

var name = 'task from node js'

var client = new pg.Client("postgres://ubcgvwqlihjhgn:O0R18RUmBXFF008Ov82kA0A-Qc@ec2-54-204-41-178.compute-1.amazonaws.com:5432/d97qd3ij7nr250");
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
          var theUser = result.rows[0];
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

        // console.log(result.rows[0]);
        var theUser = result.rows[0];
        console.log('DESERIALIZE')
        console.log(theUser);
        return done(null, theUser);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      // client.end();
      }
  });

}




exports.createContact = function(req, res, next){

  console.log('creating')
  console.log(req.body)

  client.query("INSERT INTO contacts (firstname, lastname, company, email, temp) values($1, $2, $3, $4, $5)", [req.body.firstName, req.body.lastName, req.body.company, req.body.email, req.body.temp], function(err, result){

    console.log(result);
    res.jsonp(result.rows);

  });

}



exports.getContacts = function(req, res, next){

  client.query("SELECT * FROM contacts", function(err, result){

    res.jsonp(result.rows);

  })
}





client.query("CREATE TABLE IF NOT EXISTS users(username varchar(64), firstname varchar(64), lastname varchar(64), password varchar(100))");

client.query("CREATE TABLE IF NOT EXISTS contacts(id serial PRIMARY KEY, firstName varchar(64), lastName varchar(64), company varchar(64), email varchar(64), temp varchar(64))");

// client.query("INSERT INTO users (uid, firstname, lastname, password) values($1, $2, $3, $4)", ['aspierce27@gmail.com', 'Ronald', 'McDonald', 'password']);







