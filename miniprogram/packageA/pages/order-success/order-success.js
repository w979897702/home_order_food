Page({
  data: {
    orderTime: "",
    orderItems: [],
    remark: "",
    showToast: !1,
    toastMessage: ""
  },
  onLoad: function () {
    const a = wx.getStorageSync("lastOrder") || {};
    this.setData({
      orderTime: a.createTime || new Date().toLocaleString(),
      orderItems: a.items || [],
      remark: a.remark || ""
    })
  },
  showCustomToast: function (a, b) {
    b = b || 1500, this.setData({
      showToast: !0,
      toastMessage: a
    });
    var c = this;
    setTimeout(function () {
      c.setData({
        showToast: !1
      })
    }, b)
  },
  backToHome: function () {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  }
});