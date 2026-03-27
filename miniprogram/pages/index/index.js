const { getCrops, updateUserSettings } = require('../../utils/api');
const { getCurrentMonth } = require('../../utils/util');

Page({
  data: {
    province: '广东省',
    currentMonth: 3,
    recommendedCrops: [],
    loading: true,
    quickLinks: [
      { id: 'calendar', name: '种植日历', icon: '📅', url: '/pages/calendar/calendar' },
      { id: 'garden', name: '我的菜园', icon: '🌱', url: '/pages/garden/garden' },
      { id: 'guide', name: '种植指南', icon: '📖', url: '/pages/calendar/calendar' }
    ]
  },

  onLoad() {
    // 获取当前月份
    const currentMonth = getCurrentMonth();
    this.setData({ currentMonth });
    
    // 获取用户设置
    this.getUserSettings();
    
    // 加载推荐作物
    this.loadRecommendedCrops();
  },

  onShow() {
    // 每次显示时刷新数据
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },

  // 获取用户设置
  async getUserSettings() {
    try {
      const { getUserSettings } = require('../../utils/api');
      const res = await getUserSettings();
      if (res.code === 0 && res.data) {
        this.setData({ province: res.data.province });
        getApp().globalData.province = res.data.province;
      }
    } catch (err) {
      console.log('获取用户设置失败', err);
    }
  },

  // 加载推荐作物
  async loadRecommendedCrops() {
    const { province, currentMonth } = this.data;
    
    try {
      const res = await getCrops(province, currentMonth);
      if (res.code === 0) {
        this.setData({
          recommendedCrops: res.data.crops.slice(0, 6),
          loading: false
        });
      }
    } catch (err) {
      console.error('加载推荐作物失败', err);
      this.setData({ loading: false });
    }
  },

  // 省份改变
  onProvinceChange(e) {
    const province = e.detail.province;
    this.setData({ province });
    getApp().globalData.province = province;
    this.loadRecommendedCrops();
    
    // 保存用户设置
    updateUserSettings(province);
  },

  // 查看作物详情
  onCropTap(e) {
    const crop = e.detail.crop;
    wx.navigateTo({
      url: `/pages/detail/detail?cropId=${crop._id}`
    });
  },

  // 查看更多
  onViewMore() {
    wx.switchTab({
      url: '/pages/calendar/calendar'
    });
  },

  // 快捷入口点击
  onQuickLinkTap(e) {
    const url = e.currentTarget.dataset.url;
    if (url.includes('garden') || url.includes('calendar')) {
      wx.switchTab({ url });
    } else {
      wx.navigateTo({ url });
    }
  }
});
