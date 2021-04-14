const crash = new Image();
crash.src = 'img/crash.png';

export function handleCollisions(player, towers, canvas, ctx) {
    for (let i = 0; i < towers.length; i++){
        if(player.x < towers[i].x + towers[i].width && // (if player is between right side 
            player.x + player.width > towers[i].x && // and left side of the tower)
            ((player.y < 100 + towers[i].top && player.y + player.height > 0) || // AND (player is between the bottom of the top tower and the top of the game screen 
            // OR
            (player.y + player.height > canvas.height - towers[i].bottom &&  // player is between the top of the bottom tower  
                player.y + player.height < canvas.height))) { // and the bottom of the game screen)
                    ctx.drawImage(crash, player.x, player.y - player.height/2, 50, 50);
                    return true;
                }
    }
}