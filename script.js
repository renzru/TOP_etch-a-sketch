var setButtons = document.querySelectorAll('.settings__button');
var canvas = document.querySelector('.canvas');
let gridCount = 16;
let gridTotal = gridCount*gridCount;

canvas.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
canvas.style.gridTemplateRows = `repeat(${gridCount}, 1fr)`;

setButtons[0].addEventListener('click', () => editPixel('#303030'));
setButtons[2].addEventListener('click', () => editPixel('transparent'));
setButtons[3].addEventListener('click', () => clearCanvas());

function populateCanvas() {
    for (let i = 0; i < gridTotal; i++) {
        let pixelPop = document.createElement('div');
        pixelPop.classList.add('canvas--gridlines');
    
        canvas.appendChild(pixelPop);
    }
    editPixel('#303030');
}

function editPixel(color) {
    let canvasPixels = canvas.childNodes;

    for (let i = 0; i < gridTotal; i++){
        console.log(canvasPixels[i])
        canvasPixels[i].addEventListener('mouseover', () => {
            canvasPixels[i].style.backgroundColor = `${color}`;
        });
    }
}

function clearCanvas() {
    canvas.replaceChildren();
    populateCanvas();
}

populateCanvas();







