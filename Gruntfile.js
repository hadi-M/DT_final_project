module.exports = function(grunt) {
	
	grunt.initConfig({
		/*sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'Home/style.css': 'Home/sass/style.scss',
				}
			}
		}, */
		compass: {
			home: {
				options: {
					sassDir: 'Home/sass',
					cssDir: 'Home',
					noLineComments: true
					//environment: 'production'
				}
			},
			other: {
				options: {
					sassDir: 'sass',
					cssDir: 'css'
				}
			}
		},
		watch: {
			home: {
				files: ['Home/sass/style.scss'],
				tasks: ['compass:home'],
			},
		},
		ali: {
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('folan', ['ali']);
};