
"use strict";

/** SOURCE-CODE-START */

/**
 * @namespace checkboxBooleanHandler
 */

var checkboxBooleanHandler = {};

/**
 * @memberof checkboxBooleanHandler
 * @param {Element[]} elements DOM元素
 * @param {boolean} skipNull 是否跳过 null 值
 * @returns {*}
 */
checkboxBooleanHandler.getValue = function (elements, skipNull) {
  var element = elements[0];

  return element.checked;
};

/**
 * @memberof checkboxBooleanHandler
 * @param {Element[]} elements DOM元素
 * @param {*} value 值
 * @param {boolean} defaultNull 是否默认 null 值
 */
checkboxBooleanHandler.setValue = function (elements, value, defaultNull) {
  var element = elements[0];

  element.checked = value;
};

/** SOURCE-CODE-END */

export { checkboxBooleanHandler };