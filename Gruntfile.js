// This was set up using the help of this tut:
//http://merrickchristensen.com/articles/gruntjs-workflow.html
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      app: {
        options: {
          browsers: ['last 2 versions', 'ie 8', 'ie 9'],
          cascade: true,
          safe: false,//safe, while well-intentioned, is…just not a good idea
        },
        src: 'assets/out/css/app.css',
        dest: 'assets/out/css/app.css',
      },
    },

    sass: {
      app_dev: {
        files:{
          'assets/out/css/app.css' : 'assets/in/sass/index.scss'
        }
      },

      app_prod: {
        options:{
          style: 'compressed'
        },
        files: {
          'assets/out/css/app.css' : 'assets/in/sass/index.scss'
        }
      }
    },

    //watch for stuff when we save
    watch: {
      app_js: {
        files: ['assets/in/js/**/*', 'web_modules/**/*'],
        tasks: ['browserify']
      },

      app_css: {
        files: ['assets/in/sass/**/*.scss', 'assets/in/sass/*.scss'],
        tasks: ['sass:app_dev', 'autoprefixer:app']
      },
      svg: {
        files: ['assets/in/svg/*.svg'],
        tasks: ['svgstore'],
      },
    },

    svgstore: {
      options: {
        prefix : '_icon-',
        svg: {
          display: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
        },
        includedemo: true,
      },
      default : {
        files: {
          'assets/out/svg/sprite.svg' : ['assets/in/svg/*.svg'],
        }
      }
    },
    browserify: {
      'dev' : {
        'options' :{
          'debug': true,
          'transform': [['babelify', {presets: ['es2015', 'react']}]]
        },
        'files': {
          'assets/out/js/app.js': ['assets/in/js/index.jsx']
        },
      },
      'prod' : {
        'options' :{
          'debug': false,
          'transform': [['babelify', {presets: ['es2015', 'react']}]]
        },
        'files': {
          'assets/out/js/app.js': ['assets/in/js/index.jsx']
        },
      },
    },
  });//initConfig

  //-----------------------------------------------------------------------------
  //CUSTOM CLI COMMANDS
  // All tasks we have going in the initconfig should be registered here. Else
  //   the cli won't know what we're asking
  grunt.registerTask('default', 'Compiles sass, concats js, builds SVG sprite.', function(n) {
    var tasklist = ['sass:app_dev', 'autoprefixer:app', 'svgstore', 'browserify:dev'];

    //watch should always be last
    if(grunt.option('watch')) {
      tasklist.push('watch')
    }

    grunt.task.run(tasklist);
  });

  grunt.registerTask('js', 'Concats javascript files,  pass --watch to concat as you go', function(n){
    var tasklist = ['browserify:dev'];

    //watch should always be last
    if(grunt.option('watch')) {
      tasklist.push('watch:app_js');
    }

    grunt.task.run(tasklist);
  });


  grunt.registerTask('css', 'Compiles sass to css. Pass --watch to compile as you go. Pass --ie to build the IE-specific styles', function(n){
    var tasklist = ['sass:app_dev', 'autoprefixer:app'];

    if(grunt.option('ie')) {
      tasklist.push('gapp_ie');
    }

    //Watch should always be last
    if(grunt.option('watch')) {
      tasklist.push('watch:app_css');
    }

    grunt.task.run(tasklist);
  });

  grunt.registerTask('svg', 'Combines svg files into a new SVG sprite, pass --watch to combine as you go', function(n){
    var tasklist = ['svgstore'];

    //Watch should always be last
    if(grunt.option('watch')) {
      tasklist.push('watch:svg');
    }

    grunt.task.run(tasklist);
  });

  grunt.registerTask('prod', 'Compiles sass to compressed css, uglifies javascript, creates SVG sprite', function(n){
    var tasklist = ['browserify:prod', 'sass:app_prod', 'svgstore', 'autoprefixer:app'];
    grunt.task.run(tasklist);
  });
};
