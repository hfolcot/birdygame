
export function init(ctx, canvas, sprite) {
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgrey";
    ctx.fill();
    ctx.font = '30px "Kiwi Maru"';
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Get Kev the Kiwi as far as you can", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Click to start", canvas.width / 2, canvas.height / 2 + 40);
    ctx.drawImage(sprite, 0, 0, 250, 180, 250, 50, 250, 180);

}