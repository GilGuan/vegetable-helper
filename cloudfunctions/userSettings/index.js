const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { action, province } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  // 更新用户设置
  if (action === 'update') {
    try {
      const result = await db.collection('user_settings')
        .where({ userId: openid })
        .limit(1)
        .get();

      if (result.data.length > 0) {
        await db.collection('user_settings')
          .doc(result.data[0]._id)
          .update({
            data: {
              province: province,
              updatedAt: new Date()
            }
          });
      } else {
        await db.collection('user_settings').add({
          data: {
            userId: openid,
            province: province,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        });
      }

      return { code: 0, message: 'success' };
    } catch (err) {
      return { code: -1, message: err.message || '更新失败' };
    }
  }

  // 获取用户设置（默认行为）
  try {
    const result = await db.collection('user_settings')
      .where({ userId: openid })
      .limit(1)
      .get();

    if (result.data.length > 0) {
      return { code: 0, message: 'success', data: result.data[0] };
    } else {
      const defaultSettings = {
        userId: openid,
        province: '广东省',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await db.collection('user_settings').add({ data: defaultSettings });
      return { code: 0, message: 'success', data: defaultSettings };
    }
  } catch (err) {
    return { code: -1, message: err.message || '获取失败', data: null };
  }
};
