

// ----------------------------获取随机颜色\随机整数--------------------------------------

/**
 * [RGB模式 获取随机颜色]
 * @return 返回一个rgb颜色:'rgb(255,0,0)'
 */
function randomColor(){
  var r = randomNum(0,255);
  var g = randomNum(0,255);
  var b = randomNum(0,255);

  var res = 'rgb(' + r + ',' + g + ',' + b + ')';

  // 把随机颜色返回
  return res;
}

/**
 * [十六进制模式 获取随机颜色]
 * @return  返回一个十六进制的随机颜色字符串'#dddf56';
 */


function randomColor(){
      var res ='#';
      var str = '0123456789abcdef';
      for(var i= 0; i<6;i++){
        var Idx =Math.floor(Math.random()*str.length);
        res += str[Idx];
      }

      return res;

    }

/**
 * [获取随机四位验证码]
 * @返回一个随机四位验证码
  function randomNumber(){
      var res =parseInt(Math.random()*10000) ;
      res =String(res);
      while(res.length<4){
        res='0' +res;
        }
      num.value = res;
      }

    randomNumber()

  }
 */



/**
 * [获取随机整数]
 * @return 返回一个随机整数
 */
function randomNum(min,max){
  //得到一个min到max之间随机整数
  var res = parseInt(Math.random()*(max-min+1)) + min;

  // 把随机整数返回
  return res;
}

// ----------------------过滤非元素节点-----------------------------------------

/**
 * [删除非元素节点]
 * @param  {[array]} nodes [节点]
 * @return {[array]}       [把过滤后的元素返回]
 */
function getElement(nodes){
  var res = [];

  for(var i=0;i<nodes.length;i++){
    if(nodes[i].nodeType === 1){
      res.push(nodes[i]);
    }
  }

  return res;
}


// --------------------------------获取元素的样式-------------------------------------------------
/**
 * [获取元素样式的方法，兼容ie8-]
 * @param  {Element} ele  [要获取样式的元素]
 * @param  {String} attr [css属性]
 * @return {String}      [返回css属性对应的样式]
 */
function getStyle(ele,attr){
  // 保存最终样式
  var res;
  if(window.getComputedStyle){
    res = getComputedStyle(ele)[attr];
  }else if(ele.currentStyle){
    res = ele.currentStyle[attr];
  }else{
    res = ele.style[attr];
  }

  return res;
}
// var box = document.getElementById('box')
// getStyle(box,'background-color')

// -----------------事件监听器  给元素添加事件(兼容性)-------------------------------------------

/**
 * [给元素添加事件，兼容IE8以下浏览器]
 * @param {Node}   ele     [需要绑定事件的元素]
 * @param {String}   type    [事件类型]
 * @param {Function} handler [事件处理函数]
 * @param {Boolean}  capture [是否捕获]
 */
function addEvent(ele,type,handler,capture){
  // 判断是否支持事件监听
  // 标准浏览器
  if(ele.addEventListener){
    ele.addEventListener(type,handler,capture);
  }

  // IE8-
  else if(ele.attachEvent){
    ele.attachEvent('on' + type,handler);
  }

  // 传统绑定事件方式
  else{
    ele['on' + type] = handler;
  }
}
// addEvent(box,'click',function(){},true)


// ----------------------------Cookie的增删改--------------------------------------

//cookie操作
//写入，读取，删除

/**
 * [设置cookie]
 * @param {[String]} name    [cookie名]
 * @param {[String]} val     [cookie值]
 * @param {[Date]} expires   [cookie有效期]
 * @param {[String]} path    [cookie保存路径]
 */
function setCookie(name,val,expires,path){
  var str = name + '=' + val;

  if(expires){
    str +=';expires=' + expires;
  }

  if(path){
    str += ';path=' + path;
  }


  document.cookie = str;
}
// setCookie('left',100);


function getCookie(name){
  // 得到所有的cookie
  var cookies = document.cookie;

  var res = '';

  if(cookies.length){
    cookies = cookies.split('; ');
    cookies.forEach(function(item){
      var arr = item.split('=');
      if(arr[0] === name){
        res = arr[1];
      }
    })
  }

  return res;
}
//var left = getCookie('left');//100


function removeCookie(name){
  var now = new Date();
  now.setDate(now.getDate()-7);

  // setCookie(name,null,now);
  document.cookie = name + '=null;expires=' + now;
}
//removeCookie('left')

// ----------------------------动画函数--------------------------------------

/**
 * [动画函数]
 * @param  {[Node]}   ele      [执行动画的元素]
 * @param  {[String]}   attr     [动画改变的属性]
 * @param  {[Number]}   target   [属性目标值]
 * @param  {Function} callback [回调函数]
 */
/*function animate(ele,attr,target,callback){
  var timerName = attr + 'timer';

  // 创建定时器前先清除之前的定时器
  clearInterval(ele[timerName]);

  // 定时器与DOM节点绑定
  ele[timerName] = setInterval(function(){
    // 先获取当前值
    var current = getStyle(ele,attr);//'10px','20rem','50deg','1em';

    // 提取单位
    var unit = current.match(/[a-z]+$/i);//['px'],null
    unit = unit ? unit[0] : '';

    // 提取当前值（数值）
    current = parseFloat(current);

    // 计算速度
    var speed = (target-current)/10;//0.3,-0.2


    // 单独处理opacity属性
    if(attr === 'opacity'){
      speed = speed>0 ? 0.1 : -0.1;
    }else{
      // 根据正负值分别取整
      speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
    }


    // 到达目标值后停止定时器
    if(speed===0 || current === target){
      clearInterval(ele[timerName]);

      // 重置current值
      current = target - speed;

      if(typeof callback === 'function'){
        callback();
      }
    }


    ele.style[attr] = current + speed + unit;
  },50);
}*/
//animate(box,'width',120)

function animate(ele,opt,callback){
  // 记录属性动画数量
  var timerLen = 0;

  //遍历opt对象，为每个属性设定一个定时器
  for(var attr in opt){
    timerLen++;

    createTimer(attr);
  }

  function createTimer(attr){
    // 获取目标值
    var target = opt[attr];

    // 为每个属性创建一个定时器标识
    var timerName = attr + 'timer';


    // 创建定时器前先清除之前的定时器
    clearInterval(ele[timerName]);


    // 定时器与DOM节点绑定
    ele[timerName] = setInterval(function(){
      // 先获取当前值
      var current = getStyle(ele,attr);//'10px','20rem','50deg','1em';

      // 提取单位
      var unit = current.match(/[a-z]+$/i);//['px'],null
      unit = unit ? unit[0] : '';

      // 提取当前值（数值）
      current = parseFloat(current);

      // 计算速度
      var speed = (target-current)/10;//0.3,-0.2


      // 单独处理opacity属性
      if(attr === 'opacity'){
        speed = speed>0 ? 0.1 : -0.1;
      }else{
        // 根据正负值分别取整
        speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
      }


      // 到达目标值后停止定时器
      if(speed===0 || current === target){
        clearInterval(ele[timerName]);

        // 重置current值
        current = target - speed;

        // 每执行完一个动画timerLen减一
        timerLen--;

        if(typeof callback === 'function' && timerLen===0){
          callback();
        }
      }


      ele.style[attr] = current + speed + unit;
    },50);
  }

}

// -----------------------------ajax请求----------------------------------------------------------

// ajax请求
function ajax(options){

  // 默认参数
  var defaults = {
    // 请求类型
    type:'get',

    // 是否异步
    async:true
  }

  // 扩展默认参数
  for(var attr in options){
    defaults[attr] = options[attr];
  }

  var opt = defaults;


  var xhr = null;

  try{
    xhr = new XMLHttpRequest();
  }catch(error){
    try{
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }catch(err){
      try{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(e){
        alert('你不适合浏览这个网站，请下载google浏览器')
      }
    }

  }

  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)){
      if(typeof opt.callback === 'function'){//[]{}
        var res = xhr.responseText;

        // if(/^[\[\{}]/.test(xhr.responseText)){
        //  res = JSON.parse(xhr.responseText);
        // }


        // 自动转换json字符串
        try{
          res = JSON.parse(res);
        }catch(err){
          res = res;
        }

        opt.callback(res);
      }
    }
  }

  // 处理数据
  // {id:20,msg:'xx'} => 'id=20&msg=xx'
  var params = '';
  if(opt.data){
    for(var attr in opt.data){
      params += attr + '=' + opt.data[attr] + '&';
    }

    // 去掉最后一个&
    params = params.slice(0,-1);
  }

  // 判断get/post请求，以便传递参数
  if(opt.type === 'get'){
    opt.url += '?' + params;
  }

  xhr.open(opt.type,opt.url,opt.async);

  if(opt.type === 'post'){
    xhr.setRequestHeader('content-type',"application/x-www-form-urlencoded");
  }else{
    params = null;
  }

  xhr.send(params);
}
//如何让ajax方法支持jsonp请求
/*ajax({
  url:'api/weibo_like.php',
  type:'post',
  data:{id:1},
  success:function(data){
    // 处理数据
  }
});*/


// -----------------------------判断数据类型----------------------------------------------------------
function type(data){
  // [object Object]
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}
// type(123) => 'number'
// type({}) => 'object'
// type([]) => 'array'
// type(/aa/) => 'regexp'