class Bird extends Sprite {
    constructor(game) {
        super(game, 'bird1')
        this.gy = 3
        this.vy = 0
        this.alive = true
        this.fallDownEnabled = false
        const animations = {
            bird: [],
        }

        for(let i = 1; i < 5; i++) {
            const name = `bird${i}`
            const t = this.game.textureByName(name)
            animations['bird'].push(t)
        }

        this.animation = new AnimationSystem(animations, 'bird')
    }

    debug() {
        this.gy = config.bird_gravity_y.value
    }

    update() {
        this.fallDown()
        super.update()
    }

    jump() {
        if(!this.alive) {
            return
        }

        this.vy = -5
        this.rotation = -45
    }

    fallDown() {
        if(!this.fallDownEnabled) {
            return
        }
        this.y += this.vy
        this.vy += this.gy * 0.1

        // 触顶
        if(this.y < 0) {
            this.kill()
        }

        // 落地
        if(this.y > 520) {
            this.y = 520
            this.kill()
        }

        if(this.vy > -3) {
            if(this.rotation < 0) {
                this.rotation += 5
            }
        }

        // 根据受力更新角度
        if(this.vy > 3) {
            if(this.rotation < 45) {
                this.rotation += 5
            }
        }
    }

    enableFallDown() {
        this.fallDownEnabled = true
    }

    kill() {
        this.animation.stop()
        this.alive = false
    }
}
