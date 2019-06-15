// pages/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  goBack: function () {
    wx.navigateBack();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.request({
      url: `http://localhost:3000/posts?lang=${getApp().globalData.userInfo.language}`,
      success: function(res) {
        console.log(res.data)
        page.setData({posts: res.data.posts})
        let lat = getApp().globalData.lat.toString()
        let long = getApp().globalData.long.toString()
        let user_address = `${long.toString()},${lat.toString()}`
        page.data.posts.forEach(function (post) {
          let post_address = `${post.long},${post.lat}`
          // console.log(post_address)
          let url = `https://restapi.amap.com/v3/direction/walking?origin=${post_address}&destination=${user_address}&key=27df61d7d7a623d9d3ef412a48ee6218`
          wx.request({
            url: url,
            success: function (res) {
              console.log(res)
              let km = (res.data.route.paths[0].distance / 1000).toString()
              post.distance = `${km} kilometers away`
              console.log(post.distance)
            }
          })
        })
      }
    })

  

    
    

    
  },

  showPost(e) {
    const post_id = e.currentTarget.dataset.post;
    console.log(e)
    wx.navigateTo({
      url: `/pages/card/card?id=${post_id}`
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