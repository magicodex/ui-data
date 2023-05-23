"use strict";

var buildJsUtils = require('../utils/build-js-utils');

const DEST_FILE_TEMPLATE = `
"use strict";

/*!
 * ui-data {{version}} (https://github.com/magicodex/ui-data)
 * Licensed under MIT (https://github.com/magicodex/ui-data/blob/main/LICENSE)
 */

{{source}}

module.exports = uiData;
`;

module.exports = function (grunt) {

  grunt.registerTask('cjs', function () {
    buildJsUtils.buildJs(grunt, 'cjs', DEST_FILE_TEMPLATE);
  });

};
