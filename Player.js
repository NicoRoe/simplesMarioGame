import { removeEnemy, gameOver } from "./game.js";

export default class Player {    
    constructor(canvas, playerImageRight ,playerImageLeft, ) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.groundLevel = this.canvas.height - 40; 
        this.x = 100;
        this.y = this.groundLevel - 90;
        this.width = 60;
        this.height = 90;
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 5;
        this.jumpPower = -10;
        this.isJumping = false;
        this.jumpCount = 0;
        this.maxJumps = 2;
        this.facingRight = true;
        this.lives = 1000; // Anzahl der Leben des Spielers
        this.gravity = 0.5;        
        this.playerImageRight = playerImageRight;
        this.playerImageLeft = playerImageLeft; 

        this.score = 0;

    }

    draw() {
        const image = this.facingRight ? this.playerImageRight : this.playerImageLeft;
        this.ctx.drawImage(image, this.x, this.y, this.width, this.height);

    };
    update() {
        this.x += this.velocityX;
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Spieler darf nicht unterhalb des neuen Bodenniveaus sein
        if (this.y + this.height >= this.groundLevel) {
            this.y = this.groundLevel - this.height;
            this.isJumping = false;
            this.velocityY = 0;
            this.jumpCount = 0;
        }

        // Spieler darf nicht außerhalb des Canvas laufen
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > this.canvas.width) this.x = this.canvas.width - this.width;
    };
    checkCollisionWithEnemy(enemy) {
        // Prüfe auf Kollision mit einem Gegner
/*         console.log(this.x);
        console.log(enemy.x); */
        if (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.y + this.height > enemy.y) {

            if (this.y + this.height - this.velocityY <= enemy.y + 10) {
                // Spieler springt auf den Gegner (von oben)
                console.log('Gegner besiegt!');
                this.velocityY = this.jumpPower;
                removeEnemy(enemy);
                this.score++; // Erhöhe den Score um 1, wenn ein Gegner besiegt wird
            } else {
                // Spieler kollidiert seitlich oder unten mit dem Gegner
                this.lives -= 1;
                console.log('Spieler getroffen! Leben reduziert.');

                // Gegner umkehren
                enemy.velocityX = -enemy.velocityX;

                if (this.lives <= 0) {
                    console.log('Game over');
                    gameOver();
                } 
            }
        }
    }
}