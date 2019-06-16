// pages/map/map.js
Page({

  /**
   * Page initial data
   */
  data: {
    news: [
      '2019/06/16 13:00 第13号 超级台风 珊珊生成',
      '2019/06/16 13:00 No.13 Typhoon reaches Shanghai',
    ],
    autoplay: true,
    interval: 2000,
    duration: 1000,
  },

  goBack: function () {
    wx.navigateBack();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let that = this
    wx.getLocation({
      success: function (res) {
        // console.log(res)
        that.setData({
          lat: res.latitude,
          long: res.longitude,
        })
        getApp().globalData.lat = that.data.lag
        getApp().globalData.long = that.data.long
      }
    });
    
    wx.request({
      url: `http://localhost:3000/posts?lang=en`,
      success: function (res) {
        console.log(res.data)
        that.setData({ posts: res.data.posts })
        let markers = []
        that.data.posts.forEach(function(post) {
          let marker = {
            id: post.id,
            latitude: parseFloat(post.lat),
            longitude: parseFloat(post.long),
            iconPath: '/images/mark.png',
            width: 45,
            height: 40
            }
          markers.push(marker)
        })
        that.setData({markers: markers})
        console.log(that.data.markers)
      }
    })
  },

  goToShowPage: function(e) {

    wx.navigateTo({
        url: `/pages/card/card?id=${e.markerId}`,
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