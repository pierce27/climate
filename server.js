var express = require('express');
var http = require('http');
// var auth = require('./auth')
var MongoStore = require('connect-mongodb');
var p = require('./postgres')
var app = express();
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var engines = require('consolidate');


app.configure(function() {
  app.use(express.cookieParser('andrewsecret'));
  app.use(express.bodyParser());
  app.use(express.session({ cookie: {maxAge: 10000}, store: new MongoStore({url: ' mongodb://heroku:3d1213460eccbae93d6afa6b68aa9155@paulo.mongohq.com:10004/app19533669'})  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  app.set('views', __dirname + '/views');
  app.engine('html', engines.ejs);
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/resources'));
});


passport.use('localSignUp', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, username, password, done){

    console.log(req.body)
    console.log('local')
    
    var User = req.body;
    p.createLocal(User, done)
}));



passport.use('localSignIn', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
    function(req, username, password, done){

    console.log(req.body)
    console.log('local')
    
    var User = req.body;
    p.findLocal(User, done)
}));





passport.serializeUser(function(user, done) {

       console.log('serialized');
       console.log(user)

       //Look for User, if none exists create and serialize, if one exists serialize it
       // findOrCreate(user, done);
       done(null, user.username);


});

passport.deserializeUser(function(id, done) {
	console.log('deserialize');

  // console.log('id: ' + id);

  p.findUser(id, done)

  // m.User.find({_id: id}, function(err,user){
  //   // console.log("FOUND USER: " + user)
  //   done(null, user);

  //   });
  

});



// app.get("/", auth.checkAuthenticated)

//MAIN RENDER
// app.get("/main", auth.ensureAuthenticated, auth.roleRender)
app.get("/main", function(req, res){res.render('index.html'); console.log("rendered")})

app.get("/", function(req, res, next){console.log('here in /'); res.render('login.html'); console.log('rendererd index')})

//INITIAL USER
app.get("/login", function(req, res){res.render('login.html'); console.log("rendered")})

app.get('/logout', function(req, res){
  console.log('loggin out')
  // req.logout();
  res.redirect('/login');
});

// app.get("/setup", auth.ensureAuthenticated,  function(req, res){res.render('setup.html')})

// app.post("/setup", function(req,res, next){m.saveProfile(req, res, next)})

app.post('/signup',
  passport.authenticate('localSignUp', { successRedirect: '/main',
                                   failureRedirect: '/login'})
);

app.post('/signin',
  passport.authenticate('localSignIn', { successRedirect: '/main',
                                   failureRedirect: '/login'})
);


//GET DATA FOR MAIN
app.get("/getContacts", p.getContacts);


//CRUD DATA FROM MAIN
app.post("/newContact", p.createContact);







var port = 3000;

app.listen(process.env.PORT || port);
console.log('Listening on port ' + process.env.PORT);







