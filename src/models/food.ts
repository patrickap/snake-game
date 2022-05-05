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

  move() {
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
        offset: { x: -SnakePart.size.x, y: -SnakePart.size.y },
      }),
      'red',
    );
  }
}

export { Food, FoodPart };
