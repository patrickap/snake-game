import { canvas } from '../global';

const CANVAS = {
  WIDTH: canvas.width,
  HEIGHT: canvas.height,
  CELL_SIZE: 20,
} as const;

enum DIRECTION {
  ARROW_UP = 38,
  ARROW_DOWN = 40,
  ARROW_LEFT = 37,
  ARROW_RIGHT = 39,
}

export { CANVAS, DIRECTION };
