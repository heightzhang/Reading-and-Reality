// components/auto-input/auto-input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: 'String',
      value: '80%'
    },
    height: {
      type: 'String',
      value: '84rpx'
    },
    inputValue: {
      type: String,
      value: "",
      observer: function (newVal, oldVal) {
        console.log('newVal', newVal)
      }
    },
    valueLength: {
      type: Number,
      value: 0,
      observer: function (newval, oldval) {
        const isNext = this.data.isNext
        if (newval === this.data.maxlength) {
          if (isNext) {
            setTimeout(() => {
              this.setData({
                inputValue: '',
                arr: [],
                active: 0
              })
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              })
            }, 100)
          } else {
            console.log('isNext', false)
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          }
          
        }
      }
    },
    maxlength: {
      type: Number,
      value: 4
    },
    password: {
      type: Boolean,
      value: false
    },
    isFocus: {
      type: Boolean,
      value: false
    },
    isFocusClass: {
      type: Boolean,
      value: false
    },
    isNext: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    arr: [],
    active: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onClickView () {
      // this.setData({
      //   isFocus: true
      // })
    },
    getValue(e) {
      const {value, cursor} = e.detail
      let { 
       arr,
       active,
       length,
       isFocusInput
      } = this.data
      console.log('value', value.length)
      active = cursor - 1
      arr = [...value.split('')]
      this.setData({
        arr,
        active,
        inputValue: value,
        valueLength: value.length
      })
    }
  }
})
