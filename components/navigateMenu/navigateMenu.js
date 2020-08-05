Component({
    /**
     * 组件属性列表
     */
    properties: {  
        description: {
            type: String,
            value: '分类说明',
        },
        learnMore: {
            type: String,
            value: '',
        },
        url: {
            type: String,
            value: '',
        },
    },

    /**
     * 组件初始数据
     */
    data: {

    },

    /**
     * 组件方法列表
     */
    methods: {
      
        getMoreInfo: function () {
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