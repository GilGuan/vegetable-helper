const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { plantingId, limit = 20, skip = 0 } = event;

  try {
    const result = await db.collection('care_records')
      .where({
        plantingId: plantingId
      })
      .orderBy('createdAt', 'desc')
      .skip(skip)
      .limit(limit)
      .get();

    // 获取总数
    const countResult = await db.collection('care_records')
      .where({
        plantingId: plantingId
      })
      .count();

    return {
      code: 0,
      message: 'success',
      data: {
        records: result.data,
        total: countResult.total
      }
    };
  } catch (err) {
    console.error('获取打理记录失败:', err);
    return {
      code: -1,
      message: err.message || '获取打理记录失败',
      data: {
        records: [],
        total: 0
      }
    };
  }
};
