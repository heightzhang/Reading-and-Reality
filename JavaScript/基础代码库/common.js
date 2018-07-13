
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
  }
}

export default lang