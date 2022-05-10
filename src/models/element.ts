import { ctx } from '../global';
import { Point2D } from '../types';

abstract class Element {
  protected path = new Path2D();

  constructor(
    protected position: Point2D = { x: 0, y: 0 },
    protected movement: Point2D = { x: 0, y: 0 },
    protected color: string = 'black',
  ) {}

  getPosition() {
    return this.position;
  }

  setPosition(position: Point2D) {
    this.position = position;
  }

  getMovement() {
    return this.movement;
  }

  setMovement(movement: Point2D) {
    this.movement = movement;
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
    ctx.fill(this.path);
  }

  move() {
    this.position = {
      x: this.position.x + this.movement.x,
      y: this.position.y + this.movement.y,
    };
  }
}

export { Element };
