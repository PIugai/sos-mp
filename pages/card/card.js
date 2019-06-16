// pages/card/card.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  // launches WeChat navigation, but need to replace below hard-coded data with data from the specific SHOW / post
  bindOnTouchStart: function (e) {
    wx.openLocation({
      latitude: 31.11258,
      longitude: 121.38474,
      scale: 18,
      name: 'KFC Minghang 1',
      // address: '金平区长平路93号'
    })
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
      url: `http://localhost:3000/posts/${options.id}?lang=en`,
      success: function(res) {
        let post = res.data
        // console.log(res.data)
        page.setData({post: post})
        console.log(page.data)
      }
    })
  },

  formSubmit: function(e) {
    let comment = e.detail.value.comment
    let user_id = this.data.post.user_id
    let post_id = this.data.post.id
    wx.showToast({
      title: 'Success!',
      logo: 'success'
    })
    wx.request({
      url: `http://localhost:3000/posts/${this.data.post.id}`,
      method: 'POST',
      data: {comment: {
        comment: comment,
        user_id: user_id,
        post_id: post_id}
        },
      success: function(res) {
        console.log(res)
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