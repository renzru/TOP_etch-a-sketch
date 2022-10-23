var canvas = document.querySelector('.canvas');
let gridCount = 16;

canvas.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridCount}, 1fr)`;

let mouseDrag = false;
canvas.onmousedown = () => mouseDrag = true;
canvas.onmouseup = () => mouseDrag = false;

function fillCanvas() {

    for (let i = 0; i < gridCount*gridCount; i++){

        let canvasPixel = document.createElement('div');
        canvasPixel.classList.add('canvas--gridlines');

        canvasPixel.addEventListener('click', () => {
            canvasPixel.classList.add('canvas__pixel');
            canvasPixel.classList.remove('canvas--gridlines');
        });
        
        canvasPixel.addEventListener('mouseover', () => {
            if (mouseDrag == true) {
                canvasPixel.classList.add('canvas__pixel');
                canvasPixel.classList.remove('canvas--gridlines');
            }
        });

        canvas.appendChild(canvasPixel);
    }
}

function resetCanvas() {
    canvas.innerHTML = '';
}


fillCanvas();


