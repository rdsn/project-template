exports.index = function(req, res){
  res.render('index');
};

exports.page = function(req, res){
	res.render(req.params.page);
};