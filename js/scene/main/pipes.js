class Pipes {
    constructor(game) {
        this.game = game
        this.x = 600
        this.pipes = []
        this.rowSpaceOfPipes = 100
        this.columnSpaceOfPipes = 300
        this.columnsOfPipe = 3
        this.minPipesY = 100
        this.maxPipesY = 300
        this.speed = 5

        this.initPipes()
    }

    initPipes() {
        for(let i = 0; i < this.columnsOfPipe; i++) {
            const p1 = new Sprite(game, 'pipe')
            const p2 = new Sprite(game, 'pipe')
            p1.passed = false
            p2.passed = false
            p1.x = this.x + this.columnSpaceOfPipes * i
            p1.flipY = true
            p2.x = p1.x
            p1.y = -randInRange(this.minPipesY, this.maxPipesY)
            p2.y = p1.y + p1.h + this.rowSpaceOfPipes
            this.pipes.push(p1, p2)
        }
    }

    update() {
        for(let i = 0; i < this.pipes.length; i += 2) {
            const p1 = this.pipes[i]
            const p2 = this.pipes[i + 1]
            this.movePipes(p1, p2)
            if(p1.x + p1.w < 0) {
                this.resetPipes(p1, p2)
            }
        }
    }

    draw() {
        for(const p of this.pipes) {
            p.draw()
        }
    }

    resetPipes(p1, p2) {
        p1.passed = false
        p2.passed = false
        p1.x = this.x + this.columnSpaceOfPipes
        p2.x = p1.x
        p1.y = -randInRange(this.minPipesY, this.maxPipesY)
        p2.y = p1.y + p1.h + this.rowSpaceOfPipes
    }

    movePipes(p1, p2) {
        p1.x -= this.speed
        p2.x -= this.speed
    }

    debug() {
        this.rowSpaceOfPipes = config.pipes_row_space.value
        this.columnSpaceOfPipes = config.pipes_col_space.value
        console.log('this.rowSpaceOfPipes', this.rowSpaceOfPipes)
    }
}
