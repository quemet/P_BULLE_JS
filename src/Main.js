/**
 * ETML
 * Auteur : Quentin Métroz
 * Date : 19.12.2023
 * Description : Permet de gérer le jeu du snake
 */
import '../css/style.css';
import { Food } from './Food.js';
import { Snake } from './Snake.js';

const canvas = document.querySelector('canvas');
const x = 0;
const y = 0;
let start = false;

export const ctx = canvas.getContext('2d');
export const CELL_SIZE = 40;

/**
 * Cette méthode permet de montrer le score du snake
 */
const showScore = () => {
  ctx.font = "40px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(snake.score, 50, 70);
}

/**
 * Cette méthode mappe les touche de l'utilisateur
 */
const userInput = () => {
  document.addEventListener("keydown", event => {
    // Check si une des quatres fléches directionnelles est touchö par l'utilisateur
    switch (event.key) {
      case "ArrowLeft":
        // Check si la direction n'est pas à droite
        if (snake.dataDirection[0] == "UP" || snake.dataDirection[0] == "DOWN" || snake.dataDirection[0] == "") {
          snake.dataDirection.unshift("LEFT");
        }
        break;
      case "ArrowRight":
        // Check si la direction n'est pas à gauche
        if (snake.dataDirection[0] == "UP" || snake.dataDirection[0] == "DOWN" || snake.dataDirection[0] == "") {
          snake.dataDirection.unshift("RIGHT");
        }
        break;
      case "ArrowUp":
        // Check si la direction n'est pas en-bas
        if (snake.dataDirection[0] == "RIGHT" || snake.dataDirection[0] == "LEFT" || snake.dataDirection[0] == "") {
          snake.dataDirection.unshift("UP");
        }
        break;
      case "ArrowDown":
        // Check si la direction n'est pas en haut
        if (snake.dataDirection[0] == "RIGHT" || snake.dataDirection[0] == "LEFT" || snake.dataDirection[0] == "") {
          snake.dataDirection.unshift("DOWN");
        }
        break;
        case "Enter":
          // Si il appuye sur Enter alors le jeu peut démarrer
          if(start == false){
            snake.dataDirection.unshift("RIGHT");
          }
          start = true;
        break;
    }
  });
}

/**
 * Boucle principale de mon jeu snake
 */
const move = () => {
  // Dessine la grille de jeu
  ctx.fillStyle = 'black';
  ctx.fillRect(x, y, canvas.width, canvas.height);
  // Permet d'afficher l'écran de départ 
  if (start == false) {
    ctx.font = "32px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("SNAKE - Jeux en JS", 50, 60);
    ctx.font = "22px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Pour commencer, appuyez sur la touche Entrée", 50, 100)
    ctx.fillText("Pour déplacer le serpent utiliser les touches flèches du clavier", 50, 140)
  } else {
    food.draw();
    snake.move();
    snake.checkColisionWithFood();
    snake.checkColisionWithBody();
    snake.isOutOfTheBoard();
    showScore();
  }
  userInput();

  // Rafraichit à chaque seconde
  setTimeout(() => {
    requestAnimationFrame(move);
  }, 100);
};

let val1 = Math.random() * canvas.width;
let val2 = Math.random() * canvas.width;
let data = [val1 - (val1 % CELL_SIZE), val2 - (val2 % CELL_SIZE)];
export const snake = new Snake();
export const food = new Food(data[0], data[1]);
requestAnimationFrame(move);