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
        console.log(res)
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
      },
      fail: function(res) {
        console.log(res)
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