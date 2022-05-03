import { CANVAS, DIRECTION, KEYCODE } from '../constants';
import { ctx } from '../global';
import { Point, Movement } from '../types';
import { getCenterPoint, getRandomPoint, isSamePoint } from '../utils';

class Snake {
  private food: Food = new Food();
  private elements: SnakeElement[] = [];
  private movement: Movement = {
    direction: DIRECTION.NONE,
    acceleration: { x: 0, y: 0 },
  };

  constructor(
    position: Point = getCenterPoint({
      offset: { x: -CANVAS.CELL_SIZE, y: -CANVAS.CELL_SIZE },
    }),
  ) {
    this.elements = [new SnakeElement(position ? position : undefined)];

    // TODO: unsubscribe on class destroy
    document.addEventListener('keydown', ({ keyCode }) => {
      const { direction } = this.movement;

      switch (keyCode) {
        case KEYCODE.ARROW_UP:
          if (direction === DIRECTION.DOWN) return;
          this.movement = {
            direction: DIRECTION.UP,
            acceleration: { x: 0, y: -CANVAS.CELL_SIZE },
          };
          break;
        case KEYCODE.ARROW_DOWN:
          if (direction === DIRECTION.UP) return;
          this.movement = {
            direction: DIRECTION.DOWN,
            acceleration: { x: 0, y: CANVAS.CELL_SIZE },
          };
          break;
        case KEYCODE.ARROW_LEFT:
          if (direction === DIRECTION.RIGHT) return;
          this.movement = {
            direction: DIRECTION.LEFT,
            acceleration: { x: -CANVAS.CELL_SIZE, y: 0 },
          };
          break;
        case KEYCODE.ARROW_RIGHT:
          if (direction === DIRECTION.LEFT) return;
          this.movement = {
            direction: DIRECTION.RIGHT,
            acceleration: { x: CANVAS.CELL_SIZE, y: 0 },
          };
          break;
      }
    });
  }

  get isCollision() {
    const { x, y } = this.head.getPosition();

    const isCollisionSelf = this.tail.some((t) =>
      isSamePoint({ x, y }, t.getPosition()),
    );
    const isCollisionCanvas =
      x + CANVAS.CELL_SIZE === 0 ||
      x === CANVAS.WIDTH ||
      y + CANVAS.CELL_SIZE === 0 ||
      y === CANVAS.HEIGHT;

    if (isCollisionSelf || isCollisionCanvas) return true;

    return false;
  }

  get isFoodEaten() {
    const isFoodEaten = isSamePoint(
      this.head.getPosition(),
      this.food.getPosition(),
    );

    if (isFoodEaten) return true;

    return false;
  }

  get head() {
    const [head] = this.elements;
    return head;
  }

  get tail() {
    const [head, ...tail] = this.elements;
    return tail;
  }

  addFood() {
    this.food = new Food();
  }

  addElement() {
    const element = new SnakeElement();
    this.elements = [...this.elements, element];
  }

  update() {
    const { x, y } = this.head.getPosition();
    const { x: speedX, y: speedY } = this.movement.acceleration;
    const newHead = new SnakeElement({ x: x + speedX, y: y + speedY });
    this.elements = [newHead, ...this.elements.slice(0, -1)];
  }

  draw() {
    this.elements.forEach((element) => element.draw());
    this.food.draw();
  }
}

class SnakeElement {
  constructor(
    private position: Point = { x: 0, y: 0 },
    private color = 'black',
  ) {}

  getPosition() {
    return this.position;
  }

  setPosition(position: Point) {
    this.position = position;
  }

  draw() {
    const { x, y } = this.position;
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, CANVAS.CELL_SIZE, CANVAS.CELL_SIZE);
  }
}

class Food extends SnakeElement {
  constructor(
    position = getRandomPoint({
      offset: { x: -CANVAS.CELL_SIZE, y: -CANVAS.CELL_SIZE },
    }),
  ) {
    super(position, 'red');
  }
}

export { Snake, SnakeElement, Food };
