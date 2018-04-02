[TOC]



# 数组

## 数组的创建

一个变量被赋值多个元素，之间用逗号隔开；

1.字面量: var arr = [1，2，3]

2.构造函数:var arr = new Array ()     好处 –可以接收参数

 

## 数组的获取

下标法:arr[0]

 

## 数组的写入

注意：如果索引值没有对应的元素（空的数组），则得到undefined;

1. 索引写入法：

   ```js
   var newarr = [];
   newarr[0] = 100;
   newarr[1] = undefined;
   ```

2. 当写入个数过多的时候数组遍历 for循环写入法（一般都用这种方法）

   ```JS
   // a.
   var arr =[1,2,3,4,5];
   // var res = 0;  求和的容器
   // for(var i=0;i<arr.length;i++){  获取每个索引值
   // res +=arr[i];求和的写法：让第一个值赋值给容器；
   }
   console.log(res)

   // b.
   var arr = [];
   for (i=0;i<=10;i++) {
          // arr[i] = i; 第一种 ；索引值和数值相等；
       if (i%2 == 0) {
          // arr.push(i);当 索引值和数值互相冲突的时候，用push追加法写入数列；
       }
   }
   console.log(arr)
   ```

   ​

## *(重点)数组的方法-常用10个*

**添加的方法**



unshift：往数组**开头添加**一个或多个元素，返回数组新的长度

push： 往数组**尾部添加**一个或多个元素，返回数组新的长度

注意 push与unshift 返回的是数组的长度；

 

删除的方法2g：

shift：**删除**数组**第一个**元素，返回删除的元素

pop：**删除**数组**最后一个**元素，返回删除的元素

注意 Pop与Shift 返回的是被删除的元素；

 

 

添加或删除常用方法1个：

splice(start,deleteNum,…items)：在数组中插入、删除、替换的通用方法

start：起始索引位置，从第几个索引开始deleteNum：要删除的数量或者要添加的元素（当delNum=0的时候表示添加）items：插入的元素（可以是多个）

注意:又删除又添加相当于替换；返回的是被删除的数组；删除的时候索引值是会变化的；

for(var j =0;j<goodshistory.length;j++){

if (goodshistory[j].guid === currentlist.guid) {

goodshistory.splice(j,1);数组中删除当前自己;

​	goodshistory.unshift(currentlist);

​	break;

}

}

其他：5

join(‘separator’) 返回字符串值，其中包含了连接到一起的数组的所有元素separator为分隔符，默认为逗号  

![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps714F.tmp.jpg) 

Join(‘’)表示这是数组转换成字符串的常用操作

​	slice(start[,end])：返回数组的片段或子数组，从start开始到end(不包括end所对应的元素)  复制数组的操作

sort：将数组中的元素排序，并返回排序后的数组 从小到大;

默认以字符串的排列方式（转换成ASCII码进行对比）

reverse：将数组中的元素颠倒顺序，返回逆序后的数组 从大到小

如果省略end参数，则截取到数组的最后一项

concat() 返回一个新数组，这个新数组是由调用这个方法的数组和参数组成

参数可以是多个

 

案例:

**如何复制数组：**

原理注意(数据在内存中的状态， 栈内存与堆内存)：

数组是属于引用数据类型：

所有的变量都会存在栈 里面； 数组内容存放在堆里面而变量（快捷方式）存放在栈里面；

所以，改变该数组内容（堆），数组的两个变量的值都会改变  =》变量是指针；

 

而基本数据类型，数组内容和变量声名都是存放在堆里面。所以，改变内容的值，两个变量都会改变；   =>变量等于内容，是真实值非指针；

 

**如何复制数组？**

**1.****用遍历复制法：** 

// 如何复制数组

​		// 遍历复制   复制堆里面的内容,而不能复制栈,复制栈只是复制一个指针而已;

 

![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps7150.tmp.jpg) 

 

arr3[i]= arr[i] ; 或者 arr3.push(arr[i])  都可以进行赋值；

引用数据类型 判断是否同一个数据，堆内存不同，返回false；基本数据类型判断值是否相等；

 

 

**2.****用****slice方法实现数组复制：（超级简单的方式，适用于不需要遍历的情况下）**

slice(star,end)：返回数组的片段或子数组，从start开始到end(不包括end所对应的元素)

如果省略end参数，则截取到数组的最后一项

 

 

 

比如：slice(0)

var arr = [10,20,2,3,33,44,55,12];

​		var newArr = arr.slice(0);

​		console.log(newArr);

总结：数组复制的方法有三种 ，遍历两种，非遍历一种



## 数组的排序   冒泡与选择

**从小到大**：

**1.S****ort属性排序法：**

sort：将数组中的元素排序，并返回排序后的数组  （以第一个进行排序）

默认以字符串的排列方式（转换成ASCII码进行对比）

 

解决方法：当有两个最小值的受sort(正数/负数/零)

![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps7161.tmp.jpg) 

 

**2.冒泡排序法规则：重点**

遍历数组，按顺序两两进行对比，每次把最大的值往后排；

优化：

![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps7162.tmp.jpg) 

冒泡排序法的两个优化方法：

案例

![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps7163.tmp.jpg) 

 

优化1：J < arr.length-i;  //减少多余循环的次数，但是仍没有直接写循环次数来的方便；

优化2：用splice   // 位置交换优化：

​		// var delItem = arr.splice(j,1)[0];

​		// arr.splice(j+1,0,delItem)

​		arr.splice(j+1,0,arr.splice(j,1)[0])

 

 

**从大到小：**

**reverse属性法：将****‘从小到大的’****数组中的元素颠倒顺序，返回逆序后的数组** **console.log(arr.reverse())**

**或者将大于改为小于，两两对比，每次将最小的值往后排；**

总结:冒泡排序法:----大于：从大到小；小于:从小到大；----

 

 

 

 

**选择排序法：**

​	**第一个和第二个，第二个和第三个对比，把小的往前面排**

​	var arr = [10,23,5,6,33,7,9,8];

 

​		for(var i=0;i<arr.length;i++){

​			for(var j=i+1;j<arr.length;j++){

​				if(arr[i] > arr[j]){

​					var temp = arr[i];

​					arr[i] = arr[j];

​					arr[j] = temp;

​				}

​				console.log(arr.join());

​			}

​			console.log('--------------------');

​		}

​		console.log(arr);

 

​	![img](file:///C:\Users\freshjn\AppData\Local\Temp\ksohtml\wps7174.tmp.jpg)

 

 

 

案例：

随机点名：点击事件绑定触发的时候才执行函数，才会打印；

元素的value与innerHTML的区别；Div用 innerHTML ， input用 ID名.value;

全局作用域  的name是不能用的。一般放在window.onload function里面，避免变量命名与window的属性值出现冲突；

 

Tofixed(2)保留后面的2位小数， 返回的是一个字符串，修改为Number（tofixed(2)）