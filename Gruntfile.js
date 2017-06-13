'use strict';

var request = require('request');

module.exports = function (grunt) {

  // Add Source Files to Index
  grunt.loadNpmTasks('grunt-include-source');

  // Time how long tasks take.  Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var liveReloadPort = 35729,
      appConfig = {
        app: 'app',
        debug: 'debug',
        dist: 'dist'
      },
      files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    yeoman: appConfig,

    includeSource: {
      options: {
        basePath: 'app',
        baseUrl: '/',
      },
      server: {
        files: {
          '.tmp/index.html': '<%= yeoman.app %>/views/layout.pug'
        }
      },
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': '<%= yeoman.app %>/views/layout.pug'
        }
      },
      app: {
        files: {
          '<%= yeoman.app %>/index.html' : '<%= yeoman.app %>/views/layout.pug'
        }
      }
    },

    develop: {
      server: {
        file: 'bin/www'
      }
    },
    sass: {
      debug: {
        files: [{
          expand: false,
          cwd: 'app/public/styles/sass',
          src: ['main.scss'],
          dest: 'app/public/styles',
          ext: '.css',
          lineNumbers: true
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/public/styles/sass',
          src: ['*.scss'],
          dest: 'app/public/styles',
          ext: '.css',
          sourcemap: false,
          lineNumbers: false
        }]
      }
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'includeSource:app']
      },
      options: {
        nospawn: true,
        livereload: liveReloadPort
      },
      server: {
        files: [
        'bin/www',
        'app/app.js',
        'app/routes/**/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      js: {
        files: ['app/public/js/*.js'],
        options: {
          livereload: liveReloadPort
        }
      },
      css: {
        files: [
        'app/public/styles/sass/*.scss'
        ],
        tasks: ['sass'],
        options: {
          livereload: liveReloadPort
        }
      },
      views: {
        files: ['app/views/*.pug'],
        options: {
          livereload: liveReloadPort
        }
      }
    }
  });

  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted', function() {
    var done = this.async();
    setTimeout(function() {
      request.get('http://localhost' + liveReloadPort + '/changed?files=' + files.join(','), function (err, res) {
        var reloaded = !err && res.statusCode === 200;
        if (reloaded) {
          grunt.log.ok('Delayed live reload successful.');
        } else {
          grunt.log.error('Unable to execute task delayed-livereload.');
        }
        done(reloaded);
      });
    }, 500);
  });

  grunt.registerTask('default', [
    'sass',
    'develop',
    'watch'
  ]);

};
