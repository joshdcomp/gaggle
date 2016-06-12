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
      app_css: {
        files: ['assets/in/sass/**/*.scss', 'assets/in/sass/*.scss'],
        tasks: ['sass:app_dev', 'autoprefixer:app']
      },
      app_svg: {
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
      'dev_watch': {
        'options' :{
          'debug': true,
          'watch' : true,
          'keepAlive' : true,
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

    'concurrent': {
      'watch' : {
        'tasks': ['browserify:dev_watch', 'watch:app_css', 'watch:app_svg'],
        'options': {
          'logConcurrentOutput': true
        }
      },
      'prod' : ['browserify:prod', ['sass:app_prod', 'autoprefixer:app'], 'svgstore'],
    }
  });//initConfig

  //-----------------------------------------------------------------------------
  //CUSTOM CLI COMMANDS
  // All tasks we have going in the initconfig should be registered here. Else
  //   the cli won't know what we're asking
  grunt.registerTask(
    'default',
    'Compiles sass, concats js, builds SVG sprite.',
    function(n) {
      var tasklist = ['browserify:dev', 'sass:app_dev', 'autoprefixer:app', 'svgstore'];

      //watch should always be last
      if(grunt.option('watch')) {
        tasklist.push('concurrent:watch')
      }

      grunt.task.run(tasklist);
    }
  );

  grunt.registerTask(
    'js',
    'Concats javascript files,  pass --watch to concat as you go',
    function(n){
      var tasklist = ['browserify:dev'];

      //watch should always be last
      if(grunt.option('watch')) {
        tasklist[0] = 'browserify:dev_watch';
      }

      grunt.task.run(tasklist);
    }
  );


  grunt.registerTask(
    'css',
    'Compiles sass to css. Pass --watch to compile as you go. Pass --ie to build the IE-specific styles',
    function(n){
      var tasklist = ['sass:app_dev', 'autoprefixer:app'];

      //Watch should always be last
      if(grunt.option('watch')) {
        tasklist.push('watch:app_css');
      }

      grunt.task.run(tasklist);
    }
  );

  grunt.registerTask(
    'svg',
    'Combines svg files into a new SVG sprite, pass --watch to combine as you go',
    function(n){
      var tasklist = ['svgstore'];

      //Watch should always be last
      if(grunt.option('watch')) {
        tasklist.push('watch:app_svg');
      }

      grunt.task.run(tasklist);
    }
  );

  grunt.registerTask(
    'heroku',
    'Compiles sass to compressed css, uglifies javascript, creates SVG sprite',
    function(n){
      //runs things at the same time, way faster
      var tasklist = ['concurrent:prod'];
      grunt.task.run(tasklist);
    }
  );
};
