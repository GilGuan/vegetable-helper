const { provinces } = require('../../utils/province');

Component({
  properties: {
    currentProvince: {
      type: String,
      value: '广东省'
    }
  },

  data: {
    provinces: provinces,
    provinceIndex: 0
  },

  observers: {
    'currentProvince': function(province) {
      const index = this.data.provinces.indexOf(province);
      if (index !== -1) {
        this.setData({ provinceIndex: index });
      }
    }
  },

  methods: {
    onPickerChange(e) {
      const index = e.detail.value;
      const province = this.data.provinces[index];
      this.setData({ provinceIndex: index });
      this.triggerEvent('change', { province });
    },

    onTap() {
      // 触发 picker 点击
    }
  }
});
