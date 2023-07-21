
QUnit.module('model-mock', function () {
  var Model = $uiData.Model;

  QUnit.test('test', function (assert) {
    var model = new Model();
    model.setData('*', {
      item1: 'value1',
      item2: 'value2'
    });

    {
      var data = model.getData('item1');

      assert.strictEqual(data, 'value1');
    }

    {
      var data = model.getData('item*');

      assert.deepEqual(data, {
        item1: 'value1',
        item2: 'value2'
      });
    }
  });

});
