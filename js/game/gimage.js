class GImage {
    constructor(game, name, scale = 1) {
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width * scale
        this.h = this.texture.height * scale
        this.game = game
    }

    update() { }

    draw() {
        this.game.drawImage(this)
    }
}
