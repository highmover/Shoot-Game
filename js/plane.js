/**
 * 子类 Plane 飞机
 * 1、继承 Element
 * 2、依赖 Bullet
 */
var Plane = function (opts) {
  var opts = opts || {};
  Element.call(this, opts);
  // 特有属性
  this.icon = opts.icon;

  // 子弹属性
  this.bullets = [];
  this.bulletSpeed = opts.bulletSpeed;
  this.bulletSize = opts.bulletSize;
  // 控制射击频率
  this.lastShoot = Date.now();
};

// 继承Element的方法
Plane.prototype = new Element();

/**
 * 方法: hasHit 判断是否击中当前元素
 * @param  {target}  target 目标元素实例
 */
Plane.prototype.hasHit = function(target) {
  var bullets = this.bullets;
  var hasHit = false;
  for (var j = bullets.length - 1; j >= 0; j--) {
    // 如果子弹击中的是目标对象的范围，则销毁子弹
    if (bullets[j].hasCrash(target)){
      // 清除子弹实例
      this.bullets.splice(j, 1);
      hasHit = true;
      break;
    }
  }
  return hasHit;
}

/**
 * 方法: translate 左右移动主角
 */
Plane.prototype.translate = function(direction) {
  var speed = this.speed;
  var addX;
  // 判断移动的方向
  if (direction === 'left') {
    this.move(-speed, 0);
  } else {
    this.move(speed, 0);
  }
  return this;
}
/**
 * 方法: shoot 方法
 */
Plane.prototype.shoot = function() {
  // 200毫秒内，可以射击一次
  if (Date.now() - this.lastShoot > 200) {
    // 创建子弹,子弹位置是居中射出
    var x = this.x + this.size.width / 2;
    // 创建子弹
    this.bullets.push(new Bullet({
      x: x,
      y: this.y,
      size: this.bulletSize,
      speed: this.bulletSpeed 
    }));
    // 更新上次射击时间
    this.lastShoot = new Date();
    return this;
  } 
  
}


/**
 * 方法： drawBullets 画子弹
 */
Plane.prototype.drawBullets = function () {
  var bullets = this.bullets;
  var i = bullets.length;
  while (i--) {
    var bullet = bullets[i];
    // 更新子弹的位置
    bullet.fly(); // 更新和绘制耦合在一起了
    // 如果子弹对象超出边界,则删除
    if (bullet.y <= 0) {
      //如果子弹实例下降到底部，则需要在drops数组中清除该子弹实例对象
      bullets.splice(i, 1);
    } else {
      // 未超出的则绘画子弹
      bullet.draw();
    }
  }
}

// 方法: draw 方法
Plane.prototype.draw = function() {
  // 绘制飞机
  context.drawImage(this.icon, this.x, this.y, this.size.width, this.size.height);
  this.drawBullets();
  return this;
}