/**
 * 子类 Enemy 射击目标对象
 */
var Enemy = function (opts) {
  var opts = opts || {};
  Element.call(this, opts);
  // 特有属性，当前状态，可谓 normal、booming、boomed
  this.status = 'normal';
  this.icon = opts.icon;
  this.boomCount = 0;
  this.boomIcon = opts.boomIcon;
  // 特有属性，计算爆炸的帧次
};

// 继承Element的方法
Enemy.prototype = new Element();

/**
 * 方法: down 向下移动一个身位
 */
Enemy.prototype.down = function() {
  this.move(0, this.size);
  return this;
}

/**
 * 方法: translate 根据方向水平移动一个身为
 * @param {String} direction 水平移动方向
 */
Enemy.prototype.translate = function(direction) {
  if (direction === 'left') {
    this.move(-this.speed, 0);
  } else {
    this.move(this.speed, 0);
  }
  return this;
}

/**
 * 方法: booming 爆炸中
 */
Enemy.prototype.booming = function() {
  this.status = 'booming';
  this.boomCount += 1;
  if (this.boomCount > 4) {
    this.status = 'boomed';
  }
  return this;
}
// 方法: draw 方法
Enemy.prototype.draw = function() {
  // 绘制怪兽
  switch(this.status) {
    case 'normal':
      context.drawImage(this.icon, this.x, this.y, this.size, this.size);
      break;
    case 'booming':
      context.drawImage(this.boomIcon, this.x, this.y, this.size, this.size);
      break;
  }
  return this;
}