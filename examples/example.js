var uiData = $data(document);

/**
 * 选中表达式
 */
function selectExpression(target) {
  document.getElementById('expression').value = target.value;
  var executeWhenSelected = document.getElementById('executeWhenSelected').checked;

  if (executeWhenSelected) {
    executeExpression();
  }
}

/**
 *  清空表达式
 */
function clearExpression() {
  document.getElementById('expression').value = '';
}

/**
 *  执行表达式
 */
function executeExpression() {
  var expression = document.getElementById('expression').value;
  var result;

  try {
    var executeResult = eval(expression);

    result = (typeof executeResult === 'object' && executeResult !== null)
      ? JSON.stringify(executeResult, null, 2)
      : executeResult;

    if (result === null) {
      result = 'null';
    }
  } catch (e) {
    result = e.message;
    throw e;
  } finally {
    document.getElementById('result').innerHTML = result;
  }
}

/**
 * 清空结果
 */
function clearResult() {
  document.getElementById('result').innerHTML = '';
}

/**
 * 清空表单
 */
function clearForm() {
  uiData.setData('*', {}, true);
}
