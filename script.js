var setButtons = document.querySelectorAll('.settings__button');
var canvas = document.querySelector('.canvas');
let gridCount = 16;

canvas.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridCount}, 1fr)`;

for (let i = 0; i < gridCount*gridCount; i++) {
    let canvasPixel = document.createElement('div');
    canvasPixel.classList.add('canvas--gridlines');

    canvas.appendChild(canvasPixel);
}







