"use strict";

var buildJsUtils = require('../utils/build-js-utils');

const DEST_FILE_TEMPLATE = `
"use strict";

/*!
 * ui-data {{version}} (https://github.com/magicodex/ui-data)
 * Licensed under MIT (https://github.com/magicodex/ui-data/blob/main/LICENSE)
 */

(function(global, namespace) {

{{source}}

global[namespace] = uiData;
global['$uiData'] = uiData;
})(window, 'uiData');
`;

module.exports = function (grunt) {

  grunt.registerTask('dist-mock', function () {
    buildJsUtils.buildJs(grunt, 'dist-mock', DEST_FILE_TEMPLATE);
  });

};
