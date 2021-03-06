// pages/create/create.js
Page({

  /**
   * Page initial data
   */
  data: {
  },

  // getting location via wechat
  bindOnTouchStart: function () {
    let page = this;
    wx.chooseLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        if (res.name === "") {
          var name = "Custom location";
        } else {
          var name = res.name;
        };
        // var name = res.name;
        var address = res.address;
        page.setData({
          name: name,
          latitude: latitude,
          longitude: longitude
        })
      }
    })
  },

  // New Post Submission
  bindSubmit: function (e) {
    const app = getApp();

    if (e.detail.value.description === ""){
      wx.showToast({
        title: 'Need description',
        icon: 'none',
        duration: 1500
      })
    } else if (this.data.latitude === undefined){
      wx.showToast({
        title: 'Need location',
        icon: 'none',
        duration: 1500
      })
    } else if ((parseInt(e.detail.value.capacity).toString() !== e.detail.value.capacity) || (e.detail.value.capacity === undefined)){
      wx.showToast({
        title: 'Need number of people',
        icon: 'none',
        duration: 1500
      })
    } else if(e.detail.value.contact_number === ""){
      wx.showToast({
        title: 'Need phone number',
        icon: 'none',
        duration: 1500
      })
    } else {

      wx.showToast({
        title: 'Submitting...',
        icon: 'loading',
        duration: 1000
      });

      // storing all values from the form to create new post
      var description = e.detail.value.description;
      var capacity = parseInt(e.detail.value.capacity);
      var contact_number = e.detail.value.contact_number;
      if (e.detail.value.location === "") {
        var location = "custom location";
      } else {
        var location = e.detail.value.location;
      };
      var user_id = app.globalData.userId;
      var latitude = this.data.latitude.toString();
      var longitude = this.data.longitude.toString();

      // Create new post
      var event = {
        "description": description,
        "capacity": capacity,
        "location": location,
        "user_id": user_id,
        "lat": latitude,
        "long": longitude,
        "contact_number": contact_number,
      };
      console.log(event);
      wx.request({
        url: `http://localhost:3000/posts`,
        method: 'POST',
        data: event,
        success(res) {
          wx.reLaunch({
            url: '/pages/map/map',
          })
        }
      })
    }
  },

    


    
   


  goBack: function () {
    wx.navigateBack();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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