class Sprite {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.game = game
        this.animation = null
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
        this.rotation = 0
        this.flipX = false
        this.flipY = false
    }

    update() {
        this.debug()
        if (this.animation) {
            this.animation.update()
            this.texture = this.animation.texture
        }
    }

    draw() {
        const ctx = this.game.context
        const w2 = this.w / 2
        const h2 = this.h / 2
        const scaleX = this.flipX ? -1 : 1
        const scaleY = this.flipY ? -1 : 1
        ctx.save()
        ctx.translate(this.x + w2, this.y + h2)
        ctx.scale(scaleX, scaleY)
        ctx.rotate(this.rotation * Math.PI / 180)
        ctx.translate(-w2, -h2)
        ctx.drawImage(this.texture, 0, 0)
        ctx.restore()
    }

    collide(sprite) {
        if (this.x + this.w >= sprite.x && this.x <= sprite.x + sprite.w) {
            if (this.y + this.h >= sprite.y && this.y <= sprite.y + sprite.h) {
                return true
            }
        }
        return false
    }

    hasPoint(x, y) {
        const xIn = x >= this.x && x <= this.x + this.w
        const yIn = y >= this.y && y <= this.y + this.h
        return xIn && yIn
    }

    debug() {

    }
}
