# 项目中的应用
## 我对编写可维护的JavaScript的应用
### 编程风格

1.检测值
示例代码：
```JS
// -------------- 直接数据类型  ----------------
// 检测字符串
if (typeof name === "string") {
  // 执行代码
}

// 检测数字
if (typeof count === "number") {
  // 一些代码
}

// 检测数字
if (typeof found === "boolean") {
  // 一些代码
}

// 检测undefined
if (typeof MyApp === "undefined") {
  // 一些代码
}
// 检测null 用恒等预算符
if (this.skuName !== null) {
  // 输入框有值才执行请求接口
  this.copySkuBlock()
} else {
  // 提示输入框要输入值
  this.$message({
    type: 'error',
    message: '请输入商品规格'
  })
}

// ------------ 引用数据类型 ----------------
// 检测日期
if (value instanceof Date) {
  // 一些代码
}

// 检测正则表达式
if (value instanceof RegExp) {
  // 一些代码
}

// 检测Error
if (value instanceof Error) {
  // 一些代码
  throw value
}

// ------------- 函数 ------------------------
function myFunc () {
  console.log(typeof myFunc === "function") // true
}

// -------------- 数组 ----------------------
var  arr = [1, 2, 3]
console.log(Array.isArray(arr)) // true

// ------------- 对象 -----------------------
// 检测属性
if ("count" in object) {
  // 一些代码
}
// 检测属性值
```
2. 基本格式化
```JS
  // --------------- for循环 -----------------------
  // for循环为了可读性，用条件语句代替for循环中的continue,
  // 好的写法
  var values = [0, 1, 2, 3, 4, 5, 6],
    i,len
  for (i = 0, len = values.length; i < len; i++) {
    if (i !== 2 ) {
    console.log('第' + i + '次循环')
    }
  }

  // ----------- for-in 循环 ------------------
  // 好的写法 // 包含对原型链的遍历
  var prop
  for (prop in object) {  // 包含对原型链的遍历
    console.log('Property name is' + prop)
    console.log('Property value is' + object[prop])
  }
  // 好的写法  不包含对原型链的遍历
  var prop
  for (prop in object) {
    if (object.hasOwnProperty(prop)) {
      console.log('Property name is' + prop)
      console.log('Property value is' + object[prop])
    }
  }
  // ----------- 严格模式 --------------------
  // 好的写法 避免出现全局的严格模式
  (function () {
     'use strict'
     function doSomething () {
        // 一些代码
     }
     function doSomethingElse () {
       // 一些代码
     }
  })
  // ----------- 运算符 ---------------------
  // 好的写法
  console.log(5 === '5') // false
```