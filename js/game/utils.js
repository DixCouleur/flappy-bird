const log = console.log.bind(console)

const imageFromPath = function(path) {
    const img = new Image()
    img.src = path
    return img
}

const loadLevel = function(game, levelIndex) {
    const level = levels[levelIndex]
    const blocks = []

    for(const p of level) {
        const b = new Block(game, p)
        blocks.push(b)
    }

    return blocks
}

const randInRange = function(start, end) {
    const n = Math.random() * (end - start + 1) + start
    return Math.floor(n)
}


const enableDebugMode = function(game, enabled) {
    if(!enabled) {
        return
    }

    window.paused = false
    window.addEventListener('keydown', event => {
        const k = event.key
        if(k === 'p') {
            window.paused = !window.paused
        }
    })

}

const ajax = req => {
    const r = new XMLHttpRequest()
    r.open('GET', req.url)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if(r.readyState == 4) {
            req.callback(r.response)
        }
    }
    r.send()
}

const e = sel => document.querySelector(sel)

const es = sel => document.querySelectorAll(sel)

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindAll = (sel, eventName, callback) => {
    const elements = es(sel)
    for(const e of elements) {
        e.addEventListener(eventName, event => callback(event))
    }
}

const templateControl = function(key, configItem) {
    const c = configItem
    const type = configItem.max ? 'range' : 'checkbox'
    const html = `
        <div>
          <label>
            <input type="${type}" class="control" min="${c.min}" max="${c.max}" value="${c.value}" data-value="config.${key}">
            ${c._comment}: <span class="gua-label">${c.value}</span>
          </label>
        <div>
      `

    return html
}

const bindEvents = function() {
    bindAll('.control', 'input', event => {
        const target = event.target
        const bindVar = target.dataset.value
        const v = event.target.type === 'checkbox' ? target.checked : target.value
        eval(bindVar + '.value = ' + v)
        const label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}
