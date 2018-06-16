# Canvas 射击小游戏
## 项目说明
- 概述：Canvas 射击小游戏要求玩家控制飞机发射子弹，消灭会移动的怪兽，如果全部消灭了则游戏成功，如果怪兽移动到底部则游戏失败。
- 目标：实现一个 Cavnas 射击小游戏
- 备注：课程作业

## 项目结构
- **index.html**: 游戏页面
- **style.css**: 页面样式
- **js**: 页面涉及的所有 js 代码
  - **app.js**: 页面逻辑入口 js
- **img**: 存放游戏的图片素材
- **视觉稿**: 存放游戏的视觉稿
- **readme.md**: 项目说明文档


## 项目演示地址
[游戏 在线演示地址](http://118.89.236.182/game/index.html)


##  游戏可通过修改配置，来修改游戏（如下图所示)

```js
/**
 * 游戏相关配置
 * @type {Object}
 */
var CONFIG = {
  status: 'start', // 游戏开始默认为开始中
  level: 1, // 游戏默认等级
  totalLevel: 6, // 总共6关
  numPerLine: 6, // 游戏默认每行多少个怪兽
  canvasPadding: 30, // 默认画布的间隔
  bulletSize: 10, // 默认子弹长度
  bulletSpeed: 10, // 默认子弹的移动速度
  enemySpeed: 2, // 默认敌人移动距离
  enemySize: 50, // 默认敌人的尺寸
  enemyGap: 10,  // 默认敌人之间的间距
  enemyIcon: './img/enemy.png', // 怪兽的图像
  enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
  enemyDirection: 'right', // 默认敌人一开始往右移动
  enemyArea: {
    width: 640,
    height: 440
  }, // 怪物移动区域
  planeSpeed: 5, // 默认飞机每一步移动的距离
  planeSize: {
    width: 60,
    height: 100
  }, // 默认飞机的尺寸,
  planeIcon: './img/plane.png',
};
```
