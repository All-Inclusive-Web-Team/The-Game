"use strict";

import * as Physics from '/physics.js'
import * as Render from '/render.js'


class Player {
  constructor() {
    this.center = {x: 50, y: 50};
    this.radius = 20;
    this.health = 10;
    this.invincible = false; 
    // dis to give player some i-frames after getting hit
    // more on that in Physics.takeDamage
  }
}


// multiple balls/modify existing ball as a powerup mechanic?
class Ball {
  constructor() {
    this.center = {x: 50, y: 50};
    this.radius = 20;
    this.velocity = {x: 0, y: 0}; // dis a vector
  }
  get damage() {
    return Physics.speedFromVel(...Object.values(this.velocity))
  }
}

// could do smth like varying enemy sizes, the larger the harder-hitting but also slower (?)
class Enemy {
  constructor(center, radius, speed = 1, health = 20) {
    this.center = center;
    this.radius = radius;
    this.speed = speed;
    this.health = health;
    this.insideBall = false;
    // dis is so ball only hits once per pass through of enemy
  }
}


const initVars = {
  player : new Player(),
  ball : new Ball(),
  enemies : [],
  screen : createScreen({
    height: window.innerHeight, 
    width: window.innerWidth}),
  }


// placeholder so gameLoop doesn't start
let gameID;
false ? gameID = setInterval(gameLoop, 1000, main) : {}

// same thing
const moveThisPlayer = Physics.movePlayer.bind(null, initVars.player)
false ? document.body.addEventListener('mousemove', moveThisPlayer) : {}


function gameLoop(initVars) {
  const { player, ball, enemies, screen } = initVars
  
  Physics.moveBall(player, ball)
  
  for (const enemy of enemies) {
    Physics.moveEnemy(player, enemy)
    
    if (Physics.distanceBetween(player, enemy) < player.radius + enemy.radius) {
      Physics.takeDamage(player, enemy.damage)}
      
    if (Physics.distanceBetween(enemy, ball) < enemy.radius + ball.radius && !enemy.insideBall) {
      Physics.takeDamage(enemy, ball.damage)
      enemy.insideBall = true
    } else {
      enemy.insideBall= false
    }
  }
  enemies = enemies.filter(enemy => enemy.health > 0)
  
  Render.draw(initVars)

  if (player.health <= 0) { endGame(gameID) }
}


function createScreen({height, width}) {
  const screen = document.createElement("canvas")
  screen.height = height
  screen.width = width
  return screen
}


function endGame(gameID) {
  console.log('You Lose!')
  // display lose message on screen, temp console log for now 
  displayHighscore()
  // send score info and name to database?
  clearInterval(gameID)
}

function displayHighscore() {}