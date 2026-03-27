const { provinces } = require('../../utils/province');
const { getUserSettings, updateUserSettings, getMyPlantings, getCareRecords } = require('../../utils/api');

Page({
  data: {
    province: '广东省',
    provinces: provinces,
    provinceIndex: 0,
    stats: {
      plantingCount: 0,
      harvestCount: 0,
      recordCount: 0
    },
    menuList: [
      { id: 'history', icon: '📋', name: '种植历史', url: '/pages/garden/garden' },
      { id: 'harvest', icon: '🥬', name: '收获记录', url: '/pages/garden/garden' },
      { id: 'settings', icon: '⚙️', name: '设置', action: 'settings' }
    ]
  },

  onLoad() {
    this.getUserSettings();
    this.loadStats();
  },

  onShow() {
    this.loadStats();
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      });
    }
  },

  // 获取用户设置
  async getUserSettings() {
    try {
      const res = await getUserSettings();
      if (res.code === 0 && res.data) {
        const province = res.data.province;
        const index = this.data.provinces.indexOf(province);
        this.setData({ 
          province,
          provinceIndex: index !== -1 ? index : 0
        });
      }
    } catch (err) {
      console.log('获取用户设置失败', err);
    }
  },

  // 加载统计数据
  async loadStats() {
    try {
      const [plantingRes, harvestRes, recordRes] = await Promise.all([
        getMyPlantings('growing'),
        getMyPlantings('harvested'),
        getMyPlantings()
      ]);
      
      // 获取打理记录总数
      const plantings = recordRes?.data?.plantings || [];
      let recordCount = 0;
      for (const p of plantings) {
        const careRes = await getCareRecords(p._id);
        recordCount += careRes?.data?.total || 0;
      }
      
      this.setData({
        stats: {
          plantingCount: plantingRes?.data?.total || 0,
          harvestCount: harvestRes?.data?.total || 0,
          recordCount: recordCount
        }
      });
    } catch (err) {
      console.error('加载统计数据失败', err);
    }
  },

  // 省份改变
  onProvinceChange(e) {
    const index = e.detail.value;
    const province = this.data.provinces[index];
    this.setData({ province, provinceIndex: index });
    getApp().globalData.province = province;
    
    // 保存用户设置
    updateUserSettings(province);
  },

  // 菜单点击
  onMenuTap(e) {
    const menu = e.currentTarget.dataset.menu;
    
    if (menu.action === 'settings') {
      this.showSettingsModal();
    } else if (menu.url) {
      wx.switchTab({ url: menu.url });
    }
  },

  // 显示设置弹窗
  showSettingsModal() {
    wx.showActionSheet({
      itemList: ['切换省份', '清除数据'],
      success: res => {
        switch (res.tapIndex) {
          case 0:
            // 切换省份通过picker实现
            break;
          case 1:
            this.clearData();
            break;
        }
      }
    });
  },

  // 清除数据
  clearData() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有数据吗？此操作不可恢复。',
      success: async res => {
        if (res.confirm) {
          wx.showLoading({ title: '清除中...' });
          // 这里需要实现清除数据的云函数
          // 暂时只清除本地缓存
          wx.clearStorageSync();
          wx.hideLoading();
          wx.showToast({ title: '已清除', icon: 'success' });
          this.loadStats();
        }
      }
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadStats().then(() => {
      wx.stopPullDownRefresh();
    });
  }
});
