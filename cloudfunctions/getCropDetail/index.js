const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { cropId } = event;

  try {
    const result = await db.collection('crops').doc(cropId).get();

    if (!result.data) {
      return {
        code: -1,
        message: '作物不存在',
        data: null
      };
    }

    return {
      code: 0,
      message: 'success',
      data: result.data
    };
  } catch (err) {
    console.error('获取作物详情失败:', err);
    return {
      code: -1,
      message: err.message || '获取作物详情失败',
      data: null
    };
  }
};
