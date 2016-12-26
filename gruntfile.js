var globalConfig = {
		bower: "bower_components",
		dest: "assets/templates/radioext",
		css: "css",
		js: "js",
		fonts: "fonts",
		images: "images",
		src: "src",
		test: "test",
		title: "Редизайн сайта RadioExt"
};
module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : globalConfig,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				files : {
					'<%= globalConfig.test %>/<%= globalConfig.css %>/build/main.css' : [
						'<%= globalConfig.src %>/<%= globalConfig.css %>/main.less'
					]
				},
				options : {
					compress: false,
					ieCompat: false
				}
			}
		},
		replace: {
			css: {
				options: {
					patterns: [
						{
							match: /\/\*\!.+\//g,
							replacement: function () {
								return '';
							}
						}
					]
				},
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= globalConfig.test %>/<%= globalConfig.css %>/build/*.css',
						dest: '<%= globalConfig.test %>/<%= globalConfig.css %>/'
					}
				]
			}
		},
		cssmin: {
			target: {
				files: [
					{
						expand: true,
						flatten: true,
						src: '<%= globalConfig.test %>/<%= globalConfig.css %>/*.css',
						dest: '<%= globalConfig.test %>/<%= globalConfig.css %>/'
					}
				]
			}
		},
		autoprefixer:{
			options: {
				//["and_chr 54", "chrome 55", "chrome 54", "edge 14", "firefox 50",
				//    "ie 11", "ie_mob 11", "ios_saf 10-10.1", "safari 10", "opera 41"]
				browsers: ["last 15 version", "> 100%", "Firefox > 15", "Opera > 10"],
				cascade: false
			},
			css: {
				expand: true,
				flatten: true,
				src: '<%= globalConfig.test %>/<%= globalConfig.css %>/*.css',
				dest: '<%= globalConfig.dest %>/<%= globalConfig.css %>/'
			}
		},
		imagemin: {
			less: {
				options: {
					optimizationLevel: 5,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: ['<%= globalConfig.src %>/<%= globalConfig.images %>/less/*.{png,jpg,gif,svg}'],
						dest: '<%= globalConfig.src %>/<%= globalConfig.images %>/bin/',
						filter : 'isFile'
					}
				]
			},
			images: {
				options: {
					optimizationLevel: 5,
					svgoPlugins: [
						{
							removeViewBox: false
						}
					]
				},
				files: [
					{
						expand: true,
						flatten : true,
						src: ['<%= globalConfig.src %>/<%= globalConfig.images %>/*.{png,jpg,gif,svg}'],
						dest: '<%= globalConfig.dest %>/<%= globalConfig.images %>/',
						filter : 'isFile'
					}
				]
			}
		},
		uglify : {
			options: {
				ASCIIOnly: true
			},
			main: {
				files: {
					'<%= globalConfig.dest %>/<%= globalConfig.js %>/main.js': [
						'<%= globalConfig.src %>/<%= globalConfig.js %>/main.js'
					]
				}
			}
		},
		copy : {
			fonts: {
				files: [
					{
						expand: true,
						flatten : true,
						src: [
							'<%= globalConfig.src %>/<%= globalConfig.fonts %>/*'
						],
						dest: '<%= globalConfig.dest %>/<%= globalConfig.fonts %>/',
						filter: 'isFile'
					},
				]
			}
		},
		watch: {
			scripts: {
				files: [
					'<%= globalConfig.src %>/<%= globalConfig.js %>/*.js'
				],
				tasks: ['js']
			},
			styles: {
				files: [
					'<%= globalConfig.src %>/<%= globalConfig.css %>/*.less',
					'<%= globalConfig.src %>/<%= globalConfig.css %>/mixins/*.less',
				],
				tasks: ['css']
			},
			images: {
				files: [
					'<%= globalConfig.src %>/<%= globalConfig.images %>/*.{png,jpg,gif,svg}',
					'<%= globalConfig.src %>/<%= globalConfig.images %>/less/*.{png,jpg,gif,svg}'
				],
				tasks: ['image']
			},
			fonts: {
				files: [
					'<%= globalConfig.src %>/<%= globalConfig.fonts %>/*'
				],
				tasks: ['fonts']
			}
		},
		notify: {
			start: {
				options: {
					title: "<%= globalConfig.title %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\notify.png'
				}
			},
			done: {
				options: { 
					title: "<%= globalConfig.title %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\notify.png'
				}
			}
		}
	});
	grunt.registerTask('default', [
		'notify:start',
		'imagemin',
		'less',
		'replace',
		'cssmin',
		'autoprefixer',
		'uglify',
		'copy',
		'notify:done'
	]);
	grunt.registerTask('js', [
		'notify:start',
		'uglify',
		'notify:done'
	]);
	grunt.registerTask('css', [
		'notify:start',
		'less',
		'replace',
		'cssmin',
		'autoprefixer',
		'notify:done'
	]);
	grunt.registerTask('fonts', [
		'notify:start',
		'less',
		'replace',
		'cssmin',
		'autoprefixer',
		'copy',
		'notify:done'
	]);
	grunt.registerTask('image', [
		'notify:start',
		'imagemin',
		'less',
		'replace',
		'cssmin',
		'autoprefixer',
		'notify:done'
	]);
	grunt.registerTask('dev', [
		'watch'
	]);
}