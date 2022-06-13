// To debug this code, open wixDefaultCustomElement.js in Developer Tools.

const IMAGE_URL = 'https://wix.to/vUBXBKU';
const H2_TEXT = 'This is a Custom Element MODIFIED BY JAMES ';
const H3_1_TEXT = 'View its code by clicking the Settings button and pasting the Server URL into a new browser tab.';
const H3_2_TEXT = 'Explore this code and use it as a reference to create your own element.';
const DEBUG_TEXT = 'Loading the code for Custom Element \'wix-default-custom-element\'. To debug this code, open wixDefaultCustomElement.js in Developer Tools.';


function particles() {
    /* particles animation
        inspired by the amazing tutorial by 'Franks Laboratory'
        https://youtu.be/d620nV6bp0A
    */

    // check parameters and use defaults as necessary
    checkParams();

    // read css colour variables from root element, set defaults as necessary
    let particleColour;
    let strokeColour;
    let strokeHoverColour;
    checkColours();

    // get canvas element, set context and size
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas1';
    canvas.width = '100%';
    canvas.style.width = '100%';
    const canvasContext = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;
    speed = (speed !== 0) ? (speed / 100) : 0; // index speed to base 100 = 1
    opacity = opacity / 100;

    // set overall canvas opacity
    canvas.style.opacity = opacity;

    // get mouse position
    let mousePosition = {
        x: undefined,
        y: undefined,
        radius: (canvas.height / 80) * (canvas.width / 80)
    };

    // add mouse position event listener
    window.addEventListener('mousemove', function (event) {
        mousePosition.x = event.x;
        mousePosition.y = event.y;
    });

    // create particle class
    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
        }
        // method to draw individual particles
        draw() {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            canvasContext.fillStyle = particleColour;
            canvasContext.fill();
        }
        // check particle position, mouse position, move particle and draw it
        update() {
            // check if particle.x is still within canvas
            if (noBounceH === true && speedH > 0) {
                if (this.x > canvas.width) {
                    this.x = 0;
                }
            }
            else if (noBounceH === true && speedH < 0) {
                if (this.x < 0) {
                    this.x = canvas.width;
                }
            }
            else {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
            }

            // check if particle.y is still within canvas
            if (noBounceV === true && speedV > 0) {
                if (this.y > canvas.height) {
                    this.y = 0;
                }
            }
            else if (noBounceV === true && speedV < 0) {
                if (this.y < 0) {
                    this.y = canvas.height;
                }
            }
            else {
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
            }

            // avoid the mouse if avoidMouse = true (default)
            if (avoidMouse) {
                let dx = mousePosition.x - this.x;
                let dy = mousePosition.y - this.y;
                let distance = Math.sqrt((dx * dx) + (dy * dy));
                if (distance < mousePosition.radius + this.size) {
                    let magnitude = (1 - (distance / mousePosition.radius))
                    if (mousePosition.x < this.x && this.x < canvas.width - this.size * 10) {
                        // this.x += magnitude * 10;
                        this.directionX -= magnitude * 0.2;
                    }
                    if (mousePosition.x > this.x && this.x > this.size * 10) {
                        // this.x -= magnitude * 10;
                        this.directionX += magnitude * 0.2;
                    }
                    if (mousePosition.y < this.y && this.y < canvas.height - this.size * 10) {
                        // this.y += magnitude * 10;
                        this.directionY -= magnitude * 0.2;
                    }
                    if (mousePosition.y > this.y && this.y > this.size * 10) {
                        // this.y -= magnitude * 10;
                        this.directionY += magnitude * 0.2;
                    }
                }
            }

            // move particle
            if (speed !== 0) {
                this.x += this.directionX * speed * speedH;
                this.y += this.directionY * speed * speedV;
            }

            this.directionX *= 0.999
            this.directionY *= 0.999

            // draw particle
            this.draw();
        }
    }

    // create particle array
    function init() {
        particlesArray = [];
        let numberOfParticles = canvas.width * 0.01;
        for (let i = 0; i < numberOfParticles * numParticles; i++) {
            let size = (Math.random() * sizeMultiplier) + 1;
            // set X
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            if (noBounceH) {
                directionX = Math.random() * 5;
            }
            else {
                directionX = (Math.random() * 5) - 2.5;
            }
            // set Y
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            if (noBounceV) {
                directionY = Math.random() * 5;
            }
            else {
                directionY = (Math.random() * 5) - 2.5;
            }


            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    // check if particles are close enough to connect to each other
    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / connectionDensity) * (canvas.height / connectionDensity)) {
                    opacityValue = 1 - (distance / 20000);

                    canvasContext.globalAlpha = opacityValue;
                    canvasContext.strokeStyle = strokeColour;
                    canvasContext.lineWidth = width;
                    canvasContext.beginPath();
                    canvasContext.moveTo(particlesArray[a].x, particlesArray[a].y);
                    canvasContext.lineTo(particlesArray[b].x, particlesArray[b].y);
                    canvasContext.stroke();
                }
            }
        }
    }

    // animation loop
    function animate() {
        requestAnimationFrame(animate);
        canvasContext.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        if (connections) {
            connect();
        }
    }

    // resize event
    window.addEventListener('resize', function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mousePosition.radius = ((canvas.height / 80) * (canvas.width / 80));
        init();
    });

    // mouse-out event (mouse leaving the window)
    window.addEventListener('mouseout', function () {
        mousePosition.x = undefined;
        mousePosition.y = undefined;
    });

    init();
    animate();

    function checkParams() {
        if (typeof opacity == 'undefined') {
            opacity = 100;
        }
        else if (Number.isFinite(opacity) && (0 <= opacity && opacity <= 100)) {
            opacity;
        }
        else {
            opacity = 100;
            console.log("'opacity' must be a finite number between 0 and 100. Using default of '100'.");
        };

        if (typeof numParticles == 'undefined') {
            numParticles = 10;
        }
        else if (Number.isFinite(numParticles)) {
            numParticles;
        }
        else {
            numParticles = 10;
            console.log("'numParticles' must be a finite number. Using default of '5'.");
        };

        if (typeof sizeMultiplier == 'undefined') {
            sizeMultiplier = 5;
        }
        else if (Number.isFinite(sizeMultiplier)) {
            sizeMultiplier;
        }
        else {
            sizeMultiplier = 5;
            console.log("'sizeMultiplier' must be a finite number. Using default of '5'.");
        };

        if (typeof width == 'undefined') {
            width = 1;
        }
        else if (Number.isInteger(width) && width > 0) {
            width;
        }
        else {
            width = 1;
            console.log("'width' must be an integer number of pixels greater than 0. Using default of '1'.");
        };

        if (typeof connections == 'undefined') {
            connections = true;
        }
        else if (typeof connections === 'boolean') {
            connections;
        }
        else {
            connections = true;
            console.log("'connections' must be either 'true' or 'false'. Using default of 'true'.");
        }

        if (typeof connectionDensity == 'undefined') {
            connectionDensity = (1 / 15) * 100;
        }
        else if (Number.isFinite(connectionDensity) && connectionDensity > 1) {
            connectionDensity = (1 / connectionDensity) * 100;
        }
        else {
            connectionDensity = (1 / 15) * 100;
            console.log("'connectionDensity' must be a finite number greater than 1. Using default of '15'.");
        }

        if (typeof noBounceH == 'undefined') {
            noBounceH = false;
        }
        else if (typeof noBounceH === 'boolean') {
            noBounceH;
        }
        else {
            noBounceH = false;
            console.log("'noBounceH' must be either 'true' or 'false'. Using default of 'false'.");
        }

        if (typeof noBounceV == 'undefined') {
            noBounceV = false;
        }
        else if (typeof noBounceV === 'boolean') {
            noBounceV;
        }
        else {
            noBounceV = false;
            console.log("'noBounceV' must be either 'true' or 'false'. Using default of 'false'.");
        }

        if (typeof speed == 'undefined') {
            speed = 20;
        }
        else if (Number.isInteger(speed) && (0 <= speed && speed <= 1000)) {
            speed;
        }
        else {
            speed = 50;
            console.log("'speed' must be an integer between 1-1000. Using default of '50'.");
        };

        if (typeof speedH == 'undefined') {
            speedH = 1;
        }
        else if (Number.isInteger(speedH) && (-1000 <= speedH && speedH <= 1000)) {
            speedH;
            speed = 1;
        }
        else {
            speedH = 1;
            console.log("'speedH' must be an integer between -1000 and 1000. Using default of '1'.");
        };

        if (typeof speedV == 'undefined') {
            speedV = 1;
        }
        else if (Number.isInteger(speedV) && (-1000 <= speedV && speedV <= 1000)) {
            speedV;
            speed = 1;
        }
        else {
            speedV = 1;
            console.log("'speedV' must be an integer between -1000 and 1000. Using default of '1'.");
        };

        if (typeof avoidMouse == 'undefined') {
            avoidMouse = true;
        }
        else if (typeof avoidMouse === 'boolean') {
            avoidMouse;
        }
        else {
            avoidMouse = true;
            console.log("'avoidMouse' must be either 'true' or 'false'. Using default of 'true'.");
        }

        if (typeof hover == 'undefined') {
            hover = true;
        }
        else if (typeof hover === 'boolean') {
            hover;
        }
        else {
            hover = true;
            console.log("'hover' must be either 'true' or 'false'. Using default of 'true'.");
        }
    }

    function checkColours() {
        if (getComputedStyle(document.documentElement).getPropertyValue('--col-particle').length === 0) {
            particleColour = '#999999';
            console.log("CSS variable '--col-particle' is not set. Using 'black' (#000000).");
        }
        else {
            particleColour = getComputedStyle(document.documentElement).getPropertyValue('--col-particle');
        }

        if (getComputedStyle(document.documentElement).getPropertyValue('--col-particle-stroke').length === 0) {
            strokeColour = '#999999';
            console.log("CSS variable '--col-particle-stroke' is not set. Using 'black' (#000000).");
        }
        else {
            strokeColour = getComputedStyle(document.documentElement).getPropertyValue('--col-particle-stroke');
        }

        if (hover === true && getComputedStyle(document.documentElement).getPropertyValue('--col-particle-stroke-hover').length === 0) {
            strokeHoverColour = '#ff0000';
            console.log("CSS variable '--col-particle-stroke-hover' is not set. Using 'red' (#ff0000).");
        }
        else {
            strokeHoverColour = getComputedStyle(document.documentElement).getPropertyValue('--col-particle-stroke-hover');
        }
    }

    return canvas
}

const createImage = () => {
    const imageElement = document.createElement('img');
    imageElement.src = IMAGE_URL;
    imageElement.id = 'wdce-image';
    return imageElement;
};

const createImageContainer = () => {
    const imageContainer = document.createElement('div');
    imageContainer.id = 'wdce-image-container';
    imageContainer.appendChild(createImage());
    return imageContainer;
};

const createCanvas = () => {
    canvas = particles(noBounceV = false, speedV = -100, speedH = -100, connections = true, avoidMouse = true, hover = false)
    return canvas;
};

const createStyle = () => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
    canvas{
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100%;
        background: #ffffff;
    }
    `;
    return styleElement;
};

class WixDefaultCustomElement extends HTMLElement {
    constructor() {
        super();
        console.log(DEBUG_TEXT);
        this.parentElement.style.width = "100% !important";
        this.style.width = "100% !important";
    }

    connectedCallback() {
        this.appendChild(createStyle());
        // this.appendChild(createImageContainer());
        this.appendChild(createCanvas());
    }
}
customElements.define('wix-default-custom-element', WixDefaultCustomElement);