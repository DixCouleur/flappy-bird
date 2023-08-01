class ParticleSystem {
    constructor(game, x, y, life = 30) {
        this.game = game
        this.x = x
        this.y = y
        this.life = life
        this.numberOfParticles = 200
        this.particles = []
        this.init()
    }

    init() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            const deg = randInRange(0, 360)
            const vx = Math.sin(deg * Math.PI / 180) * randInRange(-5, 5)
            const vy = Math.cos(deg * Math.PI / 180) * randInRange(-5, 5)
            const p = new Particle(this.game, this.x, this.y, vx, vy, this.life)
            this.particles.push(p)
        }
    }

    update() {
        // 更新所有的小火花
        for (const p of this.particles) {
            p.update()
        }

        this.particles = this.particles.filter(p => p.life > 0)
    }

    draw() {
        if (this.particles.length <= 0) {
            return
        }
        for (const p of this.particles) {
            p.draw()
        }
    }
}

class Particle extends GImage {
    constructor(game, x, y, vx, vy, life) {
        super(game, 'spark', 0.6)
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.life = life
    }

    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
    }
}
