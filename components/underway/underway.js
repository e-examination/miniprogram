Component({
  properties: {
    description: {
      type: String,
      value: '',
  },
  More: {
      type: String,
      value: '',
  },
  url: {
      type: String,
      value: '',
  },
  time: {
    type: String,
    value: '',
  },
  doctor: {
    type: String,
    value: '',
  },
  status: {
    type: String,
    value: '',
  }
  },
  data: {
    someData: 1
  },
  method: {
    getMoreInfo: function () {
      if (this.properties.url != '') {
          wx.navigateTo({
              url: this.properties.url,
              fail: function(res) {
                  console.log(res + '加载失败');
              }
          })
      }
  },
  }
})