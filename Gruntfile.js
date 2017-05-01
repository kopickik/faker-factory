'use strict';

var request = require('request');

module.exports = function (grunt) {

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var liveReloadPort = 35729,
  files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    sass: {
      dist: {
        files: {
          'app/public/stylesheets/main.css': 'app/public/stylesheets/sass/main.scss'
        }
      }
    },
    watch: {
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
        'app/public/sass/*.scss'
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
