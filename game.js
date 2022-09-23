"use strict";

import * as Physics from '/physics.js'
import * as Render from '/render.js'


class Player {
  constructor() {
    this.center = {x: 50, y: 50};
    this.radius = 20;
    this.health = 10;
    this.invincible = false;
  }
}


class Ball {
  constructor() {
    this.center = {x: 50, y: 50};
    this.radius = 20;
    this.speed = 1;
  }
}


class Enemy {
  constructor(center, radius, speed) {
    this.center = center;
    this.radius = radius;
    this.speed = speed;
    this.health = 20;
  }
}


const main = {
  player : new Player(),
  ball : new Ball(),
  enemies : [],
  screen : createScreen({
    height: window.innerHeight, 
    width: window.innerWidth}),

  }
// const gameID = setInterval(gameLoop, 1000, main)

const moooove = Physics.movePlayer.bind(null, main.player)
document.body.addEventListener('mousemove', moooove)

function gameLoop(main) {
  const { player, ball, enemies } = main
  if (player.health === 0) { endGame(gameID) }

  Physics.moveBall(player, ball)
  Physics.moveEnemies(player, ball, enemies)

  Render.draw(main)
}
gameLoop(main)

function createScreen({height, width}) {
  const screen = document.createElement("canvas")
  screen.height = height
  screen.width = width
  return screen
}


function endGame(gameID) {
  console.log('You Lose!')
  displayHighscore()
  // send score info and name to database?
  clearInterval(gameID)
}