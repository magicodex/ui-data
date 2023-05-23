
QUnit.module('ui-data', function () {

  QUnit.test('test', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<input data-name="login.userName" type="input"/>');
    jqBaseElement.append('<input data-name="login.password" type="password"/>');

    var model = $uiData.model(jqBaseElement[0]);
    model.setData('login.*', {
      'login.userName': '张三',
      'login.password': '123456'
    })

    var actual = model.getData('login.*');
    assert.deepEqual(actual, {
      'login.userName': '张三',
      'login.password': '123456'
    });
  });

});
