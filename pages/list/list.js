// pages/list/list.js
Page({

  /**
   * Page initial data
   */
  data: {
    load: false
  },

  goBack: function () {
    wx.navigateBack();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let page = this
    wx.showLoading({
      title: 'Asking Watson',
      icon: 'loading',
      duration: 3000
    })

    wx.request({
      url: `http://localhost:3000/posts?lang=en`,
      success: function(res) {
        wx.showToast({
          title: 'Language Detected',
          icon: 'success',
          duration: 1000,
        })
        console.log(res.data)
        page.setData({posts: res.data.posts})
        // console.log(getApp().globalData.lag, getApp().globalData.long)
        page.setData({ lat: getApp().globalData.lat.toString(), long: getApp().globalData.long.toString()})
        let user_address = `${page.data.long},${page.data.lat}`
        page.data.posts.forEach(function (post) {
          let post_address = `${post.long},${post.lat}`
          // console.log(post_address)
          let url = `https://restapi.amap.com/v3/direction/walking?origin=${post_address}&destination=${user_address}&key=27df61d7d7a623d9d3ef412a48ee6218`
          wx.request({
            url: url,
            success: function (res) {
              post.distance = res.data.route.paths[0].distance
              console.log(post.distance)
            }
          })
          page.setData({posts: page.data.posts.sort(function (a,b) {
            let x = a.distance
            let y = b.distance
            return ((x < y) ? 1 : ((x > y) ? -1 : 0));
          })
        })
        })
      }
    })

  

    
    

    
  },

  showPost(e) {
    console.log(e)
    const post_id = e.target.dataset.id;
    // console.log(post_id)
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