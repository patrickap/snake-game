import { DIRECTION } from '../constants';

type Point = { x: number; y: number };

type Direction = typeof DIRECTION[keyof typeof DIRECTION];

type Movement = {
  direction: Direction;
  acceleration: Point;
};

export { Point, Direction, Movement };
