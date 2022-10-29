var setButtons = document.querySelectorAll('.settings__button');
var setSlider = document.querySelector('.settings__slider');
var setSliderInfo = document.querySelector('.settings__slider--info');
var canvas = document.querySelector('.canvas');
let sliderValue = 16;
let gridSize = 256;
let mouseDrag = false;

document.body.onmousedown = () => mouseDrag = true;
document.body.onmouseup = () => mouseDrag = false;

function initGridCells() {
    canvas.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`;
}

function initSettings() {
    setButtons[0].onclick = () => editPixels('#303030');
    setButtons[2].onclick = () => editPixels('transparent');
    setButtons[3].onclick = () => clearCanvas();

    /* updating the slider info needs a different event handler since
    the updateCanvas function lags when triggered on 'input'*/
    setSlider.addEventListener('change', () => updateCanvas());
    setSlider.addEventListener('input', () => {
        sliderValue = setSlider.value;
        setSliderInfo.innerHTML = `${sliderValue} x ${sliderValue}`;
    })
}

function editPixels(color) {
    let canvasPixels = canvas.childNodes;
    
    for (let i = 0; i < gridSize; i++){

        canvasPixels[i].onclick = () => {
            canvasPixels[i].style.backgroundColor = `${color}`;
        }

        canvasPixels[i].onmouseover = () => {
            if (mouseDrag == true) {
                canvasPixels[i].style.backgroundColor = `${color}`;
            }
        }
    } 
}

function populateCanvas() {
    for (let i = 0; i < gridSize; i++) {
        let canvasPixel = document.createElement('div');
        canvasPixel.classList.add('canvas--gridlines');

        canvas.appendChild(canvasPixel);
    }
    editPixels('#303030');
}

function clearCanvas() {
    canvas.replaceChildren();
    populateCanvas();
}

function updateCanvas() {
    sliderValue = setSlider.value;
    gridSize = sliderValue*sliderValue;
    initGridCells();
    clearCanvas();
}

initGridCells();
initSettings();
populateCanvas();









