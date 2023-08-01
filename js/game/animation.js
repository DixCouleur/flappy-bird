class AnimationSystem {
    constructor(animations, defaultStatus, duration = 10) {
        this.animations = this.parsedAnimations(animations)

        this.status = defaultStatus
        this.frameIndex = 0
        this.paused = false

        this.texture = this.frames()[this.frameIndex]
        this.frameCount = duration
        this.duration = duration
    }

    start() {
        this.paused = false
    }

    stop() {
        this.paused = true
    }

    frames() {
        return this.animations[this.status].textures
    }

    changeAnimation(name) {
        this.status = name
    }

    parsedAnimations(animations) {
        const parsed = {}
        const keys = Object.keys(animations)
        for(const k of keys) {
            const a = animations[k]
            if(a instanceof Array) {
                parsed[k] = {}
                parsed[k].textures = a
            } else if(a instanceof Object) {
                parsed[k] = {}
                parsed[k].textures = a.textures
                parsed[k].callback = a.callback
            }
        }
        return parsed
    }

    update() {
        if(this.paused) {
            return
        }

        this.frameCount--
        if(this.frameCount === 0) {
            // 完成每次动画序列后的回调
            if(this.frameIndex + 1 === this.frames().length) {
                const callback = this.animations[this.status].callback
                callback && callback()
            }

            this.frameCount = this.duration
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
}
