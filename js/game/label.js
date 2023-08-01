class Label {
    constructor(game, text) {
        this.game = game
        this.text = text
        this.fontSize = 50
        this.color = 'black'
        this.x = 270
        this.y = 50
        this.visible = true
    }

    hide() {
        this.visible = false
    }

    update() {

    }

    draw() {
        if (!this.visible) {
            return
        }
        this.game.context.fillStyle = this.color
        this.game.context.font = `${this.fontSize}px sans-serif`
        this.game.context.fillText(this.text, this.x, this.y)
    }
}
