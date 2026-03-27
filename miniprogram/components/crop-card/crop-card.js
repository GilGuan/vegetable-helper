const { formatMonths } = require('../../utils/util');

Component({
  properties: {
    crop: {
      type: Object,
      value: {}
    },
    showMonth: {
      type: Boolean,
      value: true
    },
    province: {
      type: String,
      value: '广东省'
    }
  },

  data: {
    monthText: ''
  },

  observers: {
    'crop, province': function(crop, province) {
      if (crop && crop.suitableMonths && crop.suitableMonths[province]) {
        this.setData({
          monthText: formatMonths(crop.suitableMonths[province])
        });
      }
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap', { crop: this.properties.crop });
    }
  }
});
