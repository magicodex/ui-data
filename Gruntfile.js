
module.exports = function (grunt) {

  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: {
      src: [
        'src/utils.js',
        'src/handler/default-component-handler.js',
        'src/handler/checkbox-boolean-handler.js',
        'src/view.js',
        'src/data.js'
      ],
      dest: 'dist/ui-data.js'
    }
  });

  grunt.loadTasks('build/tasks');

  grunt.registerTask('default', ['dist']);
};
