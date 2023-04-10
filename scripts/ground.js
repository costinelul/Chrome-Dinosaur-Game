import { dinoSpeed } from "./main.js";
const groundElem = document.querySelector(".ground");
let groundOffset = 0;

export function updateGround() {
    groundElem.style.backgroundPosition = `${(groundOffset -= dinoSpeed)}px`;
}
