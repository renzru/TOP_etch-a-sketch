var setButtons = document.querySelectorAll('.settings__button');
var setSlider = document.querySelector('.settings__slider');
var setSwatch = document.querySelector('.settings__colorpicker');
var paletteSwatch = document.querySelectorAll('.colorpicker--palette');
var setSliderInfo = document.querySelector('.settings__slider--info');
var canvas = document.querySelector('.canvas');
let sliderValue = 16;
let gridSize = 256;
let mouseDrag = false;

document.body.onmousedown = () => mouseDrag = true;
document.body.onmouseup = () => mouseDrag = false;

initCanvasCells();
initSettings();
populateCanvas();

function colorPixels(color) {
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
    colorPixels(setSwatch.value);
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

function initCanvasCells() {
    canvas.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${sliderValue}, 1fr)`;
}

function initSettings() {
    setButtons[0].onclick = () => colorPixels(setSwatch.value);
    setButtons[2].onclick = () => colorPixels('transparent');
    setButtons[3].onclick = () => clearCanvas();   
    setSwatch.oninput = () => colorPixels(setSwatch.value);

    for (let i = 0; i < paletteSwatch.length; i++) {
        paletteSwatch[i].addEventListener('input', () => {
            editSliderColor()
            colorPixels(paletteSwatch[i].value)
            setSwatch.value = paletteSwatch[i].value;
        });

        paletteSwatch[i].addEventListener('click', () => {
            editSliderColor()
            colorPixels(paletteSwatch[i].value);
            if (paletteSwatch[i].value != '#ffffff'){
                setSwatch.value = paletteSwatch[i].value;
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

// Misc. Animations

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




