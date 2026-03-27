Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#4CAF50",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: "/images/icons/home.png",
        selectedIconPath: "/images/icons/home-active.png"
      },
      {
        pagePath: "/pages/calendar/calendar",
        text: "日历",
        iconPath: "/images/icons/calendar.png",
        selectedIconPath: "/images/icons/calendar-active.png"
      },
      {
        pagePath: "/pages/garden/garden",
        text: "菜园",
        iconPath: "/images/icons/garden.png",
        selectedIconPath: "/images/icons/garden-active.png"
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        iconPath: "/images/icons/mine.png",
        selectedIconPath: "/images/icons/mine-active.png"
      }
    ]
  },

  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
    }
  }
});
