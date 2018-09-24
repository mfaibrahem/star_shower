
import randomIntFromRange from './utils';
import { groundHeight } from './animate';
const UIcanvas = document.querySelector('canvas');
const ctx = UIcanvas.getContext('2d');


function Star(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.velocity = {
    x: (Math.random() - .5) * 8,
    y: Math.random() * 3
  };
  this.gravity = .5;
  this.friction = .7;

}

Star.prototype.draw = function() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  ctx.fillStyle = '#E3EAEF';
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}
Star.prototype.update = function() {
  this.draw();
  if (this.x + this.r + this.velocity.x >= UIcanvas.width || this.x - this.r <= 0) {
    this.velocity.x = -this.velocity.x*this.friction;
  }
  if (this.y + this.r + this.velocity.y >= UIcanvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y*this.friction;
    this.shatter();
  }
  else {
    this.velocity.y += this.gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
}
Star.prototype.shatter = function() {
  this.r -= 3;
  for (let i=0; i<8; i++) {
    miniStarArray.push(new MiniStar(this.x, this.y, 2));
  }
}


function MiniStar(x, y, r) {
  Star.call(this, x, y, r);
  this.velocity = { 
    x: randomIntFromRange(-3, 3),
    y: randomIntFromRange(-10, 10)
  };
  this.gravity = .2;
  this.friction = .99;
  this.ttl = 150;
  this.opacity = 1;
}

MiniStar.prototype = Object.create(Star.prototype);
MiniStar.prototype.constructor = MiniStar;

MiniStar.prototype.draw = function() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  ctx.fillStyle = `rgb(227, 234, 239, ${this.opacity})`;
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

MiniStar.prototype.update = function() {
  this.draw();
  if (this.x + this.r + this.velocity.x >= UIcanvas.width || this.x - this.r <= 0) {
    this.velocity.x = -this.velocity.x * this.friction;
  }
  if (this.y + this.r + this.velocity.y >= UIcanvas.height - groundHeight) {
    this.velocity.y = -this.velocity.y * this.friction;
  }
  else {
    this.velocity.y += this.gravity;
  }
  this.x += this.velocity.x;
  this.y += this.velocity.y;
  this.ttl -= 1;
  this.opacity -= 1 / this.ttl;
}

function BackgroundStar(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.ttl = 400;
  this.opacity = 1;
}
BackgroundStar.prototype.draw = function() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  ctx.fillStyle = `rgb(227, 234, 239, ${this.opacity})`;
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
};

BackgroundStar.prototype.update = function() {
  this.draw();
  if ( this.opacity > 0) {
    this.opacity -= .005;
  }
  this.ttl -= 1;
}


function Moon(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}

Moon.prototype.draw = function() {
  ctx.save();
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  ctx.fillStyle = '#E3EAEF';
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 50;
  ctx.fill();
  ctx.restore();
}

function MiniMoon(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
}
MiniMoon.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
  ctx.fillStyle = `rgba(199, 213, 223, 0.822)`;
  ctx.fill();
}



function createMountainRange(mountainAmount, height, color) {
  for (let i=0; i<mountainAmount; i++) {
    const mountainWidth = UIcanvas.width/mountainAmount;
    ctx.beginPath();
    ctx.moveTo(i*mountainWidth, UIcanvas.height);
    ctx.lineTo(i*mountainWidth + mountainWidth + 325, UIcanvas.height);
    ctx.lineTo(i*mountainWidth + mountainWidth/2, UIcanvas.height-height);
    ctx.lineTo(i*mountainWidth - 325, UIcanvas.height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

// implementaion

let starArray;
let miniStarArray;
let backgroundStarsArray;
let moonArray;
let miniMoonArray;
function init() {
  starArray = [];
  miniStarArray = [];
  backgroundStarsArray = [];
  moonArray = [];
  miniMoonArray = [];
  // for (let i=0; i<1; i++) {
  //   let r = 18;
  //   let x = randomIntFromRange(r, UIcanvas.width-r)
  //   let y = -200;
  //   starArray.push(new Star(x, y, r));
  // }
  for (let i=0; i<40; i++) {
    let r = randomIntFromRange(1, 3);
    let x = randomIntFromRange(r, UIcanvas.width-r);
    let y = randomIntFromRange(r, UIcanvas.height/4-r);
    backgroundStarsArray.push(new BackgroundStar(x, y, r));
  }
  
  for (let i = 0; i < 1; i++) {
    let r = 40;
    let x = UIcanvas.width - 70;
    let y = 70;
    moonArray.push(new Moon(x, y, r));
  }

  // for (let i = 0; i < 3; i++) {
  //   miniMoonArray.push(new MiniMoon( 
  //                           randomIntFromRange(UIcanvas.width-70-40+10, UIcanvas.width-70+40-10),
  //                           randomIntFromRange(70-40+10, 70+40-10), 5));
  // }
  miniMoonArray.push(new MiniMoon(UIcanvas.width-70+20, 70+10, 5));
  miniMoonArray.push(new MiniMoon(UIcanvas.width-70-20, 70+20, 5));
  miniMoonArray.push(new MiniMoon(UIcanvas.width-70+5, 70-20, 10));
}

export { 
  Star, 
  BackgroundStar, 
  starArray, 
  miniStarArray, 
  backgroundStarsArray, 
  init, 
  UIcanvas, 
  ctx, 
  createMountainRange,
  moonArray,
  miniMoonArray
};