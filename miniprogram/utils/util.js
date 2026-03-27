/**
 * 通用工具函数
 */

/**
 * 格式化日期
 * @param {Date|string|number} date 日期
 * @param {string} format 格式，默认 'YYYY-MM-DD'
 */
const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hour = String(d.getHours()).padStart(2, '0');
  const minute = String(d.getMinutes()).padStart(2, '0');
  const second = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hour)
    .replace('mm', minute)
    .replace('ss', second);
};

/**
 * 计算两个日期之间的天数差
 * @param {Date|string} startDate 开始日期
 * @param {Date|string} endDate 结束日期，默认今天
 */
const daysBetween = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * 格式化适宜月份显示
 * @param {number[]} months 月份数组
 */
const formatMonths = (months) => {
  if (!months || months.length === 0) return '';
  
  months.sort((a, b) => a - b);
  const result = [];
  let start = months[0];
  let end = months[0];

  for (let i = 1; i <= months.length; i++) {
    if (months[i] === end + 1) {
      end = months[i];
    } else {
      if (start === end) {
        result.push(`${start}月`);
      } else {
        result.push(`${start}-${end}月`);
      }
      start = months[i];
      end = months[i];
    }
  }

  return result.join(', ');
};

/**
 * 获取当前月份
 */
const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

/**
 * 获取当前日期 YYYY-MM-DD
 */
const getCurrentDate = () => {
  return formatDate(new Date(), 'YYYY-MM-DD');
};

/**
 * 显示加载中
 */
const showLoading = (title = '加载中...') => {
  wx.showLoading({ title, mask: true });
};

/**
 * 隐藏加载中
 */
const hideLoading = () => {
  wx.hideLoading();
};

/**
 * 显示提示
 */
const showToast = (title, icon = 'success') => {
  wx.showToast({ title, icon, duration: 2000 });
};

/**
 * 显示错误提示
 */
const showError = (title) => {
  wx.showToast({ title, icon: 'error', duration: 2000 });
};

module.exports = {
  formatDate,
  daysBetween,
  formatMonths,
  getCurrentMonth,
  getCurrentDate,
  showLoading,
  hideLoading,
  showToast,
  showError
};
