
module.exports.checkAuthenticated = function (req, res, next){
  if (req.isAuthenticated() == false){
  	console.log('not logged in')
    res.redirect('/login')
    console.log(req.isAuthenticated())


  } else {
  	req.session.cookie.maxAge = 5 * 60 * 1000;
  	res.redirect('/main')

  }
}



module.exports.ensureAuthenticated = function (req, res, next){
  if (req.isAuthenticated() == false){
    console.log('not logged in')
    res.redirect('/login')
    console.log(req.isAuthenticated())


  } else {
    req.session.cookie.maxAge = 5 * 60 * 1000;
    next()

  }
}