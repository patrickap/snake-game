import { CANVAS, DIRECTION, KEYCODE } from '../constants';
import { ctx } from '../global';
import { Point2D, Direction2D } from '../types';
import { getCenterPoint } from '../utils';

class Snake {
  protected direction: Direction2D = DIRECTION.NONE;
  protected movement: Point2D = { x: 0, y: 0 };
  protected parts: SnakePart[] = [new SnakePart()];

  constructor() {
    // TODO: unsubscribe on class destroy
    document.addEventListener('keydown', ({ keyCode }) => {
      switch (keyCode) {
        case KEYCODE.ARROW_UP:
          if (this.direction === DIRECTION.DOWN) return;
          this.direction = DIRECTION.UP;
          this.movement = { x: 0, y: -SnakePart.size.y };
          break;
        case KEYCODE.ARROW_DOWN:
          if (this.direction === DIRECTION.UP) return;
          this.direction = DIRECTION.DOWN;
          this.movement = { x: 0, y: SnakePart.size.y };
          break;
        case KEYCODE.ARROW_LEFT:
          if (this.direction === DIRECTION.RIGHT) return;
          this.direction = DIRECTION.LEFT;
          this.movement = { x: -SnakePart.size.x, y: 0 };
          break;
        case KEYCODE.ARROW_RIGHT:
          if (this.direction === DIRECTION.LEFT) return;
          this.direction = DIRECTION.RIGHT;
          this.movement = { x: SnakePart.size.x, y: 0 };
          break;
      }
    });
  }

  getDirection() {
    return this.direction;
  }

  setDirectoin(direction: Direction2D) {
    this.direction = direction;
  }

  getMovement() {
    return this.movement;
  }

  setMovement(movement: Point2D) {
    this.movement = movement;
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
    const { x: positionX, y: positionY } = this.getHead().getPosition();
    const { x: movementX, y: movementY } = this.movement;
    const newHead = new SnakePart({
      x: positionX + movementX,
      y: positionY + movementY,
    });
    this.parts = [newHead, ...this.parts.slice(0, -1)];
  }

  draw() {
    this.parts.forEach((part) => {
      part.draw();
    });
  }
}

class SnakePart {
  constructor(
    protected position: Point2D = getCenterPoint({
      offset: { x: -SnakePart.size.x, y: -SnakePart.size.y },
    }),
    protected color = 'black',
  ) {}

  static get size() {
    return { x: CANVAS.CELL_SIZE, y: CANVAS.CELL_SIZE };
  }

  getPosition() {
    return this.position;
  }

  setPosition(position: Point2D) {
    this.position = position;
  }

  getColor() {
    return this.color;
  }

  setColor(color: string) {
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.rect(
      this.position.x,
      this.position.y,
      SnakePart.size.x,
      SnakePart.size.y,
    );
    ctx.fill();
  }
}

export { Snake, SnakePart };
