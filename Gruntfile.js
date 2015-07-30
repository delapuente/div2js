module.exports = function(grunt) {
  'use strict';

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  var srcFiles = [
    '<%= dirs.src %>/**/*.js'
  ];

  var grammarFile = [
    '<%= dirs.src %>/grammar.y'
  ];

  var demoSrcFiles = [
    '<%= dirs.demo %>/scripts/**/*.js'
  ];

  var specFiles = [
    '<%= dirs.spec %>/**/*.js',
    '<%= dirs.spec %>/**/*.json',
    '<%= dirs.spec %>/**/*.prg'
  ];

  var banner = [
    '/**',
    ' * @license',
    ' * <%= libname %> - v<%= pkg.version %>',
    ' * Copyright (c) 2014, Salvador de la Puente',
    ' * <%= pkg.homepage %>',
    ' *',
    ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
    ' *',
    ' * <%= libname %> is licensed under the <%= pkg.license %> License.',
    ' * <%= pkg.licenseUrl %>',
    ' */',
    ''
  ].join('\n');

  grunt.initConfig({

    libname: '<%= pkg.name %>',

    dirs: {
      src: 'src',
      bin: 'dist',
      build: 'build',
      demo: 'demo',
      docs: 'docs',
      test: 'test',
      spec: '<%= dirs.test %>/spec',
      tmp: '.tmp'
    },

    files: {
      testRunner: '<%= dirs.test %>/spec_runner.js',
      build: '<%= dirs.bin %>/<%= libname %>.js',
      buildMin: '<%= dirs.bin %>/<%= libname %>.min.js',
      preBuild: '<%= dirs.tmp %>/<%= libname %>.js',
      intro: '<%= dirs.build %>/_intro.js',
      outro: '<%= dirs.build %>/_outro.js'
    },

    pkg: grunt.file.readJSON('package.json'),

    jison: {
      target: {
        options: { moduleType: 'amd' },
        files: { '<%= dirs.src %>/div2lang.js' : '<%= dirs.src %>/grammar.y' }
      }
    },

    clean: {
      docs: {
        src: ['docs/*']
      },
      dist: {
        src: ['dist/*']
      },
      temp: {
        src: ['.tmp/*']
      }
    },

    concat: {
      options: {
        separator: '\n\n'
      },
      pack: {
        src: [
          '<%= files.intro %>',
          '<%= files.preBuild %>',
          '<%= files.outro %>'
        ],
        dest: '<%= files.build %>',
        options: { process: true }
      }
    },

    connect: {
      options: {
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0',
        open: true
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: function(connect) {
            return [
              connect().use('/src', connect.static('src')),
              connect.static('test')
            ];
          }
        }
      },
      debug: {
        options: {
          port: 9002,
          livereload: 35729,
          middleware: function(connect) {
            return [
              connect().use('/src', connect.static('src')),
              connect().use('/test/spec/samples', connect.static('test/spec/samples')),
              connect.static('test')
            ];
          }
        }
      }
    },

    copy: {
      pack: {
        expand: true,
        cwd: '<%= dirs.tmp %>',
        src: '*.map',
        dest: '<%= dirs.bin %>/',
        options: {
          process: function (content) {
            var target = '"mappings": "';
            var offset = 45; // line count of build/_intro.js + 2 from concat
            var padding = new Array(offset + 1).join(';');
            return content.replace(target, target + padding);
          }
        }
      }
    },

    jshint: {
      files: srcFiles
             .concat(demoSrcFiles)
             .concat(specFiles)
             .concat('Gruntfile.js'),
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        reporter: require('jshint-stylish-ex'),
        jshintrc: '.jshintrc'
      }
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: false,
          urls: [
            'http://<%= connect.test.options.hostname %>:' +
            '<%= connect.test.options.port %>/index.html'
          ]
        }
      }
    },

    requirejs: {
      pack: {
        options: {
          optimize: 'none',
          baseUrl: 'src',
          name: '<%= libname %>',
          out: '<%= files.preBuild %>',
          useStrict: true,
          generateSourceMaps: true
        }
      }
    },

    // Shell commands
    shell: {
      hooks: {
        command: 'cp git-hooks/pre-commit .git/hooks/ && ' +
                 'chmod +x .git/hooks/pre-commit'
      }
    },

    uglify: {
      options: {
        banner: banner
      },
      pack: {
        files: {
          '<%= files.buildMin %>': ['<%= files.build %>']
        }
      }
    },

    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      test: {
        files: srcFiles.concat(specFiles).concat('<%= files.testRunner %>'),
        tasks: ['connect:test', 'mocha']
      },
      grammar: {
        files: grammarFile,
        tasks: ['jison']
      },
      debug: {
        files: srcFiles.concat(specFiles).concat('<%= files.testRunner %>'),
        tasks: [],
        options: {
          livereload: 35729
        }
      }
    },

    yuidoc: {
      compile: {
        name: '<%= libname %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: '<%= dirs.src %>',
          outdir: '<%= dirs.docs %>'
        }
      }
    }

  });

  grunt.registerTask('default', ['docs', 'lint', 'test', 'pack', 'min']);
  grunt.registerTask('dist', ['docs', 'pack', 'min']);
  grunt.registerTask('docs', ['clean:docs', 'yuidoc']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['connect:test', 'mocha']);
  grunt.registerTask('tests', ['test']);
  grunt.registerTask('pack', [
    'clean:dist',
    'clean:temp',
    'jison',
    'requirejs:pack',
    'concat:pack',
    'copy:pack',
    'clean:temp'
  ]);
  grunt.registerTask('min', ['uglify:pack']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('grammar', ['watch:grammar']);
  grunt.registerTask('debug', ['connect:debug', 'watch:debug']);

  grunt.registerTask('hookmeup', ['shell:hooks']);
};
