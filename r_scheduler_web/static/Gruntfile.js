module.exports = function(grunt) {

    var cssFiles = [        
        "lib/bootstrap/dist/css/bootstrap.css"
    ];

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) Ruffer LLP <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',

        jsbeautifier: {
            files: ["src/**.js"],
            options: {}
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl: ".",
                    name: "Content/main",
                    include: "lib/requirejs/require.js",
                    out: "dist/main.min.js",
                    wrap: true,
                    wrapShim: true,
                    preserveLicenseComments: false,
                    mainConfigFile: "main.js"
                }
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>'
            },
            combine: {
                files: {
                    'dist/main.min.css': cssFiles
                }
            }
        },

        jshint: {
            files: ['src/**/*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        },

        sloc: {
            'js': {
                files: {
                    'src': [ '**.js' ]
                }
            }
        },

        watch: {
            files: ["src/**"],
            tasks: ['default'],
            options: {
                livereload: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['newer:jsbeautifier', 'cssmin', 'newer:jshint', 'sloc']);
    grunt.registerTask('dist', ['jsbeautifier', 'sloc', 'jshint', 'requirejs', 'cssmin']);
};
