Component({
  properties: {
    selected: {
      type: Number,
      value: 1
    }
  },

  data: {
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },

  methods: {
    onMonthTap(e) {
      const month = e.currentTarget.dataset.month;
      if (month !== this.properties.selected) {
        this.triggerEvent('change', { month });
      }
    }
  }
});
