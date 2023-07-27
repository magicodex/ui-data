
"use strict";

/* SOURCE-CODE-START */

/**
 * @namespace checkboxBooleanHandler
 */

var checkboxBooleanHandler = {};

/**
 * @memberof checkboxBooleanHandler
 * @param {Element[]} elements DOM元素
 * @param {function} [skipFn] 判断是否跳过值
 * @returns {*}
 */
checkboxBooleanHandler.getValue = function (elements, skipFn) {
  var element = elements[0];

  return element.checked;
};

/**
 * @memberof checkboxBooleanHandler
 * @param {Element[]} elements DOM元素
 * @param {*} value 值
 * @@param {boolean} [notSkipSetIfValueAbsent=false] 是否跳过没有指定值的元素
 */
checkboxBooleanHandler.setValue = function (elements, value, notSkipSetIfValueAbsent) {
  var element = elements[0];

  element.checked = value;
};

/* SOURCE-CODE-END */

export { checkboxBooleanHandler };