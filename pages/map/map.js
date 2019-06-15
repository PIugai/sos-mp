// pages/map/map.js
Page({

  /**
   * Page initial data
   */
  data: {
  
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
          addmessage: res.address,
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
              display: 'ALWAYS',
              textAlign: 'center',
              bgColor: "#ffffff",
            }

          }]
        })
      }
    });
    
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