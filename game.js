// global vars
let enemiesList = []
  , gameIsLost = false
  , player = document.createElement('canvas');
  
  spawnPlayer();
  spawnEnemy(
    Math.round(Math.random()) * window.innerWidth,
    Math.round(Math.random()) * window.innerHeight,
    20);

// enemy logic

function spawnEnemy(startPosX, startPosY, radius, health = 10, speed = 1) {
  let enemy = document.createElement('canvas');
  enemy.health = health;
  enemy.speed = speed;

  enemy.setAttribute('style', `
    display: inline-block;

    width: ${2 * radius}px;
    height: ${2 * radius}px;

    position: absolute;
    left: ${startPosX - radius}px;
    top: ${startPosY - radius}px;

    box-shadow: 0px 0px ${radius / 4}px ${radius / 10}px red;

    border-radius: 50%;`);

  let ctx = enemy.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, enemy.width, enemy.height);

  document.body.appendChild(enemy);

  enemiesList.push(enemy);
}

function moveTowardPlayer(enemy) {
  let angle = Math.atan2(
    (player.offsetTop + player.height / 2) - (enemy.offsetTop + enemy.height / 2),
    (player.offsetLeft + player.width / 2) - (enemy.offsetLeft + enemy.width / 2)
  );
  enemy.style.top = `${ enemy.offsetTop + Math.sin(angle) * enemy.speed }px`;
  enemy.style.left = `${ enemy.offsetLeft + Math.cos(angle) * enemy.speed }px`;
}

function checkCollision (entity1, entity2) {
  let distance = Math.hypot(
    (entity2.offsetTop + entity2.height / 2) - (entity1.offsetTop + entity1.height / 2),
    (entity2.offsetLeft + entity2.width / 2) - (entity1.offsetLeft + entity1.width / 2)
  );
  console.log(distance);
  console.log(entity1.width, entity2.height);
  if (distance < entity1.width + entity2.height) {gameIsLost = true;};
}

function doEnemyActions () {
  for (let enemy of enemiesList) {
    moveTowardPlayer(enemy);
    console.log(enemy.width, player.height);
    checkCollision(enemy, player);
    // check for ball and kill stuff
  }
}


// player logic

function spawnPlayer() {
  player.health = 3;

  player.setAttribute('style', `
    display: inline-block;
    
    width: 20px;
    height: 20px;
    
    position: absolute;
    left: ${window.innerWidth / 2 - 10}px;
    top: ${window.innerHeight / 2 - 10}px;

    border-radius: 50%;`)

  let ctx = player.getContext('2d');
  ctx.fillStyle = 'rgb(57,255,20)';
  ctx.fillRect(0, 0, player.width, player.height);

  document.body.appendChild(player)
};

const stuff = e => {
  player.style.left = `${e.clientX - 10}px`;
  player.style.top = `${e.clientY - 10}px`;
  
  doEnemyActions();
  if (gameIsLost) { document.body.removeEventListener('mousemove', stuff) };
};

document.body.addEventListener('mousemove', stuff);

// game loop stuff

// let gameTime = 0
//   , gameLoop = setInterval(main, 1000 / 60)

// function main() {
//   if (gameIsLost) { clearInterval(gameLoop) };
//   gameTime++;

//   if (gameTime % 60 === 0) {
//     spawnEnemy(
//       Math.round(Math.random()) * window.innerWidth,
//       Math.round(Math.random()) * window.innerHeight,
//       20)
//   }

// handle enemy logic first?
/* 
spawn enemy every x amount of cycles 
move them towards player
if they intersect with ball, take damage
if they intersect with player, do damage
if no health, kill
*/

// then player/ball stuff
/*
move player to cursor position
calc force from player to ball, add to ball velocity and move ball (in that order maybe)
die when enemy touches you (?)
*/
  