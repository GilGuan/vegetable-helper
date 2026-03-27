/**
 * API 封装
 */

const { showLoading, hideLoading, showError } = require('./util');

/**
 * 调用云函数
 * @param {string} name 云函数名称
 * @param {object} data 参数
 * @param {boolean} showLoad 是否显示loading
 */
const callFunction = (name, data = {}, showLoad = true) => {
  if (showLoad) showLoading();
  
  return wx.cloud.callFunction({
    name,
    data
  }).then(res => {
    if (showLoad) hideLoading();
    return res.result;
  }).catch(err => {
    if (showLoad) hideLoading();
    console.error(`云函数 ${name} 调用失败:`, err);
    showError('网络错误，请重试');
    throw err;
  });
};

/**
 * 获取作物列表
 */
const getCrops = (province, month, category, showLoad = false) => {
  return callFunction('getCrops', { province, month, category }, showLoad);
};

/**
 * 获取作物详情
 */
const getCropDetail = (cropId) => {
  return callFunction('getCropDetail', { cropId });
};

/**
 * 添加种植记录
 */
const addPlanting = (cropId, province, startDate) => {
  return callFunction('addPlanting', { cropId, province, startDate });
};

/**
 * 获取我的种植列表
 */
const getMyPlantings = (status, showLoad = false) => {
  return callFunction('getMyPlantings', { status }, showLoad);
};

/**
 * 添加打理记录
 */
const addCareRecord = (plantingId, type, note, photos) => {
  return callFunction('addCareRecord', { plantingId, type, note, photos });
};

/**
 * 获取打理记录列表
 */
const getCareRecords = (plantingId, limit, skip, showLoad = false) => {
  return callFunction('getCareRecords', { plantingId, limit, skip }, showLoad);
};

/**
 * 获取用户设置
 */
const getUserSettings = () => {
  return callFunction('userSettings', {}, false);
};

/**
 * 更新用户设置
 */
const updateUserSettings = (province) => {
  return callFunction('userSettings', { action: 'update', province }, false);
};

module.exports = {
  callFunction,
  getCrops,
  getCropDetail,
  addPlanting,
  getMyPlantings,
  addCareRecord,
  getCareRecords,
  getUserSettings,
  updateUserSettings
};
