var setButtons = document.querySelectorAll('.settings__button');
var setSlider = document.querySelector('.settings__slider');
var setSwatch = document.querySelector('.settings__colorpicker');
var paletteSwatch = document.querySelectorAll('.colorpicker--palette');
var setSliderInfo = document.querySelector('.settings__slider--info');
var canvas = document.querySelector('.canvas');
let sliderValue = 16;
let gridSize = 256;
let currentMode = 'Draw';

let mouseDrag = false;
document.body.onmousedown = () => mouseDrag = true;
document.body.onmouseup = () => mouseDrag = false;

function colorPixels(e) {
    if (mouseDrag !== true && e.type !== 'mousedown') {
        return;
    }

    let color;
    switch (true) {
        case (currentMode === 'Draw'): 
            color = setSwatch.value;
            break;

        case (currentMode === 'Rainbow'):
            color = randomColor();
            break;

        case (currentMode === 'Eraser'):
            color = 'transparent';
            break;
    }

    e.target.style.backgroundColor = color; 
}

function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let color = `rgb(${r},${g},${b})`;
    return color;
}

function clearCanvas() {
    canvas.replaceChildren();
    populateCanvas();
}

function updateCanvas() {
    sliderValue = setSlider.value;
    gridSize = sliderValue*sliderValue;
    initCanvasCells();
    clearCanvas();
}

function populateCanvas() {
    for (let i = 0; i < gridSize; i++) {
        let canvasPixel = document.createElement('div');
        canvasPixel.classList.add('canvas--gridlines');
        canvasPixel.addEventListener('mouseover', colorPixels);
        canvasPixel.addEventListener('mousedown', colorPixels);
        canvas.appendChild(canvasPixel);
    }
}

function initCanvasCells() {
    canvas.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`;
}

function initSettings() {
    setButtons[0].onclick = () => currentMode = 'Draw';
    setButtons[1].onclick = () => currentMode = 'Rainbow';
    setButtons[2].onclick = () => currentMode = 'Eraser';
    setButtons[3].onclick = () => clearCanvas();   
    setSwatch.oninput = () => colorPixels();

    for (let i = 0; i < paletteSwatch.length; i++) {
        paletteSwatch[i].addEventListener('input', () => {
            setSwatch.value = paletteSwatch[i].value;
            editSliderColor();
        });

        paletteSwatch[i].addEventListener('click', () => {
            if (paletteSwatch[i].value !== '#ffffff'){
                setSwatch.value = paletteSwatch[i].value;
                editSliderColor();
            }
        });                                   
    }

    /* updating the slider info needs a different event handler since
    the updateCanvas function lags when triggered on 'input'*/
    setSlider.addEventListener('change', () => updateCanvas());
    setSlider.addEventListener('input', () => {
        sliderValue = setSlider.value;
        setSliderInfo.innerHTML = `${sliderValue} x ${sliderValue}`;
    });   
}

initCanvasCells();
initSettings();
populateCanvas();








/* --------------------MISC. ANIMATIONS------------------------------------*/



// Rotating Rainbow Button
setButtons[1].addEventListener('mouseover', () => 
setButtons[1].classList.add('rotate'));

setButtons[1].addEventListener('animationend', () => 
setButtons[1].classList.remove('rotate'));

// Dynamic Slider Color
setSlider.addEventListener('input', () => editSliderColor());

function editSliderColor() {
    var value = (setSlider.value-setSlider.min)/(setSlider.max-setSlider.min)*100;
    setSlider.style.background = `linear-gradient(to right, ${setSwatch.value} 0%, ${setSwatch.value} ${value}%, white ${value}%, white 100%)`;
}

// Color Palette History
setSwatch.addEventListener('change', () => editPalette());
setSwatch.addEventListener('input', () => editSliderColor());

let paletteCounter = 0;

function editPalette() {
    if (paletteCounter == paletteSwatch.length) {
        paletteCounter = 0;
    }
    
    paletteSwatch[paletteCounter].value = setSwatch.value;
    paletteCounter++;
}

