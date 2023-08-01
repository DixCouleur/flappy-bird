class ScoreBoard {
    constructor(game, score) {
        this.game = game
        this.score = score

        this.bg = new Sprite(game, 'scoreboard')
        this.bg.x = 70
        this.bg.y = 150

        this.scoreLabel = new Label(this.game, this.score)
        this.scoreLabel.fontSize = 20
        this.scoreLabel.y = 270
        this.scoreLabel.color = 'white'
    }

    update() {

    }

    draw() {
        this.bg.draw()
        this.scoreLabel.draw()
    }
}
