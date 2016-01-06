module.exports = function(grunt) {
	
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'Home/style.css': 'Home/sass/style.scss',
				}
			}
		},
		watch: {
			scripts: {
				files: ['**/*.scss'],
				tasks: ['sass'],
			},
		},
	});

	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.registerTask('default', ['watch'])
};