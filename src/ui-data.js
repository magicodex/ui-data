
import { utils } from './utils';
import { checkboxBooleanHandler } from './handler/checkbox-boolean-handler';
import { defaultDataHandler } from './handler/default-data-handler';
import { Model } from './model';

"use strict";

/** SOURCE-CODE-START */

var uiData = {
  Model: Model,
  utils: utils,
  dataHandlers: {
    checkboxBooleanHandler: checkboxBooleanHandler,
    defaultDataHandler: defaultDataHandler
  }
};

uiData.model = function (baseElement, opts) {
  return new Model(baseElement, opts);
};

/** SOURCE-CODE-END */

export { uiData };
