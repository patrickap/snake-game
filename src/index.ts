import './index.css';
import { ctx } from './global';
import { Snake, Food } from './models';
import { CANVAS } from './constants';
import { isSamePoint } from './utils';

let frame = 0;
let snake = new Snake();
let food = new Food();

const animate = () => {
  const is5thFrame = !(++frame % 5);
  if (is5thFrame) {
    ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
    snake.move();
    food.draw();
    snake.draw();

    const snakeHead = snake.getHead();
    const snakeTail = snake.getTail();
    const snakeFood = food.getFood();

    const isFoodEaten = isSamePoint(
      snakeHead.getPosition(),
      snakeFood.getPosition(),
    );

    const isCollidingSelf = snakeTail.some((part) =>
      isSamePoint(snakeHead.getPosition(), part.getPosition()),
    );

    const isCollidingView =
      snakeHead.getPosition().x + CANVAS.CELL_SIZE === 0 ||
      snakeHead.getPosition().x === CANVAS.WIDTH ||
      snakeHead.getPosition().y + CANVAS.CELL_SIZE === 0 ||
      snakeHead.getPosition().y === CANVAS.HEIGHT;

    if (isFoodEaten) {
      snake.addPart();
      food.move();
    }

    if (isCollidingSelf || isCollidingView) {
      snake = new Snake();
      food = new Food();
    }
  }
  requestAnimationFrame(animate);
};

animate();
