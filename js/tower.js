const towerTopImg = new Image();
const towerBottomImg = new Image();
towerTopImg.src = 'img/toptower.png';
towerBottomImg.src = 'img/bottomtower.png';

export class Tower {
    constructor(canvas) {
        this.top = (Math.random() * canvas.height / 3) + 20; // height of top tower
        this.bottom = (Math.random() * canvas.height / 3) + 20; // height of bottom tower
        this.x = canvas.width;
        this.ogWidth = 1000;
        this.ogHeight = 1508;
        this.width = Math.floor((Math.random() * 100) + 50);
        //this.color = 'green';
        this.canvas = canvas;
    }
    draw(ctx) {
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, 100, this.width, this.top); // top tower hit box
        //ctx.fillRect(this.x, this.canvas.height - this.bottom, this.width, this.bottom) // bottom tower hit box
        //ctx.drawImage(image var, image crop x start, image crop y start, image crop x end, image crop y end, x position, y position, width, height);
        ctx.drawImage(towerTopImg, 0, 0, this.ogWidth, this.ogHeight, this.x, 100, this.width * 1.3, this.top);// draw top tower
        ctx.drawImage(towerBottomImg, 0, 0, this.ogWidth, this.ogHeight, this.x, this.canvas.height - this.bottom, this.width * 1.3, this.bottom);// draw bottom tower
    }
    update(gameSpeed, level, ctx) {
        this.x -= gameSpeed + level; 
        this.draw(ctx);
    }
}

export function handleTowers(canvas, hue, frame, towers, gameSpeed, level, ctx) {
    
    if(!towers.length || towers.length && towers[0].x < 600) {
        let newTower = new Tower(canvas);
        towers.unshift(newTower);
    }
    for(let i = 0; i < towers.length; i++) {
        towers[i].update(gameSpeed, level, ctx);
    }
    if (towers.length > 20) {
        towers.pop(towers[0]);
    }
}