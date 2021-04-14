const sprite = new Image();
sprite.src = 'img/animsheet.png';

export default class Player {
    constructor() {
        this.x = 150,
            this.y = 200,
            this.vy = 0,
            this.ogWidth = 250,
            this.ogHeight = 180,
            this.width = this.ogWidth / 5,
            this.height = this.ogHeight / 5,
            this.weight = 1,
            this.frameX = 0
    }
    update(canvas, mouseDown, angle, frame) {
        let curve = Math.sin(angle) * 20;
        if (this.y > canvas.height - (this.height * 4) + curve) {
            this.y = canvas.height - (this.height * 4) + curve;
            this.vy = 0;
        } else {
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        if (this.y < 0 + (this.height)) {
            this.y = 0 + (this.height);
            this.vy = 0;
        }
        if (mouseDown && this.y > this.height * 4) {
            this.flap(frame);
        }
    }
    draw(ctx) {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height); //Hit box
        ctx.drawImage(sprite, this.frameX * this.ogWidth, 0, this.ogWidth, this.ogHeight, this.x -20, this.y -12, this.width * 1.7, this.height * 1.7);
    }
    flap(frame) {
        this.vy -= 2;
        if(this.frameX >= 3){
            this.frameX = 0;
        } else if (frame % 3 === 0){
            this.frameX++;
        }
    }
}