import { DIRECTION } from '../constants';

type Point2D = { x: number; y: number };

type Direction2D = keyof typeof DIRECTION;

export { Point2D, Direction2D };
