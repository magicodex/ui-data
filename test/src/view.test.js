
QUnit.module('View', function () {


  QUnit.test('getComponentHandlerByElement', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<p id="id1"></p>');
    jqBaseElement.append('<span id="id2"></span>');
    jqBaseElement.append('<table id="id3" data-x-type="grid"></span>');

    var opts = {
      componentHandlers: {
        'default': { handlerName: 'default' },
        '@span': { handlerName: 'handler1' },
        'grid': { handlerName: 'handler2' }
      }
    };

    var view = new $data.View(jqBaseElement[0], opts);
    var element1 = $('#qunit-fixture').children('#id1')[0];
    var element2 = $('#qunit-fixture').children('#id2')[0];
    var element3 = $('#qunit-fixture').children('#id3')[0];

    // 默认处理器
    {
      var handler = view.getComponentHandlerByElement(element1);
      assert.strictEqual(handler.handlerName, 'default');
    }

    // 匹配到标签对应的处理器
    {
      var handler = view.getComponentHandlerByElement(element2);
      assert.strictEqual(handler.handlerName, 'handler1');
    }

    // 找到自定义的数据处理器
    {
      var handler = view.getComponentHandlerByElement(element3);
      assert.strictEqual(handler.handlerName, 'handler2');
    }
  });


  QUnit.test('queryElementsBySelector', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<input data-x-name="login.userName" data-x-type="input"/>');
    jqBaseElement.append('<input data-x-name="login.password" data-x-type="password"/>');

    var view = $data(jqBaseElement[0]);
    var elements = view.queryElementsBySelector(['[data-x-name^="login."]'])

    assert.strictEqual(elements.length, 2);
  });


  QUnit.test('convertExpressionToSelector', function (assert) {
    var view = $data(document);

    // 数组
    {
      var actual = view.convertExpressionToSelector(['field1', 'field2']);

      assert.deepEqual(actual, ['[data-x-name="field1"]', '[data-x-name="field2"]']);
    }

    // "*"结尾
    {
      var actual = view.convertExpressionToSelector("field*");

      assert.deepEqual(actual, ['[data-x-name^="field"]']);
    }

    // "*"字符串
    {
      var actual = view.convertExpressionToSelector("*");

      assert.deepEqual(actual, ['[data-x-name]']);
    }
  });

});
