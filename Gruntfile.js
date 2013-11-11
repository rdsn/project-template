var copyFilter = function(src){ 
  return src.indexOf('scss') == -1 ? true : false;
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
        script: 'server.js'
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      scss: {
        files: ['app/public/css/*.scss'],
        tasks: ['sass:dev']
      }
    },
    sass: {
      build: {
        files: {
          '<%= pkg.name %>/css/main.css': 'app/public/css/main.scss'
        }
      },
      dev: {
        files: {
          '.tmp/css/main.css': 'app/public/css/main.scss'
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
            cwd: 'app/views/pages/',
            dest: '<%= pkg.name %>/',
            src: ['*.jade'], // Actual pattern(s) to match.
            ext: '.html',   // Dest filepaths will have this extension.
          },
        ],
      }
    },
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'app/public/', src: ['**'], dest: '<%= pkg.name %>/', filter: copyFilter},
        ]
      }
    },
    replace: {
      html: {
        src: ['<%= pkg.name %>/*.html'],             // source files array (supports minimatch)
        dest: '<%= pkg.name %>/',             // destination directory or file
        replacements: [{ 
          from: /="\/(?!\/)/g,                   // string replacement
          to: '="' 
        },
        {
            from: /url\(('|")?\//g,
            to: 'url($1'
        }]
      },
      css: {
        src: ['<%= pkg.name %>/css/*.css'],             // source files array (supports minimatch)
        dest: '<%= pkg.name %>/css/',             // destination directory or file
        replacements: [{
            from: /url\(('|")?\//g,
            to: 'url($1../'
        }]
      }
    },
    compress: {
      build: {
        options: {
          archive: '<%= pkg.name %>.zip'
        },
        files: { // do not remove this object (change to only src)!
          src: '<%= pkg.name %>/**'
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
  
  grunt.registerTask('run', [
    'express:dev',
    'watch'
  ]);
  
  grunt.registerTask('build', [
    'sass:build',
    'jade:build',
    'copy:build',
    'clean',
    'replace:html',
    'replace:css',
    'compress:build',
  ]);
  
  grunt.registerTask('default', ['run']);
  
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });
};