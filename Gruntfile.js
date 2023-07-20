
module.exports = function (grunt) {

  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: {
      src: [
        'src/utils.js',
        'src/handler/default-data-handler.js',
        'src/handler/checkbox-boolean-handler.js',
        'src/model.js',
        'src/ui-data.js'
      ],
      dest: 'dist/ui-data.js',
      minDest: 'dist/ui-data.min.js'
    },
    cjs: {
      src: [
        'src/utils.js',
        'src/handler/default-data-handler.js',
        'src/handler/checkbox-boolean-handler.js',
        'src/model.js',
        'src/ui-data.js'
      ],
      dest: 'cjs/ui-data.js'
    }
  });

  grunt.loadTasks('build/tasks');

  grunt.registerTask('default', ['dist', 'cjs']);
};
