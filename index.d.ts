/** Declaration file generated by dts-gen */

export class Model {
  constructor(baseElement: any, opts: any);

  convertExpressionToSelector(expression: any): any;

  doGetDataValue(elements: any, skipFn: any): any;

  doSetDataValue(elements: any, value: any, notSkipSetIfValueAbsent: any): void;

  getBaseElement(): any;

  /**
   * 获取指定表达式对应元素的数据
   * @param {(string|string[])} expression 表达式
   * @param {function} [skipFn] 判断是否跳过值,比如 (targetValue) => (targetValue == null)
   * @returns {*} 值
   */
  getData(expression: any, skipFn: any): any;

  getDataHandlerByElement(element: any): any;

  groupElementsByName(elements: any): any;

  queryElementsBySelector(selector: any): any;

  /**
   * 设置指定表达式对应元素的数据
   * @param {string|string[]} expression 表达式
   * @param {*} value 值
   * @param {boolean} [notSkipSetIfValueAbsent=false] 是否跳过没有指定值的元素,默认 false 跳过没有指定值的元素
   */
  setData(expression: any, value: any, notSkipSetIfValueAbsent: any): void;

  static config: {
    defaultNameAttributeName: string;
    defaultTypeAttributeName: string;
    initDataHandlers: {
      "checkbox-boolean": {
        getValue: any;
        setValue: any;
      };
      default: {
        getInputElementValue: any;
        getSelectElementValue: any;
        getValue: any;
        setInputElementValue: any;
        setSelectElementValue: any;
        setValue: any;
      };
    };
  };

}

export const dataHandlers: {
  checkboxBooleanHandler: {
    getValue: any;
    setValue: any;
  };
  defaultDataHandler: {
    getInputElementValue: any;
    getSelectElementValue: any;
    getValue: any;
    setInputElementValue: any;
    setSelectElementValue: any;
    setValue: any;
  };
};

/**
 * 创建数据模型对象并返回
 * @param {(Document|Element)} baseElement
 * @param {object} [opts]
 * @returns {Model}
 */
export function model(baseElement: any, opts: any): Model;

export namespace utils {
  function isNullOrUndefined(arg: any): any;

  function prefix(obj: any, prefix: any): any;

  function unprefix(obj: any, prefix: any): any;

}

