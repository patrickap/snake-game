import './index.css';
import { ctx } from './global';
import { Snake, Food } from './models';
import { CANVAS } from './constants';
import { isSamePoint } from './utils';

class Game {
  private frame = 0;
  private snake = new Snake();
  private food = new Food();

  get isFoodEaten() {
    return isSamePoint(
      this.snake.getHead().getPosition(),
      this.food.getFood().getPosition(),
    );
  }

  get isCollidingSelf() {
    return this.snake
      .getTail()
      .some((part) =>
        isSamePoint(this.snake.getHead().getPosition(), part.getPosition()),
      );
  }

  get isCollidingView() {
    const snakeHead = this.snake.getHead();
    return (
      snakeHead.getPosition().x + CANVAS.CELL_SIZE === 0 ||
      snakeHead.getPosition().x === CANVAS.WIDTH ||
      snakeHead.getPosition().y + CANVAS.CELL_SIZE === 0 ||
      snakeHead.getPosition().y === CANVAS.HEIGHT
    );
  }

  get is5thFrame() {
    return !(++this.frame % 5);
  }

  animate() {
    if (this.is5thFrame) {
      ctx.clearRect(0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
      this.snake.move();
      this.food.draw();
      this.snake.draw();

      if (this.isFoodEaten) {
        this.food.reset();
        this.snake.addPart();
      }

      if (this.isCollidingSelf || this.isCollidingView) {
        this.snake = new Snake();
        this.food = new Food();
      }
    }
    requestAnimationFrame(this.animate.bind(this));
  }

  run() {
    this.animate();
  }
}

new Game().run();
