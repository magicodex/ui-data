
QUnit.module('defaultComponentHandler', function () {

  QUnit.test('getInputElementValue', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    var jqElement1 = $('<input name="user.sex" data-x-name="user.sex" type="radio" value="male"/>');
    jqElement1.appendTo(jqBaseElement);
    var jqElement2 = $('<input name="user.sex" data-x-name="user.sex" type="radio" value="female" checked/>');
    jqElement2.appendTo(jqBaseElement);
    var jqElement3 = $('<input data-x-name="user.isSingle1" value="true" type="checkbox"/>');
    jqElement3.appendTo(jqBaseElement);
    var jqElement4 = $('<input data-x-name="user.isSingle2" value="true" type="checkbox" checked/>');
    jqElement4.appendTo(jqBaseElement);
    var jqElement5 = $('<input data-x-name="user.hobby" type="checkbox" value="football" checked/>');
    jqElement5.appendTo(jqBaseElement);
    var jqElement6 = $('<input data-x-name="user.hobby" type="checkbox" value="basketball"/>');
    jqElement6.appendTo(jqBaseElement);

    var handler = $data.initDataHandlers['default'];

    // 单选框
    {
      var elements = [jqElement1[0], jqElement2[0]];
      var actual = handler.getInputElementValue(elements);
      assert.strictEqual(actual, 'female');
    }

    // 单个复选框
    {
      var elements = [jqElement3[0]];
      var actual = handler.getInputElementValue(elements);
      assert.deepEqual(actual, []);
    }

    // 单个复选框
    {
      var elements = [jqElement4[0]];
      var actual = handler.getInputElementValue(elements);
      assert.deepEqual(actual, ['true']);
    }

    // 多个复选框
    {
      var elements = [jqElement5[0], jqElement6[0]];
      var actual = handler.getInputElementValue(elements);
      assert.deepEqual(actual, ['football']);
    }
  });


  QUnit.test('setInputElementValue', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    var jqElement1 = $('<input name="user.sex" data-x-name="user.sex" type="radio" value="male"/>');
    jqElement1.appendTo(jqBaseElement);
    var jqElement2 = $('<input name="user.sex" data-x-name="user.sex" type="radio" value="female"/>');
    jqElement2.appendTo(jqBaseElement);
    var jqElement3 = $('<input data-x-name="user.isSingle1" value="true" type="checkbox"/>');
    jqElement3.appendTo(jqBaseElement);
    var jqElement4 = $('<input data-x-name="user.isSingle2" value="true" type="checkbox"/>');
    jqElement4.appendTo(jqBaseElement);
    var jqElement5 = $('<input data-x-name="user.hobby" type="checkbox" value="football"/>');
    jqElement5.appendTo(jqBaseElement);
    var jqElement6 = $('<input data-x-name="user.hobby" type="checkbox" value="basketball"/>');
    jqElement6.appendTo(jqBaseElement);

    var handler = $data.initDataHandlers['default'];

    // 单选框
    {
      var elements = [jqElement1[0], jqElement2[0]];
      handler.setInputElementValue(elements, 'female');
      assert.strictEqual(jqElement1[0].checked, false);
      assert.strictEqual(jqElement2[0].checked, true);
    }

    // 单个复选框
    {
      var elements = [jqElement3[0]];
      handler.setInputElementValue(elements, []);
      assert.strictEqual(jqElement3[0].checked, false);
    }

    // 单个复选框
    {
      var elements = [jqElement4[0]];
      handler.setInputElementValue(elements, ['true']);
      assert.strictEqual(jqElement4[0].checked, true);
    }

    // 多个复选框
    {
      var elements = [jqElement5[0], jqElement6[0]];
      handler.setInputElementValue(elements, ['football']);
      assert.strictEqual(jqElement5[0].checked, true);
      assert.strictEqual(jqElement6[0].checked, false);
    }
  });


  QUnit.test('getSelectElementValue', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    var jqElement1 = $('<select data-x-name="user.hobby1">' +
      '<option value="football">足球</option>' +
      '<option value="basketball" selected>篮球</option>' +
      '<option value="tennisball">羽毛球</option>' +
      '</select>');
    jqElement1.appendTo(jqBaseElement);
    var jqElement2 = $('<select data-x-name="user.hobby2" multiple="multiple">' +
      '<option value="football">足球</option>' +
      '<option value="basketball" selected>篮球</option>' +
      '<option value="tennisball">羽毛球</option>' +
      '</select>');
    jqElement2.appendTo(jqBaseElement);

    var handler = $data.initDataHandlers['default'];

    // 单选下拉框
    {
      var element = jqElement1[0];
      var actual = handler.getSelectElementValue(element);
      assert.deepEqual(actual, 'basketball');
    }

    // 多选下拉框
    {
      var element = jqElement2[0];
      var actual = handler.getSelectElementValue(element);
      assert.deepEqual(actual, ['basketball']);
    }
  });


  QUnit.test('setSelectElementValue', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    var jqElement1 = $('<select data-x-name="user.hobby1">' +
      '<option value="football">足球</option>' +
      '<option value="basketball">篮球</option>' +
      '<option value="tennisball">羽毛球</option>' +
      '</select>');
    jqElement1.appendTo(jqBaseElement);
    var jqElement2 = $('<select data-x-name="user.hobby1" multiple="multiple">' +
      '<option value="football">足球</option>' +
      '<option value="basketball">篮球</option>' +
      '<option value="tennisball">羽毛球</option>' +
      '</select>');
    jqElement2.appendTo(jqBaseElement);

    var handler = $data.initDataHandlers['default'];

    // 单选下拉框
    {
      var element = jqElement1[0];
      handler.setSelectElementValue(element, 'basketball');
      assert.strictEqual(element.value, 'basketball');
    }

    // 多选下拉框
    {
      var element = jqElement2[0];
      handler.setSelectElementValue(element, ['basketball']);
      assert.strictEqual(jqElement2.children('option')[1].selected, true);
    }
  });

});
