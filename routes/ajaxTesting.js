exports.page = function(req, res){
  if(req.params.page == 'status'){
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.send('{"text": "' + req.body.text + '"}');
  }
  else if(req.params.page == 'cities'){
    var cities = require('../src/public/ajax/cities');
    res.send(cities);
  }
};