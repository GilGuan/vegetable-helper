const { getCrops, updateUserSettings } = require('../../utils/api');
const { getCurrentMonth } = require('../../utils/util');

Page({
  data: {
    province: '广东省',
    selectedMonth: 3,
    category: '',
    crops: [],
    loading: true,
    categories: [
      { value: '', label: '全部' },
      { value: '叶菜类', label: '叶菜类' },
      { value: '瓜果类', label: '瓜果类' },
      { value: '豆类', label: '豆类' },
      { value: '根茎类', label: '根茎类' },
      { value: '葱蒜类', label: '葱蒜类' }
    ]
  },

  onLoad() {
    // 获取当前月份
    const selectedMonth = getCurrentMonth();
    this.setData({ selectedMonth });
    
    // 从全局获取省份
    const app = getApp();
    this.setData({ province: app.globalData.province || '广东省' });
    
    // 加载作物
    this.loadCrops();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },

  // 加载作物
  async loadCrops() {
    const { province, selectedMonth, category } = this.data;
    
    try {
      const res = await getCrops(province, selectedMonth, category || undefined);
      if (res.code === 0) {
        this.setData({
          crops: res.data.crops,
          loading: false
        });
      }
    } catch (err) {
      console.error('加载作物失败', err);
      this.setData({ loading: false });
    }
  },

  // 省份改变
  onProvinceChange(e) {
    const province = e.detail.province;
    this.setData({ province });
    getApp().globalData.province = province;
    this.loadCrops();
    
    // 保存用户设置
    updateUserSettings(province);
  },

  // 月份改变
  onMonthChange(e) {
    const month = e.detail.month;
    this.setData({ selectedMonth: month });
    this.loadCrops();
  },

  // 分类改变
  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ category });
    this.loadCrops();
  },

  // 查看作物详情
  onCropTap(e) {
    const crop = e.detail.crop;
    wx.navigateTo({
      url: `/pages/detail/detail?cropId=${crop._id}`
    });
  }
});
