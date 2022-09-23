"use strict";

export function movePlayer(player, e) {
  player.center = {x: e.clientX, y: e.clientY}
  // console.log(e, player.center)  
}

export function moveBall(player, ball) {

}

export function moveEnemies(player, ball, enemies) {

}

export function takeDamage(entity, damage) {
  entity.health > damage && !entity.invincible ? entity.health -= damage : kill(entity)
  
  if (entity instanceof Player) {
    entity.invincible = true;
    setTimeout((entity) => {entity.invincible = false}, 250)
  }
}


