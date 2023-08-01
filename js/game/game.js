class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        const canvas = document.querySelector('#id-canvas')
        const context = canvas.getContext('2d', { alpha: false })
        this.canvas = canvas
        this.context = context
        this.scene = null
        this.images = {}
        this.keyDowns = {}
        this.actions = {}
        this.init(images, runCallback)
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    init(images, runCallback) {
        const names = Object.keys(images)

        for (const n of names) {
            const path = images[n]
            const img = new Image()
            img.src = path
            img.onload = () => {
                this.images[n] = img
                if (Object.keys(this.images).length === names.length) {
                    runCallback(this)
                }
            }
        }

        window.addEventListener('keydown', event => {
            const k = event.key
            this.keyDowns[k] = 'down'
        })

        window.addEventListener('keyup', event => {
            const k = event.key
            this.keyDowns[k] = 'up'
        })
    }

    textureByName(name) {
        const img = this.images[name]
        return img
    }

    drawImage(guaImage) {
        const w = guaImage.w
        const h = guaImage.h
        this.context.drawImage(guaImage.texture, guaImage.x, guaImage.y, w, h)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    update() {
        if (window.paused) {
            return
        }

        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    doActions() {
        const keys = Object.keys(this.keyDowns)
        for (const k of keys) {
            if (!this.actions[k]) {
                continue
            }

            const status = this.keyDowns[k]
            if (status === 'down') {
                this.actions[k](status)
            } else if (status === 'up') {
                this.actions[k](status)
                this.keyDowns[k] = null
            }
        }
    }

    runloop() {
        setTimeout(() => {
            this.doActions()
            this.update()
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw()
            this.runloop()
        }, 1000 / config.fps.value)
    }

    runWithScene(scene) {
        this.scene = scene
        this.runloop()
    }

    replaceScene(scene) {
        this.scene = scene
    }
}
