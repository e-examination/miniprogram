
Page({
  data: {
    play: false
  },
  onShow: function () {
    this.getTabBar().init();
  },

  aotoqueue(){
    wx.showToast({
      title: '自动排队事件',
    })
  },
  changePlay(){
    let flag = !this.data.play;
    this.setData({
      play:flag
    });
    //start title
    let titleOpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleOpenAn.opacity(0).step();
    this.setData({
      titleOpenAn:titleOpenAn.export()
    });
    let titleCloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleCloseAn.opacity(1).step();
    this.setData({
      titleCloseAn:titleCloseAn.export()
    });
    //end title
    // start 第一条line
    let line1OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    line1OpenAn.translateY(12).rotate(45).scale(1.4, 1).step();
    this.setData({
      line1OpenAn:line1OpenAn.export()
    });
    let line1CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '12rpx 50%'
    });
    line1CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line1CloseAn:line1CloseAn.export()
    });
    //end 第一条line

    // start 第二条line
    let line2OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    line2OpenAn.translateY(-6.5).translateX(-1).rotate(-45).scale(1.4, 1).step();
    this.setData({
      line2OpenAn:line2OpenAn.export()
    });

    let line2CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    line2CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line2CloseAn:line2CloseAn.export()
    });
    //end 第二条line

    //start 第一个按钮
    let btn1Open = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn1Open.translateX(-60).opacity(1).step();
    this.setData({
      btn1Open:btn1Open.export()
    });

    let btn1Close = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn1Close.translateX(0).opacity(0).step();
    this.setData({
      btn1Close:btn1Close.export()
    });
    //end 第一个按钮
    //start 第二个按钮
    let btn2Open = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn2Open.translateX(-120).opacity(1).step();
    this.setData({
      btn2Open:btn2Open.export()
    });

    let btn2Close = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn2Close.translateX(0).opacity(0).step();
    this.setData({
      btn2Close:btn2Close.export()
    });
    //end 第二个按钮
    //start 第三个按钮
    let btn3Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn3Open.translateX(-180).opacity(1).step();
    this.setData({
      btn3Open:btn3Open.export()
    });

    let btn3Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn3Close.translateX(0).opacity(0).step();
    this.setData({
      btn3Close:btn3Close.export()
    });
    //end 第三个按钮
    //start 第四个按钮
    let btn4Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn4Open.translateX(-240).opacity(1).step();
    this.setData({
      btn4Open:btn4Open.export()
    });

    let btn4Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn4Close.translateX(0).opacity(0).step();
    this.setData({
      btn4Close:btn4Close.export()
    });
    //end 第四个按钮
  }
})