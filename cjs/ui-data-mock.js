
"use strict";

/*!
 * ui-data v1.3.0 (https://github.com/magicodex/ui-data)
 * Licensed under MIT (https://github.com/magicodex/ui-data/blob/main/LICENSE)
 */



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
 * @param {boolean} [skipNull] 是否跳过 null 值
 * @returns {*} 值
 */
Model.prototype.getData = function (expression, skipNull) {
  // 表达式只能是字符串或数组
  if ((typeof expression !== 'string') && !(expression instanceof Array)) {
    throw new Error('argument#0 "expression" required string or Array');
  }

  skipNull = (skipNull || false);
  var data = this._data;
  var result;

  // 若表达式是数组或者"*"结尾的字符串，则是获取多个元素的值
  if ((expression instanceof Array)
    || (expression.charAt(expression.length - 1) === '*')) {
    result = {};
    var itemNames = getItemNames(data, expression);

    itemNames.forEach(function (itemName) {
      var itemValue = data[itemName];

      if (!utils.isNullOrUndefined(itemValue) || !skipNull) {
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
 * @param {boolean} [defaultNull] 是否默认 null 值
 */
Model.prototype.setData = function (expression, value, defaultNull) {
  // 表达式只能是字符串或数组
  if ((typeof expression !== 'string') && !(expression instanceof Array)) {
    throw new Error('argument#0 "expression" required string or Array');
  }

  defaultNull = (defaultNull || false);
  var data = this._data;

  // 若表达式是数组或者"*"结尾的字符串，则是获取多个元素的值
  if ((expression instanceof Array)
    || (expression.charAt(expression.length - 1) === '*')) {
    value = (value || {});
    var itemNames = getItemNames(data, expression);

    itemNames.forEach(function (itemName) {
      var itemValue = value[itemName];

      if (!utils.isNullOrUndefined(itemVaue) || defaultNull) {
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



var uiData = {
  Model: Model,
  utils: utils,
  dataHandlers: {}
};

uiData.model = function (baseElement, opts) {
  return new Model(baseElement, opts);
};



module.exports = uiData;
