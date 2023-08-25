
import { utils } from '../utils';
import { MockModel } from './model-mock';

"use strict";

/* SOURCE-CODE-START */

var mockUiData = {
  Model: MockModel,
  utils: utils,
  dataHandlers: {}
};

mockUiData.model = function (baseElement, opts) {
  return new MockModel(baseElement, opts);
};

/* SOURCE-CODE-END */

export { mockUiData };
