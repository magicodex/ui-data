
QUnit.module('Model', function () {
  var Model = $uiData.Model;

  QUnit.test('getDataHandlerByElement', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<p id="id1"></p>');
    jqBaseElement.append('<span id="id2"></span>');
    jqBaseElement.append('<table id="id3" data-type="grid"></span>');

    var opts = {
      dataHandlers: {
        'default': { handlerName: 'default' },
        '@span': { handlerName: 'handler1' },
        'grid': { handlerName: 'handler2' }
      }
    };

    var model = new Model(jqBaseElement[0], opts);
    var element1 = $('#qunit-fixture').children('#id1')[0];
    var element2 = $('#qunit-fixture').children('#id2')[0];
    var element3 = $('#qunit-fixture').children('#id3')[0];

    // 默认处理器
    {
      var handler = model.getDataHandlerByElement(element1);
      assert.strictEqual(handler.handlerName, 'default');
    }

    // 匹配到标签对应的处理器
    {
      var handler = model.getDataHandlerByElement(element2);
      assert.strictEqual(handler.handlerName, 'handler1');
    }

    // 找到自定义的数据处理器
    {
      var handler = model.getDataHandlerByElement(element3);
      assert.strictEqual(handler.handlerName, 'handler2');
    }
  });


  QUnit.test('queryElementsBySelector', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<input data-name="login.userName" data-type="input"/>');
    jqBaseElement.append('<input data-name="login.password" data-type="password"/>');

    var model = new Model(jqBaseElement[0]);
    var elements = model.queryElementsBySelector(['[data-name^="login."]'])

    assert.strictEqual(elements.length, 2);
  });


  QUnit.test('convertExpressionToSelector', function (assert) {
    var model = new Model(document);

    // 数组
    {
      var actual = model.convertExpressionToSelector(['field1', 'field2']);

      assert.deepEqual(actual, ['[data-name="field1"]', '[data-name="field2"]']);
    }

    // "*"结尾
    {
      var actual = model.convertExpressionToSelector("field*");

      assert.deepEqual(actual, ['[data-name^="field"]']);
    }

    // "*"字符串
    {
      var actual = model.convertExpressionToSelector("*");

      assert.deepEqual(actual, ['[data-name]']);
    }
  });

});
