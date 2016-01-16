'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  /* global process */

  // configures browsers to run test against
  // any of [ 'PhantomJS', 'Chrome', 'Firefox', 'IE']
  var TEST_BROWSERS = ((process.env.TEST_BROWSERS || '').replace(/^\s+|\s+$/, '') || 'Chrome').split(/\s*,\s*/g);

  // project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      src: [ 'lib' ],
      options: {
        jshintrc: true
      }
    },

    karma: {
      options: {
        configFile: 'test/config/karma.unit.js'
      },
      single: {
        singleRun: true,
        autoWatch: false,

        browsers: TEST_BROWSERS
      },
      unit: {
        browsers: TEST_BROWSERS
      }
    },

    css_selectors: {
      options: {
        mutations: [
          {search: /^\.pure/g, replace: '.bpmn-questionnaire'}
        ]
      },
      your_target: {
        files: {
          'dist/css/bpmn-questionnaire.css': ['dist/css/bpmn-questionnaire.css'],
        },
      },
    },

    cssmin: {
      concat: {
        files: {
          'dist/css/bpmn-questionnaire.css': [
            'node_modules/purecss/build/base.css',
            //'node_modules/purecss/build/base-context.css',
            'node_modules/purecss/build/buttons.css',
            'node_modules/purecss/build/grids.css',
            'node_modules/purecss/build/grids-responsive.css',
            'assets/css/bpmn-questionnaire-custom.css'
          ]
        }
      },
      minify: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      css: {
        files: 'assets/css/**/*.css',
        tasks: ['build-css']
      },
    }

  });


  // Tasks

  grunt.registerTask('build-css', [ 'cssmin:concat', 'css_selectors', 'cssmin:minify' ]);

  grunt.registerTask('test', [ 'karma:single' ]);

  grunt.registerTask('auto-test', [ 'karma:unit' ]);

  grunt.registerTask('default', [ 'jshint', 'test' ]);

  grunt.registerTask('build', [ 'build-css' ]);

  grunt.registerTask('auto-build', [ 'watch:css' ]);

};