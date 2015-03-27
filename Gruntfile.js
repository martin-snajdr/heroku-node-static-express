module.exports = function (grunt) {


    grunt.initConfig({
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [
                    'src/js/*.js'
                ],
                dest: 'build/js/main.min.js'
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            js: {
                files: {
                    'build/js/main.min.js': ['build/js/main.min.js']
                }
            }
        },
        sass: {
            dist: {
                files: {
                    "build/css/style.css": "src/scss/style.scss",
                    "build/css/fontawesome.css": "src/scss/fontawesome/font-awesome.scss"
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/*.js'],
                tasks: ['concat:js', 'uglify:js'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['src/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true,
                   // spawn: false,
                }
            },
            kit: {
                files: ['src/*.kit'],
                tasks: ['codekit'],
                options: {
                    livereload: true,
                }
            }
        },
        codekit: {

            globbed_example_config: {
                src: 'src/*.kit',
                dest: 'build/'
            },

            explicit_output_names: {
                files: {
                    //'build/index.html': '/templates/my_special_index.kit'
                }
            },

            /*build_with_underscored_files: {
                options: {compilePrefixed: true},
                files: {
                    'build/about.html': '_about.kit',
                    'build/index.html': '_index.kit'
                }
            },*/

            // see http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
            dynamic_file_object: {
                files: [{
                    expand: true,
                    cwd: 'sources',
                    src: ['**/*.kit'],
                    dest: 'build',
                    ext: '.html'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-codekit');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('watchit', ['watch']);
    grunt.registerTask('default', ['codekit','sass']);
    grunt.registerTask('heroku:production', ['codekit','sass']);
};
