const { getCropDetail, addPlanting } = require('../../utils/api');
const { formatMonths, showToast, showError } = require('../../utils/util');

Page({
  data: {
    cropId: '',
    crop: null,
    loading: true,
    monthText: '',
    province: '广东省',
    activeStepIndex: 0
  },

  onLoad(options) {
    this.setData({ cropId: options.cropId });
    
    // 从全局获取省份
    const app = getApp();
    this.setData({ province: app.globalData.province || '广东省' });
    
    this.loadCropDetail();
  },

  // 加载作物详情
  async loadCropDetail() {
    try {
      const res = await getCropDetail(this.data.cropId);
      if (res.code === 0) {
        const crop = res.data;
        let monthText = '';
        
        if (crop.suitableMonths && crop.suitableMonths[this.data.province]) {
          monthText = formatMonths(crop.suitableMonths[this.data.province]);
        }
        
        this.setData({
          crop,
          monthText,
          loading: false
        });
        
        // 设置页面标题
        wx.setNavigationBarTitle({
          title: crop.name
        });
      }
    } catch (err) {
      console.error('加载作物详情失败', err);
      this.setData({ loading: false });
    }
  },

  // 切换步骤
  onStepTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ activeStepIndex: index });
  },

  // 开始种植
  async onStartPlant() {
    const { cropId, crop, province } = this.data;
    
    wx.showModal({
      title: '开始种植',
      content: `确认开始种植${crop.name}？`,
      success: async res => {
        if (res.confirm) {
          try {
            const result = await addPlanting(
              cropId, 
              province, 
              new Date().toISOString()
            );
            
            if (result.code === 0) {
              showToast('已添加到我的菜园');
              
              // 跳转到我的菜园
              setTimeout(() => {
                wx.switchTab({ url: '/pages/garden/garden' });
              }, 1500);
            }
          } catch (err) {
            showError('添加失败，请重试');
          }
        }
      }
    });
  },

  // 返回上一页
  onBack() {
    wx.navigateBack();
  }
});
