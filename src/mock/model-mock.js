

import { utils } from '../utils';

"use strict";

/* SOURCE-CODE-START */

/**
 * @class
 * @param {(Document|Element)} baseElement
 * @param {object} [opts]
 */
function Model(baseElement, opts) {
  this._data = {};
}

Model.config = {
  defaultNameAttributeName: 'data-name',
  defaultTypeAttributeName: 'data-type',
  initDataHandlers: {}
};

Model._privateFn = {
  getItemNames: getItemNames
};

function unimplementedFunction() {
  throw new Error('unimplemented function');
}

Model.prototype.getBaseElement = unimplementedFunction;
Model.prototype.doGetDataValue = unimplementedFunction;
Model.prototype.doSetDataValue = unimplementedFunction;
Model.prototype.getDataHandlerByElement = unimplementedFunction;
Model.prototype.queryElementsBySelector = unimplementedFunction;
Model.prototype.convertExpressionToSelector = unimplementedFunction;
Model.prototype.groupElementsByName = unimplementedFunction;


/**
 * @description 获取指定表达式对应元素的数据
 * @param {(string|string[])} expression 表达式
 * @param {function} [skipFn] 判断是否跳过值,比如 (targetValue) => (targetValue == null)
 * @returns {*} 值
 */
Model.prototype.getData = function (expression, skipFn) {
  // 表达式只能是字符串或数组
  if ((typeof expression !== 'string') && !(expression instanceof Array)) {
    throw new Error('argument#0 "expression" required string or Array');
  }

  var data = this._data;
  var result;

  // 若表达式是数组或者"*"结尾的字符串，则是获取多个元素的值
  if ((expression instanceof Array)
    || (expression.charAt(expression.length - 1) === '*')) {
    result = {};
    var itemNames = getItemNames(data, expression);

    itemNames.forEach(function (itemName) {
      var itemValue = data[itemName];

      if (utils.isNullOrUndefined(skipFn) || !skipFn(itemValue)) {
        result[itemName] = itemValue;
      }
    });
  } else {
    var itemName = expression;
    result = data[itemName];
  }

  return result;
};

/**
 * @description 设置指定表达式对应元素的数据
 * @param {string|string[]} expression 表达式
 * @param {*} value 值
 * @param {boolean} [notSkipSetIfValueAbsent=false] 是否跳过没有指定值的元素,默认 false 跳过没有指定值的元素
 */
Model.prototype.setData = function (expression, value, notSkipSetIfValueAbsent) {
  // 表达式只能是字符串或数组
  if ((typeof expression !== 'string') && !(expression instanceof Array)) {
    throw new Error('argument#0 "expression" required string or Array');
  }

  notSkipSetIfValueAbsent = (notSkipSetIfValueAbsent === true);
  var data = this._data;

  // 若表达式是数组或者"*"结尾的字符串，则是获取多个元素的值
  if ((expression instanceof Array)
    || (expression.charAt(expression.length - 1) === '*')) {
    value = (value || {});
    var itemNames = getItemNames(data, expression);

    itemNames.forEach(function (itemName) {
      var itemValue = value[itemName];

      if ((itemName in value) || notSkipSetIfValueAbsent) {
        data[itemName] = itemValue;
      }
    });

    for (var itemName in value) {
      var itemValue = value[itemName];
      data[itemName] = itemValue;
    }
  } else {
    var itemName = expression;
    data[itemName] = value;
  }
};

/**
 * @description 返回名称列表
 * @param {Object} data
 * @param {*} expression 
 * @returns {string[]}
 */
function getItemNames(data, expression) {
  if (utils.isNullOrUndefined(data)) {
    throw new Error('argument#0 "data is null/undefined');
  }

  if ((typeof expression !== 'string') && !(expression instanceof Array)) {
    throw new Error('argument#1 "expression" required string or Array');
  }

  var itemNames = [];

  if (expression === '*') {
    for (var itemName in data) {
      itemNames.push(itemName);
    }
  } else if (expression.charAt(expression.length - 1) === '*') {
    var namePrefix = expression.substring(0, (expression.length - 1));

    for (var itemName in data) {
      if (itemName.startsWith(namePrefix)) {
        itemNames.push(itemName);
      }
    }
  } else if (expression instanceof Array) {
    itemNames = expression;
  } else {
    itemNames = [expression];
  }

  return itemNames;
}

/* SOURCE-CODE-END */

export { Model };
