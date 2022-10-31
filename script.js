var setButtons = document.querySelectorAll('.settings__button');
var setSlider = document.querySelector('.settings__slider');
var setSwatch = document.querySelector('.settings__colorpicker');
var paletteSwatch = document.querySelectorAll('.colorpicker--palette');
var setSliderInfo = document.querySelector('.settings__slider--info');
var setModal = document.querySelector('.content__modal-background');
var modalContent = document.querySelector('.modal__display-content');
var modalClose = document.querySelector('.modal__close-button')
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
    setButtons[4].onclick = () => {
        setModal.classList.remove('hide');
        modalContent.classList.remove('hide');
        modalContent.classList.add('show-modal');
    };   
}

initCanvasCells();
initSettings();
populateCanvas();

// MEDIA QUERY A DEVICE WIDTH OF 1000

/* --------------------MISC. ANIMATIONS------------------------------------*/

// Modal
modalClose.onclick = () => {
    modalContent.classList.add('close-modal');

    setTimeout(() => {
        setModal.classList.add('hide')
        modalContent.classList.add('hide')
        modalContent.classList.remove('close-modal');
        modalContent.classList.remove('show-modal');
    }, 200);
}


// Slider Size Display
setSlider.addEventListener('change', () => updateCanvas());
setSlider.addEventListener('input', (e) => {
    setSliderInfo.innerHTML = `${e.target.value} x ${e.target.value}`;
});   

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

// Color Palette History - Swatch Updater
setSwatch.addEventListener('change', () => editPalette());
setSwatch.addEventListener('input', () => editSliderColor());

let paletteCounter = 0;

function editPalette() {
    if (paletteCounter == paletteSwatch.length) {
        paletteCounter = 0;
    } 

    paletteSwatch[paletteCounter].value = setSwatch.value;
    paletteSwatch[paletteCounter].classList.add('update-color');
    paletteCounter++;
}

// Color Palette History - Animations Updater
for (let i = 0; i < paletteSwatch.length; i++) {
    paletteSwatch[i].addEventListener('input', (e) => {
        setSwatch.value = e.target.value;
        editSliderColor();
    });

    paletteSwatch[i].addEventListener('animationend', (e) => {
        e.target.classList.remove('update-color');
    });

    paletteSwatch[i].addEventListener('click', (e) => {
        if (e.target.value !== '#ffffff'){
            setSwatch.value = e.target.value;
            editSliderColor();
        }
    });                                   
}

