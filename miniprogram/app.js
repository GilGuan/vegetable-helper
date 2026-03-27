App({
  globalData: {
    province: '广东省',
    openid: null
  },

  onLaunch() {
    // 初始化云开发
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloud1-3g2roojo47942c4d',
        traceUser: true
      });
    }

    // 获取用户openid
    this.getOpenid();

    // 获取用户位置
    this.getUserLocation();
  },

  // 获取用户openid
  async getOpenid() {
    try {
      const res = await wx.cloud.callFunction({
        name: 'getOpenid'
      });
      this.globalData.openid = res.result.openid;
    } catch (err) {
      console.error('获取openid失败', err);
    }
  },

  // 获取用户位置
  async getUserLocation() {
    try {
      const res = await wx.getLocation({ type: 'wgs84' });
      // 这里可以调用逆地理编码API获取省份
      // 暂时使用默认省份
      console.log('用户位置', res);
    } catch (err) {
      console.log('定位失败，使用默认省份');
    }
  }
});
