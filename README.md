# ui-data

## 添加依赖

ui-data 没依赖第三方库，只要在 HTML 的 &lt;script&gt; 标签中引用它:
```
<script src="ui-data.js"></script>
```

## 代码示例

比如有这么一段 HTML 代码
```
<!-- 姓名输入框 -->
<input data-name="user.name" type="text" />
<!-- 密码输入框 -->
<input data-name="user.password" type="password" />
```
*标签中的 data-name 属性相当于变量名，是获取/修改元素的值的标识符。*

```
var model = $uiData.model(document);

//
// 获取/修改单个元素的值
//

// 修改变量名是 "user.name" 的元素的值
model.setData('user.name', '张三');

// 获取变量名是 "user.name" 的元素的值
var data = model.getData('user.name'); 
==> "张三"

//
// 获取/修改多个元素的值
//

// 修改变量名是 "user.name"、"user.password" 的元素的值
model.setData(['user.name', 'user.password'], {
  'user.name': '张三',
  'user.password': '123456'
});

// 获取变量名是 "user.name"、"user.password" 的元素的值
var data = model.getData(['user.name', 'user.password']);
==> {"user.userName":"张三","user.password":"123456"}

// 修改变量名前缀是 "user." 的元素的值
model.setData('user.*', {
  'user.name': '张三',
  'user.password': '123456'
});

// 获取变量名前缀是 "user." 的元素的值
var data = model.getData('user.*');
==> {"user.userName":"张三","user.password":"123456"}

//
// 获取/修改全部元素的值
//

// 修改全部元素的值
model.setData('*', {
  'user.name': '张三',
  'user.password': '123456'
});

// 获取全部元素的值
var data = model.getData('*');
==> {"user.userName":"张三","user.password":"123456"}
```

## 开源协议

MIT
