import Player from "./Player.js";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const enemySpawnInterval = 3000; // Zeitintervall (in Millisekunden) für das Spawnen neuer Gegner


// Funktion zum Setzen der Canvas-Größe
function resizeCanvas() {
  canvas.width = window.innerWidth; // Setzt die Breite des Canvas auf die Fensterbreite
  canvas.height = window.innerHeight; // Setzt die Höhe des Canvas auf die Fensterhöhe
}

window.addEventListener('resize', resizeCanvas); // Setzt Canvas-Größe bei Größenänderung des Fensters
resizeCanvas(); // Initiale Größenanpassung




// --------------------------------Bilder laden und überprüfen, ob alle Bilder geladen sind-------------------------------------

const backgroundImage = new Image();
const cloud = new Image();

// --------------------------------Bilder laden und überprüfen, ob alle Bilder geladen sind-------------------------------------

let imagesLoaded = 0;
const totalImages = 8; // Hintergrund, Spieler (rechts, links), Wolke, Gegner usw.

function checkAllImagesLoaded() {
  imagesLoaded++;
  console.log(`Images loaded: ${imagesLoaded}/${totalImages}`);
  if (imagesLoaded === totalImages) {
    console.log("All images loaded, starting animation...");
    animate(); // Startet die Animation, wenn alle Bilder geladen sind
  }
}

// --------------------------------Hintergrundbild laden-------------------------------------

backgroundImage.src = 'assets/images/hintergrund.png';
backgroundImage.onload = checkAllImagesLoaded;

// --------------------------------Wolkenbild laden-------------------------------------

cloud.src = 'assets/images/wolke.png';
cloud.onload = checkAllImagesLoaded;

// --------------------------------Spielerbilder laden ---------------------------------------

const playerImageRight = new Image();
const playerImageLeft = new Image();

playerImageRight.src = 'assets/images/marioBig.png';
playerImageRight.onload = checkAllImagesLoaded;

playerImageLeft.src = 'assets/images/reverseMarioBig.png';
playerImageLeft.onload = checkAllImagesLoaded;

// ------------------------- Gegnerbild laden -----------------------------------

const enemyImage = new Image();
const enemyImageRight = new Image();

enemyImage.src = 'assets/images/gumbaBig.png';
enemyImage.onload = checkAllImagesLoaded;

enemyImageRight.src = 'assets/images/gumbaBigReversed.png';
enemyImageRight.onload = checkAllImagesLoaded;


//---------------------------- green Enemies -----------------------------------

const enemyImage2 = new Image();

enemyImage2.src = 'assets/images/green.png';
enemyImage2.onload = checkAllImagesLoaded;

//---------------------------- red Enemies -----------------------------------

const enemyImage3 = new Image();

enemyImage3.src = 'assets/images/red.png';
enemyImage3.onload = checkAllImagesLoaded;

// -------------------------------- PLAYER 1 --------------------------------------

const player1 = new Player(canvas, playerImageRight, playerImageLeft)


// --------------------------- Gegner-Objekte ----------------------------------- 

let enemies = [];
let greenEnemies = [];
let redEnemies = [];

// --------------------------- Spawnen neuer Gegner ------------------------------

function spawnEnemy() {
  const spawnSide = Math.random() < 0.5 ? 'left' : 'right';
  const enemy = {
    x: spawnSide === 'left' ? 0 : canvas.width,
    y: player1.groundLevel - 40,
    width: 50,
    height: 40,
    velocityX: spawnSide === 'left' ? 2 : -2,
    image: enemyImage
  };
  enemies.push(enemy);
}

/* function spawnStrongEnemy() {
  const spawnSide = Math.random() < 0.4 ? 'left' : 'right';
  const enemy = {
    x: spawnSide === 'left' ? 0 : canvas.width,
    y: player1.groundLevel - 40,
    width: 55,
    height: 45,
    velocityX: spawnSide === 'left' ? 2 : -3,
    image: enemyImage2
  };
  enemies.push(enemy);
}

function spawnStrongerEnemy() {
  const spawnSide = Math.random() < 0.2 ? 'left' : 'right';
  const enemy = {
    x: spawnSide === 'left' ? 0 : canvas.width,
    y: player1.groundLevel - 40,
    width: 60,
    height: 50,
    velocityX: spawnSide === 'left' ? 2 : -4,
    image: enemyImage3
  };
  enemies.push(enemy);
} */

// Startet das kontinuierliche Spawnen der Gegner
let enemySpawner = setInterval(spawnEnemy, enemySpawnInterval);

/* let enemySpawner2 = setInterval(spawnStrongEnemy, enemySpawnInterval);

let enemySpawner3 = setInterval(spawnStrongerEnemy, enemySpawnInterval); */

// Funktion zum Entfernen eines Gegners
function removeEnemy(enemy) {
  enemies.splice(enemies.indexOf(enemy), 1);
}

// ----------------------------------- GAME-OVER -----------------------------------------------

function gameOver() {
  alert('Game Over! Score: ' + player1.score); // Zeige den endgültigen Score an
  clearInterval(enemySpawner); // Stoppe das Spawnen neuer Gegner
  resetGame(); // Setze das Spiel zurück
}
 
// ------------------------------------- SPIEL-RESET -----------------------------------------------

function resetGame() {
  // Setze Spielerposition und Parameter zurück

  player1.x = 100;
  player1.y = player1.groundLevel - 90;
  player1.velocityX = 0;
  player1.velocityY = 0;
  player1.lives = 30;
  player1.isJumping = false;
  player1.jumpCount = 0;
  player1.facingRight = true;

  player1.score = 1000; // Setze den Score zurück

  // Entferne alle Gegner
  enemies = [];
  /*   strongEnemies = [];
    strongerEnemies = []; */

  // Starte den Gegner-Spawner neu
  enemySpawner = setInterval(spawnEnemy, enemySpawnInterval);
  enemySpawner2 = setInterval(spawnEnemy, enemySpawnInterval);
  enemySpawner3 = setInterval(spawnEnemy, enemySpawnInterval);
}

//  ------------------------------------------- CONTROLS -----------------------------------------------------------//

const keys = {
 /*  left: false,
  right: false,
  up: false, */
  a: false,
  d: false,
}; 

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyA') {
    keys.a = true; // Set keys.a to true when 'A' is pressed
    player1.facingRight = false;
  }
  if (event.code === 'KeyD') {
    keys.d = true; // Set keys.d to true when 'D' is pressed
    player1.facingRight = true;
  }
  if (event.code === 'Space') {
    player1.velocityY = player1.jumpPower;
    player1.isJumping = true;
    player1.jumpCount++;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === "KeyA") {
    keys.a = false; // Set keys.a to false when 'A' is released
  }
  if (event.code === "KeyD") {
    keys.d = false; // Set keys.d to false when 'D' is released
  }
});

//---------------------------------------------------------------------

/* document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    keys.left = true;
    player1.facingRight = false;
  }
  if (e.key === 'ArrowRight') {
    keys.right = true;
    player1.facingRight = true;
  }
  if ((e.key === 'ArrowUp' || e.key === 'Space') && player1.jumpCount < player1.maxJumps) {
    player1.velocityY = player1.jumpPower;
    player1.isJumping = true;
    player1.jumpCount++;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
}); */


//------------------------------- ALTERNATE CONTROLS -------------------------------------

/* document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    keys.left = true;
    player1.facingRight = false;
  }
  if (e.key === 'ArrowRight') {
    keys.right = true;
    player1.facingRight = true;
  }
  if ((e.key === 'ArrowUp' || e.key === 'Space') && player1.jumpCount < player1.maxJumps) {
    player1.velocityY = player1.jumpPower;
    player1.isJumping = true;
    player1.jumpCount++;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
}); */

function update() {
  player1.velocityX = 0;
  if (keys.a) player1.velocityX = -player1.speed;
  if (keys.d) player1.velocityX = player1.speed;

  player1.update();

  enemies.forEach((enemy) => {
    enemy.x += enemy.velocityX;

    if (enemy.x + enemy.width < 0 || enemy.x > canvas.width) {
      removeEnemy(enemy);
    }

    player1.checkCollisionWithEnemy(enemy);
  });
}

// ------------------------------------- draw function -------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(cloud, 100, 100, 100, 60);
  ctx.drawImage(cloud, 300, 150, 150, 90);
  ctx.drawImage(cloud, 600, 50, 120, 70);

  enemies.forEach((enemy) => {
    ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
  });

  player1.draw();

  // ----------------------------------- Lebenszähler ----------------------------------------
  ctx.fillStyle = 'black';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center'; // Set the text alignment to center
  ctx.fillText('Leben: ' + player1.lives, canvas.width / 2, 40); // Draw the text at the center of the canvas

  // ---------------------------------- Zeichne den Score ------------------------------------
  ctx.fillText('Score: ' + player1.score, canvas.width / 2, 90); // Draw the text at the center of the canvas with a gap of 50 pixels
}

function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}

export { removeEnemy, gameOver }