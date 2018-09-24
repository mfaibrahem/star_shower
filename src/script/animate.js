
import { Star, starArray, miniStarArray, backgroundStarsArray, moonArray, miniMoonArray, init, UIcanvas, ctx, createMountainRange } from './star';
import randomIntFromRange from './utils';

const backgroundGradiant = ctx.createLinearGradient(0, 0, 0, UIcanvas.height);
// backgroundGradiant.addColorStop(0, '#2C5364');
backgroundGradiant.addColorStop(0, '#0F2027');
backgroundGradiant.addColorStop(1, '#203A43');

function resizeCanvas() {
  UIcanvas.width = window.innerWidth;
  UIcanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  init();
});

let ticker = 0;
let randomSpawnRate = 150;
export let groundHeight = 50;
function animate() {
  requestAnimationFrame(animate);

  ctx.fillStyle = backgroundGradiant;
  ctx.fillRect(0, 0, UIcanvas.width, UIcanvas.height);
  
  backgroundStarsArray.forEach((star) => {
    star.update();
    if (star.ttl == 0) {
      star.opacity = 1;
      star.ttl = 400;
    }
  });

  // createMountainRange(1, UIcanvas.height-100, '#1c3038');
  // createMountainRange(2, UIcanvas.height-200, '#2f3b46');
  // createMountainRange(3, UIcanvas.height/3, '#20333a');

  ctx.save();
  ctx.shadowColor = '#E3EAEF';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#182028';
  ctx.fillRect(0, UIcanvas.height-groundHeight, UIcanvas.width, groundHeight);
  ctx.restore();
  
  ticker++;
  if (ticker % randomSpawnRate == 0) {
    let r = 15;
    let x = randomIntFromRange(r, UIcanvas.width-r)
    let y = -100;
    starArray.push(new Star(x, y, r));
    randomSpawnRate = randomIntFromRange(150, 200);
    ticker = 0;
  }

  starArray.forEach((star, index) => {
    star.update();
    if (star.r <= 0) {
      starArray.splice(index, 1);
    }
  });
  miniStarArray.forEach((star, index) => {
    star.update();
    if (star.ttl == 0) {
      miniStarArray.splice(index, 1);
    }
  });

  
  moonArray.forEach(moon => moon.draw());

  miniMoonArray.forEach(mini => mini.draw());

}

init();
export {animate};
