# 小程序开发实战笔记

## 框架类
一 、 page 文件的使用

1.Template引入与component构造器引入，应该选择哪一个？

只是展示用，建议使用template，组件中涉及到较多的逻辑，建议使用component。
因为template没有自己的js文件，所以在列表中涉及到列表子项独立的操作，建议将列表子项写成component。

示例代码：
page文件--外部模板引用  wxml
```wxml
<!--引用-->
<import src="goodlist.wxml"/>
<!--使用  goodList为page传入的数据-->
<template is="statement-goodlist" data="{{goodList}}"/>
```
2.wxs文件的使用
Wxs更多的是作为一个过滤器使用，.wxs 文件可以被其他的 .wxs 文件 或 WXML 中的 <wxs> 标签引用。
.wxs模块中引用其他 wxs 文件模块，可以使用 require 函数。

示例代码
page文件--
外部JS引用(类似过滤器效果)
```wxml
<!--引用-->
<wxs src="../../assets/wxs/phonenum.wxs" module="phone" />
<!--使用-->
<text class='statement-adress-cellphone'>{{phone.phone(AddressInfo.phone)}}</text>
```

3.生命周期
 /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 前进-跳转到其他页面的时候
  },
  
/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function () {
  // 后退-点击当前页面返回的时候
}

### 技巧类
1. 索引是变量，修改数组的值
示例代码：
// 修改某个数组的动态的值 --- 提前将数组对象准备好
// 索引index是变量， value是变量
var shipmentTypeObj = "shipmentType[" + index + "].code"
this.setData({[shipmentTypeObj]: value})


