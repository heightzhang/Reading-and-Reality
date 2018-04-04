对象合并的两种情况
1.相同属性覆盖,不相同属性添加 Object.assign

2.相同属性覆盖,不相同属性剔除 自己封装的一个方法，适合用在自定义的参数赋值



案例如下：

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
// 任务1 相同属性覆盖,不相同属性添加
/*
let targetObj = {
  cat_id: 1,
  name: 'John'，
  hobby: 'playfootball'
}
*/

// 方法
Object.assign(obj1, obj2)

// 任务2 相同属性覆盖,不相同属性剔除
/*
let targetObj = {
  cat_id: 1,
  name: 'John'
}
*/
// 方法
function test2 (obj1,obj2) {
  // 拿到共同元素属性名，通过属性名去判断
  Object.keys(obj1).forEach(key => {
    if (key in obj2) obj1[key] = obj2[key]
  })
  return obj1
}
console.log(test2(obj1,obj2))



```

