const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { province, month, category } = event;

  try {
    let query = {
      suitableProvinces: province
    };

    // 按月份筛选
    if (month) {
      query[`suitableMonths.${province}`] = _.in([month]);
    }

    // 按分类筛选
    if (category && category !== '全部') {
      query.category = category;
    }

    const result = await db.collection('crops')
      .where(query)
      .orderBy('name', 'asc')
      .get();

    return {
      code: 0,
      message: 'success',
      data: {
        crops: result.data,
        total: result.data.length
      }
    };
  } catch (err) {
    console.error('获取作物列表失败:', err);
    return {
      code: -1,
      message: err.message || '获取作物列表失败',
      data: {
        crops: [],
        total: 0
      }
    };
  }
};
