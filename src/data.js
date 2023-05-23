
import { utils } from './utils';
import { View } from './view';
import { checkboxBooleanHandler } from './handler/checkbox-boolean-handler';
import { defaultComponentHandler } from './handler/default-component-handler';

"use strict";

/** SOURCE-CODE-START */

/**
 * @global
 */

/**
 * @description 创建表示 baseElement 的对象
 * @param {(Document|Element)} baseElement
 */
var Data = function (baseElement) {
  return new View(baseElement, Data.config);
};

Data.config = {};
Data.utils = utils;
Data.View = View;
Data.initDataHandlers = {
  'default': defaultComponentHandler,
  'checkbox-boolean': checkboxBooleanHandler
};

/** SOURCE-CODE-END */

export { Data };
