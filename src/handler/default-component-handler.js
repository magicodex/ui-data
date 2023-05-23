
import { utils } from '../utils';

"use strict";

/** SOURCE-CODE-START */

/**
 * @namespace defaultComponentHandler
 */

var defaultComponentHandler = {};

/**
 * @memberof defaultComponentHandler
 * @param {Element[]} elements DOM元素
 * @param {boolean} skipNull 是否跳过 null 值
 * @returns {*}
 */
defaultComponentHandler.getValue = function (elements, skipNull) {
  if (!(elements instanceof Array)) {
    throw new Error('argument#0 "elements required Array');
  }

  if (elements.length <= 0) {
    throw new Error('argument#0 "elements is empty');
  }

  var element = elements[0];
  var tagName = element.tagName.toLowerCase();
  var value;

  if (tagName === 'input') {
    // 输入域标签
    value = this.getInputElementValue(elements);
  } else if (tagName === 'textarea') {
    // 文本域标签
    value = element.value;
  } else if (tagName === 'select') {
    // 选择框标签
    value = this.getSelectElementValue(element);
  } else {
    value = element.innerHtml;
  }

  return value;
};

/**
 * @memberof defaultComponentHandler
 * @param {Element[]} elements DOM元素
 * @param {*} value 值
 * @param {boolean} defaultNull 是否默认 null 值
 */
defaultComponentHandler.setValue = function (elements, value, defaultNull) {
  if (!(elements instanceof Array)) {
    throw new Error('argument#0 "elements required Array');
  }

  if (elements.length <= 0) {
    throw new Error('argument#0 "elements is empty');
  }

  var element = elements[0];
  var tagName = element.tagName.toLowerCase();

  if (utils.isNullOrUndefined(value)) {
    value = '';
  }

  if (tagName === 'input') {
    // 输入域标签
    this.setInputElementValue(elements, value);
  } else if (tagName === 'textarea') {
    // 文本域标签
    element.value = value;
  } else if (tagName === 'select') {
    // 选择框标签
    this.setSelectElementValue(element, value);
  } else {
    element.innerHtml = value;
  }
};

/**
 * @memberof defaultComponentHandler
 * @description 获取输入域标签元素的值
 * @param {Element[]} elements DOM元素
 * @returns {*}
 */
defaultComponentHandler.getInputElementValue = function (elements) {
  if (!(elements instanceof Array)) {
    throw new Error('argument#0 "elements required Array');
  }

  if (elements.length <= 0) {
    throw new Error('argument#0 "elements is empty');
  }

  var element = elements[0];
  var tagName = element.tagName.toLowerCase();
  var inputType = element.getAttribute('type');
  var value;

  if (tagName === 'input' && inputType === 'radio') {
    value = null;

    // 单选框
    for (var index = 0; index < elements.length; index++) {
      var currentElement = elements[index];

      if (currentElement.checked) {
        value = currentElement.value;
        break;
      }
    }
  } else if (tagName === 'input' && inputType === 'checkbox') {
    value = [];

    // 复选框
    for (var index = 0; index < elements.length; index++) {
      var currentElement = elements[index];

      if (currentElement.checked) {
        value.push(currentElement.value);
      }
    }
  } else {
    value = element.value;
  }

  return value;
};

/**
 * @memberof defaultComponentHandler
 * @description 设置输入域标签元素的值
 * @param {Element[]} elements DOM元素
 * @param {*} 值
 */
defaultComponentHandler.setInputElementValue = function (elements, value) {
  if (!(elements instanceof Array)) {
    throw new Error('argument#0 "elements required Array');
  }

  if (elements.length <= 0) {
    throw new Error('argument#0 "elements is empty');
  }

  var element = elements[0];
  var tagName = element.tagName.toLowerCase();
  var inputType = element.getAttribute('type');

  if (tagName === 'input' && inputType === 'radio') {
    // 单选框
    for (var index = 0; index < elements.length; index++) {
      var currentElement = elements[index];
      currentElement.checked = (currentElement.value == value);
    }
  } else if (tagName === 'input' && inputType === 'checkbox') {
    // 复选框
    var valueArray = (value instanceof Array)
      ? value : [value];

    for (var index = 0; index < elements.length; index++) {
      var currentElement = elements[index];
      currentElement.checked = valueArray.includes(currentElement.value);
    }
  } else {
    element.value = value;
  }
};

/**
 * @memberof defaultComponentHandler
 * @description 获取选择框标签元素的值
 * @param {Element[]} elements DOM元素
 * @returns {*}
 */
defaultComponentHandler.getSelectElementValue = function (element) {
  if (utils.isNullOrUndefined(element)) {
    throw new Error('argument#0 "element is null/undefined');
  }

  // 单选下拉框
  if (!element.multiple) {
    var selectedIndex = element.selectedIndex;

    return (selectedIndex !== -1)
      ? element.item(selectedIndex).value
      : null;
  }

  // 多选下拉框
  var selectedValues = [];

  for (var index = 0; index < element.length; index++) {
    var option = element.item(index);

    if (option.selected) {
      selectedValues.push(option.value);
    }
  }

  return selectedValues;
};

/**
 * @memberof defaultComponentHandler
 * @description 设置输入域标签元素的值
 * @param {Element[]} elements DOM元素
 * @param {*} 值
 */
defaultComponentHandler.setSelectElementValue = function (element, value) {
  if (utils.isNullOrUndefined(element)) {
    throw new Error('argument#0 "element is null/undefined');
  }

  // 单选下拉框
  if (!element.multiple) {
    element.value = value;
    return;
  }

  // 多选下拉框
  for (var index = 0; index < element.length; index++) {
    var option = element.item(index);
    var selected = false;

    if (value instanceof Array) {
      selected = value.includes(option.value);
    }

    option.selected = selected;
  }
};

/** SOURCE-CODE-END */

export { defaultComponentHandler };
