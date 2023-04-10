import { dinoRun, setJumpKey, dinoY, dinoX, dinoWidth, cactusHeight } from "./dino.js";
import { updateGround } from "./ground.js";
import { randomCactusSpawner, updateCactus, cactusArray, clearCactus } from "./cactus.js";
export let dinoSpeed = 2; // px
const currentScore = document.querySelector(".current-score");
const highScore = document.querySelector(".high-score");
let score = 0;
let highestScore = 0;
let scoreTime = 0;

document.addEventListener("keydown", startGame, { once: true });
document.querySelector(".restartGame").addEventListener("click", restartGame);
function gameLoop(time) {
    if (cactusHit()) {
        showGameOver();
        return;
    }
    requestAnimationFrame(gameLoop);
    updateGround();
    dinoRun(time);
    randomCactusSpawner(time);
    updateCactus();
    updateScore(time);
    increaseSpeed();
}
function showGameOver() {
    document.querySelector(".gameOver").style.display = "block";
}
function hideGameOver() {
    document.querySelector(".gameOver").style.display = "none";
}
function restartGame() {
    resetScore();
    hideGameOver();
    clearCactus();
    startGame();
}

function resetScore() {
    if (score > highestScore) {
        highestScore = score;
        highScore.innerHTML = `High score: ${highestScore}`;
    }
    score = 0;
    currentScore.innerHTML = "0";
}

function increaseSpeed() {
    if (score % 100 == 0) {
        dinoSpeed += 0.02;
    }
}
function updateScore(time) {
    if (time - scoreTime > 100) {
        currentScore.innerHTML = `Current score: ${++score}`;
        scoreTime = time;
    }
}
function startGame() {
    document.querySelector(".menu-text").style.display = "none";
    window.requestAnimationFrame(gameLoop);
    setJumpKey();
}

function cactusHit() {
    let horizontalCollision = cactusArray.some((cactus) => cactus.position < dinoX + dinoWidth - 10 && dinoX < cactus.position);
    let verticalCollision = dinoY < cactusHeight - 10;
    return horizontalCollision && verticalCollision;
}
