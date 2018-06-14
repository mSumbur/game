// 元素
var container = document.getElementById('game');
// 动画对象
var enemyANimation;
var fireAnimation;
/**
 * 整个游戏对象
 */
var GAME = {
  /**
   * 初始化函数,这个函数只执行一次
   * @param  {object} opts
   * @return {[type]}      [description]
   */
  init: function(opts) {
    this.status = 'start';
    this.bindEvent();
  },
  bindEvent: function() {
    var self = this;
    var playBtn = document.querySelector('.js-play');
    // 开始游戏按钮绑定
    playBtn.onclick = function() {
      self.play();
    };
    var rePlayBtn = document.querySelector('.js-replay');
    rePlayBtn.onclick = function() {
      self.play();
    }
  },
  /**
   * 更新游戏状态，分别有以下几种状态：
   * start  游戏前
   * playing 游戏中
   * failed 游戏失败
   * success 游戏成功
   * all-success 游戏通过
   * stop 游戏暂停（可选）
   */
  setStatus: function(status) {
    this.status = status;
    container.setAttribute("data-status", status);
  },
  play: function() {
    GAMEUI.init();
    enemyAnimation = requestAnimationFrame(animate);
    this.setStatus('playing');
  },
  failed: function() {
    var score = document.querySelector('.score');
    score.innerText = GAMEUI.score;
    cancelAnimationFrame(enemyAnimation);
    cancelAnimationFrame(fireAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.setStatus('failed');
  }
};

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

/**
* 游戏相关配置
* @type {Object}
*/
var CONFIG = {
  status: 'start', // 游戏开始默认为开始中
  level: 1, // 游戏默认等级
  totalLevel: 6, // 总共6关
  numPerLine: 7, // 游戏默认每行多少个怪兽
  canvasPadding: 30, // 默认画布的间隔
  bulletSize: 10, // 默认子弹长度
  bulletSpeed: 10, // 默认子弹的移动速度
  enemySpeed: 2, // 默认敌人移动距离
  enemySize: 50, // 默认敌人的尺寸
  enemyGap: 10,  // 默认敌人之间的间距
  enemyIcon: 'img/enemy.png', // 怪兽的图像
  enemyBoomIcon: 'img/boom.png', // 怪兽死亡的图像
  enemyDirection: 'right', // 默认敌人一开始往右移动
  enemyArea: {
    width: 640,
    height: 440
  },
  planeSpeed: 5, // 默认飞机每一步移动的距离
  planeSize: {
    width: 60,
    height: 100
  }, // 默认飞机的尺寸,
  planeIcon: './img/plane.png',
};

var GAMEUI = {
  init: function() {
    this.numPerLine = CONFIG.numPerLine;
    this.x = CONFIG.canvasPadding;
    this.y = CONFIG.canvasPadding;

    this.enemyArr = [];
    for(var i = 0; i < this.numPerLine; i++) {
      this.enemyArr[i] = {
        x: 0,
        y: 0,
        status: 1,
        num: 0
      }
    }

    this.enemySize = CONFIG.enemySize;
    this.enemySpeed = CONFIG.enemySpeed;
    this.enemyDirection  =CONFIG.enemyDirection;
    this.score = 0;

    // 怪物图片对象
    this.enemy = new Image();
    this.enemy.src = CONFIG.enemyIcon;
    this.enemyBoom = new Image();
    this.enemyBoom.src = CONFIG.enemyBoomIcon;

    this.planeX = canvas.width / 2 - CONFIG.planeSize.width / 2;
    this.planeY = canvas.height - CONFIG.canvasPadding - CONFIG.planeSize.height;
    // 飞机图片对象
    this.plane = new Image();
    this.plane.src = CONFIG.planeIcon;

    // 子弹
    this.bulletX;
    this.bulletY;

    // 初始化
    // this.enemy.onload = function() {
    //   GAMEUI.drawEnemy();
    //   console.log('1');
    // }
    this.plane.onload = function() {
      GAMEUI.drawPlane();
    }
    this.enemyBoom.onload = function() {
      console.log('load');
    }

    context.font = "18px sans-serif";
    context.fillStyle = '#fff';
    context.fillText('分数：' + this.score, 20, 20);
  },
  drawEnemy: function() {
    var x = this.x;
    var y = this.y;
    this.enemyArr.forEach(function(item, index) {
      if(item.status) {
        context.drawImage(GAMEUI.enemy, x, y, GAMEUI.enemySize, GAMEUI.enemySize);
        item.x = x;
        item.y = y;
      }else if(item.num && item.num <= 6) {
        context.drawImage(GAMEUI.enemyBoom, x, y, 50, 50);
        item.num++;
      }else {
        context.strokeStyle = 'rgba(0, 0, 0, 0)';
        context.strokeRect(x, y, GAMEUI.enemySize, GAMEUI.enemySize);
      }
      x += 60;
    })
  },
  move: function() {
    var temp = 0;
    for(var i = 0; i < this.numPerLine; i++) {
      if(this.enemyArr[i].status) {
        for(var j = this.numPerLine - 1; j >= 0; j--) {
          if(this.enemyArr[j].status) {
            temp = (j + 1) - i;
            break;
          }
        }
        break;
      }
    }
    // 如果没有怪物存活或者怪物到达底部 游戏失败
    if(!temp || this.y + this.enemySize > CONFIG.enemyArea.height){
      GAME.failed();
      return true;
    }
    // 怪物移动CONFIG.enemySpeed距离
    if(this.enemyDirection === 'right') {
      this.x += this.enemySpeed;
      if(this.enemyArr[j].x + 50 + 30 > canvas.width) {
        this.y += this.enemySize;
        this.enemyDirection = 'left';
      }
    }else {
      this.x -= this.enemySpeed;
      if(this.enemyArr[i].x < 30) {
        this.y += this.enemySize;
        this.enemyDirection = 'right';
      }
    }
  },
  clearEnemyArea: function() {
    var width = CONFIG.enemyArea.width;
    var height = CONFIG.enemyArea.height;
    context.clearRect(30, 30, width, height);
  },
  drawPlane: function() {
    context.clearRect(30, 470, 640, 100);
    var plane = this.plane;
    if(this.planeX > 670 - 60) {
      this.planeX = 670 - 60;
    }else if(this.planeX < 30) {
      this.planeX = 30;
    }
    context.drawImage(plane, this.planeX, this.planeY, CONFIG.planeSize.width, CONFIG.planeSize.height);
  },
  scored: function() {
    context.clearRect(20, 0, 75, 30);
    this.score++;
    context.fillText('分数：' + this.score, 20, 20);
  }
}
// 开火子弹轨迹动画
function fire() {
  var bulletX = GAMEUI.planeX + 29;
  var bulletY = GAMEUI.planeY - 10;
  function animate() {
    // 清除子弹
    if(bulletY < GAMEUI.planeY - 10) {
      context.clearRect(bulletX, bulletY + 10, 1, 10);
    }
    // 失败时返回空
    if(GAME.status === 'failed') {
      return '';
    }
    context.fillStyle = '#fff';
    context.fillRect(bulletX, bulletY, 1, 10);
    // 检测子弹是否打到怪物
    GAMEUI.enemyArr.forEach(function(item, index) {
      if(item.status && item.x + 50 > bulletX && item.x < bulletX && item.y + 50 >= bulletY && item.y <= bulletY) {
        item.status = 0;
        item.num = 1;
        GAMEUI.scored();
      }
    })
    if(bulletY > -10) {
      bulletY -= 10;
      requestAnimationFrame(animate);
    }
  }
  fireAnimation = requestAnimationFrame(animate);
}
// 怪物运行动画
function animate() {
  GAMEUI.clearEnemyArea();
  enemyAnimation = requestAnimationFrame(animate);
  if(!GAMEUI.move()) {
    GAMEUI.drawEnemy();
  }
}
// 按键事件绑定
document.onkeydown = function(event) {
  if(GAME.status === 'playing') {
    var code = event.keyCode;
    if(code === 32) {
      // 飞机开火
      fire();
      return '';
    }
    if(code === 37) {
      // 飞机左动
      GAMEUI.planeX -= 5;
    }else if(code === 39) {
      // 飞机右动
      GAMEUI.planeX += 5;
    }
    GAMEUI.drawPlane();
  }
}
// 初始化
GAME.init();
