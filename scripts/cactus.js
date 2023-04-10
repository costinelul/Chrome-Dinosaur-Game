import { dinoSpeed } from "./main.js";
const board = document.querySelector(".board");
export let cactusArray = [];
let lastTime = 0;
let random = Math.floor(Math.random() * 5000);

export function clearCactus() {
    cactusArray = [];
    document.querySelectorAll(".cactus").forEach(cactus => board.removeChild(cactus));
}
export function randomCactusSpawner(time) {
    if (time - lastTime > random) {
        spawnCactus();
        lastTime = time;
        random = Math.floor(Math.random() * 2000) + 1000;
    }
}
function spawnCactus() {
    const cactusType = Math.floor(Math.random() * 2) ? "smallCactus" : "bigCactus";
    const cactus = document.createElement("div");
    cactus.classList.add(`${cactusType}`);
    cactus.classList.add(`cactus`);
    board.appendChild(cactus);
    const cactusObj = {
        cactusElem: cactus,
        position: +getComputedStyle(cactus).left.slice(0, -2),
    };
    cactusArray.push(cactusObj);
}

export function updateCactus() {
    if (cactusArray.length > 0) {
        for (let i = 0; i < cactusArray.length; i++) {
            if (cactusArray[i].position <= -30) {
                board.removeChild(cactusArray[i].cactusElem);
                cactusArray.splice(i, 1);
            } else {
                cactusArray[i].cactusElem.style.left = `${(cactusArray[i].position -= dinoSpeed)}px`;
            }
        }
    }
}
