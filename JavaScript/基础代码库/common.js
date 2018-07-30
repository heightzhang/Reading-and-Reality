
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
  throttle: (fn, wait) => {
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
  }
}