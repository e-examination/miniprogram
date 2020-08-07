// components/hospitalCards.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg',
    },
    name: {
      type: String,
      value: '医院名称',
    },
    address: {
      type: String,
      value: '医院地址',
    },
    rate: Number,
    amount: Number,
    tags: Array,
    url: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    linkTo: function() {
      if (this.properties.url != '') {
        wx.navigateTo({
            url: this.properties.url,
            fail: function(res) {
                console.log(res + '加载失败');
            }
        })
    }
    }
  }
})
