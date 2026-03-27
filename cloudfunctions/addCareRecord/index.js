const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  const { plantingId, type, note, photos } = event;
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  // 打理类型映射
  const typeMap = {
    sowing: '播种',
    watering: '浇水',
    fertilizing: '施肥',
    pest_control: '除虫',
    harvest: '采收'
  };

  try {
    // 获取种植记录信息
    const plantingResult = await db.collection('plantings').doc(plantingId).get();
    const planting = plantingResult.data;

    if (!planting) {
      return {
        code: -1,
        message: '种植记录不存在'
      };
    }

    // 创建打理记录
    const result = await db.collection('care_records').add({
      data: {
        userId: openid,
        plantingId: plantingId,
        cropId: planting.cropId,
        cropName: planting.cropName,
        type: type,
        typeName: typeMap[type] || type,
        note: note || '',
        photos: photos || [],
        createdAt: new Date()
      }
    });

    // 如果是采收，更新种植记录状态
    if (type === 'harvest') {
      await db.collection('plantings').doc(plantingId).update({
        data: {
          status: 'harvested',
          harvestedAt: new Date(),
          updatedAt: new Date()
        }
      });
    }

    return {
      code: 0,
      message: 'success',
      data: {
        recordId: result._id
      }
    };
  } catch (err) {
    console.error('添加打理记录失败:', err);
    return {
      code: -1,
      message: err.message || '添加打理记录失败'
    };
  }
};
