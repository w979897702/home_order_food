Page({
  data: {
    cart: [],
    totalPrice: 0,
    isSubmitted: false
  },

  onLoad() {
    const cart = wx.getStorageSync('cart') || [];
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    this.setData({ cart, totalPrice });
  },

  // 提交订单
  submitOrder() {
    wx.setStorageSync('cart', []); // 清空购物车
    this.setData({ isSubmitted: true });
    wx.showToast({ title: '提交成功', icon: 'success' });
  }
});