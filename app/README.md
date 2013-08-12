Prerequisites
-------------
1. node.js (http://nodejs.org/download/)
2. grunt ($ npm install -g grunt-cli)
3. ruby (http://rubyinstaller.org/downloads/)
4. rubygems (http://rubygems.org/pages/download)
5. sass ($ gem install sass)

Installing
----------
$ npm install

Using
-----
1. $ grunt
2. http://localhost:3000/

Build
-----
$ grunt build

Notes
-----
1. /ajax/ indicates that there is no such a page actually
2. testing ajax:
  1) 'ajax/cities' + (Math.round(Math.random() * (5 - 1)) + 1) + '.json';
  2) /ajas/NEWURI -> edit routes/ajaxTesting.js

TODO
----
1. smth