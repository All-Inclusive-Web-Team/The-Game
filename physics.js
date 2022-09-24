"use strict";

export function movePlayer(player, e) {
  player.center = {x: e.clientX, y: e.clientY}
}

export function moveBall(player, ball) {
  let dist = distanceBetween(player, ball)
  ball.velocity.x += (player.center.x - ball.center.x) * dist
  ball.velocity.y += (player.center.y - ball.center.y) * dist
  ball.center.x += ball.velocity.x
  ball.center.y += ball.velocity.y
}

export function moveEnemy(player, enemy) {
    let angle = angleBetween(enemy, player)
    enemy.center.x += Math.cos(angle) * enemy.speed
    enemy.center.y += Math.sin(angle) * enemy.speed
}

export function takeDamage(entity, damage) {
  if (!entity.invincible) {entity.health -= damage}
  
  if (entity instanceof Player) {
    entity.invincible = true;
    setTimeout(entity => entity.invincible = false, 250)
  }
}


// Not implemented
export function kill(entity) {}


export function distanceBetween(origin, target) {
  return Math.hypot(
    origin.center.x - target.center.x,
    origin.center.y - target.center.y)
}

export const speedFromVel = distanceBetween

export function angleBetween(origin, target) {
  return Math.atan2(
    target.center.x - origin.center.x,
    target.center.y - origin.center.y)
}