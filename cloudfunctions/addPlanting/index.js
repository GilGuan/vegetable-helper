const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { cropId, province, startDate } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  try {
    // 获取作物信息
    const cropResult = await db.collection('crops').doc(cropId).get();
    const crop = cropResult.data;

    if (!crop) {
      return {
        code: -1,
        message: '作物不存在'
      };
    }

    // 创建种植记录
    const plantingResult = await db.collection('plantings').add({
      data: {
        userId: openid,
        cropId: cropId,
        cropName: crop.name,
        cropIcon: crop.icon,
        province: province,
        startDate: new Date(startDate),
        status: 'growing',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // 自动创建一条"播种"打理记录
    await db.collection('care_records').add({
      data: {
        userId: openid,
        plantingId: plantingResult._id,
        cropId: cropId,
        cropName: crop.name,
        type: 'sowing',
        typeName: '播种',
        note: '开始种植',
        createdAt: new Date()
      }
    });

    return {
      code: 0,
      message: 'success',
      data: {
        plantingId: plantingResult._id
      }
    };
  } catch (err) {
    console.error('添加种植记录失败:', err);
    return {
      code: -1,
      message: err.message || '添加种植记录失败'
    };
  }
};
