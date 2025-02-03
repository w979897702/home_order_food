Page({
  data: {
    categories: [
      { id: 1, name: '热菜' },
      { id: 2, name: '凉菜' },
      { id: 3, name: '汤类' }
    ],
    menu: [
      { id: 1, name: '红烧肉', price: 38, categoryId: 1, image: 'https://example.com/hongshaorou.jpg' },
      { id: 2, name: '宫保鸡丁', price: 28, categoryId: 1, image: 'https://example.com/gongbaojiding.jpg' },
      { id: 3, name: '凉拌黄瓜', price: 12, categoryId: 2, image: 'https://example.com/liangbanhuanggua.jpg' },
      { id: 4, name: '番茄蛋汤', price: 15, categoryId: 3, image: 'https://example.com/fanqiedantang.jpg' }
    ],
    activeCategoryId: 1, // 默认选中第一个类别
    cartCount: 0 // 购物车数量
  },

  // 切换类别
  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ activeCategoryId: categoryId });
  },

  // 加入购物车
  addToCart(e) {
    const item = e.currentTarget.dataset.item;
    let cart = wx.getStorageSync('cart') || [];
    cart.push(item);
    wx.setStorageSync('cart', cart);
    this.setData({ cartCount: cart.length });
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  // 跳转到购物车页
  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  // 计算当前类别的菜单
  computedFilteredMenu() {
    const { activeCategoryId, menu } = this.data;
    return menu.filter(item => item.categoryId === activeCategoryId);
  },

  // 监听数据变化
  onLoad() {
    this.setData({ filteredMenu: this.computedFilteredMenu() });
  },

  // 监听类别切换
  onCategoryChange() {
    this.setData({ filteredMenu: this.computedFilteredMenu() });
  },

  // 监听购物车数量变化
  onShow() {
    const cart = wx.getStorageSync('cart') || [];
    this.setData({ cartCount: cart.length });
  }
});