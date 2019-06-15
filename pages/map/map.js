// pages/map/map.js
Page({

  /**
   * Page initial data
   */
  data: {
    news: [
      '平安夜，百人祝福领取苹果~',
      '寒流来袭，你的秋裤准备好了吗？',
      '快收下，新鲜出炉冬季实用穿搭指南~'
    ],
    autoplay: true,
    interval: 2000,
    duration: 1000,
    lag: "",
    long: "",
    callout: ""
  },

  goBack: function () {
    wx.navigateBack();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          lag: res.latitude,
          long: res.longitude,
          markers: [{
            id: 100000,
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: '/images/mark.png',
            width: 45,
            height: 40,
            callout: {
              content: " 厦门思明区政府 \n 12000元/㎡",
              padding: 16,
              fontSize: "16", 
              textAlign: 'center',
              bgColor: "#ffffff",
            }
        
          }]
        })
        getApp().globalData.lat = that.data.lag
        getApp().globalData.long = that.data.long
      }
    });
    // 
    console.log(this.data.lag)
    
    let page = this
    wx.request({
      url: `http://localhost:3000/posts?lang=${getApp().globalData.userInfo.language}`,
      success: function (res) {
        console.log(res.data)
        page.setData({ posts: res.data.posts })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})