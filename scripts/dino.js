export const dino = document.querySelector(".dino");
export const cactusHeight = +getComputedStyle(dino).height.slice(0, -2);
export let dinoY = +getComputedStyle(dino).bottom.slice(0, -2);
export const dinoX = +getComputedStyle(dino).left.slice(0, -2);
export const dinoWidth = +getComputedStyle(dino).width.slice(0, -2);
let falling = false;
const dinoAnimation = ["dino-run-0.png", "dino-run-1.png"];
let index = 0;
let dinoTime = 0;

export function setJumpKey() {
    document.onkeydown = function () {
        if (dinoY == 0) {
            window.requestAnimationFrame(jump);
        }
    };
}

function jump() {
    if (falling && dinoY <= 0) {
        dinoY = 0;
        falling = false;
        return;
    }
    requestAnimationFrame(jump);
    if (dinoY < 90 && !falling) {
        dinoY += 1.7;
        dino.style.bottom = `${dinoY}px`;
    } else {
        falling = true;
        dinoY -= 1.4;
        dino.style.bottom = `${dinoY}px`;
    }
}

export function dinoRun(time) {
    if (time - dinoTime > 200) {
        index++;
        if (index > dinoAnimation.length - 1) index = 0;
        dino.style.backgroundImage = `url(../Sprite/${dinoAnimation[index]})`;
        dinoTime = time;
    }
}
