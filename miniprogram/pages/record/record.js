const { getCareRecords, addCareRecord } = require('../../utils/api');
const { showToast, showError, formatDate } = require('../../utils/util');

Page({
  data: {
    plantingId: '',
    cropName: '',
    records: [],
    loading: true,
    showAddModal: false,
    selectedType: '',
    note: '',
    careTypes: [
      { value: 'watering', label: '浇水', icon: '💧' },
      { value: 'fertilizing', label: '施肥', icon: '🌱' },
      { value: 'pest_control', label: '除虫', icon: '🐛' },
      { value: 'harvest', label: '采收', icon: '🥬' }
    ]
  },

  onLoad(options) {
    this.setData({ 
      plantingId: options.plantingId,
      cropName: options.cropName
    });
    
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: `${options.cropName} - 打理记录`
    });
    
    this.loadRecords();
  },

  onShow() {
    this.loadRecords();
  },

  // 加载打理记录
  async loadRecords() {
    try {
      const res = await getCareRecords(this.data.plantingId);
      if (res.code === 0) {
        // 格式化日期
        const records = res.data.records.map(r => ({
          ...r,
          dateText: formatDate(r.createdAt, 'YYYY-MM-DD')
        }));
        
        this.setData({
          records,
          loading: false
        });
      }
    } catch (err) {
      console.error('加载打理记录失败', err);
      this.setData({ loading: false });
    }
  },

  // 显示添加弹窗
  onShowAddModal() {
    this.setData({ showAddModal: true });
  },

  // 隐藏添加弹窗
  onHideAddModal() {
    this.setData({ 
      showAddModal: false,
      selectedType: '',
      note: ''
    });
  },

  // 选择打理类型
  onTypeSelect(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({ selectedType: type });
  },

  // 输入备注
  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },

  // 确认添加
  async onConfirmAdd() {
    const { plantingId, selectedType, note } = this.data;
    
    if (!selectedType) {
      showError('请选择打理类型');
      return;
    }
    
    try {
      const res = await addCareRecord(plantingId, selectedType, note);
      if (res.code === 0) {
        showToast('记录成功');
        this.onHideAddModal();
        this.loadRecords();
      }
    } catch (err) {
      showError('添加失败，请重试');
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadRecords().then(() => {
      wx.stopPullDownRefresh();
    });
  }
});
