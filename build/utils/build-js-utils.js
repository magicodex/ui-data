"use strict";

var sourceCodeUtils = require('./source-code-utils');

var buildJsUtils = {};
module.exports = buildJsUtils;

//
// 先截取 "/* SOURCE-CODE-START */" 与
// "/* SOURCE-CODE-END */" 这两个字符串之间的内容，
// 然后把截取的内容拼起来输出到目标文件中。
//

buildJsUtils.buildJs = function (grunt, taskName, destFileTemplate) {
  // 获取来源文件路径和目标文件路径
  var sourceFilePaths = grunt.config(taskName + '.src');
  var destFilePath = grunt.config(taskName + '.dest');
  var pkgVersion = grunt.config('pkg.version');

  var contents = [];

  for (var index = 0; index < sourceFilePaths.length; index++) {
    var sourceFilePath = sourceFilePaths[index];

    if (!grunt.file.exists(sourceFilePath)) {
      grunt.log.warn('Source file "' + sourceFilePath + '" not found.');
      return;
    }

    // 读取来源文件内容
    var content = grunt.file.read(sourceFilePath);
    // 计算源代码的开始和结束索引
    var startIndex = sourceCodeUtils.getSourceStartIndex(content);
    var endIndex = sourceCodeUtils.getSourceEndIndex(content);

    var newContent = content.substring(startIndex, endIndex);
    contents.push(newContent);
  }

  var contentsStr = contents.join('');
  var destFileContent = destFileTemplate.replace(/\{\{version\}\}/, 'v'.concat(pkgVersion));
  destFileContent = destFileContent.replace(/\{\{source\}\}/, contentsStr);

  // 输出到目标文件
  grunt.file.write(destFilePath, destFileContent);
  grunt.log.write('File ' + destFilePath + ' created.');
};
