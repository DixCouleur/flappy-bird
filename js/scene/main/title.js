class Title extends Sprite {
    constructor(game) {
        super(game, 'title')
        this.game = game
        this.x = 100
        this.y = 150
        this.alive = true
    }

    kill() {
        this.alive = false
    }

    draw() {
        if (this.alive) {
            super.draw()
        }
    }

}
