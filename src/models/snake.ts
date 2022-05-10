import { CANVAS, DIRECTION } from '../constants';
import { Point2D, Direction2D } from '../types';
import { getCenterPoint } from '../utils';
import { Element } from './element';

class Snake {
  protected direction?: Direction2D = undefined;
  protected parts: SnakePart[] = [new SnakePart()];

  constructor() {
    // TODO: unsubscribe on class destroy
    document.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case DIRECTION.ARROW_UP:
          if (this.direction === DIRECTION.ARROW_DOWN) return;
          this.direction = DIRECTION.ARROW_UP;
          break;
        case DIRECTION.ARROW_DOWN:
          if (this.direction === DIRECTION.ARROW_UP) return;
          this.direction = DIRECTION.ARROW_DOWN;
          break;
        case DIRECTION.ARROW_LEFT:
          if (this.direction === DIRECTION.ARROW_RIGHT) return;
          this.direction = DIRECTION.ARROW_LEFT;
          break;
        case DIRECTION.ARROW_RIGHT:
          if (this.direction === DIRECTION.ARROW_LEFT) return;
          this.direction = DIRECTION.ARROW_RIGHT;
          break;
      }
    });
  }

  getDirection() {
    return this.direction;
  }

  setDirection(direction: Direction2D) {
    this.direction = direction;
  }

  getParts() {
    return this.parts;
  }

  setParts(parts: SnakePart[]) {
    this.parts = parts;
  }

  addPart() {
    const part = new SnakePart();
    this.parts = [...this.parts, part];
  }

  getHead() {
    const [head] = this.parts;
    return head;
  }

  setHead(head: SnakePart) {
    this.parts = [head, ...this.getTail()];
  }

  getTail() {
    const [, ...tail] = this.parts;
    return tail;
  }

  setTail(tail: SnakePart[]) {
    this.parts = [this.getHead(), ...tail];
  }

  move() {
    const position = this.getHead().getPosition();
    const movement =
      this.direction === DIRECTION.ARROW_UP
        ? { x: 0, y: -CANVAS.CELL_SIZE }
        : this.direction === DIRECTION.ARROW_DOWN
        ? { x: 0, y: CANVAS.CELL_SIZE }
        : this.direction === DIRECTION.ARROW_LEFT
        ? { x: -CANVAS.CELL_SIZE, y: 0 }
        : this.direction === DIRECTION.ARROW_RIGHT
        ? { x: CANVAS.CELL_SIZE, y: 0 }
        : { x: 0, y: 0 };

    const newHead = new SnakePart({
      x: position.x + movement.x,
      y: position.y + movement.y,
    });

    this.parts = [newHead, ...this.parts.slice(0, -1)];
  }

  draw() {
    this.parts.forEach((part) => {
      part.draw();
    });
  }
}

class SnakePart extends Element {
  constructor(
    protected position: Point2D = getCenterPoint({
      offset: { x: -CANVAS.CELL_SIZE, y: -CANVAS.CELL_SIZE },
    }),
    protected movement: Point2D = { x: 0, y: 0 },
    protected color = 'black',
  ) {
    super(position, movement, color);
    this.path.rect(
      this.position.x,
      this.position.y,
      CANVAS.CELL_SIZE,
      CANVAS.CELL_SIZE,
    );
  }
}

export { Snake, SnakePart };
