const common =  {
  /**
   * 判断数据类型代码库
   * @author heightzhang
  */
  // 常用：
  isNull:value => {
    if (value == null || value == undefined) return true
    if (this.isString(value)) {
      if (value.trim().length == 0) return true
    } else if (this.isArray(value)) {
      if (value.length == 0) return true
    } else if (this.isObject(value)) {
      for (let name in value) return false
      return true
    }
    return false
  }
  isUndefined:val => {
    return val === undefined
  }
  isEmpty:val => {
   return val == null || !(Object.keys(val) || val).length
  }
  // 基本数据类型:
  isString:value => {
    return value != null && value != undefined && value.constructor == String
  }
  isNumber:value => {
    return value != null && value != undefined && value.constructor == Number
  }
  isBoolean:value => {
    return value != null && value != undefined && value.constructor == Boolean
  }
  // 引用数据类型:
  isArray:value => {
    return value != null && value != undefined && value.constructor == Array
  }
  isObject: value => {
    return value != null && value != undefined && value.constructor == Object
  }
  isFunction:value => {
    return value != null && value != undefined && value.constructor == Function
  }
  isSymbol:val => {
    return  typeof val === 'symbol'
  }
  /**
   * 基础操作的代码库
   * @author heightzhang
  */
  /**
   * 1
   * [获取url地址的参数params]
   * @param {string} url
   * @example
   * getURLParameters('http://url.com/page?name=Adam&surname=Smith'); // {name: 'Adam', surname: 'Smith'}
   * getURLParameters('google.com'); // {}
   */
  getURLParameters: url => {
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
      (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {}
    )
  },
  /**
   * 2
   * [数组/对象的深拷贝(递归法)]
   * @param {Array/Obj} source
   */
  deepClone: source => {
    /*
    // 判断复制的目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {};
    // 遍历目标
    for (let keys in source) {
      if (source.hasOwnProperty(keys)) {
        // 如果值是对象，就递归一下
        if (source[keys] && typeof source[keys] === 'object') {
           targetObj[keys] = source[keys].constructor === Array ? [] : {};
           targetObj[keys] = deepClone(source[keys]);
        } else {
          // 如果不是，就直接赋值
          targetObj[keys] = source[keys];
        }
      }
    }
    return targetObj;
    */
    let clone = Object.assign({}, source);
    Object.keys(clone).forEach(
      key => (clone[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key])
    );
    return clone;
  },
  /**
   * 3
   * 函数防抖
   * @param {function} fn
   * @param {number} ms
   * 文字输入、自动完成、搜索框的keyup事件,射击游戏中的mousedown、keydown,window的resize等
   */
  debounce: (fn, ms = 0) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  },
  /**
   * 4
   * 函数节流
   * @param {function} fn
   * @param {number} wait
   * scroll 时更新样式，如随动效等
   * 拓展版: https://juejin.im/post/5b45fa596fb9a04fad3a0268
   */
  throttle: (fn, wait = 10) => {
    let inThrottle, lastFn, lastTime;
    return function() {
      const context = this,
        args = arguments;
      if (!inThrottle) {
        fn.apply(context, args);
        lastTime = Date.now();
        inThrottle = true;
      } else {
        clearTimeout(lastFn);
        lastFn = setTimeout(function() {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        }, wait - (Date.now() - lastTime));
      }
    };
  },
  /**
   * 5
   * 函数节流 by requestAnimationFrame
   * @param {function} fn
   * https://www.cnblogs.com/xiaohuochai/p/5777186.html
   */
  throttleByRaf:(fn) => {
    let isRunning = false
    return function () {
      if (isRunning) return
      isRunning = true
      window.requestAnimationFrame(() => {
        fn()
        isRunning = false
      })
    }
  },
  /**
   * 6
   * 蹦床函数 解决尾递归的调用栈溢出 =》实质将递归执行改为循环执行，保证调用栈只有一层；
   * @param {fn} fn 递归函数
   * example
   * var sum = trampoline(function(x, y) {
      if (y > 0) {
        return sum(x + 1, y - 1)
      }
      else {
        console.log(x)
        return x
      }
    });
   * http://es6.ruanyifeng.com/#docs/function
   */
  trampoline: (fn) => {
    let value
    let active = false
    let accumulated = []
    return function accumulator() {
      accumulated.push(arguments)
      if (!active) {
        active = true
        while (accumulated.length) {
          value = fn.apply(this, accumulated.shift())
        }
        active = false
        return value
      }
    };
  }
  // --- 时间处理 -----
  /**
   * 7.时间格式处理
   * 时间戳转化为年 月 日 时 分 秒
   * @param {number} number 传入时间戳
   * @param {format} string 返回格式，支持自定义，但参数必须与matchStr里保持一致
   * example
   * 1534262400 => 2018-08-15 00:00:00
   * formatTime(1534262400, 'Y-M-D h:m:s') // 2018-08-15 00:00:00
   */
  formatTime: (number, formate)  {
    // 补零操作
    function addPreZero(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    // 将年、月、日、时、分、秒组合成一个数组
    var arr = [];
    var date = new Date(number * 1000);
    arr.push(date.getFullYear());
    arr.push(addPreZero(date.getMonth() + 1));
    arr.push(addPreZero(date.getDate()));
    arr.push(addPreZero(date.getHours()));
    arr.push(addPreZero(date.getMinutes()));
    arr.push(addPreZero(date.getSeconds()));
    console.log('arr', arr)
    // 匹配到matchStr的字符，则用对应的数字替换
    var matchStr = ['Y', 'M', 'D', 'h', 'm', 's'];
    arr.forEach((item, idx) => {
      formate = formate.replace(matchStr[idx], item)
    })
    return formate;
  },
  // --- 数组的处理 -------
  /**
   * 8.数组对象的排序
   * @param {key} string 指定key值的排序
   * @param {isAscend} boolean 是否升序(true/flase) ？ 升序 : 降序
   * example
   * var arr = [{id: 1}, {id: 2}, {id: 3}]
   * var result = arr.sort(sortBy('id'))
   * result => [{id: 1}, {id: 2}, {id: 3}]
   */
  sortBy: (key, isAscend) {
    // 第二个参数没有传递 默认升序排列
    if (isAscend === undefined) {
      isAscend = 1
    } else {
      isAscend = (isAscend) ? 1 : -1
    }
    return (a, b) => {
      a = a[key]
      b = b[key]
      if (a < b) {
        return isAscend * -1
      }
      if (a > b) {
        return isAscend * 1
      }
      return 0
    }
  }
}