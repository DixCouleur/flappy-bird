class SceneMain extends Scene {
    constructor(game) {
        super(game)

        this.grounds = []
        this.skipCount = 5
        this.score = 0
        this.started = false

        const sky = new GImage(game, 'sky')
        this.addElement(sky)

        this.pipes = new Pipes(game)
        this.addElement(this.pipes)

        this.title = new Title(game)
        this.addElement(this.title)

        this.initGrounds()
        this.initBird()
        this.setupInputs()
    }

    start() {
        if (this.started) {
            return
        }

        this.started = true
        this.title.kill()
        this.bird.enableFallDown()
        this.initScoreLabel()
    }

    end() {
        this.scoreLabel.hide()
        this.scoreBoard = new ScoreBoard(this.game, this.score)
        this.addElement(this.scoreBoard)
    }

    update() {
        if (!this.bird.alive) {
            return
        }

        this.moveGrounds()

        if (!this.started) {
            return
        }

        super.update()

        for (const p of this.pipes.pipes) {
            if (this.bird.collide(p) && !config.bird_unbeatable.value) {
                this.bird.kill()
                this.end()
            }

            // pass the pipes
            if (this.bird.x > p.x + p.w && !p.passed) {
                this.score += 0.5
                this.scoreLabel.text = this.score
                p.passed = true
            }
        }
    }

    initBird() {
        this.bird = new Bird(game)
        this.bird.x = 170
        this.bird.y = 200
        this.addElement(this.bird)
    }

    initScoreLabel() {
        this.scoreLabel = new Label(game, this.score)
        this.scoreLabel.color = 'white'
        this.scoreLabel.x = 170
        this.scoreLabel.y = 150
        this.addElement(this.scoreLabel)
    }

    initGrounds() {
        for (let i = 0; i < 25; i++) {
            const g = new GImage(game, 'ground')
            g.x = g.w * i
            g.y = 540
            this.grounds.push(g)
            this.addElement(g)
        }
    }

    moveGrounds() {
        this.skipCount--
        let offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 5
            offset = 20
        }

        for (const g of this.grounds) {
            g.x += offset
        }
    }

    setupInputs() {
        this.game.registerAction('r', () => {
            const s = new SceneMain(this.game)
            this.game.replaceScene(s)
        })

        this.game.registerAction('j', () => {
            this.start()
            this.bird.jump()
        })

        this.game.registerAction('e', () => {
            this.end()
        })

    }
}
