
QUnit.module('yueer', function () {

  QUnit.test('test', function (assert) {
    var jqBaseElement = $('#qunit-fixture');
    jqBaseElement.append('<input data-x-name="login.userName" type="input"/>');
    jqBaseElement.append('<input data-x-name="login.password" type="password"/>');

    var data = $data(jqBaseElement[0]);
    data.setData('login.*', {
      'login.userName': '张三',
      'login.password': '123456'
    })

    var actual = data.getData('login.*');
    assert.deepEqual(actual, {
      'login.userName': '张三',
      'login.password': '123456'
    });
  });

});
