var copyFilter = function(src){ 
  return src.indexOf('stylesheets') == -1 ? true : false;
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    express: {
      options: {
        background: true,
      },
      dev: {
        options: {
        script: 'app.js'
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      scss: {
        files: ['public/stylesheets/sass/*.scss'],
        tasks: ['sass:dev']
      }
    },
    sass: {
      dev: {
        files: {
          'public/css/main.css': 'public/stylesheets/sass/main.scss'
        },
      }
    },
    jade: {
      build: {
        options: {
          pretty: true
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'views/pages/',
            dest: '../<%= pkg.name %>/',
            src: ['*.jade'], // Actual pattern(s) to match.
            ext: '.html',   // Dest filepaths will have this extension.
          },
        ],
      }
    },
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'public/', src: ['**'], dest: '../<%= pkg.name %>/', filter: copyFilter},
        ]
      }
    },
    replace: {
      html: {
        src: ['../<%= pkg.name %>/*.html'],             // source files array (supports minimatch)
        dest: '../<%= pkg.name %>/',             // destination directory or file
        replacements: [{ 
          from: /="\/(?!\/)/g,                   // string replacement
          to: '="' 
        }]
      },
      css: {
        src: ['../<%= pkg.name %>/css/*.css'],             // source files array (supports minimatch)
        dest: '../<%= pkg.name %>/css/',             // destination directory or file
        replacements: [{
            from: /url\(('|")?\//g,
            to: 'url($1../'
        }]
      }
    },
    compress: {
      build: {
        options: {
          archive: '../<%= pkg.name %>.zip'
        },
        files: { // do not remove this object (change to only src)!
          src: '../<%= pkg.name %>/**'
        }
      }
    },
    clean: [".sass-cache"]
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  grunt.registerTask('serv', [
    'express:dev',
    'watch'
  ]);
  
  grunt.registerTask('run', [
    'jade:dev',
    'sass:dev',
    'copy:js',
    'copy:images',
    'copy:staticFiles',
    'copy:moduleJs',
    'copy:moduleImages',
    'watch'
  ]);
  grunt.registerTask('build', [
    'jade:build',
    'copy:build',
    'clean',
    'replace:html',
    'replace:css',
    'compress:build',
  ]);
  //grunt.registerTask('default', ['run']);
  grunt.registerTask('default', ['serv']);
  
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });
};