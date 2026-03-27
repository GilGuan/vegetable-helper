const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
  // 30种作物数据（广东省）
  const crops = [
    // ==================== 叶菜类 ====================
    {
      name: '生菜',
      icon: '/images/crops/lettuce.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 45,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '将种子均匀撒在土壤表面，覆薄土约0.5厘米',
          duration: 7,
          tips: ['保持土壤湿润', '避免阳光直射', '可先浸种4小时']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片真叶时进行间苗，株距保持10-15厘米',
          duration: 7,
          tips: ['保留健壮幼苗', '间苗后及时浇水']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，每隔7-10天追施一次氮肥',
          duration: 30,
          tips: ['避免积水', '注意防治蚜虫', '及时除草']
        }
      ],
      tips: [
        '喜凉爽气候，适宜温度15-20℃',
        '不耐高温，夏季种植需要遮阳',
        '生长期短，可多次种植'
      ],
      faqs: [
        { question: '生菜为什么容易抽苔？', answer: '高温和长日照会促进抽苔，建议选择耐抽苔品种，避免夏季高温期种植。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '小白菜',
      icon: '/images/crops/bokchoy.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 35,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 4, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '条播或撒播，覆土约1厘米',
          duration: 5,
          tips: ['土壤要细碎平整', '播前浇透水']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2片真叶时间苗，株距8-10厘米',
          duration: 10,
          tips: ['间苗后轻压土壤']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，适当追施氮肥',
          duration: 20,
          tips: ['避免干旱', '注意防治菜青虫']
        }
      ],
      tips: [
        '生长快，播种后30-40天即可收获',
        '喜阳光充足，耐寒性较强',
        '可多次采收，掐叶留心'
      ],
      faqs: [
        { question: '小白菜叶片发黄怎么办？', answer: '可能是缺氮肥或浇水过多，建议追施氮肥并控制浇水量。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '菠菜',
      icon: '/images/crops/spinach.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 40,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '种子浸泡12小时后播种，覆土2厘米',
          duration: 7,
          tips: ['菠菜种子外壳较硬，浸种可提高发芽率']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出3-4片叶时间苗，株距10厘米',
          duration: 10,
          tips: ['保留壮苗']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥',
          duration: 25,
          tips: ['不耐高温', '注意通风']
        }
      ],
      tips: [
        '喜冷凉气候，适宜温度15-20℃',
        '不耐酸性土壤，可适当施用石灰',
        '富含铁元素，营养价值高'
      ],
      faqs: [
        { question: '菠菜为什么容易抽苔开花？', answer: '菠菜是长日照植物，日照时间过长会抽苔开花，建议秋冬季节种植。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '菜心',
      icon: '/images/crops/choysum.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 35,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 4, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '条播，行距15-20厘米，覆土1厘米',
          duration: 5,
          tips: ['可直播或育苗移栽']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片叶时间苗，株距10厘米',
          duration: 10,
          tips: ['及时除草']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥',
          duration: 20,
          tips: ['开花前采收品质最佳']
        }
      ],
      tips: [
        '广东特色蔬菜，四季可种',
        '喜温和湿润气候',
        '抽苔开花后口感会变老'
      ],
      faqs: [
        { question: '菜心什么时候采收最好？', answer: '花蕾刚出现但未开放时采收最佳，此时口感脆嫩。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '芥蓝',
      icon: '/images/crops/kailan.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 50,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '育苗移栽，苗期20-25天',
          duration: 25,
          tips: ['保持苗床湿润']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出4-5片真叶时移栽，株距20厘米',
          duration: 7,
          tips: ['选择阴天或傍晚移栽', '浇透定根水']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥和钾肥',
          duration: 25,
          tips: ['主苔采收后可留侧芽继续采收']
        }
      ],
      tips: [
        '广东特色蔬菜',
        '喜温和气候，适宜温度15-25℃',
        '采收时留基部可继续萌发侧芽'
      ],
      faqs: [
        { question: '芥蓝和菜心有什么区别？', answer: '芥蓝口感更爽脆，带有轻微苦味，花苔更粗壮；菜心口感更柔嫩，花苔较细。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '空心菜',
      icon: '/images/crops/waterspinach.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 30,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8, 9, 10]
      },
      steps: [
        {
          order: 1,
          title: '播种或扦插',
          description: '可播种或用茎段扦插繁殖',
          duration: 7,
          tips: ['扦插更容易成活', '保持土壤湿润']
        },
        {
          order: 2,
          title: '日常管理',
          description: '勤浇水，保持土壤湿润，追施氮肥',
          duration: 25,
          tips: ['喜水湿', '高温生长快']
        }
      ],
      tips: [
        '喜高温高湿，夏季主要绿叶菜',
        '采收时留基部2-3节可继续萌发',
        '可水培或土培'
      ],
      faqs: [
        { question: '空心菜为什么叫空心菜？', answer: '因为茎是空心的，这也是它口感脆嫩的原因。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '茼蒿',
      icon: '/images/crops/crown daisy.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 35,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '撒播，覆土1厘米',
          duration: 7,
          tips: ['种子可先浸种催芽']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片叶时间苗，株距5-8厘米',
          duration: 10,
          tips: ['可多次间苗采收']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥',
          duration: 20,
          tips: ['高温时品质下降']
        }
      ],
      tips: [
        '有特殊香味，营养丰富',
        '喜凉爽气候，不耐高温',
        '可多次采收'
      ],
      faqs: [
        { question: '茼蒿什么时候采收最好？', answer: '苗高15-20厘米时采收，可整株拔起或掐尖采收留基部继续生长。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '香菜',
      icon: '/images/crops/cilantro.png',
      category: '叶菜类',
      difficulty: '中等',
      growthCycle: 45,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '种子搓开后播种，覆土1厘米',
          duration: 10,
          tips: ['种子外壳要搓开才能更好发芽', '浸种12小时可提高发芽率']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出3-4片叶时间苗，株距5厘米',
          duration: 10,
          tips: ['保持通风']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润但不积水',
          duration: 25,
          tips: ['不耐高温', '高温时易抽苔']
        }
      ],
      tips: [
        '喜凉爽气候，适宜温度15-20℃',
        '种子外壳硬，需搓开后播种',
        '不耐高温，夏季种植困难'
      ],
      faqs: [
        { question: '香菜发芽慢怎么办？', answer: '种子搓开后浸种12-24小时，可显著提高发芽速度和发芽率。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '油麦菜',
      icon: '/images/crops/youmaicai.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 40,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '条播或撒播，覆土1厘米',
          duration: 7,
          tips: ['土壤要细碎']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片叶时间苗，株距10厘米',
          duration: 10,
          tips: ['及时除草']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥',
          duration: 25,
          tips: ['可多次采收']
        }
      ],
      tips: [
        '口感脆嫩，营养丰富',
        '喜凉爽气候',
        '生长期短，可多次种植'
      ],
      faqs: [
        { question: '油麦菜和生菜有什么区别？', answer: '油麦菜叶片更长，口感更脆，带有轻微苦味；生菜叶片较宽，口感更柔嫩。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '韭菜',
      icon: '/images/crops/chives.png',
      category: '叶菜类',
      difficulty: '简单',
      growthCycle: 60,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 4, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种或分株',
          description: '可播种育苗或用老株分株繁殖',
          duration: 20,
          tips: ['分株繁殖更快收获']
        },
        {
          order: 2,
          title: '移栽',
          description: '株距10-15厘米，每穴3-5株',
          duration: 10,
          tips: ['浇透水']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，每次采收后追肥',
          duration: 30,
          tips: ['采收时留基部2-3厘米', '可连续采收多年']
        }
      ],
      tips: [
        '多年生蔬菜，一次种植可采收多年',
        '采收后追肥可促进再生长',
        '忌连作'
      ],
      faqs: [
        { question: '韭菜为什么越长越细？', answer: '可能是养分不足或采收太频繁，建议每次采收后追肥，并适当减少采收频率。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // ==================== 瓜果类 ====================
    {
      name: '番茄',
      icon: '/images/crops/tomato.png',
      category: '瓜果类',
      difficulty: '中等',
      growthCycle: 90,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '将种子浸泡4-6小时后播种',
          duration: 7,
          tips: ['保持土壤湿润', '避免阳光直射']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出4-5片真叶时移栽',
          duration: 14,
          tips: ['选择阴天或傍晚移栽', '浇透定根水']
        },
        {
          order: 3,
          title: '搭架整枝',
          description: '植株长到30厘米时搭架绑蔓，及时整枝打杈',
          duration: 30,
          tips: ['单杆整枝或双杆整枝', '及时摘除侧芽']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后人工授粉，促进坐果',
          duration: 40,
          tips: ['保持土壤湿润', '追施磷钾肥']
        }
      ],
      tips: [
        '保持土壤湿润但不积水',
        '需要搭架子或绑绳支撑',
        '注意防治蚜虫和白粉病'
      ],
      faqs: [
        { question: '番茄需要搭架子吗？', answer: '需要，番茄是藤本植物，需要搭架子或绑绳支撑，防止倒伏并便于管理。' },
        { question: '番茄为什么只开花不结果？', answer: '可能是温度过高或过低、光照不足、氮肥过多等原因，建议进行人工授粉。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '黄瓜',
      icon: '/images/crops/cucumber.png',
      category: '瓜果类',
      difficulty: '简单',
      growthCycle: 60,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种4-6小时后直播或育苗',
          duration: 5,
          tips: ['种子平放，覆土2厘米']
        },
        {
          order: 2,
          title: '移栽或定苗',
          description: '幼苗长出3-4片真叶时定植',
          duration: 10,
          tips: ['株距40厘米']
        },
        {
          order: 3,
          title: '搭架绑蔓',
          description: '植株长到30厘米时搭架引蔓',
          duration: 20,
          tips: ['及时摘除下部老叶']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润，追施磷钾肥',
          duration: 30,
          tips: ['勤采收可促进连续结果']
        }
      ],
      tips: [
        '喜温暖湿润气候',
        '需要搭架或吊蔓',
        '及时采收嫩瓜'
      ],
      faqs: [
        { question: '黄瓜为什么苦？', answer: '黄瓜发苦是由于低温、干旱或营养不良导致葫芦素积累，保持适宜温度和水分可减少苦味。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '辣椒',
      icon: '/images/crops/chili.png',
      category: '瓜果类',
      difficulty: '中等',
      growthCycle: 90,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [2, 3, 4, 5, 6, 7, 8, 9]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种6-8小时后播种育苗',
          duration: 10,
          tips: ['保持苗床温度25-30℃']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出6-8片真叶时移栽',
          duration: 15,
          tips: ['株距40-50厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施复合肥',
          duration: 35,
          tips: ['开花期适当控水']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后追施磷钾肥，促进结果',
          duration: 40,
          tips: ['及时采收促进连续结果']
        }
      ],
      tips: [
        '喜温暖阳光充足',
        '开花结果期需要充足水分',
        '注意防治蚜虫和疫病'
      ],
      faqs: [
        { question: '辣椒为什么落花落果？', answer: '可能是温度过高或过低、干旱、养分不足等原因，保持适宜温度和水分可减少落花落果。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '茄子',
      icon: '/images/crops/eggplant.png',
      category: '瓜果类',
      difficulty: '中等',
      growthCycle: 100,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8, 9]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种6-8小时后播种育苗',
          duration: 10,
          tips: ['茄子种子发芽较慢']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出5-6片真叶时移栽',
          duration: 15,
          tips: ['株距50厘米']
        },
        {
          order: 3,
          title: '整枝打杈',
          description: '保留2-3个主枝，摘除其他侧芽',
          duration: 30,
          tips: ['及时摘除下部老叶']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后追施磷钾肥',
          duration: 50,
          tips: ['勤采收可促进连续结果']
        }
      ],
      tips: [
        '喜温暖阳光充足',
        '需要整枝打杈',
        '注意防治红蜘蛛'
      ],
      faqs: [
        { question: '茄子什么时候采收最好？', answer: '果实长到适中大小，表皮光滑有光泽时采收最佳，过老会影响口感。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '苦瓜',
      icon: '/images/crops/bitter melon.png',
      category: '瓜果类',
      difficulty: '简单',
      growthCycle: 70,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8, 9]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种24小时后播种，苦瓜种皮较硬',
          duration: 7,
          tips: ['可轻轻嗑开种子外壳']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出3-4片真叶时移栽',
          duration: 10,
          tips: ['株距50厘米']
        },
        {
          order: 3,
          title: '搭架引蔓',
          description: '植株长到30厘米时搭架引蔓',
          duration: 20,
          tips: ['及时整枝']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润',
          duration: 35,
          tips: ['勤采收嫩瓜']
        }
      ],
      tips: [
        '喜温暖湿润气候',
        '耐热性强',
        '搭架栽培产量高'
      ],
      faqs: [
        { question: '苦瓜为什么叫君子菜？', answer: '因为苦瓜与其它菜一起烹饪时不会把苦味传给其它菜，故称君子菜。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '丝瓜',
      icon: '/images/crops/luffa.png',
      category: '瓜果类',
      difficulty: '简单',
      growthCycle: 60,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8, 9]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种6-8小时后直播或育苗',
          duration: 5,
          tips: ['种子平放，覆土2厘米']
        },
        {
          order: 2,
          title: '移栽或定苗',
          description: '幼苗长出3-4片真叶时定植',
          duration: 10,
          tips: ['株距50厘米']
        },
        {
          order: 3,
          title: '搭架引蔓',
          description: '植株长到30厘米时搭架引蔓',
          duration: 20,
          tips: ['可利用围墙或栅栏']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润',
          duration: 30,
          tips: ['勤采收嫩瓜']
        }
      ],
      tips: [
        '喜温暖湿润气候',
        '攀爬能力强',
        '及时采收防止变老'
      ],
      faqs: [
        { question: '丝瓜老了怎么办？', answer: '老丝瓜的纤维可作丝瓜络，用于洗碗擦澡，是天然环保的清洁用品。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '冬瓜',
      icon: '/images/crops/wax gourd.png',
      category: '瓜果类',
      difficulty: '中等',
      growthCycle: 100,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种12小时后播种育苗',
          duration: 7,
          tips: ['保持苗床湿润']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长出3-4片真叶时移栽',
          duration: 10,
          tips: ['株距1米以上']
        },
        {
          order: 3,
          title: '搭架或爬地',
          description: '可搭架栽培或爬地栽培',
          duration: 40,
          tips: ['搭架栽培果实更端正']
        },
        {
          order: 4,
          title: '开花结果',
          description: '每株留2-3个果',
          duration: 50,
          tips: ['果实需要支撑']
        }
      ],
      tips: [
        '喜温暖阳光充足',
        '生长空间要大',
        '果实需支撑防止腐烂'
      ],
      faqs: [
        { question: '冬瓜为什么叫冬瓜？', answer: '因为冬瓜成熟时表面有一层白粉，像冬天的霜，故名冬瓜。另外冬瓜可储存到冬天食用。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '南瓜',
      icon: '/images/crops/pumpkin.png',
      category: '瓜果类',
      difficulty: '简单',
      growthCycle: 100,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '浸种6-8小时后直播或育苗',
          duration: 7,
          tips: ['种子平放，覆土3厘米']
        },
        {
          order: 2,
          title: '移栽或定苗',
          description: '幼苗长出3-4片真叶时定植',
          duration: 10,
          tips: ['株距1米以上']
        },
        {
          order: 3,
          title: '爬蔓管理',
          description: '南瓜爬蔓能力强，需要足够空间',
          duration: 40,
          tips: ['可引蔓上架']
        },
        {
          order: 4,
          title: '开花结果',
          description: '人工授粉可提高坐果率',
          duration: 50,
          tips: ['每株留2-3个果']
        }
      ],
      tips: [
        '喜温暖阳光充足',
        '生长空间要大',
        '耐旱性强'
      ],
      faqs: [
        { question: '南瓜花可以吃吗？', answer: '可以，南瓜花是很好的食材，可炒食或做汤，但注意不要把雌花都摘了，否则无法结果。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // ==================== 豆类 ====================
    {
      name: '豆角',
      icon: '/images/crops/long bean.png',
      category: '豆类',
      difficulty: '简单',
      growthCycle: 60,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4, 5, 6, 7, 8, 9]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '直播，穴播每穴3-4粒种子',
          duration: 7,
          tips: ['覆土2-3厘米']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片真叶时间苗，每穴留2株',
          duration: 7,
          tips: ['株距30厘米']
        },
        {
          order: 3,
          title: '搭架引蔓',
          description: '植株长到30厘米时搭架',
          duration: 20,
          tips: ['人字架或竹竿架']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润',
          duration: 30,
          tips: ['勤采收促进连续结荚']
        }
      ],
      tips: [
        '喜温暖气候',
        '需要搭架',
        '嫩荚及时采收'
      ],
      faqs: [
        { question: '豆角为什么要摘心？', answer: '摘心可促进侧枝生长，增加结荚量，提高产量。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '四季豆',
      icon: '/images/crops/kidney bean.png',
      category: '豆类',
      difficulty: '简单',
      growthCycle: 50,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [2, 3, 4, 9, 10]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '直播，穴播每穴3-4粒种子',
          duration: 7,
          tips: ['覆土2-3厘米']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片真叶时间苗，每穴留2株',
          duration: 7,
          tips: ['株距20厘米']
        },
        {
          order: 3,
          title: '搭架引蔓',
          description: '蔓生品种需要搭架',
          duration: 15,
          tips: ['矮生品种不需要搭架']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润',
          duration: 25,
          tips: ['勤采收嫩荚']
        }
      ],
      tips: [
        '喜温和气候，不耐高温',
        '蔓生品种需搭架，矮生品种不需搭架',
        '开花结荚期需要充足水分'
      ],
      faqs: [
        { question: '四季豆和豆角有什么区别？', answer: '四季豆荚较短较粗，豆角荚细长；四季豆适合温和季节种植，豆角耐热性更好。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '豌豆',
      icon: '/images/crops/pea.png',
      category: '豆类',
      difficulty: '简单',
      growthCycle: 70,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [11, 12, 1, 2]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '直播，穴播每穴2-3粒种子',
          duration: 10,
          tips: ['覆土3厘米']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出3-4片叶时间苗，每穴留2株',
          duration: 10,
          tips: ['株距20厘米']
        },
        {
          order: 3,
          title: '搭架引蔓',
          description: '植株长到20厘米时搭架',
          duration: 20,
          tips: ['矮生品种可不搭架']
        },
        {
          order: 4,
          title: '开花结果',
          description: '开花后保持土壤湿润',
          duration: 35,
          tips: ['嫩荚嫩豆均可食用']
        }
      ],
      tips: [
        '喜冷凉气候，不耐高温',
        '秋冬季节种植最佳',
        '可采收嫩荚或嫩豆'
      ],
      faqs: [
        { question: '豌豆苗可以吃吗？', answer: '可以，豌豆苗是很好的蔬菜，可炒食或做汤，营养价值高。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // ==================== 根茎类 ====================
    {
      name: '萝卜',
      icon: '/images/crops/radish.png',
      category: '根茎类',
      difficulty: '简单',
      growthCycle: 50,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [9, 10, 11, 12, 1, 2]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '条播或穴播，覆土1-2厘米',
          duration: 5,
          tips: ['土壤要疏松深厚']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出2-3片真叶时间苗',
          duration: 10,
          tips: ['株距15-20厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施磷钾肥',
          duration: 35,
          tips: ['避免土壤忽干忽湿']
        }
      ],
      tips: [
        '喜冷凉气候',
        '土壤要疏松深厚',
        '避免土壤忽干忽湿，否则容易裂根'
      ],
      faqs: [
        { question: '萝卜为什么会糠心？', answer: '生长后期水分不足或收获过晚会导致糠心，建议适时收获。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '胡萝卜',
      icon: '/images/crops/carrot.png',
      category: '根茎类',
      difficulty: '中等',
      growthCycle: 80,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [9, 10, 11, 12, 1]
      },
      steps: [
        {
          order: 1,
          title: '播种',
          description: '撒播，覆土薄薄一层',
          duration: 10,
          tips: ['胡萝卜种子发芽慢', '保持土壤湿润']
        },
        {
          order: 2,
          title: '间苗',
          description: '幼苗长出3-4片叶时间苗，分2-3次进行',
          duration: 20,
          tips: ['最终株距10厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施磷钾肥',
          duration: 50,
          tips: ['避免土壤板结']
        }
      ],
      tips: [
        '喜冷凉气候',
        '土壤要疏松深厚',
        '发芽慢，需耐心等待'
      ],
      faqs: [
        { question: '胡萝卜为什么长不直？', answer: '土壤中有石块或土壤板结会导致胡萝卜弯曲，建议种植前深翻土壤。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '土豆',
      icon: '/images/crops/potato.png',
      category: '根茎类',
      difficulty: '中等',
      growthCycle: 90,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '催芽切块',
          description: '将种薯切块，每块保留1-2个芽眼，晾干切口',
          duration: 5,
          tips: ['切块后晾干1-2天再播种']
        },
        {
          order: 2,
          title: '播种',
          description: '穴播，每穴放一块种薯，覆土10厘米',
          duration: 15,
          tips: ['株距30厘米']
        },
        {
          order: 3,
          title: '培土',
          description: '苗高15厘米时培土，促进块茎形成',
          duration: 20,
          tips: ['分2-3次培土']
        },
        {
          order: 4,
          title: '日常管理',
          description: '保持土壤湿润，追施钾肥',
          duration: 55,
          tips: ['花期后停止浇水']
        }
      ],
      tips: [
        '喜冷凉气候',
        '培土是关键',
        '选择健康的种薯'
      ],
      faqs: [
        { question: '土豆发芽了还能吃吗？', answer: '发芽的土豆含有龙葵素，有毒不能食用。但发芽的土豆可以做种薯种植。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '芋头',
      icon: '/images/crops/taro.png',
      category: '根茎类',
      difficulty: '简单',
      growthCycle: 150,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [2, 3, 4]
      },
      steps: [
        {
          order: 1,
          title: '选种催芽',
          description: '选择健康的子芋做种，催芽后播种',
          duration: 10,
          tips: ['保持湿润催芽']
        },
        {
          order: 2,
          title: '播种',
          description: '开沟种植，覆土5厘米',
          duration: 20,
          tips: ['株距50厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，多次培土追肥',
          duration: 120,
          tips: ['芋头喜水湿', '培土促进子芋形成']
        }
      ],
      tips: [
        '喜高温高湿',
        '需要充足的水分',
        '多次培土可提高产量'
      ],
      faqs: [
        { question: '芋头为什么手痒？', answer: '芋头含有草酸钙，接触皮肤会引起瘙痒，建议戴手套处理。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },

    // ==================== 葱蒜类 ====================
    {
      name: '葱',
      icon: '/images/crops/green onion.png',
      category: '葱蒜类',
      difficulty: '简单',
      growthCycle: 60,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [1, 2, 3, 4, 9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '播种或分株',
          description: '可播种或用葱头分株繁殖',
          duration: 15,
          tips: ['分株繁殖更快收获']
        },
        {
          order: 2,
          title: '移栽',
          description: '幼苗长到15厘米时移栽',
          duration: 10,
          tips: ['株距10厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，适当追肥',
          duration: 40,
          tips: ['可多次采收', '培土软化']
        }
      ],
      tips: [
        '四季可种',
        '培土可使葱白更长更嫩',
        '可多次采收'
      ],
      faqs: [
        { question: '葱为什么会开花？', answer: '葱是二年生植物，经过低温春化后会抽苔开花，开花后葱叶会变老。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '蒜',
      icon: '/images/crops/garlic.png',
      category: '葱蒜类',
      difficulty: '简单',
      growthCycle: 90,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [9, 10, 11, 12]
      },
      steps: [
        {
          order: 1,
          title: '选种',
          description: '选择健康的蒜瓣做种',
          duration: 1,
          tips: ['去除蒜瓣外皮']
        },
        {
          order: 2,
          title: '播种',
          description: '蒜瓣尖端朝上插入土中，覆土2厘米',
          duration: 10,
          tips: ['株距10厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，追施氮肥',
          duration: 40,
          tips: ['蒜苗可多次采收']
        },
        {
          order: 4,
          title: '鳞茎膨大',
          description: '抽苔后鳞茎快速膨大',
          duration: 40,
          tips: ['采收蒜苔可提高蒜头产量']
        }
      ],
      tips: [
        '秋冬季节种植最佳',
        '蒜苗和蒜苔都可食用',
        '采收蒜苔可提高蒜头产量'
      ],
      faqs: [
        { question: '大蒜什么时候采收？', answer: '蒜苔抽出后可采收蒜苔，叶片变黄后可采收蒜头。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: '姜',
      icon: '/images/crops/ginger.png',
      category: '葱蒜类',
      difficulty: '中等',
      growthCycle: 180,
      suitableProvinces: ['广东省', '广西壮族自治区', '福建省', '海南省'],
      suitableMonths: {
        '广东省': [3, 4]
      },
      steps: [
        {
          order: 1,
          title: '催芽',
          description: '将姜种放在温暖处催芽，芽长1厘米时切块',
          duration: 15,
          tips: ['每块保留1-2个芽']
        },
        {
          order: 2,
          title: '播种',
          description: '穴播，芽朝上，覆土5厘米',
          duration: 20,
          tips: ['株距20厘米']
        },
        {
          order: 3,
          title: '日常管理',
          description: '保持土壤湿润，遮阴防晒',
          duration: 80,
          tips: ['姜喜阴，需要遮阴']
        },
        {
          order: 4,
          title: '培土追肥',
          description: '多次培土追肥，促进根茎膨大',
          duration: 80,
          tips: ['培土使姜更嫩']
        }
      ],
      tips: [
        '喜温暖湿润',
        '需要遮阴',
        '培土可使姜更嫩'
      ],
      faqs: [
        { question: '姜为什么辣？', answer: '姜含有姜辣素，具有辛辣味，老姜比嫩姜更辣。' }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  try {
    // 先清空现有数据
    const existingCrops = await db.collection('crops').get();
    for (const crop of existingCrops.data) {
      await db.collection('crops').doc(crop._id).remove();
    }

    // 批量添加新数据
    let addedCount = 0;
    for (const crop of crops) {
      await db.collection('crops').add({ data: crop });
      addedCount++;
    }

    return {
      code: 0,
      message: 'success',
      data: {
        total: addedCount,
        crops: crops.map(c => c.name)
      }
    };
  } catch (err) {
    console.error('初始化作物数据失败:', err);
    return {
      code: -1,
      message: err.message || '初始化作物数据失败'
    };
  }
};
