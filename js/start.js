export function init(ctx, canvas) {
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fill();
    ctx.font = '30px "Kiwi Maru"';
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Get Birdy as far as you can", canvas.width / 2, canvas.height / 2);
    ctx.fillText("Click to start", canvas.width / 2, canvas.height / 2 + 40);
}