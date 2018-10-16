// components/auto-input-mask/auto-input-mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    autoInputConfig: {
      // 输入框的宽度
      width: '80%',
      height: '84rpx',
      // 输入框的初始值
      inputValue: '',
      // 输入最大值  默认为4
      maxlength: 4,
      // 输入框的密码位数
      valueLength: 0,
      // 是否是密码类型 默认为false
      password: false
      // 是否显示光标
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('myAutoInputMask', { type: 'close', value: false })
    }
  }
})
