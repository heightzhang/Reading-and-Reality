[TOC]

# 数组

## ES5方法-常用11个

### 添加 2

unshift：往数组**开头添加**一个或多个元素，返回数组新的长度

push： 往数组**尾部添加**一个或多个元素，返回数组新的长度

注意 push与unshift 返回的是数组的长度；

 

### 删除 2

shift：**删除**数组**第一个**元素，返回删除的元素

pop：**删除**数组**最后一个**元素，返回删除的元素

注意 Pop与Shift 返回的是被删除的元素；

 

### 添加/删除的组合 1

splice(start,deleteNum,…items)：在数组中插入、删除、替换的通用方法,返回的是被删除的数组。

start：起始索引位置，从第几个索引开始

deleteNum：要删除的数量或者要添加的元素（当delNum=0的时候表示添加）

items：插入的元素（可以是多个）

注意:又删除又添加相当于替换；

示例代码：

```JS
for(var j =0;j<goodshistory.length;j++){
  if (goodshistory[j].guid === currentlist.guid) {
     goodshistory.splice(j,1);数组中删除当前自己;
     goodshistory.unshift(currentlist);
     break;
  }
}
```



### 其它  6

indexOf 返回某个指定的字符串值在字符串中首次出现的位置,如果要检索的字符串值没有出现，则该方法返回 -1

注意：若返回>=0或！== -1说明存在

```jS
var arr = [10, 20, '30', 'xyz'];
arr.indexOf(10); // 元素10的索引为0
arr.indexOf(20); // 元素20的索引为1
arr.indexOf(30); // 元素30没有找到，返回-1
arr.indexOf('30'); // 元素'30'的索引为2
```



join(‘separator’) 返回字符串值，其中包含了连接到一起的数组的所有元素separator为分隔符，默认为逗号  

```JS
// Join('')表示这是数组转换成字符串的常用操作
var arr = ['A', 'B', 'C', 1, 2, 3];
var newArr = arr.join(''); // 'ABC123'
```



slice(start[,end])：返回数组的片段或子数组，从start开始到end(不包括end所对应的元素) 

```JS
//  复制数组的操作
var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var aCopy = arr.slice() // ['A', 'B', 'C', 'D', 'E', 'F', 'G']
aCopy === arr; // false
```



sort：将数组中的元素排序，并返回排序后的数组 从小到大; 

注意默认的排序规则：把所有元素**先转换为String**再排序（再用**ASCII码**进行对比）

```JS
var arr = ['B', 'C', 'A'];
arr.sort();
arr; // ['A', 'B', 'C']
```

能否按照我们自己指定的顺序排序呢？完全可以，我们将在后面的函数中讲到。



reverse：将数组中的元素颠倒顺序，返回逆序后的数组

```JS
var arr = ['one', 'two', 'three'];
arr.reverse(); 
arr; // ['three', 'two', 'one']
```



concat() 返回一个新数组，这个新数组是由调用这个方法的数组和参数组成。并没有修改当前Array。

```JS
var arr = ['A', 'B', 'C'];
var added = arr.concat([1, 2, 3]);
added; // ['A', 'B', 'C', 1, 2, 3]
arr; // ['A', 'B', 'C']
```

实际上，`concat()`方法可以接收任意个元素和`Array`，并且自动把`Array`拆开，然后全部添加到新的`Array`里：

```JS
var arr = ['A', 'B', 'C'];
arr.concat(1, 2, [3, 4]); // ['A', 'B', 'C', 1, 2, 3, 4]
```





## ES5-新增方法

注意    IE9及IE9以上才支持；

### 判断是否为数组

Array.isArray()

当是数组或者对象的时候，typeof  出现的都是object; 为了弥补缺陷，出现了Array.isArray()   

```JS
// 是数组返回是true；否则返回是false;
var arr = [1,2,3]
console.log(Array.isArray(arr)) // true
```

注意:类数组返回的是false;

当给的值为object的时候,首先typeof ,然后用Array.如果是false, 那么这个就是object; 



### 数组遍历方法

1.array.forEach(function(item, index, array), thisValue)

返回undefined

循环的次数取决于数组元素的长度；相当于for循环，比for循环方便；



2.map(fn)  

返回一个新数组

array.map(function(item, index, array), thisValue)



3.filter(fn) 返回该函数会返回 true 的项组成的数组，利用这个方法可对数组元素进行过滤筛选

返回值，返回一个新数组

案例：利用filter实现过滤：

```JS
var arr = [1,5,6,7,8]
var filterArr = arr.filter(n => n > 5)
console.log(filterArr) // [6, 7, 8]
```



4.every(fn)
如果该函数对每一项都返回 true，则返回true

5.some(fn)
如果该函数对任何一项返回 true，则返回true

 

以上方法都对数组中的每一项运行给定函数fn,，函数中都有三个形参分别为
\- item：数组中的每一项,
\- index：遍历过程中对应的索引值,
\- array：对数组的引用

名字可以自定义，只有一个表示输出item,



### 归并方法	

这两个方法都会迭代数组中的所有项，然后生成一个最终返回值。

 reduce(fn,initVal)

reduceRight(fn,initVal)

fn(prev,cur,index,array):

 fn是每一项调用的函数，函数接受4个参数分别是

prev：上一次返回值，

cur：当前值

index：索引值，

array：当前数组，

**函数需要返回一个值，这个值会在下一次迭代中作为prev的值**

initVal: 迭代初始值（可选），如果缺省，prev的值为数组第一项

案例：计算数组的求和

```JS
var arr = [1, 2, 3, 4, 5]
var res = arr.reduce(function(prev, cur, index, array) {
  return prev + cur
})
console.log('数组求和', res)  // 15 
```



## ES6方法

### 小技巧

数组的解构赋值

```JS
var arr = [1, 2]
var [a, b] = arr
console.log(b) // 2
```

数组的扩展运算符

```js
// 复制数组
var copyArr = [...arr]
```



### find

`find`方法，用于找出第一个符合条件的数组成员。如果没找到符合条件的成员就返回`underfind`

```JS
// 第一个大于2的成员
[1, 2, 3, 4].find(n => n > 2) // 3
```



### findIndex

`findIndex`方法，用于找出第一个符合条件的数组成员的索引。

```JS
// 第一个大于2的成员的索引
[1, 2, 3, 4].findIndex(n => n > 2)// 2
```



### includes

`includes`方法，用于某个数组是否包含给定的值，返回一个布尔值。如果没找到符合条件的成员就返回`underfind`

```JS
[1, 2, 3].includes(2) // true
[1, 2, 3].includes(5) // false
[1, 2, NaN].includes (NaN)// true
```



### from

`from`用于将两类对象转为真正的数组：类似数组的对象和可遍历的对象

```JS
Array.from('守候')//["守", "候"]
//常见的使用方式还有-将Dom集合和arguments转成真正的数组
let oLi = document.querySelectorAll('li');
Array.from(oLi ).forEach(function (item) {
  console.log(item);
});

// arguments对象
function fn() {
  let args = Array.from(arguments);
}
//顺便说下Set
let newSet = new Set(['a', 'b','a','c'])
Array.from(newSet) // ['a', 'b','c'] 
//ES6 新增的数据结构--Set。它类似于数组，但是成员的值都是唯一的，不重复的。
//相信大家很容易想到怎么用了，比如数组去重，用Set实现就简单多了。   
removeRepeatArray(arr) {
    //return [Array.from(arr)]
    return [...new Set(arr)]
}
```



更多请参考： [阮一峰教程-ES6之数组](http://es6.ruanyifeng.com/#docs/array#%E6%95%B0%E7%BB%84%E7%9A%84%E7%A9%BA%E4%BD%8D)





30-seconds-of-code方法

