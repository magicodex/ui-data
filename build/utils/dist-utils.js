"use strict";

var distUtils = {};
module.exports = distUtils;

/**
 * @description 获取源代码开始的索引
 * @param {string} source 
 * @returns {number}
 */
distUtils.getStartSourceIndex = function (source) {
  var index = source.search(/\/\*\*\s*SOURCE-CODE-START\s*\*\//);

  if (index < 0) {
    return 0;
  }

  index = source.indexOf('*/', index);
  index = index + 2;

  return index;
};

/**
 * @description 获取源代码结束的索引
 * @param {string} source 
 * @returns {number}
 */
distUtils.getEndSourceIndex = function (source) {
  var index = source.search(/\/\*\*\s*SOURCE-CODE-END\s*\*\//);

  if (index < 0) {
    return source.length;
  }

  return index;
};
