const app = getApp();
Page({
  data: {
    cartList: [],
    totalCount: 0,
    remark: "",
    remarkPlaceholder: "\u5982\u6709\u7279\u6B8A\u9700\u6C42\uFF0C\u8BF7\u5728\u6B64\u586B\u5199\uFF08\u4F8B\u5982\uFF1A\u7EA2\u70E7\u8089\u5C11\u653E\u7CD6\u3001\u897F\u7EA2\u67FF\u7092\u9E21\u86CB\u591A\u653E\u8471\u7B49\uFF09",
    loading: !1,
    toastVisible: !1,
    toastContent: ""
  },
  onLoad() {
    this.loadCartData()
  },
  onShow() {
    this.loadCartData()
  },
  loadCartData() {
    const a = wx.getStorageSync("cartList") || [],
      b = a.reduce(function (a, b) {
        return a + b.count
      }, 0);
    this.setData({
      cartList: a,
      totalCount: b
    })
  },
  increaseCount(a) {
    const {
      index: b
    } = a.currentTarget.dataset;
    let c = this.data.cartList;
    c[b].count += 1, this.updateCart(c)
  },
  decreaseCount(a) {
    const {
      index: b
    } = a.currentTarget.dataset;
    let c = this.data.cartList;
    1 < c[b].count ? (c[b].count -= 1, this.updateCart(c)) : this.removeItem(b)
  },
  removeItem(a) {
    let b = this.data.cartList;
    b.splice(a, 1), this.updateCart(b)
  },
  updateCart(a) {
    const b = a.reduce(function (a, b) {
      return a + b.count
    }, 0);
    this.setData({
      cartList: a,
      totalCount: b
    }), wx.setStorageSync("cartList", a)
  },
  clearCart() {
    this.setData({
      cartList: [],
      totalCount: 0
    }), wx.setStorageSync("cartList", []), this.showCustomToast("\u8D2D\u7269\u8F66\u5DF2\u6E05\u7A7A")
  },
  onRemarkInput(a) {
    this.setData({
      remark: a.detail.value
    })
  },
  submitOrder() {
    return 0 === this.data.cartList.length ? void this.showCustomToast("\u8D2D\u7269\u8F66\u4E3A\u7A7A") : void wx.requestSubscribeMessage({
      tmplIds: ["\u8BA2\u9605\u6D88\u606F\u6A21\u677FID"],
      complete: function (a) {
        console.log("\u8BA2\u9605\u6D88\u606F\u7ED3\u679C", a), this.processOrder()
      }.bind(this)
    })
  },
  processOrder() {
    this.setData({
      loading: !0
    });
    const a = {
      items: this.data.cartList,
      remark: this.data.remark,
      createTime: new Date().toLocaleString(),
      status: "pending"
    };
    wx.setStorageSync("lastOrder", a);
    var b = this;
    setTimeout(function () {
      wx.setStorageSync("cartList", []), b.setData({
        loading: !1
      }), wx.navigateTo({
        url: "/packageA/pages/order-success/order-success"
      })
    }, 1e3)
  },
  showCustomToast(a) {
    this.setData({
      toastVisible: !0,
      toastContent: a
    });
    var b = this;
    setTimeout(function () {
      b.setData({
        toastVisible: !1
      })
    }, 2e3)
  },
  goHome() {
    wx.reLaunch({
      url: "/pages/index/index"
    })
  }
});