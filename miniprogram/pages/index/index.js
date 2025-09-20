const categories = require("../../data/categories"),
  dishes = require("../../data/dishes");
Page({
  data: {
    categories: [],
    dishes: [],
    dishesByCategory: {},
    activeCategoryId: "",
    cartList: [],
    cartCount: 0,
    scrollTop: 0,
    heightList: [],
    showToast: !1,
    toastMessage: "",
    showFlyAnimation: !1,
    flyAnimationData: {
      x: 0,
      y: 0
    },
    showLargeImage: !1,
    currentLargeImage: ""
  },
  // 添加一个标志变量，防止滚动事件影响分类切换
  isManualSwitching: false,
  // 添加最后一次点击的分类ID
  lastClickedCategoryId: "",
  onLoad: function () {
    this.setData({
      categories,
      dishes,
      activeCategoryId: categories[0].id
    }), this.filterDishes(), this.loadCartFromStorage(), this.calculateHeight()
  },
  onShow: function () {
    this.loadCartFromStorage()
  },
  loadCartFromStorage: function () {
    const a = wx.getStorageSync("cartList") || [],
      b = a.reduce(function (a, b) {
        return a + b.count
      }, 0);
    this.setData({
      cartList: a,
      cartCount: b
    })
  },
  switchCategory: function (a) {
    const categoryId = a.currentTarget.dataset.id;

    // 储存最后点击的分类ID
    this.lastClickedCategoryId = categoryId;

    // 设置标志位，表示正在手动切换
    this.isManualSwitching = true;

    // 立即更新激活的分类ID，不等待滚动
    this.setData({
      activeCategoryId: categoryId
    });

    // 滚动到对应位置
    setTimeout(() => {
      this.setData({
        scrollTop: this.getScrollTopByCategoryId(categoryId)
      });
    }, 10);

    // 设置一个较长的延时，防止滚动触发的分类切换
    // 延长锁定时间到800毫秒，确保覆盖整个滚动动画过程
    setTimeout(() => {
      // 重要：防止滚动事件中间改变了选中的分类
      if (this.lastClickedCategoryId === categoryId) {
        this.isManualSwitching = false;
      }
    }, 800);
  },
  getScrollTopByCategoryId: function (a) {
    const {
      heightList: b
    } = this.data,
      c = this.data.categories.findIndex(function (b) {
        return b.id === a
      });
    let d = 0;
    for (let e = 0; e < c; e++) d += b[e] || 0;
    // 减去一点偏移量，确保滚动位置更精确
    return Math.max(0, d - 2);
  },
  onDishesScroll: function (a) {
    // 如果是手动切换分类导致的滚动，则不触发分类切换
    if (this.isManualSwitching) return;

    const {
      scrollTop: b
    } = a.detail, {
      heightList: c,
      categories: d,
      activeCategoryId: e
    } = this.data;
    let f = 0,
      g = e;
    // 增加滚动容差值，从5改为10，减少误触发
    for (let e = 0; e < c.length; e++) {
      const a = c[e] || 0;
      if (b <= f + a + 10) {
        g = d[e].id;
        break;
      }
      f += a;
    }
    // 只有当新的分类ID确实不同时才更新
    if (g !== e) {
      this.setData({
        activeCategoryId: g
      });
    }
  },
  calculateHeight: function () {
    const a = wx.createSelectorQuery();
    a.selectAll(".category-section").boundingClientRect();
    var b = this;
    a.exec(function (a) {
      if (a && a[0]) {
        const c = a[0].map(function (a) {
          // 确保高度值有效，避免0或undefined
          return a.height > 0 ? a.height : 0;
        });
        b.setData({
          heightList: c
        });
      }
    });
  },
  filterDishes: function () {
    const {
      dishes: a,
      categories: b
    } = this.data, c = {};
    b.forEach(function (b) {
      c[b.id] = a.filter(function (a) {
        return a.categoryId === b.id
      })
    }), this.setData({
      dishesByCategory: c
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
  addToCart: function (a) {
    const {
      clientX: b,
      clientY: c
    } = a.touches[0];
    this.setData({
      showFlyAnimation: !0,
      flyAnimationData: {
        x: b,
        y: c
      }
    });
    const d = a.currentTarget.dataset.dish;
    let {
      cartList: e
    } = this.data;
    const f = e.findIndex(function (a) {
      return a.id === d.id
    });
    if (-1 < f) e[f].count++;
    else {
      const a = Object.assign({}, d, {
        count: 1
      });
      e.push(a)
    }
    const g = e.reduce(function (a, b) {
      return a + b.count
    }, 0);
    this.setData({
      cartList: e,
      cartCount: g
    }), wx.setStorageSync("cartList", e);
    const h = wx.createSelectorQuery();
    h.select(".cart-bar").boundingClientRect();
    var i = this;
    h.exec(function (a) {
      if (a && a[0]) {
        const b = a[0].left + a[0].width / 2,
          c = a[0].top + a[0].height / 2;
        setTimeout(function () {
          i.setData({
            "flyAnimationData.x": b,
            "flyAnimationData.y": c
          }), setTimeout(function () {
            i.setData({
              showFlyAnimation: !1
            })
          }, 500)
        }, 50)
      } else setTimeout(function () {
        i.setData({
          showFlyAnimation: !1
        })
      }, 500)
    })
  },
  onImageError: function (a) {
    const {
      id: b
    } = a.currentTarget.dataset, {
      dishes: c,
      dishesByCategory: d
    } = this.data, e = c.map(function (a) {
      return a.id === b ? Object.assign({}, a, {
        useDefaultImage: !0
      }) : a
    }), f = {};
    Object.keys(d).forEach(function (a) {
      f[a] = d[a].map(function (a) {
        return a.id === b ? Object.assign({}, a, {
          useDefaultImage: !0
        }) : a
      })
    }), this.setData({
      dishes: e,
      dishesByCategory: f
    })
  },
  goToCart: function () {
    return 0 === this.data.cartCount ? void this.showCustomToast("\u8D2D\u7269\u8F66\u4E3A\u7A7A") : void wx.navigateTo({
      url: "/packageA/pages/cart/cart"
    })
  },
  showLargeImage: function (a) {
    const {
      image: b
    } = a.currentTarget.dataset;
    this.setData({
      showLargeImage: !0,
      currentLargeImage: b
    })
  },
  closeLargeImage: function () {
    this.setData({
      showLargeImage: !1
    })
  }
});