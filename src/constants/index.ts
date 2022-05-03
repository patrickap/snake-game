import { canvas } from '../global';

const CANVAS = {
  WIDTH: canvas.width,
  HEIGHT: canvas.height,
  CELL_SIZE: 20,
} as const;

const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none',
} as const;

const KEYCODE = {
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
} as const;

export { CANVAS, DIRECTION, KEYCODE };
