const canvas = document.getElementById('canvas1');
const drawing = new Image();
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const imageSizeX = 400;
const imageSizeY = 400;


window.addEventListener('load', (event) => {
    console.log('page has loaded');
    textCoordinates = ctx.getImageData(0, 0, imageSizeX, imageSizeY);
    let particleArray = [];
    let adjustX = 10;
    let adjustY = 10;

    // handle mouse
    const mouse = {
        x: null,
        y: null,
        radius: 50
    }

    window.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse.x, mouse.y);
    })


    // ctx.fillStyle = 'white'
    // ctx.font = '30px Verdana';
    // ctx.fillText('A', 0, 40);


    class Particle {
        constructor(x, y, colour) {
            this.x = x;
            this.y = y;
            this.size = 2;
            this.colour = colour
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
        }
        draw() {
            //toDo: make this a lil bacteria/virus shape
            let dx = this.baseX - this.x;
            let dy = this.baseY - this.y;
            let distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
            let opacity = 1 - (distanceFromOrigin / 40)
            ctx.fillStyle = this.colour.slice(0, -1) + "," + opacity + ")";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let maxDistance = mouse.radius;
            let force = (maxDistance - distance) / maxDistance;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;

            if (distance < mouse.radius) {
                this.x -= directionX;
                this.y -= directionY;
            } else {
                if (this.x !== this.baseX) {
                    let dx = this.x - this.baseX;
                    this.x -= dx / 5
                }
                if (this.y !== this.baseY) {
                    let dy = this.y - this.baseY;
                    this.y -= dy / 5
                }
            }
        }
    }

    function init() {
        particleArray = [];
        for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
            if (y % 3 == 0){
                for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
                    if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                        let positionX = x + adjustX;
                        let positionY = y + adjustY;
                        let colour = "rgb(" + textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4)] + "," + textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 1] + "," + textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 2] + ")";
                        particleArray.push(new Particle(positionX, positionY, colour));
                    }
                }
            }
        }
    }
    init()

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connect(particleArray);
        for (let i = 0; i < particleArray.length; i++) {
            particleArray[i].draw();
            particleArray[i].update();
        }
        requestAnimationFrame(animate);
    }
    animate()

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particleArray.length; a++) {
            for (let b = a; b < particleArray.length; b++) {
                let mxa = mouse.x - particleArray[a].x
                let mya = mouse.y - particleArray[a].y
                let distanceMouse = Math.sqrt(mxa * mxa + mya * mya);
                if (distanceMouse < mouse.radius){
                    if (a % 30 == 0) {
                        let dx = particleArray[a].x - particleArray[b].x;
                        let dy = particleArray[a].y - particleArray[b].y;
                        let distance = Math.sqrt(dx * dx + dy * dy);
                        opacityValue = 0.5 - (distance / 80);
                        if (distance < 40) {
                            // console.log(distance)
                            ctx.strokeStyle = 'rgba(203, 51, 147,' + opacityValue + ')';
                            ctx.lineWidth = 2;
                            ctx.beginPath();
                            ctx.moveTo(particleArray[a].x, particleArray[a].y);
                            ctx.lineTo(particleArray[b].x, particleArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }
    }
}
);


drawing.src = "data:image/png;base64,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";

drawing.onload = function () {
    ctx.drawImage(drawing, 0, 0, imageSizeX, imageSizeY);
};
