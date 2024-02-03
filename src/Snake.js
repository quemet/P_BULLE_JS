/**
 * ETML
 * Auteur : Quentin Métroz
 * Date : 19.12.2023
 * Description : Gére le Snake de l'utilisateur par exemple ses mouvements ou ses colisions avec son propre corps
*/
import {snake} from "./Main.js";
import {CELL_SIZE} from "./Main.js";
import {ctx} from "./Main.js";
import {food} from "./Main.js";

export class Snake {
  /**
   * Seul constructeur de la classe Snake
   */
  constructor() {
    this.length = 1; // Longueur du serpent
    this.score = 0; // Score de l'utilisateur
    this.dataX = [360]; // Permet d'avoir tout les X du serpent actuel
    this.dataY = [360]; // Permet d'avoir tout les Y du serpent actuel
    this.dataDirection = [""]; // Permet de savoir la direction du serpent
  }
  
  /**
   * Cette méthode permet de faire bouger le serpent
   */
  move() {
    // Permet de connaître la direction du serpent
      switch (snake.dataDirection[0]) {
        case "RIGHT":
          snake.dataX.unshift(snake.dataX[0] + CELL_SIZE);
          snake.dataX.pop();
          snake.dataY.unshift(snake.dataY[0]);
          snake.dataY.pop();
          snake.dataDirection.unshift("RIGHT");
          break;
        case "LEFT":
          snake.dataX.unshift(snake.dataX[0] - CELL_SIZE);
          snake.dataX.pop();
          snake.dataY.unshift(snake.dataY[0]);
          snake.dataY.pop();
          snake.dataDirection.unshift("LEFT");
          break;
        case "UP":
          snake.dataX.unshift(snake.dataX[0]);
          snake.dataX.pop();
          snake.dataY.unshift(snake.dataY[0] - CELL_SIZE);
          snake.dataY.pop();
          snake.dataDirection.unshift("UP");
          break;
        case "DOWN":
          snake.dataX.unshift(snake.dataX[0]);
          snake.dataX.pop();
          snake.dataY.unshift(snake.dataY[0] + CELL_SIZE);
          snake.dataY.pop();
          snake.dataDirection.unshift("DOWN");
        break;
      }
    ctx.fillStyle = 'Green';
    // Elle boucle sur le serpnet et de le dessiner
    for(let i=snake.length-1;i>=0;i--) {
      ctx.fillRect(snake.dataX[i], snake.dataY[i], CELL_SIZE, CELL_SIZE);
    }
  }
  
  /**
   * Cette méthode permet de savoir si le snake est en dehors des limites
   */
  isOutOfTheBoard() {
    // Check si le serpent est hors des limites
    if (snake.dataX[0] > canvas.width - 1 || snake.dataX[0] < 0 || snake.dataY[0] > canvas.height - 1 || snake.dataY[0] < 0) {
      snake.GameOver();
    }
  }
  
  /**
   * Cette methode gére la colision avec le corps du snake
   */
  checkColisionWithBody() {
    // Parcour le Snake sans prendre la tête du snake
    for(let i=snake.length-1;i>=1;i--) {
      // Condition pour savoir si la tête touche le corps
      if(snake.dataX[i] == snake.dataX[0] && snake.dataY[i] == snake.dataY[0]){
        snake.GameOver();
      };
    }
  }
  
  /**
   * Cette méthode gére la collision avec la nourriture
   */
  checkColisionWithFood() {
    // Check si la tête touche une pomme
    if (snake.dataX[0] == food.x && snake.dataY[0] == food.y) {
      let val1 = Math.random() * canvas.width;
      let val2 = Math.random() * canvas.width;
      food.x = val1 - (val1 % CELL_SIZE);
      food.y = val2 - (val2 % CELL_SIZE);
      // Boucle sur le serpent
      for(let i=0;i<snake.length;i++) {
        // Check si la nourriture a spawn au même endroit qu'une partie du corps du serpent
        if(snake.dataX[i] == food.x && snake.dataY[i] == food.y) {
          food.x = val1 - (val1 % CELL_SIZE);
          food.y = val2 - (val2 % CELL_SIZE);
        } 
      }
      // Permet de connaître la direction du snake
      switch(snake.dataDirection[0]) {
        case "RIGHT":
          this.dataX.push((this.dataX[snake.length-1])-CELL_SIZE);
          this.dataY.push((this.dataY[snake.length-1]));
          this.dataDirection.unshift("RIGHT");
          break;
        case "LEFT":
          this.dataX.push((this.dataX[snake.length-1]) + CELL_SIZE);
          this.dataY.push((this.dataY[snake.length-1]));
          this.dataDirection.unshift("LEFT");
          break;
        case "UP":
          this.dataX.push((this.dataX[snake.length-1]));
          this.dataY.push((this.dataY[snake.length-1])+CELL_SIZE);
          this.dataDirection.unshift("UP");
          break;
        case "DOWN":
          this.dataX.push((this.dataX[snake.length-1]));
          this.dataY.push((this.dataY[snake.length-1])-CELL_SIZE);
          this.dataDirection.unshift("DOWN");
          break;
      }
      snake.length += 1;
      snake.score += 1;
    }
  }
  
  /**
   * Permet d'afficher le message quand l'utilisateur perd
   */
  GameOver() {
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`Vous avez perdu. Votre score est de ${snake.score}`, 50, 70);
    process.exit(1);
  }
}