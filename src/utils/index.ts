import { Point } from '../types';
import { CANVAS as _CANVAS } from '../constants';

const isSamePoint = (point1: Point, point2: Point) => {
  return point1.x === point2.x && point1.y === point2.y;
};

const getCenterPoint = (
  { offset }: { offset: Point },
  CANVAS = _CANVAS,
): Point => {
  return { x: CANVAS.WIDTH / 2 + offset.x, y: CANVAS.HEIGHT / 2 + offset.y };
};

const getRandomPoint = (
  { offset }: { offset: Point },
  CANVAS = _CANVAS,
): Point => {
  const x = Math.random() * CANVAS.WIDTH;
  const y = Math.random() * CANVAS.HEIGHT;
  return {
    x: Math.floor(x - (offset.x ? x % offset.x : 0)),
    y: Math.floor(y - (offset.y ? y % offset.y : 0)),
  };
};

export { isSamePoint, getCenterPoint, getRandomPoint };
