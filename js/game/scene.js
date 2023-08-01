class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    addElement(element) {
        element.scene = this
        this.elements.push(element)
    }

    draw() {
        for(const e of this.elements) {
            e.draw()
        }
    }

    update() {
        this.debug?.()
        for(const e of this.elements) {
            e.debug && e.debug()
            e.update()
        }
    }
}
