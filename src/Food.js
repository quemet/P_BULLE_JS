/**
 * ETML
 * Auteur : Quentin Métroz
 * Date : 19.12.2023
 * Description : Permet de dessiner la nourriture
 */
import {ctx} from './Main.js';
import {CELL_SIZE} from './Main.js';
import {food} from './Main.js';
import {snake} from './Main.js';

export class Food {
  /**
   * Seul constructeur de la classe Food qui permet de définir x et y
   * @param x est la coordonnée X de la pomme
   * @param y est la coordonnée Y de la pomme
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  /**
   * Cette méthode permet de dessiner la pomme 
   */
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, CELL_SIZE, CELL_SIZE);
  }
}