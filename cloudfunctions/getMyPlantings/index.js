const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {
  const { status } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    let query = {
      userId: openid
    };

    // 按状态筛选
    if (status) {
      query.status = status;
    }

    const result = await db.collection('plantings')
      .where(query)
      .orderBy('createdAt', 'desc')
      .get();

    // 计算生长天数
    const now = new Date();
    const plantings = result.data.map(p => {
      const startDate = new Date(p.startDate);
      const growthDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
      return {
        ...p,
        growthDays
      };
    });

    return {
      code: 0,
      message: 'success',
      data: {
        plantings,
        total: plantings.length
      }
    };
  } catch (err) {
    console.error('获取种植列表失败:', err);
    return {
      code: -1,
      message: err.message || '获取种植列表失败',
      data: {
        plantings: [],
        total: 0
      }
    };
  }
};
