
import { utils } from '../utils';
import { Model } from './model.mock';

"use strict";

/* SOURCE-CODE-START */

var uiData = {
  Model: Model,
  utils: utils,
  dataHandlers: {}
};

uiData.model = function (baseElement, opts) {
  return new Model(baseElement, opts);
};

/* SOURCE-CODE-END */

export { uiData };
