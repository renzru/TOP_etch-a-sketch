var setButtons = document.querySelectorAll('.settings__button');
var setSlider = document.querySelector('.settings__slider');
var setSliderInfo = document.querySelector('.settings__slider--info');
var canvas = document.querySelector('.canvas');
let sliderValue = 16;
let gridTotal = 256;


function initGridCells() {
    canvas.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`;
}

function initSettings() {
    setButtons[0].addEventListener('click', () => editPixels('#303030'));
    setButtons[2].addEventListener('click', () => editPixels('transparent'));
    setButtons[3].addEventListener('click', () => clearCanvas());
    setSlider.addEventListener('input', () => updateCanvas());
}

function editPixels(color) {
    let canvasPixels = canvas.childNodes;
    
    for (let i = 0; i < gridTotal; i++){
        canvasPixels[i].addEventListener('mouseover', () => {
            canvasPixels[i].style.backgroundColor = `${color}`;
        })} 
}

function populateCanvas() {
    for (let i = 0; i < gridTotal; i++) {
        let pixelPop = document.createElement('div');
        pixelPop.classList.add('canvas--gridlines');

        canvas.appendChild(pixelPop);
    }
    editPixels('#303030');
}

function clearCanvas() {
    canvas.replaceChildren();
    populateCanvas();
}

function updateCanvas() {
    sliderValue = setSlider.value;
    setSliderInfo.innerHTML = `${sliderValue} x ${sliderValue}`;
    gridTotal = sliderValue*sliderValue;
    initGridCells();
    clearCanvas();
}

initGridCells();
initSettings();
populateCanvas();









