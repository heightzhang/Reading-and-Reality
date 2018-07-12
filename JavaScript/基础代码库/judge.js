/**
 * 判断数据类型代码库
 * @author heightzhang
 */
class judge {
  isNull(value) {
    if (value == null || value == undefined) return true
    if (this.isString(value)) {
      if (value.trim().length == 0) return true
    } else if (this.isArray(value)) {
      if (value.length == 0) return true
    } else if (this.isObject(value)) {
      for (let name in value) return false
      return true
    }
    return false;
  }
  isString(value) {
    return value != null && value != undefined && value.constructor == String
  }
  isNumber(value) {
    return value != null && value != undefined && value.constructor == Number
  }
  isBoolean(value) {
    return value != null && value != undefined && value.constructor == Boolean
  }
  isArray(value) {
    return value != null && value != undefined && value.constructor == Array
  }
  isObject(value) {
    return value != null && value != undefined && value.constructor == Object
  }
  isFunction(value) {
    return value != null && value != undefined && value.constructor == Function
  }
}

export default lang