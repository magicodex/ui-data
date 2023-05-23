
"use strict";

/** SOURCE-CODE-START */

/**
 * @namespace utils
 */

var utils = {};

/**
 * @memberof utils
 * @description 判断给定参数是否 null/undefined
 * @param {*} arg 
 * @returns {boolean}
 */
utils.isNullOrUndefined = function (arg) {
  return (arg === null || arg === undefined);
};

/**
 * @memberof utils
 * @description 添加指定的前缀
 * @param {*} obj 
 * @param {string} prefix 
 * @returns {*}
 */
utils.prefix = function (obj, prefix) {
  if (typeof prefix !== 'string') {
    throw new Error('argument#1 "prefix" required string');
  }

  if (obj === null || (typeof obj !== 'object')) {
    return obj;
  }

  var newObj = {};
  var newKey;

  for (var key in obj) {
    newKey = prefix + key;
    newObj[newKey] = obj[key];
  }

  return newObj;
};

/**
 * @memberof utils
 * @description 移除指定的前缀
 * @param {*} obj 
 * @param {string} prefix 
 * @returns {*}
 */
utils.unprefix = function (obj, prefix) {
  if (typeof prefix !== 'string') {
    throw new Error('argument#1 "prefix" required string');
  }

  if (obj === null || (typeof obj !== 'object')) {
    return obj;
  }

  var newObj = {};
  var newKey;

  for (var key in obj) {
    if (key.indexOf(prefix) === 0) {
      newKey = key.substring(prefix.length);
    } else {
      newKey = key;
    }

    newObj[newKey] = obj[key];
  }

  return newObj;
};

/** SOURCE-CODE-END */

export { utils };
