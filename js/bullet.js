/**
 * 子类 Bullet 子弹对象
 */
var Bullet = function (opts) {
  var opts = opts || {};
  Element.call(this, opts);
};

// 组合继承Element的方法
Bullet.prototype = new Element();

/**
 * 方法：fly 向上移动
 */
Bullet.prototype.fly = function() {
  this.move(0, -this.speed);
  return this;
};

/**
 * 判断是否和物体碰撞
 * @return Boolean
 */
Bullet.prototype.hasCrash = function(target) {
  var crashX = target.x < this.x && this.x < (target.x + target.size);
  var crashY = target.y < this.y && this.y < (target.y + target.size);
  // 如果子弹击中的是目标对象的范围，则销毁子弹
  if (crashX && crashY){
    return true;
  }
  return false;
};

// 方法：draw 方法
Bullet.prototype.draw = function() {
  // 绘画一个线条
  context.beginPath();
  context.strokeStyle = '#fff';
  context.moveTo(this.x, this.y);
  context.lineTo(this.x, this.y - this.size); // 子弹尺寸不支持修改);
  context.closePath();
  context.stroke();
  return this;
}