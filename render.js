'use strict';

export function draw(initVars) {
  const { player, ball, enemies, screen } = initVars
  clearScreen(screen)

  // draw player, ball, enemies, and also the tether between player and ball
  // after those, maybe like damage effects/numbers, other vfx, idk
}

function drawEntity(screen, entity) {
  const { center, radius } = entity
  let ctx = screen.getContext('2d')
  ctx.fillStyle = '#000000' // dis is color black
  ctx.beginPath()
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
  ctx.fill()
}

function clearScreen(screen) {
  const ctx = screen.getContext('2d')
  ctx.clearRect(0, 0, screen.width, screen.height)
}