import './index.css';
import { ctx } from './global';
import { Snake } from './models';
import { CANVAS } from './constants';

let frame = 0;
let snake = new Snake();

const animate = () => {
  const is5thFrame = !(++frame % 5);
  if (is5thFrame) {
    ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    snake.update();
    snake.draw();

    if (snake.isFoodEaten) {
      snake.addElement();
      snake.addFood();
    }

    if (snake.isCollision) {
      snake = new Snake();
    }
  }
  requestAnimationFrame(animate);
};

animate();
