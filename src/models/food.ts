import { CANVAS } from '../constants';
import { getRandomPoint } from '../utils';
import { SnakePart } from './snake';

class Food {
  protected food = new FoodPart();

  getFood() {
    return this.food;
  }

  setFood(food: FoodPart) {
    this.food = food;
  }

  reset() {
    this.food = new FoodPart();
  }

  draw() {
    this.food.draw();
  }
}

class FoodPart extends SnakePart {
  constructor() {
    super(
      getRandomPoint({
        offset: { x: -CANVAS.CELL_SIZE, y: -CANVAS.CELL_SIZE },
      }),
      { x: 0, y: 0 },
      'red',
    );
  }
}

export { Food, FoodPart };
