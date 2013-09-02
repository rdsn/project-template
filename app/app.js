/*
 * Module dependencies
 */
var express = require('express')
	, sass = require('node-sass')
    , app = express()
    , site = require('./_routes/site')
    , ajaxTesting = require('./_routes/ajaxTesting');
/*function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}*/

app.locals.pretty = true;

app.set('views', __dirname + '/views/pages');
//console.log(app.get('views'));
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(express.bodyParser())

/* doesn't work!!! (%extend)
app.use(sass.middleware({
	src: __dirname + '/public/stylesheets/sass', //where the sass files are 
	dest: __dirname + '/public', //where css should go
	debug: true // obvious
}));
*/

app.use(express.static(__dirname + '/public'))

app.get('/', site.index)
app.get('/:page.html', site.page)
app.all('/ajax/:page', ajaxTesting.page)

app.listen(3000)