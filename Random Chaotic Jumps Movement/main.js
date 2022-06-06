/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const GAME_WIDTH = canvas.width = 500
const GAME_HEIGHT = canvas.height = 1000

let gameFrame = 0

function createImage(route){
    const image = new Image()
    image.src = route

    return image
}

function spawnEnemies(){
    const enemies = []
    for(let i = 0; i < 50; ++i){
        enemies.push(
            new Enemy({
                image: createImage('../assets/enemy1.png')
            })
        )
    }

    return enemies
}

class Enemy{
    constructor({image}){
        // this.speed = Math.random() * 4 - 1
        this.image = image
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.width = this.spriteWidth / 2.5
        this.height = this.spriteHeight / 2.5
        this.x = Math.random() * (canvas.width - this.width)
        this.y = Math.random() * (canvas.height - this.height)
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)
    }

    draw(ctx){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }

    update(){
        this.x += Math.random() * 5 - 2.5
        this.y += Math.random() * 3 - 1.5
        
        if(gameFrame % this.flapSpeed == 0){
            this.frame < 5 ? this.frame++ : this.frame = 0
        }
    }
}

class Game{
    constructor(){
        this.enemies = spawnEnemies()
    }

    draw(ctx){
        [...this.enemies].forEach(object => object.draw(ctx))
    }

    update(){
        [...this.enemies].forEach(object => object.update())
    }
}

const game = new Game()

function animate(){
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
    game.update()
    game.draw(ctx)

    gameFrame++
    requestAnimationFrame(animate)
}

animate()