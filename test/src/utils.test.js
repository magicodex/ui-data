
QUnit.module('utils', function () {


  QUnit.test('isNullOrUndefined', function (assert) {
    //
    assert.strictEqual($data.utils.isNullOrUndefined("1"), false);
    assert.strictEqual($data.utils.isNullOrUndefined(1), false);

    //
    assert.strictEqual($data.utils.isNullOrUndefined(null), true);
    assert.strictEqual($data.utils.isNullOrUndefined(undefined), true);
  });


  QUnit.test('prefix', function (assert) {
    {
      var actual = $data.utils.prefix({
        field1: 'field1Value',
        field2: 'field2Value'
      }, 'user.');

      assert.strictEqual(actual['user.field1'], 'field1Value');
      assert.strictEqual(actual['user.field2'], 'field2Value');
    }

    // null
    {
      var actual = $data.utils.prefix(null, 'user.');

      assert.strictEqual(actual, null);
    }

    // 字符串
    {
      var actual = $data.utils.prefix('1', 'user.');

      assert.strictEqual(actual, '1');
    }
  });


  QUnit.test('unprefix', function (assert) {
    {
      var actual = $data.utils.unprefix({
        'user.field1': 'field1Value',
        'user.field2': 'field2Value',
        'remark': 'remark1'
      }, 'user.');

      assert.strictEqual(actual['field1'], 'field1Value');
      assert.strictEqual(actual['field2'], 'field2Value');
      assert.strictEqual(actual['remark'], 'remark1');
    }

    // null
    {
      var actual = $data.utils.unprefix(null, 'user.');

      assert.strictEqual(actual, null);
    }

    // 字符串
    {
      var actual = $data.utils.unprefix('1', 'user.');

      assert.strictEqual(actual, '1');
    }
  });

});