const { getMyPlantings } = require('../../utils/api');

Page({
  data: {
    plantings: [],
    loading: true,
    statusFilter: 'growing',
    filters: [
      { value: 'growing', label: '生长中' },
      { value: 'harvested', label: '已收获' },
      { value: '', label: '全部' }
    ]
  },

  onLoad() {
    this.loadPlantings();
  },

  onShow() {
    this.loadPlantings();
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
    }
  },

  // 加载种植列表
  async loadPlantings() {
    const { statusFilter } = this.data;
    
    try {
      const res = await getMyPlantings(statusFilter || undefined);
      if (res.code === 0) {
        this.setData({
          plantings: res.data.plantings,
          loading: false
        });
      }
    } catch (err) {
      console.error('加载种植列表失败', err);
      this.setData({ loading: false });
    }
  },

  // 切换状态筛选
  onFilterTap(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({ statusFilter: status });
    this.loadPlantings();
  },

  // 查看打理记录
  onRecordTap(e) {
    const planting = e.currentTarget.dataset.planting;
    wx.navigateTo({
      url: `/pages/record/record?plantingId=${planting._id}&cropName=${planting.cropName}`
    });
  },

  // 查看作物详情
  onDetailTap(e) {
    const planting = e.currentTarget.dataset.planting;
    wx.navigateTo({
      url: `/pages/detail/detail?cropId=${planting.cropId}`
    });
  },

  // 添加种植
  onAddPlant() {
    wx.switchTab({
      url: '/pages/calendar/calendar'
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadPlantings().then(() => {
      wx.stopPullDownRefresh();
    });
  }
});
