# 种菜助手 - 微信小程序

## 项目简介

种菜助手是一款面向个人用户的微信小程序，帮助用户解决"什么时节种什么、怎么种、怎么打理"的问题。

## 功能特点

- 🌱 **种植日历**：按月份查看适合种植的作物
- 📖 **种植指南**：详细的种植步骤和注意事项
- 🥬 **我的菜园**：管理已种植的作物
- 📝 **打理记录**：记录浇水、施肥、除虫等日常打理
- 📍 **地区适配**：根据不同省份推荐适宜作物

## 技术栈

- 前端：微信小程序原生框架
- 后端：微信云开发（云函数、云数据库、云存储）
- 数据库：云数据库（MongoDB 语法）

## 项目结构

```
vegetable-helper/
├── miniprogram/                 # 小程序前端代码
│   ├── app.js                   # 小程序入口
│   ├── app.json                 # 全局配置
│   ├── app.wxss                 # 全局样式
│   ├── pages/                   # 页面
│   │   ├── index/               # 首页
│   │   ├── calendar/            # 种植日历页
│   │   ├── garden/              # 我的菜园页
│   │   ├── detail/              # 作物详情页
│   │   ├── record/              # 打理记录页
│   │   └── mine/                # 我的页面
│   ├── components/              # 公共组件
│   │   ├── crop-card/           # 作物卡片组件
│   │   ├── month-picker/        # 月份选择器
│   │   └── province-picker/     # 省份选择器
│   ├── utils/                   # 工具函数
│   │   ├── api.js               # API 封装
│   │   ├── util.js              # 通用工具函数
│   │   └── province.js          # 省份数据
│   └── images/                  # 图片资源
│       └── crops/               # 作物图标
├── cloudfunctions/              # 云函数
│   ├── getOpenid/               # 获取用户openid
│   ├── getCrops/                # 获取作物列表
│   ├── getCropDetail/           # 获取作物详情
│   ├── addPlanting/             # 添加种植记录
│   ├── getMyPlantings/          # 获取我的种植列表
│   ├── addCareRecord/           # 添加打理记录
│   ├── getCareRecords/          # 获取打理记录列表
│   ├── getUserSettings/         # 获取用户设置
│   ├── updateUserSettings/      # 更新用户设置
│   └── initCropData/            # 初始化作物数据
└── project.config.json          # 项目配置
```

## 部署步骤

### 1. 创建云开发环境

1. 打开微信开发者工具
2. 导入项目
3. 点击"云开发"按钮
4. 创建新环境，记录环境 ID

### 2. 配置项目

在 `miniprogram/app.js` 中修改云开发环境 ID：

```javascript
wx.cloud.init({
  env: '你的云开发环境ID',
  traceUser: true
});
```

### 3. 创建数据库集合

在云开发控制台创建以下集合：

- `crops` - 作物表
- `plantings` - 种植记录表
- `care_records` - 打理记录表
- `user_settings` - 用户设置表

### 4. 部署云函数

在微信开发者工具中：

1. 右键点击 `cloudfunctions` 目录
2. 选择"同步云函数列表"
3. 右键点击每个云函数目录
4. 选择"上传并部署：云端安装依赖"

### 5. 初始化数据

在云开发控制台：

1. 点击"云函数"
2. 找到 `initCropData` 函数
3. 点击"测试"按钮执行
4. 等待执行完成，30种作物数据将被初始化

### 6. 添加作物图标

在 `miniprogram/images/crops/` 目录下添加作物图标：

- lettuce.png（生菜）
- bokchoy.png（小白菜）
- spinach.png（菠菜）
- choysum.png（菜心）
- kailan.png（芥蓝）
- waterspinach.png（空心菜）
- crown daisy.png（茼蒿）
- cilantro.png（香菜）
- youmaicai.png（油麦菜）
- chives.png（韭菜）
- tomato.png（番茄）
- cucumber.png（黄瓜）
- chili.png（辣椒）
- eggplant.png（茄子）
- bitter melon.png（苦瓜）
- luffa.png（丝瓜）
- wax gourd.png（冬瓜）
- pumpkin.png（南瓜）
- long bean.png（豆角）
- kidney bean.png（四季豆）
- pea.png（豌豆）
- radish.png（萝卜）
- carrot.png（胡萝卜）
- potato.png（土豆）
- taro.png（芋头）
- green onion.png（葱）
- garlic.png（蒜）
- ginger.png（姜）

图标建议尺寸：128x128 像素，PNG 格式，透明背景

## 作物数据

MVP 版本包含 30 种常见作物：

| 分类 | 作物 |
|------|------|
| 叶菜类 | 生菜、小白菜、菠菜、菜心、芥蓝、空心菜、茼蒿、香菜、油麦菜、韭菜 |
| 瓜果类 | 番茄、黄瓜、辣椒、茄子、苦瓜、丝瓜、冬瓜、南瓜 |
| 豆类 | 豆角、四季豆、豌豆 |
| 根茎类 | 萝卜、胡萝卜、土豆、芋头 |
| 葱蒜类 | 葱、蒜、姜 |

## 开发计划

### MVP 版本（已完成）

- [x] 项目初始化（小程序 + 云开发）
- [x] 种植日历页面
- [x] 种植指南页面
- [x] 我的菜园功能
- [x] 日常打理记录
- [x] 基础数据录入（30种作物）

### 后续版本

- [ ] 地区适配（华南/华东/华北等）
- [ ] 任务提醒功能
- [ ] 生长照片上传
- [ ] 分享功能
- [ ] UI 优化

## 许可证

MIT License
