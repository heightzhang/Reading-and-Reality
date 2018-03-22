### Welcome to use MarkDown
1.全部遍历完数组对象后 ，再进行判断执行相应操作
案例模拟
```JS
let list = [{
  id: 1,
  pic: 'a',
  adress: 'a1'
}, {
  id: 2,
  pic: 'b',
  adress: 'b1'
}, {
  id: 3,
  pic: 'c',
  adress: 'c1'
}]
let newArr = {id: 3, pic: 'a', address: 'c2'}
let newArr2 = {id: 4, pic: 'd',adress: 'd1'}

/*
 * 要求：遇到重复的id，覆盖原先的数组对象，遇到不重复的，添加入数组
 [{
  id: 1,
  pic: 'a',
  adress: 'a1'
}, {
  id: 2,
  pic: 'b',
  adress: 'b1'
}, {
  id: 3,
  pic: 'a', // 指定pic覆盖，
  adress: 'c1'
}，{
  id: 4,
  pic: 'd',
  adress: 'd1'
}]
*/
```

解决方法
```JS
// 原始方法
function test (arr) {
  let temp = true
  let tempI
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === arr.id) {
      temp = true
      tempI = i
    }
  }
  if (temp) {
    list[tempI].pic = arr.pic
  } else {
    list[i].pic = arr.pic
  }
}
// ES6方法
function test3 (arr) {
  let idx = list.findIndex(n => n.id === arr.id)
  idx > -1 ? list[idx].pic = arr.pic : list.push(arr)
}

test4(newArr)
console.log(list)
```

2.数组对象去重
```JS
```

3.数组对象指定值的部分去重
案例模拟
```JS
// demo
var spread = [{
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}, {
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}, {
  "id": 11
}, {
  "id" : 11
}, {
  "id": 11,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}]
// 要求： 输出格式如下
/*
 [{
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
},{
  "id": 11
},{
  "id": 11,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}]
*/
```
解决方法
```JS
// 原始方法
function removeRepeatArrObj (arr) {
  // 创建一个临时变量进行记忆
  var hash = {}
  arr = arr.reduce(function (total, item) {
    // 相同则添加一个空的，不同则push进 累加的数组  --指定name属性值
    hash[item.name] = hash[item.name] ? '' : true && total.push(item)
    return total
  }, [])
  return arr
}
// lodash方法
var result = _.uniqWith(spread, _.isEqual)
console.log('结果', result)
```
4.数组对象指定值的完全去重
案例模拟
```JS
// demo
var spread = [{
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}, {
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}, {
  "id": 11
}, {
  "id" : 11
}, {
  "id": 11,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}]
// 要求：输入格式如下
/*
[{
  "id": 16,
  "name": "丑柑",
  "picType": 0,
  "title": "丑柑"
}, {
  "id": 11
}]
*/
```
解决方法：
```JS
// lodash方法
var result = _.unionBy(spread, 'id')
console.log('结果', result)
```
5.？数组对象的指定值去重(后面覆盖前面)
案例模拟
```JS
var spread = [{
  "id": 1,
  "name": "html"
}, {
  "id": 2,
  "name": "css"
}, {
  "id": 1,
  "name": "javaScript"
}, {
  "id" : 2,
  "name": "javaQuery"
}, {
  "id": 4,
  "name": "vue"
}]
/*
 * 要求 遇到重复的值，后面的覆盖前面的
[{
  "id": 1,
  "name": "javaScript"
  }, {
    "id": 2,
    "name": "javaQuery"
  },{
    "id": 4,
    "name": "vue"
}]
 */
```

解决方法
```JS
// -守候
function removeRepeatArrObj (arr, key, replaceKey) {
  let objItems = {}, _items = []
  arr.forEach(item => {
    if (!objItems[item[key]]) {
      objItems[item[key]] = item
    } else {
      objItems[item[key]][replaceKey] = item[replaceKey]
    }
  })
  for (let i in objItems) {
    _items.push(objItems[i])
  }
  return _items
}
var result = removeRepeatArrObj(spread, 'id', 'name')
console.log('结果', result)

// jiangzg
function removeRepeatArrObj (arr, key, replaceKey) {
  let temp_object = {}
  arr.forEach(n => temp_object[n.id] = n)
  temp_object = Object.keys(temp_object).map(n => temp_object[n])
  return temp_object
}
var result = removeRepeatArrObj(spread)
console.log('结果', result)
```

6.获得数组对象中子孙的值
案例模拟
```JS
const arr = [{
  id: 1,
  sub: [{
    id: 2,
    sub: [{
      id: 3,
      sub: null
    }]
  }]
 },
 {
    id: 4,
    sub: null
 }]
/*
  * 要求：获取所有元素子孙内的id 输出[1,2,3,4]
*/
```
解决方法
// jiangzg
function getIds (arr) {
  var result = []
  arr.forEach((item) => {
    // 最外层
    result.push(item.id)
    // 内层递归
    result = item.sub ? result.concat(getIds(item.sub)) : result
  })
  return result
}
var abc = getIds(arr)
console.log('结果', abc) // [1, 2, 3, 4]

7.传递四个参数，find的层层筛选
案例模拟
```JS
const list = [{
  label: '北京市',
  value: 1,
  children:[{
    label: '全部',
    value: 0
  }, {
    label: '北京市',
    value: 10,
    children: [{
      label: '东城区',
      value: 100,
      children: [{
        label: '东华门街道',
        value: 1000
      }]
    }]
  }],
  label: '天津市',
  value: 2,
  children: [{
    label: '全部',
    value: 0,
  }, {
    label: '天津市',
    value: 20,
    children: [{
      label: '和平区',
      value: 200,
      children: [{
        label: '体育馆街道',
        value: 2000
      }]
    }]
  }]
}]
// 要求： 封装一个函数， 输入[2,20, 200, 2000]，  找到体育馆街道
```
解决方法
```JS
const params = [2,20, 200, 2000]
function findLast (arr, params) {
  // let result =  arr.find(n => n.value === params[0]).children.find(n => n.value === params[1]).children.find(n => n.value === params[2]).children.find(n => n.value === params[3]).label
  // console.log(result)
  let temp
  params.forEach((item, idx) => {
    if (idx === params.length - 1) {
      temp =  arr.find(n => n.value === item).label
    } else {
      arr = arr.find(n => n.value === item).children
    }
  })
  return temp
}
console.log(findLast(list, params)) // '体育馆街道'
```

8.参数赋值
案例模拟：
```JS
let obj1 = {
  cat_id: NaN,
  name: null
}
let obj2 = {
  cat_id: 1,
  name: 'John',
  hobby: 'playfootball'
}
// 封装一个函数，传递obj1与obj2参数， return以下数据
/*
let targetObj = {
  cat_id: 1,
  name: 'John'
}
*/
```



